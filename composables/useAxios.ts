import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";

export const useAxios = (noBaseUrl?: boolean) => {
  let api: AxiosInstance;

  if (noBaseUrl) {
    api = axios.create({
      headers: {
        common: {},
      },
    });
  } else {
    api = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      headers: {
        common: {},
      },
    });
  }

  const getTokenFromConfig = (config: InternalAxiosRequestConfig) => {
    if (config && config?.headers && config.headers?.Authorization) {
      const authHeader = config.headers.Authorization.toString();
      if (authHeader?.startsWith("Bearer ")) {
        return authHeader.split("Bearer ")[1] || null;
      }
    }
    return null;
  };

  api.interceptors.request.use(
    (config) => {
      const token = getTokenFromConfig(config);
      config.headers.Authorization =
        "Bearer " + (token || localStorage.getItem(TOKEN_LOCAL_STORAGE_ID));

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      if (
        [response.data.responseText, response.data.message].includes(
          "jwt expired"
        )
      ) {
        failToast("Your session has expired. Please login.");

        // return logOut();
        return;
      }

      return response?.data?.data ?? response;
    },
    (error: AxiosError | Error) => Promise.reject(error)
  );
  return api;
};
