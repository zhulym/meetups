// libraries
import React, { FC, useState } from 'react';
import { FormikProps } from 'formik';
import { useTranslation } from 'react-i18next';
// types
import { FormikTypes } from 'types/generalTypes';
// components
import DropZone from 'components/CreateMeetup/DropZone';
// static
import { ReactComponent as EditImageIcon } from 'assets/images/icons/edit-image.svg';
import editDefaultImage from 'assets/images/edit-meetup-image.jpg';
import MeetupImage from '../MeetupImage';
// styles
import styles from './EditFormImage.module.scss';

type EditFormImageProps = {
  formik: FormikProps<FormikTypes>
};

const EditFormImage: FC<EditFormImageProps> = ({ formik }) => {
  const { t } = useTranslation();
  const { image } = formik.values;
  const [needUpdateImage, setNeedUpdateImage] = useState<boolean>(false);

  return (
    <div className={styles.imageContainer}>
      <span className={styles.imageLabel}>{t('meetups-form.labels.image')}</span>
      {needUpdateImage ? (
        <DropZone setFieldValue={formik.setFieldValue} />
      ) : (
        <MeetupImage
          className={styles.imageItem}
          image={image || editDefaultImage}
          alt="meetup-image"
        />
      )}
      {!needUpdateImage && <EditImageIcon className={styles.editImage} onClick={() => setNeedUpdateImage(true)} />}
    </div>
  );
};

export default EditFormImage;
