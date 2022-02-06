// libraries
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// constants
import { MEETUPS_MENU_ROUTES } from 'constants/routes';
// styles
import styles from './MeetupsMenu.module.scss';

const MeetupsMenu: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading} data-cy="meetups-heading">{t('page-headings.meetups')}</h1>
      <nav>
        <ul className={styles.menu} role="menu">
          {MEETUPS_MENU_ROUTES.map(item => (
            <li key={item.id}>
              <NavLink
                data-cy="meetups-menu-link"
                className={styles.link}
                activeClassName={styles.active}
                exact={item.isExact}
                to={item.path}>
                {t(`meetups-menu.${item.text}`)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default MeetupsMenu;
