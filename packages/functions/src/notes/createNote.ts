import { baseApiGatewayHandler, DynamoDBInfo } from '@google-keep-clone/core';
import type { APIGatewayProxyEventV2, Handler } from 'aws-lambda';
import { type EntityItem } from 'dynamodb-toolbox';
import { Table } from 'sst/node/table'; ;

const { generateTable, entityGenerators } = DynamoDBInfo.Notes.instanceGenerators;
const { Note: generateNote } = entityGenerators;
const NotesTable = generateTable({ tableName: Table[DynamoDBInfo.Notes.tableName].tableName });
const NoteEntity = generateNote({ table: NotesTable });
type NoteEntityType = EntityItem<typeof NoteEntity>

export const createNote: Handler = async (event: APIGatewayProxyEventV2) => {
  console.log('createNote', event);
  const response: unknown = event?.body ? JSON.parse(event.body) : {};
  const newNote = (response as NoteEntityType);

  let result;
  try {
    result = await NoteEntity.put({
      userId: '123',
      title: newNote.title,
      content: newNote.content,
    });
  } catch (e) {
    console.log('error', e);
  }

  return result;
};

export default baseApiGatewayHandler(createNote);