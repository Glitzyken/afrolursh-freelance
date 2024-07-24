<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <Hero />
  <Why />
  <!-- <SpecialistsGoThrough /> -->
  <HairQuote />
  <!-- <SpreadTheWord /> -->
  <Testimonials />
  <JoinHappyPeople />
  <!-- <FAQ /> -->
</template>
