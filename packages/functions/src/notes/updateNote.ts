/* eslint-disable @typescript-eslint/ban-ts-comment */
import { UpdateNoteBodySchema, UpdateNoteParamsSchema } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { StatusCodes } from 'http-status-codes';

import { handleResponseError, handleSuccessfulResponse } from '@/common';

import { NoteEntity } from './common';

export async function updateNote(event: APIGatewayProxyEventV2WithIAMAuthorizer) {
  try {
    const requestBody = event?.body ? UpdateNoteBodySchema.safeParse(JSON.parse(event.body)) : undefined;
    const pathParams = UpdateNoteParamsSchema.safeParse(event?.pathParameters);

    if (!pathParams.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: JSON.stringify(pathParams.error),
      };
    }
    if (!requestBody?.success) {
      return {
        status: StatusCodes.BAD_REQUEST,
        error: 'Invalid update note request. Must contain request body',
      };
    }

    // @ts-ignore
    const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId as string;

    await NoteEntity.update({ userId, ...requestBody.data });

    return handleSuccessfulResponse({ body: { status: true } });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
