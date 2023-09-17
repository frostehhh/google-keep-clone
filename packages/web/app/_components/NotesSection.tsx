'use client';

import { CreateNoteBox } from './CreateNoteBox';
import { NotesList } from './NotesList';

const NotesSection: React.FunctionComponent<React.PropsWithChildren> = () => {
  return (
    <>
      <CreateNoteBox />
      <NotesList />
    </>
  );
};

export default NotesSection;