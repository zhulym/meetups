// libraries
import React, { FC, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import MeetupsMenu from 'components/MeetupsMenu';
import Topics from 'components/Topics';
import Future from 'components/Future';
import Moderation from 'components/Moderation';
import Past from 'components/Past';
import Loader from 'components/shared/Loader';
import ErrorPage from 'components/shared/ErrorPage';
// api
import { getMeetups } from 'api/MeetupService';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// constants
import { TOPICS_PAGE, MODERATION_PAGE, FUTURE_PAGE, PAST_PAGE } from 'constants/routes';
// styles
import styles from './Meetups.module.scss';

const Meetups: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.meetupsReducer);

  useEffect(() => {
    dispatch(getMeetups());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className={styles.container}>
      <Route exact path={[`${TOPICS_PAGE.path}`, `${MODERATION_PAGE.path}`, `${FUTURE_PAGE.path}`, `${PAST_PAGE.path}`]}>
        <MeetupsMenu />
      </Route>
      <Switch>
        <Route exact path={TOPICS_PAGE.path} component={Topics} />
        <Route path={MODERATION_PAGE.path} component={Moderation} />
        <Route path={FUTURE_PAGE.path} component={Future} />
        <Route path={PAST_PAGE.path} component={Past} />
        <Route path="*">
          <ErrorPage
            text={t('errors-pages.not-found')}
            error='404'
            description={t('errors-pages.description404')}
          />
        </Route>
      </Switch>
    </section>
  );
};

export default Meetups;
