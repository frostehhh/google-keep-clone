import { type DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { Table } from 'dynamodb-toolbox';
import { type A } from 'ts-toolbelt';

export interface InitializeTableProps {
  tableName: string;
  partitionKey: A.Key;
  sortKey: A.Key | null;
  dynamoDbClient: DynamoDBDocumentClient;
}
export const initializeTable = ({ tableName, partitionKey, sortKey, dynamoDbClient }: InitializeTableProps) => {
  return new Table({
    name: tableName,
    partitionKey,
    sortKey,
    DocumentClient: dynamoDbClient,
  });
};