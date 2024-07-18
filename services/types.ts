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
  phone: string;
  photo: string;
  role: string;
  languages: string[];
  address: string;
  city: string;
  state: string;
  country: string;
  bio: string;
  isOnboard: boolean;
  createdAt: string;
};
