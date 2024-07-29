import type { AxiosError } from "axios";
import { isAxiosError } from "axios";

import authController from "./auth";
import userController from "./user";
import serviceController from "./service";
import countryController from "./country";

export const handleError = async (error: AxiosError) => {
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

export const API = {
  auth: authController,
  user: userController,
  service: serviceController,
  country: countryController,
};
