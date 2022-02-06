// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Button, { ButtonType } from 'components/shared/Button';
// styles
import styles from './FormNewsButtons.module.scss';

type FormNewsButtonsProps = {
  isEditForm?: boolean
};

const FormNewsButtons: FC<FormNewsButtonsProps> = ({ isEditForm }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={classnames(styles.container, styles.buttonWrapper)}>
      <Button
        variant={ButtonType.dark}
        onClick={() => history.goBack()}
        test="news-form-back-btn"
      >
        {isEditForm ? t('buttons.cancel') : t('buttons.back')}
      </Button>

      <button
        className={styles.submit}
        type="submit"
        data-testid="news-form-btn"
      >
        {isEditForm ? t('buttons.save') : t('buttons.create')}
      </button>
    </div>
  );
};

export default FormNewsButtons;
