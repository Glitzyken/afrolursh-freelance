export type APIResponse<T> = {
  status: string;
  message: string;
  result: T;
};

export type User = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
