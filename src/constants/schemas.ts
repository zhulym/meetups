// libraries
import * as yup from 'yup';
import { FormNewsValuesType } from 'types/newsTypes';

type YupTypes = {
  start: string
  finish: string
  subject: string
  speaker: string
  excerpt: string
  place: string
  image?: string
};

export const validationSchema: yup.SchemaOf<YupTypes> = yup.object({
  subject: yup
    .string()
    .required('subject'),
  speaker: yup
    .string().matches(/[A-Za-z]+\s+[A-Za-z]+/, 'speaker-latin')
    .required('speaker-name'),
  excerpt: yup
    .string()
    .required('description'),
  place: yup
    .string()
    .required('place'),
  start: yup
    .string()
    .required('start'),
  finish: yup
    .string()
    .required('finish'),
  image: yup
    .string()
});

export const newsValidationSchema: yup.SchemaOf<FormNewsValuesType> = yup.object({
  title: yup
    .string()
    .required('title'),
  text: yup
    .string()
    .required('text'),
  image: yup
    .string()
});
