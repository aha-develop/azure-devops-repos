declare interface IRecordExtensionFields {
  branches?: IRecordExtensionFieldBranch[];
  pullRequests?: IExtensionFieldPullRequest[];
}

declare type IRecordExtensionField = keyof IRecordExtensionFields;

declare interface IRecordExtensionFieldBranch {
  id?: string;
  name?: string;
  url?: string;
}

declare interface IAccountExtensionFields {
  azurePRs?: IExtensionFieldPullRequest[];
}

declare interface IExtensionFieldPullRequest {
  id: string;
  title?: string;
  webUrl?: string;
  sourceBranch?: string;
  targetBranch?: string;
  projectId?: string;
  projectWebUrl?: string;
  state?: AzureDevops.PullRequestStatus;
  ahaReference?: {
    type: string;
    referenceNum: string;
  };
}

declare type IAccountExtensionField = keyof IAccountExtensionFields;
