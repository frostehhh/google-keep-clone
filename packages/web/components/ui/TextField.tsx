'use client';

import { useObjectRef } from '@react-aria/utils';
import React from 'react';
import type { AriaTextFieldProps } from 'react-aria';
import { useTextField } from 'react-aria';

const TextField: React.FunctionComponent<AriaTextFieldProps> = React.forwardRef<HTMLInputElement, AriaTextFieldProps>((props, forwardedRef) => {
  const { label } = props;
  const ref = useObjectRef(forwardedRef);
  const { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 200 }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {props.errorMessage && (
        <div {...errorMessageProps} style={{ color: 'red', fontSize: 12 }}>
          {props.errorMessage}
        </div>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';
export default TextField;