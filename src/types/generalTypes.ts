import { FormValuesType } from 'types/meetupsTypes';
import { FormNewsValuesType } from 'types/newsTypes';

export type ParamsType = {
  id: string
};

export enum ToastType {
  success = 'success',
  error = 'error',
  warn = 'warn',
  info = 'info',
};

export type FormikTypes = FormValuesType & FormNewsValuesType;
