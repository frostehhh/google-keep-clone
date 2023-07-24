'use client';

import { Button } from '@/components';

import { CreateNoteBox } from './CreateNoteBox';

const NotesSection: React.FunctionComponent<React.PropsWithChildren> = () => {
  return (
    <>
      <CreateNoteBox />
      <Button>Create Note</Button>
    </>
  );
};

export default NotesSection;