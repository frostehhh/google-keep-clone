'use client';

import clsx from 'clsx';
import React from 'react';
import { type AriaTextFieldProps, useTextField } from 'react-aria';

import { type CSSClasses } from '@/types';
interface TextAreaProps extends AriaTextFieldProps {
  className?: string;
  classes?: CSSClasses<'root' | 'textarea'>
}

const TextArea: React.FunctionComponent<TextAreaProps> = ({ className, classes, ...textFieldProps }) => {
  const { label } = textFieldProps;
  const ref = React.useRef(null);
  const { labelProps, inputProps } = useTextField({ ...textFieldProps, inputElementType: 'textarea' }, ref);

  return (
    <div className={clsx('border-solid border-2', className, classes?.root)}>
      <label {...labelProps}>{label}</label>
      <textarea {...inputProps} className={clsx('resize-none', classes?.textarea)} ref={ref} />
    </div>
  );
};

export default TextArea;