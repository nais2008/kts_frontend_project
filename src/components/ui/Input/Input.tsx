import React from 'react';

import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  value: string;
  onChange: (value: string) => void;
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  className, value, onChange, afterSlot, ...props
}, ref) => {
  const handlerCheage = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.target.value)
    }, [onChange]
  )

  return (
    <div className={styles.testClass}>
      <input
        ref={ref}
        {...props}
        onChange={handlerCheage}
        value={value}
        className={`${styles.input} ${className}`}
        type='text'
      />
      {afterSlot && <div className={styles.input__afterSlot}>{afterSlot}</div>}
    </div>
  )
});

export default Input;
