export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
};

export type UserCreateDto = {
  name: string;
  email: string;
  password: string;
};

export type UserUpdateDto = Partial<UserCreateDto>;
