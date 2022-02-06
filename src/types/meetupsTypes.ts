export type UserType = {
  id: string
  name: string
  surname: string
  avatar?: string
};

export type MeetupsType = {
  id: string
  modified: string
  start: string
  finish: string
  author: UserType
  speakers: UserType[]
  subject: string
  excerpt: string
  place: string
  goCount: number
  status: string
  isOver: boolean
  image: string
};

type FormValuesOptional = Partial<MeetupsType>;

export interface FormValuesType extends FormValuesOptional {
  speaker?: string
}
