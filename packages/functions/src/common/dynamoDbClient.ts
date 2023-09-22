import { initDynamoDbClient } from '@google-keep-clone/core';
import { Config } from 'sst/node/config';

export const dynamoDbClient = initDynamoDbClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: Config.AWS_CUSTOM_ACCESS_KEY_ID,
    secretAccessKey: Config.AWS_CUSTOM_SECRET_ACCESS_KEY,
  },
});
