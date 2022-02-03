import { runCommand } from '@lib/runCommand.js';
import { linkMergeRequest, linkBranch, referenceToRecordFromTitle, linkPullRequestToRecord } from '../lib/fields.js';

aha.on('webhook', async ({ headers, payload }) => {
  const event = payload.eventType;

  console.log(`Received webhook '${event}' ${payload.event_type || ''}`);

  switch (event) {
    case 'git.branch.created':
      await handleCreateBranch(payload);
      break;
    case 'git.pullrequest.created':
    case 'git.pullrequest.updated':
      await handlePullRequest(payload);
      break;
    default:
      console.log(`No action registered for ${event}`);
      break;
  }
});

const handlePullRequest = async (payload: Webhook.Payload) => {
  const pr: AzureDevops.PR = payload.resource ?? {};

  // Make sure the MR is linked to its record.
  const record = await linkMergeRequest(pr);

  // Link MR to record
  await linkPullRequestToRecord(pr, record);
};

async function handleCreateBranch(payload: Webhook.Payload) {
  const branchName = payload?.resource?.sourceRefName?.replace('refs/heads/', '') ?? '';
  if (!branchName) {
    return;
  }

  const record = await linkBranch(branchName, payload?.resource?.repository?.webUrl ?? '');
  await triggerEvent('branch.create', payload, record);
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

  aha.triggerServer(`aha-develop.gitlab.${event}`, {
    record,
    payload
  });
};
