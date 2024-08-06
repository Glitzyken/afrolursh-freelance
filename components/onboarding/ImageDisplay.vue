<script setup lang="ts">
const isLoading = ref(false);
const isLoadingUpdate = ref(false);

defineProps({
  image: String,
});

const emits = defineEmits<{
  (e: "clear-photo"): void;
  (e: "pick-photo"): void;
}>();

const clearPhoto = () => {
  emits("clear-photo");
};

const pickPhoto = () => {
  emits("pick-photo");
};
</script>

<template>
  <div class="relative h-[380px] transition-all">
    <button
      :disabled="isLoading || isLoadingUpdate"
      @click="clearPhoto"
      title="remove image"
      class="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white"
    >
      <Icon
        name="solar:trash-bin-minimalistic-bold"
        size="18"
        class="text-black"
      />
    </button>
    <button
      :disabled="isLoading || isLoadingUpdate"
      @click="pickPhoto"
      title="select image"
      class="absolute right-14 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white"
    >
      <Icon name="solar:upload-bold" size="18" class="text-black" />
    </button>
    <nuxt-img
      width="320"
      height="380"
      :src="image"
      alt="profile picture"
      priority
      class="h-full w-full rounded-xl object-cover transition-all"
    />
  </div>
</template>
