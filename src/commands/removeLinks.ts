import { unlinkBranches, unlinkPullRequests } from '@lib/fields';

aha.on('removeLinks', async ({ record }) => {
  await unlinkPullRequests(record);
  await unlinkBranches(record);
});
