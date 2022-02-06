// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// styles
import styles from './Avatar.module.scss';

type AvatarType = {
  avatar?: string
  name: string
  surname: string
  extraClass?: string
};

const Avatar: FC<AvatarType> = ({ name, surname, avatar, extraClass }) => (
  <div className={classnames(styles.container, extraClass)}>
    {!avatar ? (
      `${name[0]?.toUpperCase()}${surname[0]?.toUpperCase()}`
    ) : (
      <img src={avatar} alt={surname} className={styles.avatarImage} />
    )}
  </div>
);

export default Avatar;
