// libraries
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
// components
import StepItem from 'components/CreateMeetup/StepItem';
// constants
import { STEP_FIELDS } from 'constants/formSteps';
// styles
import styles from './Steps.module.scss';

interface StepsProps {
  step: number
};

const Steps: FC<StepsProps> = ({ step }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.steps}>
      {STEP_FIELDS.map((item, i) => (
        <StepItem
          key={item.text}
          num={i + 1}
          text={t(`meetups-form.steps.${item.text}`)}
          isActive={i + 1 === step}
          isCompleted={i < step} />
      ))}
    </div>
  );
};

export default Steps;
