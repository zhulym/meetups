// libraries
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
// styles
import styles from './LocaleButtons.module.scss';

const LocaleButtons: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className={styles.container} data-testid="locale-btn-container">
      <button
        type="button"
        className={classnames(styles.langBtn, { [styles.activeLang]: i18n.language === 'en' })}
        onClick={() => changeLanguage('en')}
        data-testid="locale-btn-en"
      >
        En
      </button>
      |
      <button
        type="button"
        className={classnames(styles.langBtn, { [styles.activeLang]: i18n.language === 'ru' })}
        onClick={() => changeLanguage('ru')}
      >
        Ru
      </button>
    </div>
  );
};

export default LocaleButtons;
