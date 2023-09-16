import { baseApiGatewayHandler } from '@google-keep-clone/core';
import { type APIGatewayProxyEventV2 } from 'aws-lambda';

import { NoteEntity } from './common';

async function main(event: APIGatewayProxyEventV2) {
  const result = await NoteEntity.query({ userId: '123' });

  if (!result.Items) {
    throw new Error('Items not found.');
  }

  return result.Items;
};

export default baseApiGatewayHandler(main);