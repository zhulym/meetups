// libraries
import React, { FC, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import User from 'components/User';
// constants
import { MEETUP_DETAIL_PAGE, EDIT_MEETUP_PAGE } from 'constants/routes';
import { userRole } from 'constants/userRole';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// api
import { deleteMeetup, getMeetups } from 'api/MeetupService';
// static
import { ReactComponent as Delete } from 'assets/images/icons/delete.svg';
import { ReactComponent as Edit } from 'assets/images/icons/edit.svg';
// types
import { MeetupsType } from 'types/meetupsTypes';
// helpers
import { getDate, getTime, getTimeDate } from 'helpers/dates';
// styles
import styles from './MeetupsCard.module.scss';

const MeetupsCard: FC<MeetupsType> = ({
  id,
  author,
  subject,
  excerpt,
  start,
  modified,
  place
}) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector(state => state.userReducer);
  const isChief = user?.roles === userRole.CHIEF;
  useEffect(() => { }, [i18n.language]);

  const handleDeleteClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    deleteMeetup(id);
    dispatch(getMeetups());
  };

  const handleEditClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    history.push(`${EDIT_MEETUP_PAGE.path}/${id}`);
  };

  return (
    <Link to={`${MEETUP_DETAIL_PAGE.path}/${id}`} className={styles.container} data-testid="card-container">
      <div className={styles.top}>
        <div className={styles.startDate} data-testid="date-place-container">
          {start ?
            (<span>{getDate(start)} &bull; {getTime(start)} &bull; {t('meetups.place')} {place}</span>) :
            (<span>&mdash;</span>)}
        </div>
        {isChief && (
          <div className={styles.buttonWrap}>
            <Delete className={classnames(styles.delete, styles.cardIcon)} onClick={handleDeleteClick} />
            <Edit className={classnames(styles.edit, styles.cardIcon)} onClick={handleEditClick} />
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h2 className={styles.subject} data-testid="card-subject">{subject}</h2>
        <p className={styles.excerpt} data-testid="card-excerpt">{excerpt}</p>
      </div>

      <div className={styles.wrapper}>
        <User author={author} />
        <div className={styles.modified}>
          {!modified ? (
            <span>&mdash;</span>
          ) : (
            <span>{getTimeDate(modified)}</span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MeetupsCard;
