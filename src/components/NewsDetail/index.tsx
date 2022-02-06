// libraries
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
// components
import CardMini from 'components/shared/CardMini';
import MeetupImage from 'components/shared/MeetupImage';
import Button, { ButtonType } from 'components/shared/Button';
import NoData from 'components/shared/NoData';
// constants
import { EDIT_NEWS_PAGE } from 'constants/routes';
import { userRole } from 'constants/userRole';
// store
import { useAppSelector } from 'hooks/redux';
// static
import defaultImage from 'assets/images/meetup-image.jpg';
// types
import { ParamsType } from 'types/generalTypes';
// styles
import styles from './NewsDetail.module.scss';

const NewsDetail: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { id } = useParams<ParamsType>();
  const { news } = useAppSelector(state => state.newsReducer);
  const [newsItem] = news.filter(item => item.id === id);
  const { user } = useAppSelector(state => state.userReducer);
  const isChief = user?.roles === userRole.CHIEF;

  if (!newsItem) {
    return <NoData categoryName="NEWS" />;
  }

  return (
    <>
      <h1 className={styles.heading}>{t('page-headings.news-detail')}</h1>
      <CardMini extraClass='subject'>
        <MeetupImage
          image={newsItem.image || defaultImage}
          alt={newsItem.title}
          className={styles.image}
        />
        <p className={styles.title}>{newsItem.title}</p>
        {newsItem.text?.split('.').filter(Boolean).map(item => (
          <p className={styles.text} key={item}>{item}.</p>
        ))}
      </CardMini>

      <CardMini extraClass='newsButtons'>
        <Button
          variant={ButtonType.dark}
          onClick={() => history.goBack()}
        >
          {t('buttons.back')}
        </Button>

        {isChief && (
          <Button
            variant={ButtonType.secondary}
            onClick={() => history.push(`${EDIT_NEWS_PAGE.path}/${id}`)}
          >
            {t('buttons.edit')}
          </Button>
        )}
      </CardMini>
    </>
  );
};

export default NewsDetail;
