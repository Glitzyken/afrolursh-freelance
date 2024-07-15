<script setup lang="ts">
import { useAuthStore } from "@/store/auth";
</script>

<template>
  <section v-motion-pop-visible-once class="section">
    <div
      class="bg-sec text-white py-10 lg:py-20 p-8 md:pr-0 md:pl-8 md:grid md:grid-cols-2 lg:gap-4"
    >
      <div>
        <p class="font-bold text-pri text-xs md:text-sm mb-2">
          READY TO GET STARTED
        </p>

        <h3 class="text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-8">
          Join a league of happy customers and hair specialists
        </h3>

        <p class="mb-5 md:mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          autem quibusdam, sint dolore neque officia iste quae minus vel dolor
          consequuntur maxime.
        </p>

        <ButtonBase
          @click="useAuthStore().isLoginModalOpen = true"
          class="h-10 px-5 py-8x text-sm font-medium"
        >
          Join the league
        </ButtonBase>
      </div>

      <div class="hidden md:block px-10 lg:px-20 text-center">
        <div>
          <Icon name="solar:people-nearby-bold" size="50" class="text-white" />
        </div>
        <div class="flex justify-between">
          <Icon name="mingcute:hair-fill" size="50" class="text-white" />
          <Icon name="ph:hair-dryer-fill" size="50" class="text-white" />
        </div>
        <div>
          <Icon name="solar:home-bold" size="50" class="text-white" />
        </div>
        <div class="flex justify-between mb-10">
          <Icon name="maki:hairdresser" size="50" class="text-white" />
          <Icon name="subway:location-3" size="50" class="text-white" />
        </div>
        <div class="flex justify-around">
          <Icon name="solar:bar-chair-bold" size="50" class="text-white" />
          <Icon name="solar:armchair-bold" size="50" class="text-white" />
        </div>
      </div>
    </div>
  </section>
</template>
