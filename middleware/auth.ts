import { API } from "~/services";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const onboardingRoutes = ["/onboarding/start", "/onboarding/services"];
  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogOut = () => {
    if (to.path !== "/auth/login") {
      authStore.logOut();
    }
  };

  const handleNavigateToHome = () => {
    if (to.path !== "/") {
      router.replace({ path: "/" });
    }
  };

  const handleNavigateToDashboard = () => {
    if (to.path !== "/dashboard") {
      router.replace({ path: "/dashboard" });
    }
  };

  const handleNavigateToOnboarding = () => {
    if (to.path !== "/onboarding/start") {
      router.replace({ path: "/onboarding/start" });
    }
  };

  if (import.meta.client) {
    if (
      to.path === "/auth/signup-complete" ||
      to.path === "/auth/signup-complete/"
    ) {
      const token = to.query?.token as string;

      if (!token) {
        handleNavigateToHome();
        authStore.isSignupModalOpen = true;
        return;
      }

      const { exp, email } = parseJwt(token);

      if (exp * 1000 <= new Date().getTime()) {
        handleNavigateToHome();
        authStore.isSignupModalOpen = true;
        return;
      }

      to.query.email = email;
      return;
    }

    const jwt = authStore.getAuthTokenFromLocalStorage() as string;

    if (!jwt || jwt === "undefined") return handleLogOut();

    const { exp } = parseJwt(jwt);

    if (exp * 1000 <= new Date().getTime()) {
      return handleLogOut();
    }

    const result = await API.user.getMe();

    if (!result) return handleLogOut();

    authStore.user = result?.data?.result;
    authStore.isLoggedIn = true;

    if (onboardingRoutes.includes(to.path)) {
      if (authStore.user?.isOnboard) {
        return handleNavigateToDashboard();
      }
    }

    if (to.path === "/dashboard") {
      if (!authStore.user?.isOnboard) {
        return handleNavigateToOnboarding();
      }
    }
  }
});
