export type UserType = {
  id: string
  name: string
  password: string
  surname: string
  post: string
  roles: string
  avatar?: string
};

export type UserDataType = {
  user: UserType
};
