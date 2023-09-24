/* eslint-disable @typescript-eslint/ban-ts-comment */
import { DeleteNoteSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { handleResponseError, handleSuccessfulResponse } from '@/common';

import { NoteEntity } from './common';

export async function deleteNote(event: APIGatewayProxyEventV2WithIAMAuthorizer) {
  try {
    const pathParams = DeleteNoteSchema.safeParse(event?.pathParameters);

    if (!pathParams.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: JSON.stringify(pathParams.error),
      };
    }
    // @ts-ignore
    const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId as string;
    await NoteEntity.delete({ userId, ...pathParams.data });

    return handleSuccessfulResponse({ body: { status: true } });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
