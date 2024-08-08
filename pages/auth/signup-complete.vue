<script setup lang="ts">
import { useForm } from "vee-validate";
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

const authStore = useAuthStore();
const emailInput = ref("");

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(false);
const phoneNumber = ref("");
const countryCode = ref<"+44" | "+234">("+44");
const showPhoneDropdown = ref(false);

const email = useRoute().query?.email as string;
emailInput.value = email;

const { handleSubmit } = useForm({
  validationSchema: completeSignupSchema,
});

const getPhoneNumber = () => {
  if (!phoneNumber.value) return "";
  const result = phoneNumber.value.substring(1);
  return countryCode.value + result;
};

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  values.phone = getPhoneNumber();

  const user = await API.auth.completeSignup(
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

  if (user) {
    const result = await API.auth.login({
      email: values.email,
      password: values.password,
    });

    if (result) {
      authStore.user = result.data?.result?.user;
      authStore.setAuthToken(result.data?.result?.token);

      successToast("Signed up successfully");

      setTimeout(() => {
        useRouter().replace({ path: "/onboarding/start" });
      }, 2000);
    }
  }
});

const handleCountryCodeSelected = (code: "+44" | "+234") => {
  countryCode.value = code;
  showPhoneDropdown.value = false;
};
</script>

<template>
  <section class="section mt-10 md:w-96 m-auto">
    <div class="w-full m-auto">
      <h1 class="text-center short-title">
        Welcome! <br />
        Let's get to know you
      </h1>
    </div>

    <div class="w-full m-auto">
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
                <div class="flex items-center relative">
                  <button
                    @click="showPhoneDropdown = !showPhoneDropdown"
                    id="dropdown-phone-button"
                    data-dropdown-toggle="dropdown-phone"
                    class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center bg-white border-2 border-sec/25 rounded-md focus:ring-1 focus:outline-none focus:ring-sec/25"
                    type="button"
                  >
                    <UnitedKingdomFlag v-if="countryCode === '+44'" />
                    <NigeriaFlag v-if="countryCode === '+234'" />
                    {{ countryCode }}
                    <Icon name="formkit:down" size="20" class="text-sec" />
                  </button>
                  <div
                    v-if="showPhoneDropdown"
                    id="dropdown-phone"
                    class="z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-full absolute top-12"
                  >
                    <ul
                      class="py-2 text-sm"
                      aria-labelledby="dropdown-phone-button"
                    >
                      <li>
                        <button
                          @click="handleCountryCodeSelected('+44')"
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div class="inline-flex items-center">
                            <UnitedKingdomFlag />
                            United Kingdom (+44)
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          @click="handleCountryCodeSelected('+234')"
                          type="button"
                          class="inline-flex w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                        >
                          <div class="inline-flex items-center">
                            <NigeriaFlag />
                            Nigeria (+234)
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                  <div class="relative w-full">
                    <input
                      v-model="phoneNumber"
                      type="phone"
                      id="phone-input"
                      class="block p-2.5 w-full z-20 text-sm bg-white rounded-md border-s-0 border-2 border-sec/25"
                      pattern="^0(7[0-9]{9}|[1-9][0-9]{8,9})$"
                      placeholder="e.g 0803XXXXXXX or 020XXXXXXX"
                      required
                    />
                  </div>
                </div>
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

        <ButtonSec as="link" link="/" class="w-full mt-3"> Back </ButtonSec>
      </ClientOnly>
    </div>
  </section>
</template>
