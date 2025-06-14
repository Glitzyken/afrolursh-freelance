import type { User } from "../types";

// RESPONSE
export type MagicLink = string;

export type Login = {
  token: string;
  user: User;
};

// REQUEST
export type MagicLinkPayload = {
  email: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupCompletePayload = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
};
