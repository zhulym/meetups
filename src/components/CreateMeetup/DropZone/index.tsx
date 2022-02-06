// libraries
import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactComponent as DropIcon } from 'assets/images/icons/drop.svg';
import { ReactComponent as DownloadedIcon } from 'assets/images/icons/downloaded-file.svg';
import classnames from 'classnames';
import { getBase64 } from 'helpers/imageToBase64';
import { useTranslation } from 'react-i18next';
// styles
import styles from './DropZone.module.scss';

type DropZoneProps = {
  setFieldValue: Function
  extraClass?: string
};

const DropZone: FC<DropZoneProps> = ({ setFieldValue, extraClass }) => {
  const [file, setFile] = useState<File | null>();
  const { t } = useTranslation();

  const onDrop = useCallback(async (acceptedFiles) => {
    setFile(acceptedFiles[0]);
    const image64 = await getBase64(acceptedFiles[0]);
    setFieldValue('image', image64);
  }, [setFieldValue]);

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    multiple: false,
    accept: 'image/jpg,image/jpeg,image/png',
    maxSize: 10_485_760
  });

  const deleteFile = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setFile(null);
    setFieldValue('image', '');
  };

  return (
    <div className={classnames(
      styles.container,
      extraClass, {
      [styles.accept]: isDragAccept,
      [styles.reject]: isDragReject,
    })}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {file ? (
        <div className={styles.wrapper}>
          <DownloadedIcon />
          <div className={styles.descriptionWrapper}>
            <p>{file.name}</p>
            <p className={styles.description}>{t('dropzone.size')} {(file.size / (1024 * 1024)).toFixed(2)} {t('dropzone.mb')}</p>
          </div>
          <button type="button" className={styles.deleteFile} onClick={deleteFile}>X</button>
        </div>
      ) : (
        <>
          <DropIcon />
          <p>{t('dropzone.drop')} <span className={styles.download}>{t('dropzone.download')}</span></p>
          <p className={styles.description}>{t('dropzone.formats')}</p>
          <p className={styles.description}>{t('dropzone.max-size')}</p>
        </>
      )}
    </div >
  );
};

export default DropZone;
