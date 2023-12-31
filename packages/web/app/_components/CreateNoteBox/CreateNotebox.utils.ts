import { type CreateNoteBodyType } from '@google-keep-clone/core';
import { useState } from 'react';
import { type FocusWithinProps, useFocusWithin } from 'react-aria';

import { useCreateNote } from '@/api/Notes/hooks';

interface UseFocusWithinCreateNoteProps {
  values: CreateNoteBodyType;
  isFormTouched: boolean;
  resetForm: () => void;
}

export const useFocusWithinCreateNote = ({ values, isFormTouched, resetForm }: UseFocusWithinCreateNoteProps) => {
  const { content, title } = values;

  const createNoteMutation = useCreateNote();
  const [focused, setFocused] = useState(false);
  const onFocusWithin: FocusWithinProps['onFocusWithin'] = (e) => {
    setFocused(true);
  };

  const onBlurWithin: FocusWithinProps['onBlurWithin'] = (e) => {
    if (isFormTouched) {
      void createNoteMutation.mutate({ content, title });
    }
    setFocused(false);
    resetForm();
  };

  const { focusWithinProps } = useFocusWithin({ onFocusWithin, onBlurWithin });

  return { focused, focusWithinProps };
};