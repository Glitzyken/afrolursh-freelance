import { defineStore } from "pinia";
import type { User } from "~/services/types";

export const useAuthStore = defineStore("auth", () => {
  let user = ref<User | null>(null);
  const isSignupModalOpen = ref(false);
  const isLoggedIn = ref(false);
  const isGoBack = ref(false);

  const toggleSignupModal = () => {
    isSignupModalOpen.value = !isSignupModalOpen.value;
  };

  const setAuthToken = (token: string) => {
    localStorage.setItem(TOKEN_LOCAL_STORAGE_ID, token);
  };

  const unsetAuthToken = () => {
    localStorage.removeItem(TOKEN_LOCAL_STORAGE_ID);
  };

  const getAuthTokenFromLocalStorage = () => {
    return localStorage.getItem(TOKEN_LOCAL_STORAGE_ID);
  };

  const logOut = () => {
    user.value = null;
    isLoggedIn.value = false;
    unsetAuthToken();
    useRouter().replace({ path: "/auth/login" });
  };

  return {
    user,
    isSignupModalOpen,
    isLoggedIn,
    isGoBack,
    toggleSignupModal,
    setAuthToken,
    getAuthTokenFromLocalStorage,
    logOut,
  };
});
