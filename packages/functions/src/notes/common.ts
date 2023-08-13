import { DynamoDBInfo } from '@google-keep-clone/core';
import { dynamoDbClient } from 'src/common';
import { Table } from 'sst/node/table'; ;

const { generateTable, entityGenerators } = DynamoDBInfo.Notes.instanceGenerators;
const { Note: generateNote } = entityGenerators;
const NotesTable = generateTable({ tableName: Table[DynamoDBInfo.Notes.tableName].tableName, dynamoDbClient });
export const NoteEntity = generateNote({ table: NotesTable });