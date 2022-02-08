import React from 'react';
// @ts-ignore
import { titleize } from 'https://cdn.skypack.dev/inflected';

const icon = (state: AzureDevops.PullRequestStatus) => {
  switch (state) {
    case 'active':
      return 'code-branch';
    case 'completed':
      return 'code-merge';
    case 'notSet':
      return 'times-circle';
    case 'abandoned':
      return 'lock';
  }
};

export type PrStateProps = {
  pr: IExtensionFieldPullRequest;
};

export const PrState = ({ pr }: PrStateProps) => {
  return (
    <span className={`pr-state pr-state-${pr?.state?.toLowerCase() ?? ''}`}>
      <aha-flex gap="4px">
        <aha-icon icon={'fa-regular fa-' + icon(pr?.state ?? 'active')}></aha-icon>
        <span>{titleize(pr.state)}</span>
      </aha-flex>
    </span>
  );
};
