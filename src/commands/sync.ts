import { linkPullRequestToRecord } from '@lib/fields';
import adClient from '@lib/azureDevopsClient';

import { getExtensionFields } from '@lib/fields';

aha.on('sync', async ({ record }, { settings }) => {
  if (!record) {
    // @ts-ignore
    aha.commandOutput('Open a record first to sync PRs for that record');
    return;
  }

  console.log(`Syncing PRs for ${record.referenceNum}`);

  const pullRequests = (await getExtensionFields('pullRequests', record)) as IExtensionFieldPullRequest[];
  for await (const pr of pullRequests ?? []) {
    if (pr?.webUrl) {
      await adClient.auth();
      const prResult = await adClient.getPRByURL(pr.webUrl);
      if (prResult) {
        linkPullRequestToRecord(prResult, record);
      }
    }
  }
});
