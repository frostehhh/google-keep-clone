import { useState } from 'react';
import { type FocusWithinProps, useFocusWithin } from 'react-aria';

export const useFocusWithinCreateNote = () => {
  const [focused, setFocused] = useState(false);

  const onFocusWithin: FocusWithinProps['onFocusWithin'] = (e) => {
    setFocused(true);
  };

  const onBlurWithin: FocusWithinProps['onBlurWithin'] = (e) => {
    setFocused(false);
  };

  const { focusWithinProps } = useFocusWithin({ onFocusWithin, onBlurWithin });

  return { focusWithinProps };
};