import { type StackContext,Table } from 'sst/constructs';

export function StorageStack({ stack }: StackContext) {
  const notesTable = new Table(stack, 'Notes', {
    fields: {
      userId: 'string',
      noteId: 'string',
    },
    primaryIndex: { partitionKey: 'userId', sortKey: 'noteId' },
  });

  return {
    notesTable,
  };
}
