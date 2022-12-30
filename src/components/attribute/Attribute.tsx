import { useAuth, useClipboard } from '@aha-develop/aha-develop-react';
import React from 'react';

import { getExtensionFields } from '@lib/fields';
import { Branches } from './Branches';
import { EmptyState } from './EmptyState';
import { Menu } from './Menu';
import { PullRequests } from './PullRequests';

export type AttributeProps = {
  record: Aha.RecordUnion;
  fields: IRecordExtensionFields;
};

export const Attribute = ({ fields, record }: AttributeProps, { identifier, settings }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [branches, setBranches] = React.useState<IRecordExtensionFieldBranch[]>([]);
  const [pullRequests, setPullRequests] = React.useState<IExtensionFieldPullRequest[]>([]);
  const { error, authed } = useAuth(async () => {});
  const [onCopy, copied] = useClipboard();
  const authError = error && <div>{error}</div>;
  const isLinked = [branches, pullRequests].some((ary) => ary && ary?.length > 0);

  React.useEffect(() => {
    getFields();
  }, [authed, fields]);

  const getFields = async () => {
    setLoading(true);
    const branches = await getExtensionFields('branches', record);
    setBranches(branches as any);
    const pullRequests = await getExtensionFields('pullRequests', record);
    setPullRequests(pullRequests as any);
    setLoading(false);
  };

  if (isLoading) {
    return <aha-spinner />;
  }

  if (isLinked) {
    return (
      <div className="mt-1 ml-1">
        <aha-flex align-items="center" justify-content="space-between" gap="5px">
          {authError}
          <Branches branches={branches ?? []} />
          <div
            style={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            <aha-button-group>
              <aha-button kind="secondary" size="mini" onClick={(e) => onCopy(record.referenceNum)}>
                {copied ? 'Copied!' : 'Copy ID'}
              </aha-button>
              <Menu record={record} />
            </aha-button-group>
          </div>
        </aha-flex>
        <aha-flex align-items="center" justify-content="space-between" gap="5px">
          <aha-flex direction="column" gap="8px" justify-content="space-between">
            <PullRequests record={record} prs={pullRequests ?? []}></PullRequests>
          </aha-flex>
        </aha-flex>
      </div>
    );
  } else {
    return <EmptyState record={record} />;
  }
};
