import React from 'react';
import { AuthProvider } from '@aha-develop/aha-develop-react';

import { Styles } from './Styles';

/**
 * Set up the styles and auth provider
 */
export const ExtensionRoot = ({ children }) => {
  return (
    <>
      <Styles />
      <AuthProvider serviceName="ado" serviceParameters={{}}>
        {children}
      </AuthProvider>
    </>
  );
};
