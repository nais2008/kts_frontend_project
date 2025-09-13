import React from 'react';

import styles from "./Button.module.scss"

export type ButtonProps = {
  children: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button className={ `${styles.btn} ${className}` } { ...props }>
      {children}
    </button>
  )
};

export default Button;
