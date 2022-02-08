import React, { useState } from 'react';
import { ExternalLink } from '../ExternalLink';
import { PrState } from '../PrState';

export type PullRequestProps = {
  record: Aha.RecordUnion;
  pr: IExtensionFieldPullRequest;
};

export const PullRequest = ({ record, pr }: PullRequestProps) => {
  return (
    <aha-flex direction="column">
      <aha-flex align-items="center" justify-content="space-between" gap="5px">
        <span>
          <ExternalLink href={pr?.webUrl ?? ''}>{pr?.title ?? ''}</ExternalLink>
        </span>
        <PrState pr={pr} />
      </aha-flex>
    </aha-flex>
  );
};
