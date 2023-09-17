/* eslint-disable simple-import-sort/imports */
'use client';

import { Amplify } from 'aws-amplify';
import { config } from '@/api/awsConfig';
import { Authenticator as AuthUI } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(config);

export function Authenticator() {
  return (
    <AuthUI>
      {({ signOut, user }) => (
        <div>
          <h1>Logged in as {user?.attributes?.email}</h1>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </AuthUI>
  );
}

