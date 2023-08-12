import { useState } from 'react';

import { TextArea } from '@/components';

import { useFocusWithinCreateNote } from './CreateNotebox.utils';

const CreateNoteBox = () => {
  const [content, setContent] = useState<string>();
  const { focusWithinProps } = useFocusWithinCreateNote({ content });

  return (
    <div {...focusWithinProps} className="w-96 h-50 shadow-lg shadow-indigo-500/40">
      <TextArea value={content} onChange={(value) => setContent(value)} classes={{ root: 'px-4 py-3 box-content h-5	text-sm', textarea: 'h-full w-full outline-none' }} placeholder="Take a note..." aria-label='Take a note...' />
    </div>
  );
};
export default CreateNoteBox;
