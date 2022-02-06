// libraries
import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
// styles
import styles from './CardMini.module.scss';

type CardMiniProps = {
  children: ReactNode
  subtitle?: string
  extraClass: string
};

const CardMini: FC<CardMiniProps> = ({ children, subtitle, extraClass }) => (
  <>
    {subtitle && (<h3 className={styles.subtitle}>{subtitle}</h3>)}
    <div className={classnames(styles.card, styles[extraClass])}>
      {children}
    </div>
  </>
);

export default CardMini;
