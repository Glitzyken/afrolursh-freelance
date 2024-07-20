import { defineStore } from "pinia";
import type { User } from "~/services/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isSignupModalOpen = ref(false);

  const toggleSignupModal = () => {
    isSignupModalOpen.value = !isSignupModalOpen.value;
  };

  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_ID, token);
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_ID);
    }
  };

  return { isSignupModalOpen, toggleSignupModal, user, setAuthToken };
});
