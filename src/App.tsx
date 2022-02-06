// libraries
import React, { FC, useEffect, useMemo } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Flip, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
// components
import Layout from 'components/Layout';
import ProtectedRoutes from "components/ProtectedRoutes";
import Login from 'components/Login';
import ErrorPage from 'components/shared/ErrorPage';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// api
import { getUser } from 'api/AuthService';
// constants
import { LOGIN_PAGE } from 'constants/routes';

const App: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { errors } = useAppSelector(state => state.errorsReducer);
  const status = useMemo(() => errors.substring(errors.length - 3), [errors]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (status === '403') {
    return <ErrorPage
      text={t('errors-pages.forbidden')}
      error='403'
      description={t('errors-pages.description403')}
    />;
  };

  return (
    <>
      <Layout>
        <Switch>
          <Route path={LOGIN_PAGE.path} component={Login} />
          <ProtectedRoutes />
        </Switch>
      </Layout>
      <ToastContainer transition={Flip} />
    </>
  );
};

export default App;
