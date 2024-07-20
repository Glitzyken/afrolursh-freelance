<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { useForm } from "vee-validate";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { API } from "~/services";

const isLoading = ref(false);
const isLinkSent = ref(false);

const { handleSubmit } = useForm({
  validationSchema: signupSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;

  const res = await API.auth.sendMagicLink({ email: values.email });
  isLoading.value = false;

  if (res) {
    successToast("Link successfully sent");
    isLinkSent.value = true;
  }
});
</script>

<template>
  <div>
    <Dialog v-model:open="useAuthStore().isSignupModalOpen">
      <DialogContent
        v-motion-slide-visible-once-bottom
        class="sm:max-w-[525px] bg-white"
        v-if="isLinkSent"
      >
        <DialogHeader v-motion-slide-visible-once-left>
          <DialogTitle class="font-bold text-xl text-center"
            >Verify you email address</DialogTitle
          >
          <DialogDescription
            v-motion-slide-visible-once-left
            class="text-center text-sm text-sec"
          >
            We've sent a verification email to example@example.com <br />
            Check your inbox, spam, or promotion folder.
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-3 justify-center">
          <a
            href="https://mail.google.com/mail/u/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonSec class="w-fit px-1">
              <Icon
                name="logos:google-gmail"
                size="12"
                class="mr-[0.3rem] mb-[3px]"
              />
              <span class="text-sm"> Open Gmail </span>
              <Icon name="lucide:external-link" size="9" class="mb-[8px]" />
            </ButtonSec>
          </a>

          <a
            href="https://mail.yahoo.com?subject=Verify%20your%20Email"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ButtonSec class="w-fit px-1">
              <Icon
                name="fa-brands:yahoo"
                size="12"
                class="mr-[0.3rem] mb-[3px]"
              />
              <span class="text-sm"> Open Yahoo </span>
              <Icon name="lucide:external-link" size="9" class="mb-[8px]" />
            </ButtonSec>
          </a>
        </div>

        <div class="text-center">
          <ButtonSec @click="isLinkSent = false" class="mt-5 w-fit">
            Change email
          </ButtonSec>
        </div>
      </DialogContent>

      <DialogContent
        v-motion-slide-visible-once-bottom
        class="sm:max-w-[525px] bg-white"
        v-else
      >
        <DialogHeader v-motion-slide-visible-once-left>
          <DialogTitle class="font-bold text-xl text-center"
            >Start your beauty ... today!</DialogTitle
          >
          <DialogDescription
            v-motion-slide-visible-once-left
            class="text-center text-sm text-sec"
          >
            By signing up, I agree to Afrolursh's
            <NuxtLink
              to="/about-us"
              active-class="link-underline-custom"
              class="navbar-items"
              title="About us"
            >
              <u>Terms</u>
            </NuxtLink>
            and
            <NuxtLink
              to="/about-us"
              active-class="link-underline-custom"
              class="navbar-items"
              title="About us"
            >
              <u>Privacy Policy</u>
            </NuxtLink>
          </DialogDescription>
        </DialogHeader>

        <form class="space-y-10" @submit="onSubmit">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem v-auto-animate>
              <div class="text-left">
                <FormLabel>Enter your email</FormLabel>
              </div>
              <FormControl>
                <Input
                  class="bg-white border-2 border-sec/25"
                  type="text"
                  placeholder="you@example.com"
                  v-bind="componentField"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <ButtonBase :isLoading="isLoading" type="submit" class="w-full">
            Send link

            <template #spinner>
              <SpinnerSm />
            </template>
          </ButtonBase>
        </form>

        <div class="mt-5 text-sm text-center">
          Already have an account?
          <NuxtLink
            to="/login"
            active-class="link-underline-custom"
            class="navbar-items"
            title="Login"
            @click="useAuthStore().isSignupModalOpen = false"
            >Log in</NuxtLink
          >
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
