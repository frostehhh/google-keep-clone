import { NextjsSite, type StackContext, use } from 'sst/constructs';

import { ApiStack } from './ApiStack';

export function FrontendStack({ stack, app }: StackContext) {
  const { notesApi } = use(ApiStack);

  const site = new NextjsSite(stack, 'site', {
    path: 'packages/web',
    environment: {
      NEXT_PUBLIC_API_URL: notesApi.url,
      NEXT_PUBLIC_REGION: app.region,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url || 'http://localhost:3000',
  });
}