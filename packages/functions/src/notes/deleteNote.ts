import { DeleteNoteSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { handleResponseError, handleSuccessfulResponse } from 'src/common';

import { NoteEntity } from './common';

export async function deleteNote(event: APIGatewayProxyEventV2) {
  try {
    const pathParams = DeleteNoteSchema.safeParse(event?.pathParameters);

    if (!pathParams.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: JSON.stringify(pathParams.error),
      };
    }
    await NoteEntity.delete({ userId: '123', ...pathParams.data });

    return handleSuccessfulResponse({ body: { status: true } });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
