/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { APIGatewayProxyEventV2WithIAMAuthorizer, Handler } from 'aws-lambda';

import { handleResponseError, handleSuccessfulResponse } from '@/common';

import { NoteEntity } from './common';
import { type NoteEntityType } from './types';

export const createNote: Handler = async (event: APIGatewayProxyEventV2WithIAMAuthorizer) => {
  let body;

  try {
    const response: unknown = event?.body ? JSON.parse(event.body) : {};
    const newNote = (response as NoteEntityType);
    // @ts-ignore
    const userId = event.requestContext.authorizer.iam.cognitoIdentity.identityId as string;

    body = await NoteEntity.update({
      userId,
      title: newNote.title,
      content: newNote.content,
    }, {
      returnValues: 'ALL_NEW',
    });

    return handleSuccessfulResponse({
      body,
    });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
