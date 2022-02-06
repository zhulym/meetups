/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// libraries
import React, { FC, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
// components
import LocaleButtons from 'components/Layout/Header/LocaleButtons';
import HeaderUserBlock from 'components/Layout/Header/HeaderUserBlock';
// constants
import { HEADER_MENU_ROUTES } from 'constants/routes';
// static
import { ReactComponent as Logo } from 'assets/images/logo.svg';
// store
import { useAppSelector } from 'hooks/redux';
// styles
import styles from './Header.module.scss';

const Header: FC = () => {
  const { user } = useAppSelector(state => state.userReducer);
  const { t } = useTranslation();
  const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/"><Logo className={styles.logoIcon} /></Link>
        {user ? (
          <>
            <div className={classnames(styles.burgerIcon, { [styles.menuActive]: isBurgerActive })}
              onClick={() => setIsBurgerActive(!isBurgerActive)}
            >
              <span className={styles.burgerItem} />
            </div>
            <nav className={classnames(styles.menuWrap, { [styles.menuActive]: isBurgerActive })}>
              <ul className={styles.menu}>
                {HEADER_MENU_ROUTES.map((item) => (
                  <li key={item.id} className={styles.linkWrap}>
                    <NavLink
                      className={styles.link}
                      activeClassName={styles.active}
                      to={item.path}
                      onClick={() => setIsBurgerActive(false)}
                    >
                      {t(`header-menu.${item.text}`)}
                    </NavLink>
                  </li>)
                )}
              </ul>
              {isBurgerActive && <HeaderUserBlock user={user} isBurgerActive />}
            </nav>
            <HeaderUserBlock user={user} />
          </>
        ) : (
          <div className={styles.buttonWrap}>
            <Link className={styles.signInUp} to="/signup">{t('auth.signup')}</Link>
            <LocaleButtons />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
