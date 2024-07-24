import { useAxios } from "~/composables/useAxios";
import { type APIResponse } from "../types";
import { type User } from "../types";
import type {
  Login,
  LoginPayload,
  MagicLink,
  MagicLinkPayload,
  SignupCompletePayload,
} from "./types";
import { handleError } from "..";

const http = useAxios();

const sendMagicLink = async (payload: MagicLinkPayload) => {
  try {
    return await http.post<APIResponse<MagicLink>>("/auth/magic_link", payload);
  } catch (error: any) {
    return handleError(error);
  }
};

const login = async (payload: LoginPayload) => {
  try {
    return await http.post<APIResponse<Login>>("/auth/login", payload);
  } catch (error: any) {
    return handleError(error);
  }
};

const completeSignup = async (
  payload: SignupCompletePayload,
  token: string
) => {
  try {
    return await http.post<APIResponse<User>>(
      `/auth/signup?token=${token}`,
      payload
    );
  } catch (error: any) {
    return handleError(error);
  }
};

export default {
  sendMagicLink,
  login,
  completeSignup,
};
