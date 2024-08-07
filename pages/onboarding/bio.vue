<script setup lang="ts">
import { remove } from "lodash";
import { languageFile } from "~/assets/data/languages";
import { API } from "~/services";
import { Role } from "~/services/enums";
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

const cropperImage = ref<string>("");
const image = ref<string>("");
const imageBlob = ref();
const inputFile = ref<HTMLInputElement | null>(null);
const isModalCropOpen = ref(false);
const fileSizeError = ref(false);
const isDragging = ref(false);
const isLoading = ref(false);
const languages = ref<string[]>(languageFile);
const isDropdownSearch = ref(false);
const selectedLanguages = ref(["English"]);
const bio = ref<string>("");
const imageFormData = ref<FormData | null>(null);
const errors = ref<string[]>([]);
let query = ref("");

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

  const formData = new FormData();

  formData.append("image", imageBlob.value);

  imageFormData.value = formData;

  if (errors.value.includes("photo")) {
    remove(errors.value, (val) => val === "photo");
  }
};

const pickPhoto = () => {
  if (inputFile.value) {
    inputFile.value.click();
  }

  isModalCropOpen.value = false;
};

const handleDragEnter = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};
const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};
const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};
const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
  isModalCropOpen.value = true;

  const file = e?.dataTransfer?.files[0];

  if (file) {
    if (convertBytesToMB(file.size) >= MAX_FILE_SIZE) {
      clearPhoto(e);
      fileSizeError.value = true;
    } else {
      fileSizeError.value = false;
      cropperImage.value = URL.createObjectURL(file);
    }
  } else {
    console.error("No files found in dataTransfer");
  }
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
    imageFormData.value = null;
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

let filteredLanguages = computed(() =>
  query.value === ""
    ? languages.value
    : languages.value.filter((language) =>
        language
          .toLowerCase()
          .replace(/\s+/g, "")
          .includes(query.value.toLowerCase().replace(/\s+/g, ""))
      )
);

const handeShowDropdownSearch = () => {
  isDropdownSearch.value = !isDropdownSearch.value;
};

const handleSubmit = async () => {
  if (authStore.user?.role === Role.Specialist) {
    if (!imageFormData.value) {
      errors.value.push("photo");
    }

    if (!bio.value) {
      errors.value.push("bio");
    }

    if (errors.value.length) return;
  }

  isLoading.value = true;

  const payload = {
    languages: selectedLanguages.value,
    bio: bio.value,
    onboardingStep: 4,
  };

  const uploaded = await API.user.updateMyPhoto(
    imageFormData.value as FormData
  );

  isLoading.value = false;

  if (uploaded) {
    const data = await API.user.updateMe(payload);

    if (data) {
      authStore.user = data.data?.result;
      useRouter().push({ path: "/onboarding/finish" });
    }
  }
};

const handleGoBack = () => {
  authStore.isGoBack = true;
  useRouter().push({ path: "/onboarding/address" });
};

watch(bio, (val) => {
  if (val.length > 50) {
    if (errors.value.includes("bio")) {
      remove(errors.value, (val) => val === "bio");
    }
  }
});
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
        <p>
          Add a photo and
          {{ authStore.user?.role === Role.Specialist ? "bio" : "language" }}
        </p>
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
              :class="`flex h-[380px] flex-col rounded border-2 border-dashed px-30x shadow ${
                isDragging ? 'border-white' : 'border-grey1'
              }`"
            >
              <div class="mb-6 mt-28">
                <div class="flex flex-col items-center justify-center">
                  <div class="h-10 w-10">
                    <Icon name="solar:upload-bold" size="40" class="text-sec" />
                  </div>
                  <p class="mt-4 text-center text-sm tracking-wider">
                    <span class="mb-8x block font-semibold sm:text-lg">
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
        <p
          v-if="errors.includes('photo')"
          v-motion-slide-top
          class="mt-[0.3rem] text-xs text-red-700"
        >
          Photo is required
        </p>
      </section>

      <section class="sm:w-[400px]">
        <div class="flex flex-col gap-6 relative">
          <button
            @click="handeShowDropdownSearch"
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            class="flex justify-between bg-white border-2 border-sec/25 px-4 py-2 text-sm rounded focus:ring-1 focus:outline-none focus:ring-sec"
            type="button"
          >
            {{ selectedLanguages?.join(",") }} ({{ selectedLanguages?.length }})
            <Icon name="formkit:down" size="20" class="text-sec" />
          </button>

          <!-- Dropdown menu -->
          <div
            v-if="isDropdownSearch"
            id="dropdownSearch"
            class="z-10 bg-white rounded shadow w-full absolute top-14"
          >
            <div class="p-3">
              <label for="input-group-search" class="sr-only">Search</label>
              <div class="relative">
                <div
                  class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                  <Icon name="icomoon-free:search" size="20" class="text-sec" />
                </div>
                <input
                  v-model="query"
                  type="text"
                  id="input-group-search"
                  class="bg-white border-2 border-sec/25 text-sec text-sm rounded focus:ring-sec focus:border-sec block w-full ps-10 p-2.5"
                  placeholder="Search language"
                />
              </div>
            </div>
            <ul
              class="h-48 px-3 pb-3 overflow-y-auto text-sm text-sec"
              aria-labelledby="dropdownSearchButton"
            >
              <li v-for="language in filteredLanguages">
                <div class="flex items-center p-2 rounded hover:bg-gray-100">
                  <input
                    :id="language"
                    type="checkbox"
                    :value="language"
                    v-model="selectedLanguages"
                    class="w-4 h-4 text-pri bg-gray-100 border-sec/25 rounded focus:ring-sec"
                  />
                  <label
                    :for="language"
                    class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >{{ language }}</label
                  >
                </div>
              </li>
            </ul>
          </div>

          <div
            class="grid w-full gap-2 mt-5"
            v-if="authStore.user?.role === Role.Specialist"
          >
            <Label for="bio"
              >Tell us about your yourself
              <span class="text-xs">(required)</span></Label
            >
            <Textarea
              class="bg-white border-sec/25 rounded focus:ring-sec"
              rows="10"
              id="bio"
              placeholder="Type your message here."
              v-model="bio"
            />
            <p
              v-if="errors.includes('bio')"
              v-motion-slide-top
              class="text-xs text-red-700"
            >
              Bio must be at least 50 characters long
            </p>
            <p class="text-sm text-muted-foreground">
              How would you like to be intro'd? Add a short bio.
            </p>
          </div>
        </div>
      </section>
    </div>

    <div class="mx-auto mt-6 flex max-w-3xl flex-col gap-3">
      <ButtonBase
        :isLoading="isLoading"
        type="submit"
        loadingText="Please enter your email"
        class="w-full mt-10"
        @click="handleSubmit"
      >
        Finish
        <template #spinner>
          <SpinnerSm />
        </template>
      </ButtonBase>
      <ButtonSec @click="handleGoBack" class="w-full mt-3"> Back </ButtonSec>
    </div>
  </section>
</template>
