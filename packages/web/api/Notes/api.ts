import { type CreateNoteBodyType, type NoteType } from '@google-keep-clone/core';
import { Amplify, API } from 'aws-amplify';

import { config } from '../awsConfig';

Amplify.configure(config);

export const createNote = async (note: CreateNoteBodyType) => {
  await API.post('notesApi', '/api/notes', {
    body: note,
  });
};

export const getNotes = async () => (await API.get('notesApi', '/api/notes', {})) as NoteType[];

export const updateNote = (note: NoteType) => {
  return API.put('notesApi', `/api/notes/${note.noteId}`, {
    body: note,
  });
};

export const deleteNote = (noteId: NoteType['noteId']) => {
  return API.del('notesApi', `/api/notes/${noteId}`, {});
};