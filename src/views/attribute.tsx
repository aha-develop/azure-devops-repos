import React from 'react';
import { Attribute } from '../components/attribute/Attribute';
import { ExtensionRoot } from '../components/ExtensionRoot';

/**
 * @type {Aha.RenderExtension}
 */
const links = ({ record, fields }) => {
  return (
    <ExtensionRoot>
      <Attribute fields={fields} record={record} />
    </ExtensionRoot>
  );
};

aha.on('links', links);
