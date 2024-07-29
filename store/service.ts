import { defineStore } from "pinia";
import type { Service } from "~/services/service/types";

export const useServiceStore = defineStore("service", () => {
  const selectedServicesIds = ref<string[]>([]);
  const selectedServices = ref<Service[]>([]);

  return {
    selectedServicesIds,
    selectedServices,
  };
});
