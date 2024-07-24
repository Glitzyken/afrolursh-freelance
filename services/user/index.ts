import { useAxios } from "~/composables/useAxios";
import { type APIResponse } from "../types";
import { type User } from "../types";
import { handleError } from "..";

const http = useAxios();

const getMe = async () => {
  try {
    return await http.get<APIResponse<User>>("/users/me");
  } catch (error: any) {
    return handleError(error);
  }
};

export default {
  getMe,
};
