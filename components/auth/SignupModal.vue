<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
import { z } from "zod";
import { toast } from "vue-sonner";

const formData = ref({
  email: "",
});

const errors: any = ref({});

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email"),
});

const validateForm = () => {
  const result = signupSchema.safeParse(formData.value);

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

    toast.success("Link sent to your email address");
  }
};
</script>

<template>
  <div>signup modal</div>
</template>
