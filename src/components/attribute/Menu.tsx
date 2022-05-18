import React from 'react';

import { runCommand } from '@lib/runCommand';

export type MenuProps = {
  record: Aha.RecordUnion;
};

export const Menu = ({ record }: MenuProps) => {
  return (
    <aha-menu>
      <aha-button slot="control" kind="attribute" size="small">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-content>
        <aha-menu-item>
          <a href="#" onClick={() => runCommand(record, 'sync')}>Resync</a>
        </aha-menu-item>
        <aha-menu-item>
          <a href="#" onClick={() => runCommand(record, 'addLink')}>Link pull request</a>
        </aha-menu-item>
        <aha-menu-item>
          <a href="#" onClick={() => runCommand(record, 'removeLinks')}>Unlink pull requests</a>
        </aha-menu-item>
      </aha-menu-content>
    </aha-menu>
  );
};
