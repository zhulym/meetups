// libraries
import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
// components
import LocaleButtons from 'components/Layout/Header/LocaleButtons';
import User from 'components/User';
// store
import { useAppDispatch } from 'hooks/redux';
import { userSlice } from 'store/reducers/UserSlice';
// api
import { logout } from 'api/AuthService';
// constants
import { LOGIN_PAGE } from 'constants/routes';
// types
import { UserType } from 'types/meetupsTypes';
// styles
import styles from './HeaderUserBlock.module.scss';

type HeaderUserBlockProps = {
  user: UserType
  isBurgerActive?: boolean
};

const HeaderUserBlock: FC<HeaderUserBlockProps> = ({ user, isBurgerActive }) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { LOG_OUT } = userSlice.actions;
  const { t } = useTranslation();

  const handleLogout = async () => {
    await logout();
    dispatch(LOG_OUT());
    history.push(LOGIN_PAGE.path);
  };

  return (
    <div className={classnames(styles.container, { [styles.burger]: isBurgerActive })}>
      <User
        extraClass={styles.avatarImage}
        nameClass={styles.name}
        author={{ ...user }}
        isBurgerActive
      />
      <div className={styles.buttonWrap}>
        <button type="button" className={styles.signInUp} onClick={handleLogout}>
          {t('auth.logout')}
        </button>
        <LocaleButtons />
      </div>
    </div >
  );
};

export default HeaderUserBlock;
