import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.client) {
    const jwt = authStore.getAuthTokenFromLocalStorage() as string;

    const { exp } = parseJwt(jwt);

    if (exp * 1000 <= new Date().getTime()) {
      return authStore.logOut();
    }
  }

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

  // if (to.path === "/onboarding/start/") {
  // }
});
