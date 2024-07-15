import { defineStore } from "pinia";

export const useBurgerStore = defineStore("burger", () => {
  const isOpen = ref(false);

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return { isOpen, toggle };
});
