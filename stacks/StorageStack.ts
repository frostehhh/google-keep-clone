import { DynamoDBInfo } from '@google-keep-clone/core';
import { type StackContext, Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
  const notesTable = new Table(stack, DynamoDBInfo.Notes.tableName, {
    fields: {
      noteId: 'string',
      userId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
  });

  return {
    notesTable,
  };
}
