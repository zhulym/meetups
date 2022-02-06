// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// styles
import styles from './MeetupImage.module.scss';

type ImageProps = {
  image: string
  alt: string
  className?: string
};

const MeetupImage: FC<ImageProps> = ({ image, alt, className }) => (
  <>
    <img src={image} alt={alt} className={classnames(styles.image, className)} />
  </>
);

export default MeetupImage;
