import { IDENTIFIER } from '@lib/extension.js';
import { runCommand } from '@lib/runCommand.js';
import { linkPullRequest, linkBranch, referenceToRecordFromTitle, linkPullRequestToRecord } from '../lib/fields.js';

const EMPTY_SHA = '0000000000000000000000000000000000000000';

aha.on('webhook', async ({ headers, payload }) => {
  const event = payload.eventType;

  switch (event) {
    case 'git.push':
      await handleCreateBranch(payload);
      break;
    case 'git.pullrequest.created':
    case 'git.pullrequest.updated':
    case 'git.pullrequest.merged':
      await handlePullRequest(payload);
      break;
    default:
      break;
  }
});

const handlePullRequest = async (payload: Webhook.Payload) => {
  const pr: AzureDevops.PR = payload.resource ?? {};

  // Make sure the MR is linked to its record.
  const record = await linkPullRequest(pr);

  // Link MR to record
  await linkPullRequestToRecord(pr, record);
  await triggerEvent('pr.update', payload, record);
  await triggerAutomation(payload, record);
};

async function handleCreateBranch(payload: Webhook.Payload) {
  const refUpdate = payload.resource.refUpdates?.[0] ?? {};
  if (refUpdate?.oldObjectId === EMPTY_SHA || refUpdate?.newObjectId === EMPTY_SHA) {
    const branchName = refUpdate?.name;
    const repoURL = payload?.resource?.repository?.remoteUrl ?? '';
    if (!branchName || !repoURL) {
      return;
    }

    const record = await linkBranch(branchName, repoURL);
    await triggerEvent('branch.create', payload, record);
  }
}

/**
 * Trigger an automation
 *
 * @param payload
 * @param record
 */
async function triggerAutomation(payload: Webhook.Payload, record) {
  if (!payload.eventType.startsWith('git.pullrequest')) return;

  const { resource } = payload;
  if (!resource) return;

  // Check the record is a supported type
  if (!['Epic', 'Feature', 'Requirement'].includes(record.typename)) {
    return;
  }

  const triggers: Record<string, (payload: Webhook.Payload) => string> = {
    created: (payload) => (payload.resource.isDraft ? 'draftPROpened' : 'prOpened'),
    updated: (payload) => {
      // Use the payload message to interpret the event
      // This doesn't feel particularly future-proof, but the API
      // doesn't expose a clear way to get this information otherwise :(
      const message = payload.message.text;
      if (!message) return '';

      if (message.includes('approved pull request')) {
        return 'prApproved';
      }
      if (message.includes('rejected pull request')) {
        return 'prChangesRequested';
      }
      if (message.includes('marked the pull request as a draft')) {
        return 'draftPROpened';
      }
      if (message.includes('published the pull request')) {
        return 'prOpened';
      }
      if (message.includes('completed pull request')) {
        return 'prMerged';
      }
      if (message.includes('abandoned pull request')) {
        return 'prClosed';
      }
      if (message.includes('reactivated pull request')) {
        return 'prReopened';
      }
    },
    merged: (payload) => 'prMerged'
  };

  const action = payload.eventType.replace('git.pullrequest.', '');
  const trigger = (triggers[action] || (() => null))(payload);
  if (!trigger) return;

  console.log(`Triggering ${trigger} automation on ${record.referenceNumber}`);

  if (trigger) {
    await aha.triggerAutomationOn(record, [IDENTIFIER, trigger].join('.'), true);
  }
}

/**
 * Trigger an Event
 *
 * @param event
 * @param payload
 * @param referenceText
 */
const triggerEvent = async (event: string, payload: any, referenceText) => {
  let record = referenceText;

  if (typeof referenceText === 'string') {
    record = await referenceToRecordFromTitle(referenceText);
  }

  aha.triggerServer(`aha-develop.azure-devops-repos.${event}`, {
    record,
    payload
  });
};
