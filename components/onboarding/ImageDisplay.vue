<script setup lang="ts">
const isLoading = ref(false);
const isLoadingUpdate = ref(false);

defineProps({
  image: String,
});

const emits = defineEmits<{
  (e: "try-diff-photo"): void;
  (e: "close"): void;
  (
    e: "crop-data",
    data: { imageBlob: Blob; imageBlobURL: string; image: string }
  ): void;
}>();

const clearPhoto = () => {
  // Function to clear the photo
};

const onButtonClick = () => {
  // Function to handle button click for selecting image
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
      <TrashIcon size="18" class="text-[#292D32]" />
    </button>
    <button
      :disabled="isLoading || isLoadingUpdate"
      @click="onButtonClick"
      title="select image"
      class="absolute right-14 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DB] bg-white"
    >
      <UploadIcon size="18" class="text-[#292D32]" />
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
