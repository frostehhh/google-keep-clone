import { NextjsSite,type StackContext } from 'sst/constructs';

export function Default({ stack }: StackContext) {
  const site = new NextjsSite(stack, 'site', {
    path: 'packages/web',
  });
  stack.addOutputs({
    SiteUrl: site.url,
  });
}
