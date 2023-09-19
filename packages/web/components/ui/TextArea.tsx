'use client';

import { useObjectRef } from '@react-aria/utils';
import clsx from 'clsx';
import React from 'react';
import { type AriaTextFieldProps, useTextField } from 'react-aria';

import { type CSSClasses } from '@/types';
interface TextAreaProps extends AriaTextFieldProps {
  className?: string;
  classes?: CSSClasses<'root' | 'textarea'>
}

const TextArea: React.FunctionComponent<TextAreaProps> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((props, forwardedRef) => {
  const { className, classes, ...textFieldProps } = props;
  const { label } = textFieldProps;
  const ref = useObjectRef(forwardedRef);
  const { labelProps, inputProps } = useTextField({ ...props, inputElementType: 'textarea' }, ref);

  return (
    <div className={clsx('border-solid border-2', className, classes?.root)}>
      <label {...labelProps}>{label}</label>
      <textarea {...inputProps} className={clsx('resize-none', classes?.textarea)} ref={ref} />
    </div>
  );
});

TextArea.displayName = 'TextArea';
export default TextArea;