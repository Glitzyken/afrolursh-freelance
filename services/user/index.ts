import { useAxios } from "~/composables/useAxios";
import { type APIResponse } from "../types";
import { type User } from "../types";
import { handleError } from "..";
import type { UpdateMePayload } from "./types";

const http = useAxios();

const getMe = async () => {
  try {
    return await http.get<APIResponse<User>>("/users/me");
  } catch (error: any) {
    return handleError(error);
  }
};

const updateMe = async (payload: UpdateMePayload) => {
  try {
    return await http.patch<APIResponse<User>>("/users/me", payload);
  } catch (error: any) {
    return handleError(error);
  }
};

export default {
  getMe,
  updateMe,
};
