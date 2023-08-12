import '../../polyfills/crypto';

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
}
type GenerateEntityProps<TableInstance extends Table<string, A.Key, A.Key | null> = Table<string, A.Key, A.Key | null>> = {
  table: TableInstance;
}

export const instanceGenerators = {
  generateTable: ({ tableName }: GenerateTableProps) => {
    return initializeTable({
      tableName,
      partitionKey: 'noteId',
      sortKey: 'userId',
    });
  },
  entityGenerators: {
    Note: ({ table }: GenerateEntityProps) => {
      return new Entity({
        name: 'Note',
        table,
        attributes: {
          noteId: { partitionKey: true, type: 'string', default: () => crypto.randomUUID() },
          userId: { sortKey: true, type: 'string' },
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