import { baseApiGatewayHandler } from '@google-keep-clone/core';
import type { APIGatewayProxyEventV2, Handler } from 'aws-lambda';

import { NoteEntity } from './common';
import { type NoteEntityType } from './types';

export const createNote: Handler = async (event: APIGatewayProxyEventV2) => {
  console.log('createNote', event);
  const response: unknown = event?.body ? JSON.parse(event.body) : {};
  const newNote = (response as NoteEntityType);

  let result;
  try {
    result = await NoteEntity.put({
      userId: '123',
      title: newNote.title,
      content: newNote.content,
    });
  } catch (e) {
    console.log('error', e);
  }

  return result;
};

export default baseApiGatewayHandler(createNote);