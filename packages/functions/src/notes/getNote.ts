/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GetNoteSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { handleResponseError, handleSuccessfulResponse } from '@/common';

import { NoteEntity } from './common';

export async function getNote(event: APIGatewayProxyEventV2WithIAMAuthorizer) {
  try {
    const pathParams = GetNoteSchema.safeParse(event?.pathParameters);

    if (!pathParams.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: JSON.stringify(pathParams.error),
      };
    }

    // @ts-ignore
    const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId as string;
    const result = await NoteEntity.get({ userId, ...pathParams.data });
    if (!result.Item) {
      throw new Error('Item not found.');
    }

    return handleSuccessfulResponse({ body: result.Item });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
