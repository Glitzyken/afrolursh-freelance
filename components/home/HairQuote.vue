<script setup lang="ts">
const placeBooking = () => {
  console.log("Booking...");
};
</script>

<template>
  <section v-motion-slide-visible-once-bottom class="section">
    <h2 class="h2">
      “I think that the most important thing a woman can have—next to talent, of
      course—is her hairdresser.” - Joan Crawford
    </h2>

    <div class="mt-10 md:mt-20 relative">
      <div
        class="w-full h-full bg-gradient-to-r from-sec absolute rounded-xl"
      ></div>
      <div
        class="w-full h-full bg-gradient-to-r from-sec absolute rounded-xl"
      ></div>

      <div
        class="absolute text-white pt-10 lg:pt-20 p-8 md:pr-0 md:pl-8 md:w-1/2"
      >
        <p class="font-bold text-pri text-xs md:text-sm mb-2">
          PERSONALISED SERVICES THAT WORK
        </p>

        <h3 class="text-3xl md:text-4xl lg:text-5xl mb-5 md:mb-8">
          Book an appointment with our specialists
        </h3>

        <p class="mb-5 md:mb-8">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
          autem quibusdam, sint dolore neque officia iste quae
        </p>

        <ButtonBase @click="placeBooking">
          <Icon
            name="solar:play-bold"
            size="18"
            class="text-white mr-[0.3rem] md:-mt-[0.2rem]"
          />
          Book a specialist instantly
        </ButtonBase>
      </div>

      <nuxt-img
        preload
        format="png"
        quality="100"
        src="hair-quote-3.webp"
        alt="Woman making her hair in a salon"
        class="h-[400px] md:h-[500px] w-full object-cover rounded-xl"
      />
    </div>
  </section>
</template>
