<script setup lang="ts">
import { z } from "zod";
import { toast } from "vue-sonner";

const formData = ref({
  email: "",
  password: "",
});

const errors: any = ref({});

const isShowPassword = ref(false);
const handleShowPassword = () => {
  isShowPassword.value = !isShowPassword.value;
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Please enter your password"),
});

const validateForm = () => {
  const result = loginSchema.safeParse(formData.value);

  if (!result.success) {
    errors.value = result.error.errors.reduce((acc, err) => {
      //@ts-ignore
      acc[err.path[0]] = err.message;
      return acc;
    }, {});

    return false;
  }

  errors.value = {};

  return true;
};

const handleSubmit = () => {
  if (validateForm()) {
    // Handle successful form submission
    console.log("Form data:", formData.value);

    toast.success("Logged in successfully");
  }
};

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

const state = reactive({
  email: undefined,
  password: undefined,
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

          <!-- <UForm :schema="schema" :state="state" class="p-1">
            <div class="w-full space-y-5">
              <UFormGroup
                label="Email Address"
                name="username"
                eager-validation
              >
                <UInput placeholder="Enter your email address" size="lg" />
              </UFormGroup>
              <UFormGroup label="Password" name="password" eager-validation>
                <UInput placeholder="Enter your password" size="lg">
                  <template #trailing>
                    <UButton variant="ghost">
                      <library-general-icon width="14" height="14" />
                    </UButton>
                  </template>
                </UInput>
              </UFormGroup>
            </div>
            <UButton
              to="/forgot-password"
              label="Forgot Password?"
              color="red"
              variant="link"
              class="ml-auto mt-2 flex w-fit"
            />

            <UButton
              type="submit"
              label="Login"
              size="lg"
              class="mt-14"
              icon="i-heroicons-arrow-right"
              block
              trailing
            />
          </UForm> -->

          <!-- <form class="mt-10">
            <div class="text-left mb-2">
              <label for="email">Email</label>
            </div>
            <input
              id="email"
              class="w-full px-4 py-2 rounded bg-white border-2 outline-none"
              :class="errors.email ? 'border-pri' : 'border-sec'"
              type="email"
              v-model="formData.email"
              @input="validateForm"
            />
            <span
              v-if="errors.email"
              class="text-xs text-pri mt-2 flex items-start"
            >
              <Icon name="iwwa:alert" size="15" />
              <p>{{ errors.email }}l</p>
            </span>

            <div class="text-left mt-6 mb-2">
              <label for="email">Password</label>
            </div>
            <div
              class="flex w-full px-4 py-2 rounded bg-white border-2"
              :class="errors.password ? 'border-pri' : 'border-sec'"
            >
              <input
                id="password"
                class="bg-white flex-grow outline-none"
                :type="isShowPassword ? 'text' : 'password'"
                v-model="formData.password"
                @input="validateForm"
              />

              <span class="cursor-pointer" @click="handleShowPassword">
                <Icon
                  v-if="isShowPassword"
                  name="solar:eye-outline"
                  size="20"
                />
                <Icon v-else name="solar:eye-closed-bold" size="20" />
              </span>
            </div>
            <span
              v-if="errors.password"
              class="text-xs text-pri mt-2 flex items-start"
            >
              <Icon name="iwwa:alert" size="15" />
              <p>{{ errors.password }}l</p>
            </span>

            <ButtonBase
              class="h-10 px-5 py-8x text-sm font-medium mt-10 w-full"
              @click.prevent="handleSubmit"
            >
              Continue
            </ButtonBase>
          </form> -->
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
