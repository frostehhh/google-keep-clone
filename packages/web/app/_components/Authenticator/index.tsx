/* eslint-disable simple-import-sort/imports */
'use client';

import { Amplify } from 'aws-amplify';
import { config } from '@/api/awsConfig';
import { Authenticator as AuthUI } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Button } from '@/components/ui/Button';

import classes from './styles.module.css';

Amplify.configure(config);

export function Authenticator() {
  return (
    <AuthUI variation='modal' className={classes.testauth}>
      {({ signOut, user }) => (
        <div className="h-full flex items-center gap-2">
          <Button variant="outline" onPress={signOut}>Sign out</Button>
          <span>Logged in as {user?.attributes?.email}</span>
        </div>
      )}
    </AuthUI>
  );
}

