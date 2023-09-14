import { baseApiGatewayHandler, GetNoteSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2 } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { NoteEntity } from './common';

async function main(event: APIGatewayProxyEventV2) {
  const pathParams = GetNoteSchema.safeParse(event?.pathParameters);

  if (!pathParams.success) {
    return {
      status: StatusCodes.BAD_REQUEST,
      error: JSON.stringify(pathParams.error),
    };
  }

  const result = await NoteEntity.get({ userId: '123', ...pathParams });
  if (!result.Item) {
    throw new Error('Item not found.');
  }

  return result.Item;
};

export default baseApiGatewayHandler(main);