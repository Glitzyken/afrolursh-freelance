import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const isLoginModalOpen = ref(false);

  const toggleLoginModal = () => {
    isLoginModalOpen.value = !isLoginModalOpen.value;
  };

  return { isLoginModalOpen, toggleLoginModal };
});
