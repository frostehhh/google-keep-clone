import { NextjsSite, type StackContext, use } from 'sst/constructs';

import { ApiStack } from './ApiStack';
import { AuthStack } from './AuthStack';

export function FrontendStack({ stack, app }: StackContext) {
  const { notesApi } = use(ApiStack);
  const { auth } = use(AuthStack);

  const site = new NextjsSite(stack, 'site', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_URL: notesApi.url,
      NEXT_PUBLIC_REGION: app.region,
      NEXT_PUBLIC_USER_POOL_ID: auth.userPoolId,
      NEXT_PUBLIC_USER_POOL_CLIENT_ID: auth.userPoolClientId,
      NEXT_PUBLIC_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId || '',
    },
  });

  stack.addOutputs({
    SiteUrl: site.url || 'http://localhost:3000',
  });
}