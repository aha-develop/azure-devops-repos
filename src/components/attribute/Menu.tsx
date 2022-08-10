import React from 'react';

import { runCommand } from '@lib/runCommand';

export type MenuProps = {
  record: Aha.RecordUnion;
};

export const Menu = ({ record }: MenuProps) => {
  return (
    <aha-menu>
      <aha-button slot="control" kind="secondary" size="small">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => runCommand(record, 'sync')}>Resync</aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => runCommand(record, 'addLink')}>Link pull request</aha-button>
        </aha-menu-item>
        <aha-menu-item>
          <aha-button kind="plain" onClick={() => runCommand(record, 'removeLinks')}>Unlink pull requests</aha-button>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
};
