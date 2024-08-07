<script setup lang="ts">
const cropperImage = ref<string>("");
const image = ref<string>("");
const imageBlob = ref();
const inputFile = ref<HTMLInputElement | null>(null);
const isModalCropOpen = ref(false);
const fileSizeError = ref(false);
const dragging = ref(false);
const isLoadingUpdate = ref(false);
const isLoading = ref(false);
const isSwagUploading = ref(false);
const user = ref({});

const closeModal = () => {
  clearPhoto();
  isModalCropOpen.value = false;
};

const saveBtnClicked = () => {
  isLoading.value = true;
};

const getCropData = (data: { imageBlob: Blob; image: string }) => {
  image.value = data.image;
  imageBlob.value = data.imageBlob;
  isModalCropOpen.value = false;
  isLoading.value = false;

  console.log(imageBlob.value);
};

const pickPhoto = () => {
  if (inputFile.value) {
    inputFile.value.click();
  }

  isModalCropOpen.value = false;
};

const handleDragEnter = () => {
  /* your logic here */
};
const handleDragLeave = () => {
  /* your logic here */
};
const handleDragOver = () => {
  /* your logic here */
};
const handleDrop = () => {
  /* your logic here */
};

const clearPhoto = (e?: Event) => {
  e?.preventDefault();

  const input = document.getElementById(
    "profile-picture-input"
  ) as HTMLInputElement;

  if (input?.value) {
    input.value = "";
    image.value = "";
    imageBlob.value = null;
    // setImgFormData(null)
  }
};

const handleImageChange = (e: Event) => {
  isModalCropOpen.value = true;
  const target = e.target as HTMLInputElement;
  const file = target.files ? target.files[0] : null;

  if (file) {
    if (convertBytesToMB(file.size) >= MAX_FILE_SIZE) {
      clearPhoto(e);
      fileSizeError.value = true;
    } else {
      fileSizeError.value = false;
      cropperImage.value = URL.createObjectURL(file);
    }
  }
};

const handleSubmit = (callback: any) => {
  /* your logic here */
};
</script>

<template>
  <section class="px-6 pb-16 overflow">
    <ImageCropper
      :isModalCropOpen="isModalCropOpen"
      :fileSizeError="fileSizeError"
      :isLoading="isLoading"
      :cropperImage="cropperImage"
      @close="closeModal"
      @crop-data="getCropData"
      @try-diff-photo="pickPhoto"
      @save-btn-clicked="saveBtnClicked"
    />

    <div class="mx-auto mb-6 mt-9 sm:mb-8 sm:mt-16 sm:w-[520px] sm:text-center">
      <h1 class="mb-8x text-xl font-bold sm:text-2xl">
        Put a face to your name.
        <p>Add a photo and social details</p>
      </h1>
      <p class="text-sm">
        A photo helps you get bookings and lets people know who they're booking
        with.
      </p>
    </div>

    <div
      class="mx-auto flex max-w-4xl flex-col justify-center gap-8 pb-16 sm:flex-row sm:pb-0"
    >
      <section class="text-left sm:text-center">
        <div class="relative mx-auto font-medium sm:w-[320px]">
          <ImageDisplay
            v-if="image"
            :image="image"
            @pick-photo="pickPhoto"
            @clear-photo="clearPhoto"
          />
          <label
            :class="`w-full cursor-pointer ${
              image ? 'absolute left-0 top-0 -z-10' : 'z-10'
            }`"
          >
            <div
              @dragenter="handleDragEnter"
              @dragleave="handleDragLeave"
              @dragover="handleDragOver"
              @drop="handleDrop"
              :class="`flex h-[380px] flex-col rounded border-2 border-dashed bg-dark px-30x shadow ${
                dragging ? 'border-white' : 'border-grey2'
              }`"
            >
              <div class="mb-6 mt-28">
                <div class="flex flex-col items-center justify-center">
                  <div class="h-10 w-10">
                    <Icon name="solar:upload-bold" size="40" class="text-sec" />
                  </div>
                  <p
                    class="mt-4 text-center text-sm tracking-wider text-whitest"
                  >
                    <span
                      class="mb-8x block text-base font-semibold sm:text-lg"
                    >
                      Drag your photo here
                    </span>
                    <span class="text-sm font-normal">
                      Photo must be less than 3MB
                    </span>
                  </p>
                </div>
                <input
                  id="profile-picture-input"
                  type="file"
                  class="hidden opacity-0"
                  ref="inputFile"
                  accept="image/*"
                  @change="handleImageChange"
                />
              </div>
              <div class="mb-11 flex justify-center">
                <button
                  class="w-full text-sm font-medium underline"
                  @click="pickPhoto"
                >
                  Upload from your device
                </button>
              </div>
            </div>
          </label>
        </div>
        <!-- <button
          class="mt-4 inline-flex items-center gap-1.5 text-sm text-grey9 underline transition-all"
          @click="() => setOpen(true)"
        >
          <Info class="text-grey6" size="18" />
          Tips for uploading a good profile picture
        </button> -->
      </section>

      <section class="sm:w-[400px]">
        <div class="flex flex-col gap-6">
          <!-- <InputWithLabel
            label="Portfolio or Personal Site"
            id="portfolio"
            placeholder="Behance, Dribbble, GitHub Profile link"
            v-model="portfolio"
            :errors="errors?.portfolio"
          /> -->
          <div>
            <!-- <InputWithLabel
              icon="<InputIconWrapper><LinkedInLogoIcon width='19' height='19' /></InputIconWrapper>"
              label="LinkedIn URL"
              :disabled="isLoadingUpdate || isLoading || isSwagUploading"
              :placeholder="
                user?.linkedin || 'https://linkedin.com/in/ejiro-asiuwhu'
              "
              v-model="linkedin"
              :errors="errors?.linkedin"
            /> -->
            <a
              href="https://www.linkedin.com/in/"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 inline-block text-sm font-normal underline"
            >
              Get your LinkedIn profile link
            </a>
          </div>

          <div>
            <!-- <InputWithLabel
              icon="<InputIconWrapper><TwitterLogo width='19' height='19' weight='fill' /></InputIconWrapper>"
              label="Twitter (x.com)"
              :disabled="isLoadingUpdate || isLoading || isSwagUploading"
              :placeholder="user?.twitter || 'https://x.com/godofproducts'"
              v-model="twitter"
              :errors="errors.twitter"
            /> -->
            <a
              href="https://twitter.com/settings/screen_name"
              target="_blank"
              rel="noopener noreferrer"
              class="mt-3 inline-block text-sm font-normal underline"
            >
              Get your Twitter profile link
            </a>
          </div>
        </div>
      </section>
    </div>

    <div class="mx-auto mt-6 flex max-w-3xl flex-col gap-3">
      <!-- <ButtonPri
        :isLoading="isLoadingUpdate || isLoading || isSwagUploading"
        :isDisabled="isLoading || isSwagUploading"
        :spinner="<Spinner />"
        type="submit"
        class="w-full"
        @click="handleSubmit((d) => handleNext(d))"
      >
        Continue
      </ButtonPri> -->
      <ButtonSec
        :isDisabled="isLoading || isLoadingUpdate || isSwagUploading"
        class="inline-flex w-full rounded-lg bg-grey7 !py-0 px-3 text-sm font-medium hover:bg-grey1"
      >
        Back
      </ButtonSec>
    </div>
  </section>
</template>
