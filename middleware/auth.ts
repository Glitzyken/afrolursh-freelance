import { API } from "~/services";
import { Role } from "~/services/enums";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const onboardingRoutes = [
    PAGE.dashboard,
    PAGE.onboarding_start,
    PAGE.onboarding_services,
    PAGE.onboarding_address,
  ];
  const authStore = useAuthStore();
  const router = useRouter();

  const handleLogOut = () => {
    if (to.path !== PAGE.auth_login) {
      authStore.logOut();
    }
  };

  const handleNavigateToHome = () => {
    if (to.path !== PAGE.home) {
      router.replace({ path: PAGE.home });
    }
  };

  const handleNavigateToDashboard = () => {
    if (to.path !== PAGE.dashboard) {
      router.replace({ path: PAGE.dashboard });
    }
  };

  const handleNavigateToOnboardingStart = () => {
    if (to.path !== PAGE.onboarding_start) {
      router.replace({ path: PAGE.onboarding_start });
    }
  };

  const handleNavigateToOnboardingServices = () => {
    if (to.path !== PAGE.onboarding_services) {
      router.replace({ path: PAGE.onboarding_services });
    }
  };

  const handleNavigateToOnboardingAddress = () => {
    if (to.path !== PAGE.onboarding_address) {
      router.replace({ path: PAGE.onboarding_address });
    }
  };

  const handleNavigateToOnboardingBio = () => {
    if (to.path !== PAGE.onboarding_bio) {
      router.replace({ path: PAGE.onboarding_bio });
    }
  };

  if (import.meta.client) {
    if (
      to.path === PAGE.auth_signup_complete ||
      to.path === PAGE.auth_signup_complete2
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

    if (!jwt || jwt === "undefined") return handleLogOut(); // TODO Fix this because it causes frequent login

    const { exp } = parseJwt(jwt);

    if (exp * 1000 <= new Date().getTime()) {
      return handleLogOut();
    }

    const result = await API.user.getMe();

    if (!result) return handleLogOut();

    authStore.user = result?.data?.result;

    if (onboardingRoutes.includes(to.path)) {
      const { user } = authStore;

      if (user?.isOnboard) {
        return handleNavigateToDashboard();
      }

      if (user?.onboardingStep <= 0) {
        if (authStore.isGoBack) return;
        return handleNavigateToOnboardingStart();
      }

      if (user?.onboardingStep === 1) {
        if (authStore.isGoBack) return;

        if (user.role === Role.Individual) {
          return handleNavigateToOnboardingAddress();
        }

        if (user.role === Role.Specialist) {
          return handleNavigateToOnboardingServices();
        }
      }

      if (user?.onboardingStep === 2) {
        if (authStore.isGoBack) return;
        return handleNavigateToOnboardingAddress();
      }

      if (user?.onboardingStep === 3) {
        if (authStore.isGoBack) return;
        return handleNavigateToOnboardingBio();
      }
    }
  }
});
