import { GetNoteSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';
import { handleResponseError, handleSuccessfulResponse } from 'src/common';

import { NoteEntity } from './common';

export async function getNote(event: APIGatewayProxyEventV2) {
  try {
    const pathParams = GetNoteSchema.safeParse(event?.pathParameters);

    if (!pathParams.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: JSON.stringify(pathParams.error),
      };
    }
    const result = await NoteEntity.get({ userId: '123', ...pathParams.data });
    if (!result.Item) {
      throw new Error('Item not found.');
    }

    return handleSuccessfulResponse({ body: result.Item });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
