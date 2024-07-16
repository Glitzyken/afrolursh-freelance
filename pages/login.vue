<script setup lang="ts">
import { z } from "zod";
import { useForm } from "vee-validate";
import { toast } from "vue-sonner";
import { toTypedSchema } from "@vee-validate/zod";
import { vAutoAnimate } from "@formkit/auto-animate/vue";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(1, "Please enter your password"),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit((values) => {
  console.log(values);

  toast.success("You submitted the following values:", {
    description: `${JSON.stringify(values, null, 2)}`,
  });
});
</script>

<template>
  <div class="md:h-[90vh] md:grid md:grid-cols-2 md:gap-8">
    <div class="md:flex md:flex-col md:justify-between">
      <div class="w-full h-full"></div>
      <div class="flex flex-col items-center px-5 md:px-0 mt-10 md:mt-0">
        <Logo />

        <div class="text-center mt-5 w-full lg:w-3/5">
          <p class="font-bold text-3xl mb-2">Welcome back</p>
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
                    type="text"
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
              class="h-10 px-5 py-8x text-sm font-medium mt-10 w-full"
            >
              Continue
            </ButtonBase>
          </form>
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
  </div>
</template>
