<script setup lang="ts">
import services from "../../assets/mock-data/services.json";

import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards, Autoplay } from "swiper/modules";

const modules = [EffectCards, Autoplay];

const placeBooking = () => {
  console.log("Booking...");
};
</script>

<template>
  <section
    class="flex flex-col lg:flex-row gap-20 lg:gap-0 justify-between mt-10 section"
  >
    <div class="lg:w-3/5">
      <h1 class="h1">
        Your next
        <mark class="bg-sec text-white font-medium px-2 leading-[1.7]"
          ><em>hairdo</em></mark
        >
        starts here...
      </h1>

      <p class="mt-5 mb-5 md:text-lg">
        Get instant access to vetted hair specialists with our trusted solution
        for your hair needs.
      </p>

      <ButtonBase @click="placeBooking">
        Book a specialist instantly
      </ButtonBase>
    </div>

    <div class="lg:w-2/5">
      <swiper
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }"
        :effect="'cards'"
        :grabCursor="true"
        :modules="modules"
      >
        <swiper-slide
          v-for="service in services"
          :key="service._id"
          class="relative"
        >
          <div
            class="flex justify-center items-end absolute bottom-0 w-full h-3/5 pb-3 text-sm bg-gradient-to-t from-sec font-thin"
          >
            {{ service.name }}
          </div>
          <nuxt-img
            preload
            format="png"
            quality="100"
            :src="
              'https://afrolursh-staging.s3.eu-west-2.amazonaws.com/mediaPreview/' +
              service.picture
            "
            :alt="service.name"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>
