import { Api, Config, type StackContext, use } from 'sst/constructs';

import { StorageStack } from './StorageStack';

const NOTES_DIR = 'packages/functions/src/notes/';

export function ApiStack({ stack }: StackContext) {
  const AWS_CUSTOM_ACCESS_KEY_ID = new Config.Secret(stack, 'AWS_CUSTOM_ACCESS_KEY_ID');
  const AWS_CUSTOM_SECRET_ACCESS_KEY = new Config.Secret(stack, 'AWS_CUSTOM_SECRET_ACCESS_KEY');

  const { notesTable } = use(StorageStack);

  const notesApi = new Api(stack, 'notesApi', {
    defaults: {
      function: {
        bind: [
          notesTable,
          AWS_CUSTOM_SECRET_ACCESS_KEY,
          AWS_CUSTOM_ACCESS_KEY_ID,
        ],
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