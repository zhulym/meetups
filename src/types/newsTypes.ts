export type NewsType = {
  id: string,
  publicationDate: string,
  title: string,
  text: string,
  image: string | null
};

type FormValuesOptional = Partial<NewsType>;

export type FormNewsValuesType = Omit<FormValuesOptional, 'publicationDate' | 'id'>;
