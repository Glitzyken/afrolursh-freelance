<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div class="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
        <div class="sm:max-w-lg">
          <h1 class="h1">Life is more beautiful</h1>
          <p class="text-3xl leading-1">when you meet the right hairdresser.</p>

          <p class="mt-4 text-xl">
            They need you, make impact in the life of people.
            <span class="font-bold">Become a specialist</span>
          </p>
        </div>
        <div>
          <div class="mt-10">
            <!-- Decorative image grid -->
            <div
              aria-hidden="true"
              class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl"
            >
              <div
                class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
              >
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div
                      class="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                    >
                      <img
                        src="../assets/img/1.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/2.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/4.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/5.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/7.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/3.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-44 overflow-hidden rounded-lg">
                      <img
                        src="../assets/img/6.jpg"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <ButtonBase @click="useAuthStore().isSignupModalOpen = true">
              Become a specialist
            </ButtonBase>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
