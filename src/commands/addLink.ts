import { linkPullRequestToRecord } from '@lib/fields';
import adClient from '@lib/azureDevopsClient';

aha.on('addLink', async ({ record, context }) => {
  if (!record) {
    // @ts-ignore
    aha.commandOutput('Open a record first to sync PRs for that record');
    return;
  }

  const prUrl = await aha.commandPrompt('Link URL', {
    placeholder: 'Enter the URL to a pull request'
  });
  await adClient.auth();
  const res = await adClient.getPRByURL(prUrl);
  if (res) {
    await linkPullRequestToRecord(res, record);
  } else {
    throw new Error('Could not link this pull request! Please enter a valid pull request URL!');
  }
});
