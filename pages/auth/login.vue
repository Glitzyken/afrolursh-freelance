<script setup lang="ts">
import { useForm } from "vee-validate";
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
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const isLoading = ref(false);

const { handleSubmit } = useForm({
  validationSchema: loginSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  const res = await API.auth.login({
    email: values.email,
    password: values.password,
  });

  isLoading.value = false;

  if (res) {
    authStore.setAuthToken(res.data.result.token);
    successToast("Logged in successfully");
  }
});
</script>

<template>
  <div class="md:h-[90vh] md:grid md:grid-cols-2 md:gap-8">
    <ClientOnly>
      <div class="md:flex md:flex-col md:justify-between">
        <div class="w-full h-full"></div>
        <div class="flex flex-col items-center px-5 md:px-0 mt-10 md:mt-0">
          <Logo />

          <div class="text-center mt-5 w-full lg:w-3/5">
            <p class="short-title">Welcome back</p>
            <p>Please, enter your details.</p>

            <form class="mt-10 space-y-6" @submit="onSubmit">
              <FormField v-slot="{ componentField }" name="email">
                <FormItem v-auto-animate>
                  <div class="text-left">
                    <FormLabel>Email</FormLabel>
                  </div>
                  <FormControl>
                    <Input
                      class="bg-white border-2 border-sec/25"
                      type="email"
                      placeholder="you@example.com"
                      v-bind="componentField"
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

            <div class="mt-5 text-sm text-center">
              Don't have an account?
              <NuxtLink
                active-class="link-underline-custom"
                class="navbar-items cursor-pointer"
                title="Signup"
                @click="useAuthStore().isSignupModalOpen = true"
                >Sign up</NuxtLink
              >
            </div>
          </div>
        </div>
        <div class="w-full h-full"></div>
      </div>

      <div class="h-[90vh] relative hidden md:block">
        <div
          class="w-full h-full bg-gradient-to-l from-sec/30 absolute rounded-xl"
        ></div>
        <div
          class="w-full h-full bg-gradient-to-l from-sec/30 to-sec/20 absolute rounded-xl"
        ></div>

        <nuxt-img
          preload
          format="png"
          quality="100"
          src="login-banner.webp"
          alt="Woman in a salon"
          class="h-full w-full object-cover"
        />
      </div>
    </ClientOnly>
  </div>
</template>
