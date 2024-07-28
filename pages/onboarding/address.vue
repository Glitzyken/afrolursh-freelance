<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const isLoading = ref(false);

const formSchema = toTypedSchema(
  z.object({
    address: z.string().min(2),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const handleGoBack = () => {
  // TODO if user role = individual vs specialist
  useRouter().push({ path: "/onboarding/start" });
};
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
