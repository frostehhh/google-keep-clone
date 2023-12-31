
import { DynamoDBClient, type DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient as SDKDynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const marshallOptions = {
  // Specify your client options as usual
  convertEmptyValues: false,
};

const translateConfig = { marshallOptions };

export const initDynamoDbClient = (props: DynamoDBClientConfig) => SDKDynamoDBDocumentClient.from(new DynamoDBClient({
  ...props,
}), translateConfig);
