import { defineStore } from "pinia";
import type { User } from "~/services/types";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoginModalOpen = ref(false);

  const toggleLoginModal = () => {
    isLoginModalOpen.value = !isLoginModalOpen.value;
  };

  const setAuthToken = (token: string | null) => {
    if (token) {
      localStorage.setItem(TOKEN_LOCAL_STORAGE_ID, token);
    } else {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_ID);
    }
  };

  return { isLoginModalOpen, toggleLoginModal, user, setAuthToken };
});
