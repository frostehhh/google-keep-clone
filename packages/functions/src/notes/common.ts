import { DynamoDBInfo } from '@google-keep-clone/core';
import { Table } from 'sst/node/table';

import { dynamoDbClient } from '@/common';

const { generateTable, entityGenerators } = DynamoDBInfo.Notes.instanceGenerators;
const { Note: generateNote } = entityGenerators;
const NotesTable = generateTable({ tableName: Table[DynamoDBInfo.Notes.tableName].tableName, dynamoDbClient: dynamoDbClient });
export const NoteEntity = generateNote({ table: NotesTable });