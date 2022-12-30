import React from 'react';
import { runCommand } from '@lib/runCommand';

export type MenuProps = {
  record: Aha.RecordUnion;
};

const LEARN_MORE_URL = 'https://github.com/aha-develop/azure-devops-repos';

export const Menu = ({ record }: MenuProps) => {
  return (
    <aha-menu>
      <aha-button slot="control" kind="secondary" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => runCommand(record, 'addLink')}>
            Paste PR link
          </aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => runCommand(record, 'sync')}>
            Scan Azure Repos
          </aha-button>
        </aha-menu-item>
        <hr />
        <aha-menu-item>
          <aha-button kind="plain" href={LEARN_MORE_URL} target="_blank">
            <aha-icon icon="fa fa-external-link" />
            Read the docs
          </aha-button>
        </aha-menu-item>
        <aha-menu-item type="danger">
          <aha-button kind="plain" onClick={() => runCommand(record, 'removeLinks')}>
            <aha-icon icon="fa fa-trash" />
            Unlink all PRs
          </aha-button>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
};
