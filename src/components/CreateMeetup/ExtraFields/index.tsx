// libraries
import React, { FC } from 'react';
import { FormikProps } from 'formik';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import DropZone from 'components/CreateMeetup/DropZone';
import TextFieldItem from 'components/shared/TextFieldItem';
import DatePickerItem from 'components/shared/DatePickerItem';
import EditFormImage from 'components/shared/EditFormImage';
// types
import { FormValuesType } from 'types/meetupsTypes';
// styles
import styles from './ExtraFields.module.scss';

type ExtraFieldsProps = {
  formik: FormikProps<FormValuesType>
  isEditForm?: boolean
};

const ExtraFields: FC<ExtraFieldsProps> = ({ formik, isEditForm }) => {
  const { t } = useTranslation();

  return (
    <>
      {isEditForm && <EditFormImage formik={formik} />}

      <div className={classnames(styles.calendars, { [styles.calendarsPosition]: isEditForm })}>
        <div className={styles.datePickerControl}>
          <DatePickerItem
            name="start"
            label={t('meetups-form.labels.start')}
            formik={formik}
          />
        </div>

        <div className={styles.datePickerControl}>
          <DatePickerItem
            name="finish"
            label={t('meetups-form.labels.finish')}
            formik={formik}
          />
        </div>
      </div>

      <div className={classnames({ [styles.place]: isEditForm })}>
        <TextFieldItem
          name="place"
          label={t('meetups-form.labels.place')}
          formik={formik}
        />
      </div>

      {!isEditForm && <DropZone setFieldValue={formik.setFieldValue} />}
    </>
  );
};

export default ExtraFields;
