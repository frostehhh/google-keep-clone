import { EnvSchema } from '@google-keep-clone/core';
import { Api, type StackContext, use } from 'sst/constructs';

import { StorageStack } from './StorageStack';

const NOTES_DIR = 'packages/functions/src/notes/';

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
      authorizer: 'iam',
    },
    routes: {
      'POST /api/notes': `${NOTES_DIR}index.createNote`,
      'GET /api/notes/{noteId}': `${NOTES_DIR}index.getNote`,
      'GET /api/notes': `${NOTES_DIR}index.getNotes`,
      'PUT /api/notes/{noteId}': `${NOTES_DIR}index.updateNote`,
      'DELETE /api/notes/{noteId}': `${NOTES_DIR}index.deleteNote`,
    },
  });

  stack.addOutputs({
    ApiEndpoint: notesApi.url,
  });

  return {
    notesApi,
  };
}