// libraries
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// components
import CreateNews from 'components/CreateNews';
import Loader from 'components/shared/Loader';
// api
import { getNewsItem } from 'api/NewsService';
// types
import { NewsType } from 'types/newsTypes';
import { ParamsType } from 'types/generalTypes';

const EditNews: FC = () => {
  const [news, setNews] = useState<NewsType | null>();
  const { id } = useParams<ParamsType>();

  const fetchNews = useCallback(async () => {
    const data = await getNewsItem(id);
    setNews(data);
  }, [id]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (!news) {
    return <Loader />;
  }

  return (
    <>
      <CreateNews news={news} isEditForm id={id} />
    </>
  );
};

export default EditNews;
