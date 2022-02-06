// libraries
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik, FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
// components
import FormNewsButtons from 'components/CreateNews/FormNewsButtons';
import NewsFormFields from 'components/CreateNews/NewsFormFields';
// constants
import { NEWS_PAGE } from 'constants/routes';
import { newsValidationSchema as validationSchema } from 'constants/schemas';
// api
import { createNews, updateNews } from 'api/NewsService';
// types
import { FormNewsValuesType, NewsType } from 'types/newsTypes';
import { FormikTypes } from 'types/generalTypes';
// styles
import styles from './CreateNews.module.scss';

export type CreateNewsProps = {
  news?: NewsType
  isEditForm?: boolean
  id: string
};

const CreateNews: FC<CreateNewsProps> = ({ news, isEditForm, id }) => {
  const history = useHistory();
  const { t } = useTranslation();

  const handleSubmit = async (values: FormNewsValuesType) => {
    const request = news ? updateNews : createNews;
    request(values, id);
    history.push(NEWS_PAGE.path);
  };

  const formik: FormikProps<FormikTypes> = useFormik<FormikTypes>({
    initialValues: {
      title: news?.title || '',
      text: news?.text || '',
      image: news?.image || ''
    },
    validationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <>
      <h1 className={styles.heading}>
        {news ? t('page-headings.editing-news') : t('page-headings.create-news')}
      </h1>
      <form onSubmit={formik.handleSubmit} data-cy="creating-news-form">
        <NewsFormFields formik={formik} isEditForm={isEditForm} />
        <FormNewsButtons isEditForm={isEditForm} />
      </form>
    </>
  );
};

export default CreateNews;
