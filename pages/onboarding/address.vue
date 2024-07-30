<script setup lang="ts">
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "~/store/auth";
import type { Country } from "~/services/country/types";
import { API } from "~/services";
import { Role } from "~/services/enums";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const isLoading = ref(false);
const supportedCountries = ref<Country[]>([]);
const detectedCountry = ref<Country>();
const citiesNg = ref<string[]>();
const citiesGb = ref<{ en_name: string }[]>();
const selectedCountry = ref<string>();

onBeforeMount(async () => {
  const countries = await API.country.getSupportedCountries();
  const ipCountry = await API.country.getIpCountry();
  const citiesNigeria = await API.country.getCitiesNg();
  const citiesUk = await API.country.getCitiesGb();

  if (countries) {
    supportedCountries.value = countries.data.result;
  }

  if (ipCountry) {
    detectedCountry.value = supportedCountries.value.find(
      (country) => country.cca2 === ipCountry.data.country_code2
    );
    selectedCountry.value = detectedCountry.value?.ccn3;
  }

  if (citiesNigeria) {
    citiesNg.value = citiesNigeria.data.result;
  }

  if (citiesUk) {
    citiesGb.value = citiesUk.data.result;
  }
});

const { handleSubmit, values: formValues } = useForm({
  validationSchema: addressSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  if (!values.country) values.country = detectedCountry.value?.ccn3;

  const data = await API.user.updateMe({
    country: values.country,
    city: values.city,
    address: values.address,
    onboardingStep: 3,
  });

  isLoading.value = false;

  if (data) {
    authStore.user = data.data?.result;
    useRouter().push({ path: "/onboarding/bio" });
  }
});

const handleGoBack = () => {
  authStore.isGoBack = true;

  if (authStore.user?.role === Role.Individual) {
    useRouter().push({ path: "/onboarding/start" });
  }

  if (authStore.user?.role === Role.Specialist) {
    useRouter().push({ path: "/onboarding/services" });
  }
};

watch(formValues, (newValue) => {
  if (newValue?.country) {
    selectedCountry.value = newValue.country;
  }
});
</script>

<template>
  <section class="section mt-10 w-96 m-auto">
    <h1 class="text-center short-title">
      Love it! <br />
      Now, tell us where you live
    </h1>

    <p class="text-sm text-center">
      Your hair stylist will deliver services to you here
    </p>

    <ClientOnly>
      <form class="mt-10 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" name="country">
          <FormItem>
            <div class="text-left">
              <FormLabel>What country do you live in?</FormLabel>
            </div>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="bg-white border-2 border-sec/25">
                  <SelectValue
                    v-if="detectedCountry"
                    :placeholder="`${detectedCountry?.name.common} ${detectedCountry?.flag}`"
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="bg-white">
                <SelectGroup class="bg-white">
                  <SelectItem
                    v-for="country in supportedCountries"
                    :key="country.name.common"
                    :value="country.ccn3"
                  >
                    {{ country.name.common }} {{ country.flag }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="city">
          <FormItem>
            <div class="text-left">
              <FormLabel>Which city do you live in?</FormLabel>
            </div>

            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger class="bg-white border-2 border-sec/25">
                  <SelectValue placeholder="Select your city" />
                </SelectTrigger>
              </FormControl>
              <SelectContent class="bg-white">
                <SelectGroup class="bg-white">
                  <SelectItem
                    v-if="selectedCountry === SUPPORTED_COUNTRIES.nigeria"
                    v-for="city in citiesNg"
                    :key="city"
                    :value="city"
                  >
                    {{ city }}
                  </SelectItem>
                  <SelectItem
                    v-if="selectedCountry === SUPPORTED_COUNTRIES.unitedKingdom"
                    v-for="city in citiesGb"
                    :key="city.en_name"
                    :value="city.en_name"
                  >
                    {{ city.en_name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="address">
          <FormItem v-auto-animate>
            <div class="text-left">
              <FormLabel>Home address</FormLabel>
            </div>
            <FormControl>
              <Input
                class="bg-white border-2 border-sec/25"
                type="text"
                placeholder="49 Featherstone Street"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

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
