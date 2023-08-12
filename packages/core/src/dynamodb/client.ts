
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient as SDKDynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = {
  // Specify your client options as usual
  convertEmptyValues: false,
};

const translateConfig = { marshallOptions };

// TODO: Set region via environment variable
export const DynamoDBDocumentClient = SDKDynamoDBDocumentClient.from(new DynamoDBClient({ region: 'us-east-1', credentials: { accessKeyId: 'AKIA3ZCNRTOBJC45RULQ', secretAccessKey: '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' } }), translateConfig);

