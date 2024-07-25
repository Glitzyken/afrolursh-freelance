<script setup lang="ts">
import { h } from "vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API } from "~/services";
import { useAuthStore } from "~/store/auth";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const isLoading = ref(false);
const role = ref("Individual");

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

const formSchema = toTypedSchema(
  z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
  })
);

const { handleSubmit } = useForm({
  validationSchema: formSchema,
  initialValues: {
    items: ["recents", "home"],
  },
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});

const handleGoBack = () => {
  useRouter().push({ path: "/onboarding/start" });
};
</script>

<template>
  <section class="section mt-10 w-full md:w-3/4 lg:w-2/4 m-auto">
    <h1 class="text-center short-title">
      Nice to meet you! <br />
      What's your specialty?
    </h1>

    <p class="text-sm text-center">
      We'll use this to match you with the right clients
    </p>

    <ClientOnly>
      <form class="mt-10" @submit="onSubmit">
        <div class="max-h-96 overflow-scroll overflow-x-hidden p-2">
          <FormField name="items">
            <FormItem class="flex flex-wrap justify-left items-end gap-4">
              <FormField
                v-for="item in items"
                v-slot="{ value, handleChange }"
                :key="item.id"
                type="checkbox"
                :value="item.id"
                :unchecked-value="false"
                name="items"
              >
                <FormItem
                  class="flex flex-row items-start space-x-3 space-y-0 bg-pri/25 p-5 rounded-md"
                >
                  <FormControl>
                    <Checkbox
                      :checked="value.includes(item.id)"
                      @update:checked="handleChange"
                    />
                  </FormControl>
                  <FormLabel class="font-normal">
                    {{ item.label }}
                  </FormLabel>
                </FormItem>
              </FormField>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

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
