import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/auth/signup-complete/") {
    const token = to.query?.token as string;

    if (!token) {
      navigateTo("/");
      useAuthStore().isSignupModalOpen = true;
      return;
    }

    const { exp, email } = parseJwt(token);

    if (exp * 1000 <= new Date().getTime()) {
      navigateTo("/");
      useAuthStore().isSignupModalOpen = true;
      return;
    }

    to.query.email = email;
  }
});
