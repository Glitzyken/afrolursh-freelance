import { API } from "~/services";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async () => {
  const authStore = useAuthStore();

  if (import.meta.client) {
    const jwt = authStore.getAuthTokenFromLocalStorage() as string;

    if (!jwt) return;

    const result = await API.user.getMe();

    if (!result) return;

    authStore.isLoggedIn = true;
  }
});
