// import { type NoteEntityType } from '@google-keep-clone/core';
import { type UpdateNoteBodyType } from '@google-keep-clone/core';
import { Amplify, API } from 'aws-amplify';

import { config } from './awsConfig';

Amplify.configure(config);

export const createNote = async ({ note }: { note: UpdateNoteBodyType }) => {
  await API.post('notesApi', '/api/notes', {
    body: note,
  });
};
