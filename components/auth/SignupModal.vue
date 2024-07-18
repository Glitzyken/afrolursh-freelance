<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { toast } from "vue-sonner";
import { useForm } from "vee-validate";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const { handleSubmit } = useForm({
  validationSchema: signupSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);

  toast.success("You submitted the following values:", {
    description: `${JSON.stringify(values, null, 2)}`,
  });
});
</script>

<template>
  <div>
    <Dialog v-model:open="useAuthStore().isLoginModalOpen">
      <DialogContent
        v-motion-slide-visible-once-bottom
        class="sm:max-w-[425px]"
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

        <form
          v-motion-slide-visible-once-left
          class="space-y-6"
          @submit="onSubmit"
        >
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

          <ButtonBase class="h-10 px-5 py-8x text-sm font-medium mt-10 w-full">
            Sign up and book an appointment
          </ButtonBase>
        </form>

        <div class="mt-5 text-sm text-center">
          Already have an account?
          <NuxtLink
            to="/login"
            active-class="link-underline-custom"
            class="navbar-items"
            title="Login"
            @click="useAuthStore().isLoginModalOpen = false"
            >Log in</NuxtLink
          >
        </div>
      </DialogContent>
    </Dialog>
  </div>
</template>
