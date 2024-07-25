<script setup lang="ts">
import { useForm } from "vee-validate";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { API } from "~/services";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

definePageMeta({
  middleware: "auth",
});

const isLoading = ref(false);
const role = ref("Individual");

const { handleSubmit } = useForm({
  validationSchema: onboardingStartSchema,
});

const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  if (!values.role) values.role = "Individual";

  const data = await API.user.updateMe({
    role: values.role,
    onboardingStep: 1,
  });

  isLoading.value = false;

  if (data) {
    authStore.user = data.data?.result;
    useRouter().push({ path: "/onboarding/services" });
  }
});
</script>

<template>
  <section class="section mt-10 w-96 m-auto">
    <h1 class="text-center short-title">
      Awesome! <br />
      What are you Interested in?
    </h1>

    <p class="text-sm text-center">
      Select how you would like to be a part of our community?
    </p>

    <ClientOnly>
      <form class="mt-10 space-y-6" @submit="onSubmit">
        <FormField v-slot="{ componentField }" type="radio" name="role">
          <FormItem class="space-y-3">
            <FormControl>
              <RadioGroup
                class="flex flex-col space-y-1"
                v-bind="componentField"
                v-model="role"
                :default-value="role"
              >
                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <div
                    class="p-5 flex gap-4 rounded-md"
                    :class="
                      role === 'Specialist' ? 'bg-pri/25' : 'border border-sec'
                    "
                  >
                    <div>
                      <FormControl>
                        <RadioGroupItem value="Specialist" />
                      </FormControl>
                    </div>
                    <FormLabel>
                      <div class="cursor-pointer">
                        <p class="text-xl font-bold">
                          Join as a specialist
                          <Icon
                            name="ph:hair-dryer-fill"
                            size="20"
                            class="text-sec"
                          />
                        </p>

                        <p class="leading-5">
                          Mentor people in tech, grow your network and create a
                          great legacy in a global community
                        </p>
                      </div>
                    </FormLabel>
                  </div>
                </FormItem>

                <FormItem class="flex items-center space-y-0 gap-x-3">
                  <div
                    class="p-5 flex gap-4 rounded-md"
                    :class="
                      role === 'Individual' ? 'bg-pri/25' : 'border border-sec'
                    "
                  >
                    <div>
                      <FormControl>
                        <RadioGroupItem value="Individual" />
                      </FormControl>
                    </div>
                    <FormLabel>
                      <div class="cursor-pointer">
                        <p class="text-xl font-bold">
                          Join as an individual
                          <Icon
                            name="mingcute:hair-fill"
                            size="20"
                            class="text-sec"
                          />
                        </p>

                        <p class="leading-5">
                          Mentor people in tech, grow your network and create a
                          great legacy in a global community
                        </p>
                      </div>
                    </FormLabel>
                  </div>
                </FormItem>
              </RadioGroup>
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
  </section>
</template>
