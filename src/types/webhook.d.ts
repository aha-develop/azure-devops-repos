declare namespace Webhook {
  interface Payload {
    id: string;
    message?: PayloadMessage;
    resource?: AzureDevops.PR;
    eventType?: string;
    createdDate?: string;
    publisherId?: string;
    notificationId?: number;
    subscriptionId?: string;
    detailedMessage?: PayloadMessage;
    resourceVersion?: string;
  }

  interface PayloadMessage {
    html?: string;
    text?: string;
    markdown?: string;
  }

  interface Repository {
    url?: string;
    name?: string;
    homepage?: string;
    description?: string;
    git_ssh_url?: string;
    git_http_url?: string;
    visibility_level?: number;
  }

  interface Project {
    id: number;
    url?: string;
    name?: string;
    ssh_url?: string;
    web_url?: string;
    homepage?: string;
    http_url?: string;
    namespace?: string;
    avatar_url?: string;
    description?: string;
    git_ssh_url?: string;
    git_http_url?: string;
    ci_config_path?: string;
    default_branch?: string;
    path_with_namespace?: string;
  }

  interface ObjectAttributes {
    id?: string;
    iid?: number;
    url?: string;
    state?: AzureDevops.PullRequestStatus;
    title?: string;
    source?: Project;
    target?: Project;
    state_id?: number;
    author_id?: number;
    description?: string;
    merge_status: AzureDevops.MergeStatus;
    source_branch?: string;
    target_branch?: string;
  }
}
