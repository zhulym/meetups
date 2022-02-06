// libraries
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
// types
import { NewsType } from 'types/newsTypes';
// constants
import { NEWS_DETAIL_PAGE } from 'constants/routes';
import { userRole } from 'constants/userRole';
// helpers
import { getNewsDate } from 'helpers/dates';
// api
import { deleteNews, getNews } from 'api/NewsService';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// static
import defaultImage from 'assets/images/meetup-image.jpg';
import { ReactComponent as Delete } from 'assets/images/icons/delete.svg';
// styles
import styles from './NewsCard.module.scss';

const NewsCard: FC<NewsType> = ({ id, publicationDate, title, text, image }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userReducer);
  const isChief = user?.roles === userRole.CHIEF;

  const handleDeleteClick = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    deleteNews(id);
    dispatch(getNews());
  };

  return (
    <div className={styles.container} data-cy="news-item">
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image || defaultImage} alt="news-item" />
      </div>

      <div className={styles.content}>
        <div className={styles.topCardWrap}>
          <p className={styles.date}>{getNewsDate(publicationDate)}</p>
          {isChief && <Delete className={classnames(styles.delete, styles.cardIcon)} onClick={handleDeleteClick} />}
        </div>
        <p>
          <Link to={`${NEWS_DETAIL_PAGE.path}/${id}`} className={styles.title}>
            {title}
          </Link>
        </p>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default NewsCard;
