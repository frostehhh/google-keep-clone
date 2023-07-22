import { DynamoDBInfo } from '@google-keep-clone/core';
import { type StackContext, Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
  const noteEntity = DynamoDBInfo.Notes.Entity.Note;
  const partitionKey = noteEntity.partitionKey.toString() as keyof typeof noteEntity.attributes;
  const sortKey = noteEntity.sortKey?.toString() as keyof typeof noteEntity.attributes;

  const notesTable = new Table(stack, DynamoDBInfo.Notes.tableName, {
    fields: {
      [partitionKey]: noteEntity.attributes[partitionKey].type,
      [sortKey]: noteEntity.attributes[sortKey].type,
    },
    primaryIndex: { partitionKey, sortKey },
  });

  return {
    notesTable,
  };
}
