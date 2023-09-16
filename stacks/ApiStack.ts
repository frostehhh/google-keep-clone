import { EnvSchema } from '@google-keep-clone/core';
import { Api, type StackContext, use } from 'sst/constructs';

import { StorageStack } from './StorageStack';

export function ApiStack({ stack }: StackContext) {
  const environment = EnvSchema.parse(process.env);
  const { notesTable } = use(StorageStack);

  const notesApi = new Api(stack, 'notesApi', {
    defaults: {
      function: {
        bind: [
          notesTable,
        ],
        environment,
      },
    },
    routes: {
      'POST /api/notes': 'packages/functions/src/notes/index.createNote',
      'GET /api/notes/{noteId}': 'packages/functions/src/notes/index.getNote',
      'GET /api/notes': 'packages/functions/src/notes/index.getNotes',
    },
  });

  stack.addOutputs({
    ApiEndpoint: notesApi.url,
  });

  return {
    notesApi,
  };
}