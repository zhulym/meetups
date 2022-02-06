import React, { FC } from 'react';
// styles
import 'react-toastify/dist/ReactToastify.css';
import styles from './CustomToast.module.scss';

type CustomToastProps = {
  icon: string
  heading: string
  message: string
};

const CustomToast: FC<CustomToastProps> = ({ icon, heading, message }) => (
  <div className={styles.container}>
    <div className={styles.icon}>
      <img src={icon} alt="icon" />
    </div>
    <div>
      <h3 className={styles.heading}>{heading}</h3>
      <p className={styles.text}>{message}</p>
    </div>
  </div>
);

export default CustomToast;
