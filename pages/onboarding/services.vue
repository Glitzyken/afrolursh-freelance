<script setup lang="ts">
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API } from "~/services";
import { useAuthStore } from "~/store/auth";
import { useServiceStore } from "~/store/service";

import { Checkbox } from "@/components/ui/checkbox";
import type { Service } from "~/services/service/types";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
const serviceStore = useServiceStore();

const services = ref<Service[]>([]);
const isLoading = ref(false);

const { handleSubmit } = useForm({
  validationSchema: servicesSchema,
  initialValues: {
    services: serviceStore.selectedServicesIds,
  },
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  const serviceIds = [...values.services];

  const data = await API.user.updateMe({
    serviceIds,
    onboardingStep: 2,
  });

  isLoading.value = false;

  if (data) {
    authStore.user = data.data?.result;
    serviceStore.selectedServicesIds = serviceIds;
    useRouter().push({ path: "/onboarding/address" });
  }
});

onBeforeMount(async () => {
  const data = await API.service.getAll();

  if (data) {
    services.value = data.data.result.services;
  }
});

const handleGoBack = () => {
  useRouter().push({ path: "/onboarding/start" });
};
</script>

<template>
  <section class="section mt-10 w-full md:w-3/4 lg:w-2/4 m-auto">
    <h1 class="text-center short-title">
      Nice to meet you! <br />
      What's your specialty?
    </h1>

    <p class="text-sm text-center">
      We'll use this to match you with the right clients
    </p>

    <ClientOnly>
      <form class="mt-10" @submit="onSubmit">
        <div class="max-h-96 overflow-scroll overflow-x-hidden p-2">
          <FormField name="services">
            <FormItem class="flex flex-wrap justify-left items-end gap-4">
              <FormField
                v-for="service in services"
                v-slot="{ value, handleChange }"
                :key="service._id"
                type="checkbox"
                :value="service._id"
                :unchecked-value="false"
                name="services"
              >
                <FormItem
                  class="flex flex-row items-start space-x-3 space-y-0 bg-pri/25 p-5 rounded-md"
                >
                  <FormControl>
                    <Checkbox
                      :checked="value.includes(service._id)"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ service.name }}
                  </FormLabel>
                </FormItem>
              </FormField>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <ButtonBase
          :isLoading="isLoading"
          type="submit"
          loadingText="Please enter your email"
          class="w-full mt-10"
        >
          Continue
          <template #spinner>
            <SpinnerSm />
          </template>
        </ButtonBase>
      </form>

      <ButtonSec @click="handleGoBack" class="w-full mt-3"> Back </ButtonSec>
    </ClientOnly>
  </section>
</template>
