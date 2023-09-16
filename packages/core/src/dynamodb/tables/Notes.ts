import '../../polyfills/crypto';

import { type DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import crypto from 'crypto';
import { Entity, type Table } from 'dynamodb-toolbox';
import type { A } from 'ts-toolbelt';

import { TableInfo } from '../classes';
import { initializeTable, type InitializeTableProps } from './initializer';

const NotesTableInfo = new TableInfo({
  tableName: 'Notes',
  apiName: 'notesApi',
} as const);

type GenerateTableProps = {
  tableName: InitializeTableProps['tableName'];
  dynamoDbClient: DynamoDBDocumentClient;
}
type GenerateEntityProps<TableInstance extends Table<string, A.Key, A.Key | null> = Table<string, A.Key, A.Key | null>> = {
  table: TableInstance;
}

export const instanceGenerators = {
  generateTable: ({ tableName, dynamoDbClient }: GenerateTableProps) => {
    return initializeTable({
      tableName,
      partitionKey: 'userId',
      sortKey: 'noteId',
      dynamoDbClient,
    });
  },
  entityGenerators: {
    Note: ({ table }: GenerateEntityProps) => {
      return new Entity({
        name: 'Note',
        table,
        attributes: {
          noteId: { sortKey: true, type: 'string', default: () => crypto.randomUUID() },
          userId: { partitionKey: true, type: 'string' },
          title: { type: 'string' },
          content: { type: 'string' },
        },
        createdAlias: 'createdAt',
        modifiedAlias: 'modifiedAt',
      });
    },
  },
} as const;

export const NotesInfo = {
  instanceGenerators,
  ...NotesTableInfo,
};