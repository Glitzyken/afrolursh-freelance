import { useAxios } from "~/composables/useAxios";
import type { APIResponse } from "../types";
import type { MagicLink, MagicLinkPayload } from "./types";
import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

const http = useAxios();

const handleError = async (error: AxiosError) => {
  if (isAxiosError(error) && error.response) {
    if (error?.response?.status >= 500) {
      failToast("Opps! Something went very wrong. Please, try again later.");
      return;
    }

    if (error.response.status >= 400) {
      if (error?.response?.data) {
        const { data }: any = error.response;
        failToast(data.message);
      }
    }
  } else {
    failToast("Unexpected error");
  }
};

async function sendMagicLink(payload: MagicLinkPayload) {
  try {
    return await http.post<APIResponse<MagicLink>>("/auth/magic_link", payload);
  } catch (error: any) {
    return handleError(error);
  }
}

export default {
  sendMagicLink,
};
