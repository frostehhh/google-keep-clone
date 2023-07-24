'use client';

import { Button, TextArea } from '@/components';

const NotesSection: React.FunctionComponent<React.PropsWithChildren> = () => {
  return (
    <>
      <TextArea />
      <Button>Create Note</Button>
    </>
  );
};

export default NotesSection;