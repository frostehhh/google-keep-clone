import { EnvSchema, initDynamoDbClient } from '@google-keep-clone/core';

const env = EnvSchema.parse(process.env);
export const dynamoDbClient = initDynamoDbClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: env.AWS_CUSTOM_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_CUSTOM_SECRET_ACCESS_KEY,
  },
});
