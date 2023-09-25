import { type UpdateItemCommandOutput } from '@aws-sdk/client-dynamodb';
import { type CreateNoteBodyType, type NoteType } from '@google-keep-clone/core';
import { Amplify, API } from 'aws-amplify';

import { config } from '../awsConfig';

Amplify.configure(config);

export const createNote = async (note: CreateNoteBodyType) => {
  const result = (await API.post('notesApi', '/api/notes', {
    body: note,
  })) as UpdateItemCommandOutput;
  return result;
};

export const getNote = async (noteId: NoteType['noteId']) => (await API.get('notesApi', `/api/notes/${noteId}`, {})) as NoteType;

export const getNotes = async () => (await API.get('notesApi', '/api/notes', {})) as NoteType[];

export const updateNote = (note: NoteType) => {
  return API.put('notesApi', `/api/notes/${note.noteId}`, {
    body: note,
  });
};

export const deleteNote = (noteId: NoteType['noteId']) => {
  return API.del('notesApi', `/api/notes/${noteId}`, {});
};