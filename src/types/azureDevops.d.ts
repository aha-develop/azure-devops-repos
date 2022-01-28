declare namespace AzureDevops {
  type ID = string;

  type PullRequestStatus = 'active' | 'all' | 'completed' | 'abandoned' | 'notSet';

  type MergeStatus = 'conflicts' | 'failure' | 'notSet' | 'queued' | 'rejectedByPolicy' | 'succeeded';

  interface Connections<T> {
    count?: number;
    edges?: Edge<T>[];
    nodes?: T[];
    pageInfo: PageInfo;
  }

  interface PageInfo {
    endCursor?: string;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
    startCursor?: string;
  }

  interface Edge<T> {
    cursor?: string;
    node?: T;
  }

  interface Project {
    id?: ID;
    name?: string;
    webUrl?: string;
    mergeRequests?: Connections<PR>;
  }

  interface Label {
    color?: string;
    description?: string;
    descriptionHtml?: string;
    id?: ID;
    textColor?: string;
    title?: string;
  }

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

  type MRWithProject = PR & {
    projectId?: ID;
    projectName?: string;
    projectWebUrl?: string;
  };

  interface User {
    id: number;
    name?: string;
    email?: string;
    username?: string;
    avatar_url?: string;
  }

  interface PRGetOptions {
    organization: string;
    project: string;
    repositoryId: string;
    pullRequestId: string;
  }
}
