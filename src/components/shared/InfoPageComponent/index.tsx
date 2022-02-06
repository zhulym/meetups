// libraries
import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Button, { ButtonType } from 'components/shared/Button';
// constants
import { userRole } from 'constants/userRole';
import {
  CREATE_MEETUP_PAGE,
  TOPICS_PAGE,
  MODERATION_PAGE,
  FUTURE_PAGE,
  PAST_PAGE,
  CREATE_NEWS_PAGE
} from 'constants/routes';
// store
import { useAppSelector } from 'hooks/redux';
// styles
import styles from './InfoPageComponent.module.scss';

type MeetupsCardTopProps = {
  meetupsAmount?: number
};

const InfoPageComponent: FC<MeetupsCardTopProps> = ({ meetupsAmount }) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isMeetups = pathname.includes('meetup');
  const isNews = pathname.includes('news');
  const { user } = useAppSelector(state => state.userReducer);
  const isChief = user?.roles === userRole.CHIEF;

  return (
    <div className={styles.container}>
      {isMeetups && (
        <div className={styles.amount}>
          <span className={styles.num}>{meetupsAmount}</span>
          {pathname === TOPICS_PAGE.path && t('topic_key', { count: meetupsAmount })}
          {pathname === MODERATION_PAGE.path && t('moderation_key', { count: meetupsAmount })}
          {pathname === FUTURE_PAGE.path && t('future_key', { count: meetupsAmount })}
          {pathname === PAST_PAGE.path && t('past_key', { count: meetupsAmount })}
        </div>
      )}

      {isNews && (
        <h1 className={styles.heading}>{t('page-headings.news')}</h1>
      )}

      {isChief && (
        <Link to={isMeetups ? CREATE_MEETUP_PAGE.path : CREATE_NEWS_PAGE.path} className={styles.createLink}>
          <Button variant={ButtonType.secondary} test="create-btn">+ {isMeetups ? t('buttons.create-meetup') : t('buttons.create-news')}</Button>
        </Link>
      )}
    </div>
  );
};

export default InfoPageComponent;
