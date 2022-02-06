// libraries
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// static
import { ReactComponent as Delete } from 'assets/images/icons/delete.svg';
import { ReactComponent as IconSupport } from 'assets/images/icons/support.svg';
// components
import User from 'components/User';
// api
import { deleteMeetup, getMeetups } from 'api/MeetupService';
// constants
import { TOPIC_DETAIL_PAGE } from 'constants/routes';
import { userRole } from 'constants/userRole';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// types
import { MeetupsType } from 'types/meetupsTypes';
// styles
import styles from './TopicCard.module.scss';

const TopicCard: FC<MeetupsType> = ({ id, author, subject, excerpt, goCount }) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { voted } = useAppSelector(state => state.votedReducer);
  const { user } = useAppSelector(state => state.userReducer);
  const isChief = user?.roles === userRole.CHIEF;

  const handleDeleteClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    deleteMeetup(id);
    dispatch(getMeetups());
  };

  return (
    <Link to={`${TOPIC_DETAIL_PAGE.path}/${id}`} className={styles.container} data-cy="topic-page-link">
      <div className={styles.top}>
        <User author={author} />
        {isChief && (
          <>
            <Delete className={classnames(styles.delete, styles.cardIcon)} onClick={handleDeleteClick} />
          </>
        )}
      </div>

      <div className={styles.content}>
        <h2 className={styles.subject} data-cy="topic-page-subject">{subject}</h2>
        {excerpt && (
          <p className={styles.excerpt}>{excerpt}</p>
        )}
      </div>
      <div className={styles.support}>
        <IconSupport />
        <span className={styles.supportText}>{goCount || voted.length} {t('topics.support')}</span>
      </div>
    </Link>
  );
};

export default TopicCard;
