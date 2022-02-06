// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// styles
import styles from './Loader.module.scss';

const Loader: FC = () => (
  <div className={styles.container}>
    <div className={styles.loaderItem}>
      <div className={classnames(styles.circle, styles.circle1)} />
      <div className={classnames(styles.circle, styles.circle2)} />
      <div className={classnames(styles.circle, styles.circle3)} />
    </div>
  </div>
);
export default Loader;
