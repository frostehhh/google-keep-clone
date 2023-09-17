import { type UpdateNoteBodyType } from '@google-keep-clone/core';
import { useState } from 'react';
import { type FocusWithinProps, useFocusWithin } from 'react-aria';

import { createNote } from '@/api/Notes';

interface UseFocusWithinCreateNoteProps {
  values: UpdateNoteBodyType;
  isFormTouched: boolean;
  resetForm: () => void;
}

export const useFocusWithinCreateNote = ({ values, isFormTouched, resetForm }: UseFocusWithinCreateNoteProps) => {
  const { content, title } = values;

  const [focused, setFocused] = useState(false);
  const onFocusWithin: FocusWithinProps['onFocusWithin'] = (e) => {
    setFocused(true);
  };

  const onBlurWithin: FocusWithinProps['onBlurWithin'] = (e) => {
    if (isFormTouched) {
      void createNote({ note: { content, title } });
    }
    setFocused(false);
    resetForm();
  };

  const { focusWithinProps } = useFocusWithin({ onFocusWithin, onBlurWithin });

  return { focused, focusWithinProps };
};