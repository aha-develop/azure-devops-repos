import React from 'react';
import { PullRequest } from './PullRequest';

export type PullRequestsProps = {
  record: Aha.RecordUnion;
  prs: IExtensionFieldPullRequest[];
};

export const PullRequests = ({ record, prs }: PullRequestsProps) => {
  return (
    <div className="merge-requests">
      <aha-flex direction="column" gap="3px">
        {(prs || []).map((pr, idx) => (
          <PullRequest key={idx} record={record} pr={pr} />
        ))}
      </aha-flex>
    </div>
  );
};
