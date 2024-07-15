<script setup lang="ts">
const contents = [
  {
    icon: "solar:medal-ribbon-bold",
    title: "Access top hair specialists",
    description:
      "Our vetted hair specialists have minimum of 10 years of experience in the industry with highly recognized certifications in their various expertise.",
  },
  {
    icon: "mingcute:hair-2-fill",
    title: "Creative hair style choices",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod ut aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: "solar:home-2-bold",
    title: "Convenient home services",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod ut aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: "solar:chair-2-bold-duotone",
    title: "Best luxurous saloon network",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod ut aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    icon: "fluent:person-support-16-filled",
    title: "Enjoy comprehensive support",
    description:
      "Lorem ipsum dolor sit amet, sed do eiusmod ut aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];
</script>

<template>
  <section class="section">
    <h2 class="h2 text-center">
      Reliable platform for finding professional hair stylists who truly care
    </h2>

    <div class="grid md:grid-cols-3 gap-5">
      <div v-for="(content, index) in contents" :key="index">
        <Icon :name="content.icon" size="40" class="mb-3 text-sec" />
        <h3 class="h3 mb-3">{{ content.title }}</h3>
        <p>
          {{ content.description }}
        </p>
      </div>
    </div>
  </section>
</template>
