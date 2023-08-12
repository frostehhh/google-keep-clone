import { Api, type StackContext, use } from 'sst/constructs';

import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const { notesTable } = use(StorageStack);

  const notesApi = new Api(stack, 'notesApi', {
    defaults: {
      function: {
        bind: [notesTable],
      },
    },
    routes: {
      'POST /api/notes': 'packages/functions/src/notes/index.createNote',
    },
  });

  stack.addOutputs({
    ApiEndpoint: notesApi.url,
  });

  return {
    notesApi,
  };
}