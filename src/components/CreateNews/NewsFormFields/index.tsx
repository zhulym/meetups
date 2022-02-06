// libraries
import React, { FC } from 'react';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
// components
import DropZone from 'components/CreateMeetup/DropZone';
import TextFieldItem from 'components/shared/TextFieldItem';
import EditFormImage from 'components/shared/EditFormImage';
// types
import { FormikTypes } from 'types/generalTypes';
// styles
import styles from './NewsFormFields.module.scss';

type NewsFormFieldsProps = {
  formik: FormikProps<FormikTypes>
  isEditForm?: boolean
};

const NewsFormFields: FC<NewsFormFieldsProps> = ({ formik, isEditForm }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      {isEditForm && <EditFormImage formik={formik} />}

      <TextFieldItem
        name="title"
        formik={formik}
        label={t('news.labels.title')}
      />

      <TextFieldItem
        rows={7}
        multiline
        name="text"
        formik={formik}
        label={t('news.labels.text')}
      />
      {!isEditForm && (
        <>
          <span className={styles.imageLabel}>{t('news.labels.image')}</span>
          <DropZone setFieldValue={formik.setFieldValue} extraClass={styles.dropZone} />
        </>
      )}

    </div>
  );
};

export default NewsFormFields;
