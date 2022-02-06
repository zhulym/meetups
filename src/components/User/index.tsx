// libraries
import React, { FC } from 'react';
import classnames from 'classnames';
// components
import Avatar from 'components/Avatar';
// types
import { UserType } from 'types/meetupsTypes';
// styles
import styles from './User.module.scss';

type UserProps = {
  author: UserType
  extraClass?: string
  nameClass?: string
  isBurgerActive?: boolean
};

const User: FC<UserProps> = ({ author, extraClass, nameClass, isBurgerActive }) => (
  <div className={classnames(styles.container, { [styles.burger]: isBurgerActive })}>
    <Avatar
      extraClass={extraClass}
      {...author}
    />
    <span className={classnames(styles.name, nameClass)}>{author.name} {author.surname}</span>
  </div>
);

export default User;
