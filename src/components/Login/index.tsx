// libraries
import React, { FC, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
// api
import { login } from 'api/AuthService';
// components
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// constants
import { MEETUPS_PAGE } from 'constants/routes';
// store
import { useAppDispatch, useAppSelector } from 'hooks/redux';
// types
import { FormValues } from 'types/authTypes';
// styles
import styles from './Login.module.scss';

const Login: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.userReducer);
  const { errors } = useAppSelector(state => state.errorsReducer);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      return;
    };
    history.replace(MEETUPS_PAGE.path);
  }, [user, history]);

  const handleSubmit = (values: FormValues) => {
    dispatch(login(values));
  };

  const validationSchema: yup.SchemaOf<FormValues> = yup.object({
    username: yup
      .string()
      .required(t('auth.errors.name')),
    password: yup
      .string()
      .required(t('auth.errors.password')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{t('auth.signin')}</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="username"
            name="username"
            label={t('auth.labels.name')}
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && (
            <div className={styles.formikError}>{t('auth.errors.name')}</div>
          )}

          <TextField
            fullWidth
            id="password"
            name="password"
            label={t('auth.labels.password')}
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && (
            <div className={styles.formikError}>{t('auth.errors.password')}</div>
          )}

          {(!!errors && formik.isSubmitting) && (
            <div className={styles.error}>{t('auth.main-error')}</div>
          )}

          <Button
            className={styles.authButton}
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            data-cy="login-button"
          >
            {t('auth.login')}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
