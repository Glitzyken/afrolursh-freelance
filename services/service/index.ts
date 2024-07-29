import { useAxios } from "~/composables/useAxios";
import { type APIResponse } from "../types";
import { handleError } from "..";
import type { ServicesResponse } from "./types";

const http = useAxios();

const getAll = async (term?: string) => {
  let path = "/services";
  if (term) {
    path = `/services?search=${term}`;
  }

  try {
    return await http.get<APIResponse<ServicesResponse>>(path);
  } catch (error: any) {
    return handleError(error);
  }
};

export default {
  getAll,
};
