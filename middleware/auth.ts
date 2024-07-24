import { API } from "~/services";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const jwt = authStore.getAuthTokenFromLocalStorage() as string;

    if (!jwt || jwt === "undefined") return authStore.logOut();

    const { exp } = parseJwt(jwt);

    if (exp * 1000 <= new Date().getTime()) {
      return authStore.logOut();
    }

    const result = await API.user.getMe();

    if (!result) return authStore.logOut();

    authStore.user = result?.data?.result;

    if (to.path === "/auth/signup-complete/") {
      const token = to.query?.token as string;

      if (!token) {
        navigateTo("/");
        authStore.isSignupModalOpen = true;
        return;
      }

      const { exp, email } = parseJwt(token);

      if (exp * 1000 <= new Date().getTime()) {
        navigateTo("/");
        authStore.isSignupModalOpen = true;
        return;
      }

      to.query.email = email;
    }

    if (to.path === "/onboarding/start") {
      if (authStore.user?.isOnboard) {
        return navigateTo("/dashboard");
      }
    }
  }
});
