// libraries
import React, { FC } from 'react';
import { FormikProps } from 'formik';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import TextFieldItem from 'components/shared/TextFieldItem';
// types
import { FormValuesType } from 'types/meetupsTypes';
// styles
import styles from './ObligatoryFields.module.scss';

type ObligatoryFieldsProps = {
  formik: FormikProps<FormValuesType>
  isEditForm?: boolean
};

const ObligatoryFields: FC<ObligatoryFieldsProps> = ({ formik, isEditForm }) => {
  const { t } = useTranslation();

  return (
    <>
      <TextFieldItem
        name="subject"
        formik={formik}
        label={t('meetups-form.labels.subject')}
      />

      <div className={classnames({ [styles.speaker]: isEditForm })}>
        <TextFieldItem
          name="speaker"
          formik={formik}
          label={t('meetups-form.labels.speaker')}
        />
      </div>

      <div className={classnames({ [styles.excerpt]: isEditForm })}>
        <TextFieldItem
          rows={4}
          multiline
          name="excerpt"
          formik={formik}
          label={t('meetups-form.labels.description')}
        />
      </div>
    </>
  );
};

export default ObligatoryFields;
