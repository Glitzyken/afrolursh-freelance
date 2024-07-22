<script setup lang="ts">
import { useForm } from "vee-validate";
import type { CountryCode } from "maz-ui/components/MazPhoneNumberInput";
import { useAuthStore } from "@/store/auth";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { API } from "~/services";
import { countryCodesNotSupported } from "~/assets/data/countryCodes";

const authStore = useAuthStore();

const isLoading = ref(false);
const emailInput = ref("");
const phoneNumber = ref("");
const countryCode = ref("GB");
const phoneNumberInputResults = ref();

onBeforeMount(() => {
  const token = useRoute().query?.token as string;

  if (!token) {
    useRouter().replace({ path: "/" });
    useAuthStore().isSignupModalOpen = true;
    return;
  }

  const { exp, email } = parseJwt(token);

  if (exp * 1000 <= new Date().getTime()) {
    useRouter().replace({ path: "/" });
    useAuthStore().isSignupModalOpen = true;
    return;
  }

  emailInput.value = email;
});

const { handleSubmit } = useForm({
  validationSchema: completeSignupSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  values.phone = phoneNumber.value;

  console.log(values);
  console.log(phoneNumberInputResults.value);

  const res = await API.auth.completeSignup(
    {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      password: values.password,
    },
    useRoute().query?.token as string
  );

  isLoading.value = false;

  if (res) {
    successToast("Signed up successfully");

    setTimeout(() => {
      // useRouter().push({ path: "/onboarding/start" });
      useRouter().replace({ path: "/onboarding/start" });
    }, 2000);
  }
});
</script>

<template>
  <section class="section mt-10">
    <div class="md:w-2/4 lg:w-1/4 m-auto">
      <h1 class="text-center short-title">
        Welcome! <br />
        Let's get to know you
      </h1>
    </div>

    <div class="md:w-2/4 lg:w-1/4 m-auto">
      <ClientOnly>
        <form class="mt-10 space-y-4" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="firstName">
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>First name</FormLabel>
              </div>
              <FormControl>
                <Input
                  class="bg-white border-2 border-sec/25"
                  type="text"
                  placeholder="Kenneth"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="lastName">
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>Last name</FormLabel>
              </div>
              <FormControl>
                <Input
                  class="bg-white border-2 border-sec/25"
                  type="text"
                  placeholder="Jimmy"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            v-slot="{ componentField }"
            name="email"
            :value="emailInput"
          >
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>Email</FormLabel>
              </div>
              <FormControl>
                <Input
                  class="bg-white border-2 border-sec/25"
                  type="email"
                  placeholder="you@example.com"
                  disabled
                  v-bind="componentField"
                  v-model="emailInput"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField name="phone">
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>Phone</FormLabel>
              </div>
              <FormControl>
                <MazPhoneNumberInput
                  class="bg-white border-2 border-sec/25 w-full rounded-md"
                  v-model="phoneNumber"
                  v-model:country-code="countryCode as CountryCode"
                  show-code-on-list
                  :ignoredCountries="countryCodesNotSupported as CountryCode[]"
                  :noSearch="true"
                  :noExample="true"
                  :countrySelectorWidth="'4rem'"
                  @update="phoneNumberInputResults = $event"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField v-slot="{ componentField }" name="password">
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>Password</FormLabel>
              </div>
              <FormControl class="flex items-center">
                <div>
                  <Input
                    class="bg-white border-2 border-sec/25"
                    type="password"
                    v-bind="componentField"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <ButtonBase
            :isLoading="isLoading"
            type="submit"
            loadingText="Please enter your email"
            class="w-full"
          >
            Continue
            <template #spinner>
              <SpinnerSm />
            </template>
          </ButtonBase>
        </form>
      </ClientOnly>

      <ButtonSec as="link" link="/" class="w-full mt-3"> Back </ButtonSec>
    </div>
  </section>
</template>
