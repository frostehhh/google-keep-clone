import { type APIGatewayProxyEventV2 } from 'aws-lambda';
import { handleResponseError, handleSuccessfulResponse } from 'src/common';

import { NoteEntity } from './common';

export async function getNotes(event: APIGatewayProxyEventV2) {
  try {
    const result = await NoteEntity.query('123');

    if (!result.Items) {
      throw new Error('Items not found.');
    }

    return handleSuccessfulResponse({ body: result.Items });
  } catch (e: unknown) {
    return handleResponseError({ error: e });
  }
};
