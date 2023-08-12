import { type NoteEntityType } from '@google-keep-clone/core';
import { useState } from 'react';
import { type FocusWithinProps, useFocusWithin } from 'react-aria';

import { createNote } from '@/api/Notes';

type UseFocusWithinCreateNoteProps = Pick<NoteEntityType, 'content' | 'title'>

export const useFocusWithinCreateNote = ({ content }: UseFocusWithinCreateNoteProps) => {
  const [focused, setFocused] = useState(false);

  const onFocusWithin: FocusWithinProps['onFocusWithin'] = (e) => {
    setFocused(true);
  };

  const onBlurWithin: FocusWithinProps['onBlurWithin'] = (e) => {
    setFocused(false);
    console.log('onBlurWithin', content);
    const result = createNote({ note: { content  } });
  };

  const { focusWithinProps } = useFocusWithin({ onFocusWithin, onBlurWithin });

  return { focusWithinProps };
};