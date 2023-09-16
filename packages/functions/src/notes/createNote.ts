import type { APIGatewayProxyEventV2, Handler } from 'aws-lambda';
import { handleResponseError, handleSuccessfulResponse } from 'src/common';

import { NoteEntity } from './common';
import { type NoteEntityType } from './types';

export const createNote: Handler = async (event: APIGatewayProxyEventV2) => {
  let body;

  try {
    const response: unknown = event?.body ? JSON.parse(event.body) : {};
    const newNote = (response as NoteEntityType);

    body = await NoteEntity.put({
      userId: '123',
      title: newNote.title,
      content: newNote.content,
    });

    return handleSuccessfulResponse({
      body,
    });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
