// libraries
import React, { FC, useEffect, useMemo } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// components
import Meetups from 'components/Meetups';
import News from 'components/News';
import TopicDetail from 'components/TopicDetail';
import MeetupDetail from "components/MeetupDetail";
import CreateMeetup from "components/CreateMeetup";
import EditMeetup from 'components/EditMeetup';
import CreateNews from 'components/CreateNews';
import NewsDetail from 'components/NewsDetail';
import EditNews from 'components/EditNews';
import ErrorPage from 'components/shared/ErrorPage';
import Loader from 'components/shared/Loader';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { userSlice } from 'store/reducers/UserSlice';
// constants
import {
  MEETUPS_PAGE,
  NEWS_PAGE,
  TOPIC_DETAIL_PAGE,
  MEETUP_DETAIL_PAGE,
  LOGIN_PAGE,
  CREATE_MEETUP_PAGE,
  EDIT_MEETUP_PAGE,
  CREATE_NEWS_PAGE,
  NEWS_DETAIL_PAGE,
  EDIT_NEWS_PAGE
} from 'constants/routes';

const ProtectedRoutes: FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { LOG_OUT } = userSlice.actions;
  const { isLoading } = useAppSelector(state => state.userReducer);
  const { errors } = useAppSelector(state => state.errorsReducer);
  const status = useMemo(() => errors.substring(errors.length - 3), [errors]);

  if (isLoading) {
    return <Loader />;
  }

  useEffect(() => {
    if (status !== '401') {
      return;
    }
    dispatch(LOG_OUT());
    history.replace(LOGIN_PAGE.path);
  }, [status]);

  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={MEETUPS_PAGE.path} />
      </Route>
      <Route path={MEETUPS_PAGE.path} component={Meetups} />
      <Route exact path={NEWS_PAGE.path} component={News} />
      <Route path={`${TOPIC_DETAIL_PAGE.path}/:id`} component={TopicDetail} />
      <Route path={`${MEETUP_DETAIL_PAGE.path}/:id`} component={MeetupDetail} />
      <Route path={CREATE_MEETUP_PAGE.path} component={CreateMeetup} />
      <Route path={`${EDIT_MEETUP_PAGE.path}/:id`} component={EditMeetup} />
      <Route path={CREATE_NEWS_PAGE.path} component={CreateNews} />
      <Route path={`${NEWS_DETAIL_PAGE.path}/:id`} component={NewsDetail} />
      <Route path={`${EDIT_NEWS_PAGE.path}/:id`} component={EditNews} />
      <Route path="*">
        <ErrorPage
          text={t('errors-pages.not-found')}
          error='404'
          description={t('errors-pages.description404')}
        />
      </Route>
    </Switch>
  );
};

export default ProtectedRoutes;
