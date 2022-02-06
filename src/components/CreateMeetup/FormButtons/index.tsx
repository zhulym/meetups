// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Button, { ButtonType } from 'components/shared/Button';
// styles
import styles from './FormButtons.module.scss';

type FormButtonsProps = {
  isNextDisabled: boolean
  handlePrevStep: () => void
  handleNextStep: () => void
  isLastStep: boolean
  meetupPreviewCallBack?: () => void
};

const FormButtons: FC<FormButtonsProps> = ({
  meetupPreviewCallBack,
  handlePrevStep,
  handleNextStep,
  isNextDisabled,
  isLastStep,
}) => {

  const history = useHistory();
  const { pathname } = useLocation();
  const isEditForm = pathname.includes('edit-meetup');
  const { t } = useTranslation();

  return (
    <div className={classnames(styles.container, styles.buttonWrapper)}>
      <Button
        variant={ButtonType.dark}
        extraClass={classnames({ [styles.extraDark]: isEditForm })}
        onClick={isEditForm ? () => history.goBack() : handlePrevStep}
      >
        {isEditForm ? t('buttons.cancel') : t('buttons.back')}
      </Button>
      {isEditForm && (
        <Button
          variant={ButtonType.secondary}
          type="button"
          extraClass={styles.extraSecondary}
          onClick={meetupPreviewCallBack}
        >
          {t('buttons.preview')}
        </Button>
      )}

      {isLastStep || isEditForm ? (
        <button
          className={classnames(styles.submit, { [styles.extraPrimary]: isEditForm })}
          type="submit"
          data-test-id="meetup-form-btn"
        >
          {isEditForm ? t('buttons.save') : t('buttons.create')}
        </button>
      ) : (
        <Button
          test="next-step-btn"
          variant={ButtonType.primary}
          disabled={isNextDisabled}
          onClick={handleNextStep}
        >
          {t('buttons.next')}
        </Button>
      )}
    </div>
  );
};

export default FormButtons;
