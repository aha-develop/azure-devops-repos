import React from 'react';

import { runCommand } from '@lib/runCommand';

export type MenuProps = {
  record: Aha.RecordUnion;
};

export const Menu = ({ record }: MenuProps) => {
  return (
    <aha-menu>
      <aha-button slot="button" type="attribute" size="small">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-item onClick={() => runCommand(record, 'sync')}>Resync</aha-menu-item>
      <aha-menu-item onClick={() => runCommand(record, 'addLink')}>Link merge request</aha-menu-item>
      <aha-menu-item onClick={() => runCommand(record, 'removeLinks')}>Unlink merge requests</aha-menu-item>
    </aha-menu>
  );
};
