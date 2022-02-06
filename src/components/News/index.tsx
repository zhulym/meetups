// libraries
import React, { FC, useEffect } from 'react';
// components
import Loader from 'components/shared/Loader';
import InfoPageComponent from 'components/shared/InfoPageComponent';
import NoData from 'components/shared/NoData';
import NewsCard from 'components/News/NewsCard';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// api
import { getNews } from 'api/NewsService';

const News: FC = () => {

  const dispatch = useAppDispatch();
  const { news, isLoading } = useAppSelector(state => state.newsReducer);

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  if (!news.length) {
    return <NoData categoryName="NEWS" />;
  }

  return (
    <>
      <InfoPageComponent />
      {news.map(item => (
        <NewsCard
          key={item.id}
          {...item}
        />
      ))}
    </>
  );
};

export default News;
