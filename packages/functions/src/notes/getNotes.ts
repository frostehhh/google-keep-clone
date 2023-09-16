/* eslint-disable @typescript-eslint/ban-ts-comment */
import { type APIGatewayProxyEventV2WithIAMAuthorizer } from 'aws-lambda';
import { handleResponseError, handleSuccessfulResponse } from 'src/common';

import { NoteEntity } from './common';

export async function getNotes(event: APIGatewayProxyEventV2WithIAMAuthorizer) {
  try {
    // @ts-ignore
    const user = event.requestContext.authorizer.iam.cognitoIdentity.identityId as string;
    console.log('user', user);
    const result = await NoteEntity.query('123');

    if (!result.Items) {
      throw new Error('Items not found.');
    }

    return handleSuccessfulResponse({ body: result.Items });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
