'use client';

import React from 'react';
import { type AriaTextFieldProps, useTextField } from 'react-aria';

const TextArea: React.FunctionComponent<AriaTextFieldProps> = (props) => {
  const { label } = props;
  const ref = React.useRef(null);
  const { labelProps, inputProps } = useTextField({ ...props, inputElementType: 'textarea' }, ref);

  return (
    <div className="border-solid border-2">
      <label {...labelProps}>{label}</label>
      <textarea {...inputProps} className="resize-none" ref={ref} />
    </div>
  );
};

export default TextArea;