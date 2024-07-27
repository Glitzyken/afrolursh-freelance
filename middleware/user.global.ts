import { API } from "~/services";
import { useAuthStore } from "~/store/auth";
import { useServiceStore } from "~/store/service";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();
  const serviceStore = useServiceStore();

  if (import.meta.client) {
    const jwt = authStore.getAuthTokenFromLocalStorage() as string;

    if (!jwt) return;

    const result = await API.user.getMe();

    if (!result) return;

    serviceStore.selectedServicesIds =
      result?.data?.result?.servicesOffered.map(
        (serviceOffered) => serviceOffered.standard
      );

    authStore.user = result?.data?.result;
    authStore.isLoggedIn = true;
  }
});
