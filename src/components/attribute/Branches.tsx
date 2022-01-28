import React, { useState } from 'react';
import { ExternalLink } from '../ExternalLink';

export type BranchProps = {
  branch: IRecordExtensionFieldBranch;
};

export const Branch = ({ branch }: BranchProps) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(branch?.name ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <aha-flex gap="4px">
      <span className="type-icon">
        <aha-icon icon="fa-regular fa-code-branch type-icon" />
      </span>
      <ExternalLink href={branch.url}>{branch.name}</ExternalLink>
      <a
        href="#"
        onClick={onCopy}
        style={{
          color: copied ? 'var(--aha-green-600)' : ''
        }}>
        <aha-icon icon={'fa-regular fa-' + (copied ? 'check' : 'clipboard')}></aha-icon>
      </a>
    </aha-flex>
  );
};

export type BranchesProps = {
  branches: IRecordExtensionFieldBranch[];
};

export const Branches = ({ branches }: BranchesProps) => {
  if (!branches || branches.length === 0) return null;
  return (
    <div className="branches">
      {(branches || []).map((branch) => (
        <Branch branch={branch} key={branch.name} />
      ))}
    </div>
  );
};
