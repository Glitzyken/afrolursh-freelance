import { useAxios } from "~/composables/useAxios";
import { type APIResponse } from "../types";
import { handleError } from "..";
import type { Country, IpCountry } from "./types";

const http = useAxios();

const getSupportedCountries = async () => {
  try {
    return await http.get<APIResponse<Country[]>>("/countries/supported");
  } catch (error: any) {
    return handleError(error);
  }
};

const getCitiesNg = async () => {
  try {
    return await http.get<APIResponse<string[]>>(
      "/countries/supported/cities/NG"
    );
  } catch (error: any) {
    return handleError(error);
  }
};

const getCitiesGb = async () => {
  try {
    return await http.get<APIResponse<{ en_name: string }[]>>(
      "/countries/supported/cities/GB"
    );
  } catch (error: any) {
    return handleError(error);
  }
};

const getIpCountry = async () => {
  try {
    return await useAxios(true).get<IpCountry>(
      "https://app.termly.io/api/v1/ip"
    );
  } catch (error: any) {
    return handleError(error);
  }
};

export default {
  getSupportedCountries,
  getIpCountry,
  getCitiesNg,
  getCitiesGb,
};
