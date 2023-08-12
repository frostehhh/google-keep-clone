import { type NoteEntityType } from '@google-keep-clone/core';
import { Amplify, API } from 'aws-amplify';

const config = {
  apiGateway: {
    REGION: process.env.NEXT_PUBLIC_REGION,
    URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'notesApi',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

export const createNote = async ({ note }: { note: Partial<NoteEntityType> }) => {
  console.log('createNote', note);
  await API.post('notesApi', '/api/notes', {
    body: note,
  });
};
