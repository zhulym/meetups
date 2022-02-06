/* eslint-disable react/button-has-type */
// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// styles
import styles from './Button.module.scss';

type ButtonProps = {
  disabled?: boolean;
  variant: ButtonType
  extraClass?: string
  type?: 'submit' | 'reset' | 'button';
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  test?: string
};

export enum ButtonType {
  dark = 'dark',
  primary = 'primary',
  secondary = 'secondary',
}

const Button: FC<ButtonProps> = ({ children, variant, type = "button", onClick, disabled, extraClass, test }) => (
  <button
    data-testid={test}
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classnames(styles.button, styles[variant], extraClass)}
  >
    {children}
  </button >
);

export default Button;
