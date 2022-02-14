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
