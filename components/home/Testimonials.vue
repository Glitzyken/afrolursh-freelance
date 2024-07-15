<script setup lang="ts">
const contents = [
  {
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maiores quo cum odio minima exercitationem debitis vel unde quasi provident aspernatur eaque dolorem animi delectus accusantium corrupti magnam, nam officiis!",
    image: "esther-allison.webp",
    name: "Esther Allison",
    type: "Customer",
  },
  {
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maiores quo cum odio minima exercitationem debitis vel unde quasi provident aspernatur eaque dolorem animi delectus accusantium corrupti magnam, nam officiis!",
    image: "victoria-gbadamosi.webp",
    name: "Victoria Gbadamosi",
    type: "Customer",
  },
  {
    comment:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maiores quo cum odio minima exercitationem debitis vel unde quasi provident aspernatur eaque dolorem animi delectus accusantium corrupti magnam, nam officiis!",
    image: "ujunwa-okolie.webp",
    name: "Ujunwa Okolie",
    type: "Specialist",
  },
];
</script>

<template>
  <section v-motion-slide-visible-once-left class="section">
    <h2 class="h2">Loved by the industry</h2>

    <div class="grid md:grid-cols-3 gap-10 md:gap-4">
      <div v-for="(content, index) in contents" :key="index">
        <p class="mb-4">
          {{ content.comment }}
        </p>

        <div class="flex gap-6 items-center">
          <Avatar>
            <AvatarImage :src="content.image" :alt="content.name" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <p class="font-bold">{{ content.name }}</p>
            <p>{{ content.type }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
