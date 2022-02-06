// libraries
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Button, { ButtonType } from '../Button';
// styles
import styles from './ErrorPage.module.scss';

type ErrorPageProps = {
  text: string
  error: string
  description: string
};

const ErrorPage: FC<ErrorPageProps> = ({ text, error, description }) => {
  const history = useHistory();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h2>{text}</h2>
      <h1 className={styles.error}>{error}</h1>
      <p>{description}</p>
      {error === '404' && (
        <Button
          extraClass={styles.backButton}
          variant={ButtonType.dark}
          onClick={() => history.goBack()}
        >
          {t('buttons.back')}
        </Button>
      )}
    </div>
  );
};

export default ErrorPage;
