import i18n from 'i18next';

export const getDate = (date?: string) => new Date(date || '').toLocaleDateString(i18n.language, {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
});

export const getNewsDate = (date?: string) => new Date(date || '').toLocaleDateString(i18n.language, {
  month: '2-digit',
  day: 'numeric',
  year: 'numeric',
});

export const getTime = (date?: string) => new Date(date || '').toLocaleTimeString(i18n.language, {
  hour: '2-digit',
  minute: '2-digit',
});

export const getTimeDate = (date: string) => new Date(date).toLocaleTimeString(i18n.language, {
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});

export const getFullDate = (date?: string) => new Date(date || '').toLocaleDateString(i18n.language, {
  month: 'long',
  day: 'numeric',
  weekday: 'long',
  year: 'numeric'
});
