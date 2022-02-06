// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// components
import { ReactComponent as CompletedIcon } from 'assets/images/icons/completed-step.svg';
// styles
import styles from './StepItem.module.scss';

type StepItemProps = {
  isActive: boolean
  isCompleted: boolean
  text: string
  num: number
};

const StepItem: FC<StepItemProps> = ({ isActive, isCompleted, text, num }) => (
  <div className={classnames(styles.step, {
    [styles.activeStep]: isActive,
    [styles.disabledStep]: !isActive,
  })}>
    <span
      data-cy="step-num"
      className={classnames(styles.number, {
        [styles.activeNum]: isActive,
        [styles.disabledNum]: !isActive
      })}
    >
      {isCompleted && !isActive ? <CompletedIcon /> : num}
    </span>
    <span className={styles.stepsText}>{text}</span>
  </div >
);

export default StepItem;
