// libraries
import React, { FC } from 'react';
import TextField from '@material-ui/core/TextField';
import { FormikProps } from 'formik';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import { ReactComponent as ErrorIcon } from 'assets/images/icons/error.svg';
import { ReactComponent as SuccessIcon } from 'assets/images/icons/success-form.svg';
// types
import { FormikTypes } from 'types/generalTypes';
// styles
import useStyles from "./TextFieldItemStyle";
import styles from './TextFieldItem.module.scss';

type TextFieldItemProps = {
  name: keyof FormikTypes
  label: string
  rows?: number
  multiline?: boolean
  formik: FormikProps<FormikTypes>
  className?: string
};

const TextFieldItem: FC<TextFieldItemProps> = ({ name, label, formik, rows, multiline, className }) => {
  const classes = useStyles();
  const isError = formik.errors[name] && formik.touched[name];
  const isSuccess = !formik.errors[name] && formik.touched[name];
  const { t } = useTranslation();

  return (
    <div className={className}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      <TextField
        fullWidth
        id={name}
        name={name}
        rows={rows}
        variant="outlined"
        multiline={multiline}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        className={classes.textField}
        onChange={formik.handleChange}
        InputProps={{
          classes: {
            root: classnames(classes.root, {
              [classes.error]: isError,
              [classes.success]: isSuccess,
              [classes.input]: !multiline,
            }),
            focused: classes.focused,
            notchedOutline: classes.notchedOutline,
          },
        }}
      />

      {isSuccess && (
        <div className={styles.success}>
          <SuccessIcon className={styles.icon} /> <span>{t('meetups-form.success')}</span>
        </div>
      )}
      {isError && (
        <div className={classnames(styles.error, { [styles.textAreaError]: multiline })}>
          <ErrorIcon className={styles.icon} /> {t(`form-errors.${formik.errors[name]}`)}
        </div>
      )}
    </div >
  );
};

export default TextFieldItem;
