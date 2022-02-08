declare namespace AzureDevops {
  type ID = string;

  type PullRequestStatus = 'active' | 'all' | 'completed' | 'abandoned' | 'notSet';

  type MergeStatus = 'conflicts' | 'failure' | 'notSet' | 'queued' | 'rejectedByPolicy' | 'succeeded';

  interface PR {
    repository?: Repository;
    pullRequestId?: number;
    codeReviewId?: number;
    status?: PullRequestStatus;
    title?: string;
    description?: string;
    sourceRefName?: string;
    targetRefName?: string;
    mergeStatus?: MergeStatus;
    isDraft?: boolean;
    mergeId?: string;
    url?: string;
    refUpdates?: Array<{
      name?: string;
      newObjectId?: string;
      oldObjectId?: string;
    }>;
  }

  interface Repository {
    id?: string;
    name?: string;
    url?: string;
    project: {
      id?: string;
      name?: string;
      url?: string;
      state?: string;
      revision?: number;
      visibility?: string;
      lastUpdateTime?: string;
    };
    size?: number;
    remoteUrl?: string;
    sshUrl?: string;
    webUrl?: string;
    isDisabled?: boolean;
  }

  interface PRGetOptions {
    organization: string;
    project: string;
    repositoryId: string;
    pullRequestId: string;
  }
}
