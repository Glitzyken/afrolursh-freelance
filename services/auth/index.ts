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
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

const http = useAxios();

const handleError = async (error: AxiosError) => {
  let message = "Unexpected error";

  if (isAxiosError(error) && error.response) {
    if (error?.response?.status >= 500) {
      message = "Opps! Something went very wrong. Please, try again later.";
      failToast(message);
      return;
    }

    if (error.response.status >= 400) {
      if (error?.response?.data) {
        const { data }: any = error.response;

        message =
          typeof data.message === "string" ? data.message : data.message[0];

        failToast(message);
      }
    }
  } else {
    failToast(message);
  }
};

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
