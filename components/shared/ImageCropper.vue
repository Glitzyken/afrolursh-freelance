<script setup lang="ts">
import { Cropper } from "vue-advanced-cropper";

defineProps({
  isModalCropOpen: Boolean,
  fileSizeError: Boolean,
  isLoading: Boolean,
  cropperImage: String,
});

const emits = defineEmits<{
  (e: "try-diff-photo"): void;
  (e: "close"): void;
  (e: "crop-data", data: any): void;
}>();

const handleTryDifferentPhoto = (code: string) => {
  emits("try-diff-photo");
};

const handleGetCropData = (data: any) => {
  emits("crop-data", data);
};

const handleCloseModal = (data: any) => {
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
                class="text-sm font-medium link-underline-main to-white from-white"
                :disabled="isLoading"
                @click="isLoading ? null : handleCloseModal"
              >
                Close
              </ButtonSec>
              <ButtonBase
                class="h-10 w-[74px] rounded-[7px]"
                @click="handleGetCropData"
                :isLoading="<boolean>isLoading"
                :isDisabled="<boolean>isLoading"
              >
                Save
                <template #spinner>
                  <SpinnerSm />
                </template>
              </ButtonBase>
            </div>
            <div v-else class="flex items-center justify-end mt-6 gap-5">
              <ButtonSec @click="handleCloseModal as any" class="text-white">
                Cancel
              </ButtonSec>
              <ButtonBase class="w-[170px]" @click="handleTryDifferentPhoto">
                Try a different photo
              </ButtonBase>
            </div>
          </HeadlessDialogPanel>
        </HeadlessTransitionChild>
      </div>
    </HeadlessDialog>
  </HeadlessTransitionRoot>
</template>
