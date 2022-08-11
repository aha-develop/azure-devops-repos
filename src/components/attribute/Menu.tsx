import React from 'react';

import { runCommand } from '@lib/runCommand';
import { LEARN_MORE_URL } from '@lib/extension';

export type MenuProps = {
  record: Aha.RecordUnion;
};

export const Menu = ({ record }: MenuProps) => {
  return (
    <aha-menu>
      <aha-button slot="button" type="attribute" size="mini">
        <aha-icon icon="fa-solid fa-ellipsis"></aha-icon>
      </aha-button>
      <aha-menu-item onClick={() => runCommand(record, 'addLink')}>Paste PR link</aha-menu-item>
      <aha-menu-item onClick={() => runCommand(record, 'sync')}>Scan Azure Repos</aha-menu-item>
      <hr />
      <aha-menu-item>
        <a href={LEARN_MORE_URL} target="_blank" rel="noopener noreferrer">
          <aha-icon icon="fa fa-external-link" />
          Read the docs
        </a>
      </aha-menu-item>
      <aha-menu-item type="danger" onClick={() => runCommand(record, 'removeLinks')}>
        <a href>
          <aha-icon icon="fa fa-trash" />
          Unlink all PRs
        </a>
      </aha-menu-item>
    </aha-menu>
  );
};
