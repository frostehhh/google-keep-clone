import { Entity, Table } from 'dynamodb-toolbox';

import { TableInfo } from '../classes';
import { DynamoDBDocumentClient } from '../client';

const NotesTableInfo = new TableInfo({
  tableName: 'Notes',
  attributes: {
    noteId: { partitionKey: true, type: 'string' },
    userId: { sortKey: true, type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
  },
} as const);


const NotesTable = new Table({
  name: NotesTableInfo.tableName,
  partitionKey: 'noteId',
  sortKey: 'userId',
  DocumentClient: DynamoDBDocumentClient,
});

const NoteEntity = new Entity({
  name: NotesTableInfo.tableName,
  attributes: NotesTableInfo.attributes,
  table: NotesTable,
} as const);


export const NotesInfo = {
  Instance: NotesTable,
  Entity: {
    Note: NoteEntity,
  },
  ...NotesTableInfo,
} as const;

