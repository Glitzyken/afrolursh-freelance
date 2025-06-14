<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null);
const image = ref<string>("");
const imageBlob = ref();

defineProps({
  isModalCropOpen: Boolean,
  fileSizeError: Boolean,
  isLoading: Boolean,
  cropperImage: String,
});

const emits = defineEmits<{
  (e: "try-diff-photo"): void;
  (e: "close"): void;
  (e: "save-btn-clicked"): void;
  (e: "crop-data", data: { imageBlob: Blob; image: string }): void;
}>();

const handleTryDifferentPhoto = () => {
  emits("try-diff-photo");
};

const handleGetCropData = () => {
  emits("save-btn-clicked");
  const cropper = cropperRef.value;

  if (cropper) {
    const result = cropper.getResult();

    if (result) {
      const canvas = result.canvas;

      if (canvas) {
        image.value = canvas.toDataURL();

        canvas.toBlob((blob) => {
          if (!blob) return;

          imageBlob.value = blob;

          emits("crop-data", {
            imageBlob: imageBlob.value,
            image: image.value,
          });
        });
      }
    }
  }
};

const handleCloseModal = () => {
  emits("close");
};
</script>

<template>
  <HeadlessTransitionRoot :show="<boolean>isModalCropOpen" as="template">
    <HeadlessDialog
      :open="<boolean>isModalCropOpen"
      class="fixed inset-0 z-50 overflow-y-auto"
    >
      <div class="fixed inset-0 bg-black/80"></div>

      <div
        class="flex items-center justify-center min-h-full p-4 text-center sm:p-0"
      >
        <HeadlessTransitionChild
          enter="transition ease duration-500 transform"
          enter-from="opacity-0 -translate-y-12"
          enter-to="opacity-100 translate-y-0"
          leave="transition ease duration-300 transform"
          leave-from="opacity-100 translate-y-0"
          leave-to="opacity-0 -translate-y-12"
          as="template"
        >
          <HeadlessDialogPanel
            class="relative w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-black rounded-2xl shadow-xl"
          >
            <HeadlessDialogTitle
              as="h2"
              class="flex items-center justify-between mb-1.5 font-medium leading-6 text-white sm:text-xl"
            >
              {{ fileSizeError ? "Dang" : "Crop your photo" }}
            </HeadlessDialogTitle>
            <p v-if="!fileSizeError" class="text-xs text-white">
              Choose a photo that's well-lit and shows you in your best light.
            </p>
            <div class="mt-6">
              <Cropper
                v-if="!fileSizeError"
                ref="cropperRef"
                style="height: 420px; width: 100%; border-radius: 12px"
                :src="cropperImage"
                :aspect-ratio="1"
                view-mode="2"
                :min-crop-box-height="100"
                :min-crop-box-width="100"
                :background="false"
                :responsive="true"
                :auto-crop-area="1"
                :check-orientation="false"
                :guides="true"
              />
              <div
                v-else
                class="flex flex-col items-center justify-center w-full h-[420px] gap-2 text-center text-sm font-medium bg-grey1 rounded-lg"
              >
                <span
                  role="img"
                  aria-label="upside-down face"
                  class="block text-2xl"
                >
                  🙃
                </span>
                <p>
                  That's a very nice photo, but it's a bit too big.
                  <br />
                  Try one that's less than 3MB.
                </p>
              </div>
            </div>
            <div
              v-if="!fileSizeError"
              class="flex items-center justify-end mt-6 gap-6"
            >
              <ButtonSec
                class="text-white p-1"
                :disabled="isLoading"
                @click="handleCloseModal"
              >
                Close
              </ButtonSec>
              <ButtonBase
                class="w-full"
                @click="handleGetCropData"
                :isLoading="isLoading"
                :isDisabled="isLoading"
              >
                Save Crop
                <template #spinner>
                  <SpinnerSm />
                </template>
              </ButtonBase>
            </div>
            <div v-else class="flex items-center justify-end mt-6 gap-5">
              <ButtonSec @click="handleCloseModal" class="text-white p-1">
                Cancel
              </ButtonSec>
              <ButtonBase class="w-full" @click="handleTryDifferentPhoto">
                Try a different photo
              </ButtonBase>
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>
