import { Table } from 'dynamodb-toolbox';
import { type A } from 'ts-toolbelt';

import { DynamoDBDocumentClient } from '../client';

export interface InitializeTableProps {
  tableName: string;
  partitionKey: A.Key;
  sortKey: A.Key | null;
}
export const initializeTable = ({ tableName, partitionKey, sortKey }: InitializeTableProps) => {
  return new Table({
    name: tableName,
    partitionKey,
    sortKey,
    DocumentClient: DynamoDBDocumentClient,
  });
};