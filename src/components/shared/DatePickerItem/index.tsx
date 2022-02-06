// libraries
import React, { FC, useState, useEffect, useMemo, useCallback } from 'react';
import { FormikProps } from 'formik';
import DatePicker, { registerLocale } from "react-datepicker";
import ru from "date-fns/locale/ru";
import moment from 'moment';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
// components
import { ReactComponent as ErrorIcon } from 'assets/images/icons/error.svg';
import { ReactComponent as SuccessIcon } from 'assets/images/icons/success-form.svg';
// types
import { FormValuesType } from 'types/meetupsTypes';
// styles
import "react-datepicker/src/stylesheets/datepicker.scss";
import { datePickerDay, datePickerTime } from './DatePickerStyles';
import styles from './DatePickerItem.module.scss';

type DatePickerItemProps = {
  name: keyof FormValuesType
  label: string
  formik: FormikProps<FormValuesType>
};

const DatePickerItem: FC<DatePickerItemProps> = ({ name, label, formik }) => {
  const { t, i18n } = useTranslation();

  const initialDate = useMemo(() => {
    if (formik.values[name]) {
      return new Date(`${formik.values[name]}`);
    }
    return null;
  }, [formik.values, name]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [datePickerTouched, setDatePickerTouched] = useState<boolean>(false);
  const isError = formik.errors[name] && datePickerTouched;
  const isSuccess = !formik.errors[name] && datePickerTouched;
  const maxTime = useMemo(() => moment().endOf('day').toDate(), []);
  registerLocale("ru", ru);

  const handleChange = (date: Date) => {
    setSelectedDate(new Date(`${date}`));
    setDatePickerTouched(true);
    return formik.setFieldValue(name, new Date(`${date}`).toISOString());
  };

  const calculateMinTime = useCallback(() => {
    if (name === 'finish') {
      return moment(new Date()).add({ hours: 0.5 }).toDate();
    }
    return new Date();
  }, []);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  return (
    <>
      <label htmlFor={name} className={styles.datePickerLabel}>{label}</label>
      <DatePicker
        id={name}
        name={name}
        showTimeSelect
        dateFormat="Pp"
        locale={i18n.language}
        minDate={new Date()}
        minTime={calculateMinTime()}
        maxTime={maxTime}
        selected={selectedDate}
        className={classnames(
          styles.datesField, {
          [styles.datesFieldError]: isError,
          [styles.datesFieldSuccess]: isSuccess,
        })}
        onChange={handleChange}
        calendarClassName={styles.calendar}
        timeClassName={date => datePickerTime(
          date,
          selectedDate,
          `${styles.timeField}`,
          `${styles.defaultTimeField}`
        )}
        dayClassName={date => datePickerDay(
          date,
          selectedDate,
          `${styles.dayField}`,
          `${styles.defaultDaysStyle}`
        )}
      />

      {isSuccess && (
        <div className={styles.success}>
          <SuccessIcon className={styles.icon} /> <span>{t('meetups-form.success')}</span>
        </div>
      )}

      {isError && (
        <div className={classnames(styles.error, styles.datePickerError)}>
          <ErrorIcon className={styles.icon} />{t(`meetups-form.${formik.errors[name]}`)}
        </div>
      )}
    </>
  );
};

export default DatePickerItem;
