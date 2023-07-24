import { useRef } from 'react';
import { type AriaButtonProps, useButton } from 'react-aria';

const Button: React.FunctionComponent<AriaButtonProps> = (props) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(props, ref);
  const { children } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
};

export default Button;