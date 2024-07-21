<script setup lang="ts">
import { useBurgerStore } from "@/store/burger";
import { useAuthStore } from "~/store/auth";

const burgerStore = useBurgerStore();

const toggleDrawer = () => burgerStore.toggle();
const openSignupModal = () => {
  burgerStore.toggle();
  useAuthStore().isSignupModalOpen = true;
};
</script>

<template>
  <div
    v-if="burgerStore.isOpen"
    v-motion-slide-visible-once-bottom
    class="fixed top-0 left-0 px-3 py-5 w-full h-full bg-white z-[2147483647]"
  >
    <div class="flex justify-between mb-10">
      <Icon
        @click="toggleDrawer"
        name="icomoon-free:search"
        size="26"
        class="text-sec"
      />

      <Logo @click="toggleDrawer" />

      <div>
        <Icon
          @click="toggleDrawer"
          name="solar:close-circle-bold"
          size="30"
          class="text-sec"
        />
      </div>
    </div>

    <ul class="flex flex-col items-center gap-6">
      <li @click="toggleDrawer">
        <NuxtLink
          to="/find-a-specialist"
          active-class="link-underline-custom"
          class="navbar-items"
          title="Find a specialist"
          >Find a specialist</NuxtLink
        >
      </li>
      <li @click="toggleDrawer">
        <NuxtLink
          to="/become-a-specialist"
          active-class="link-underline-custom"
          class="navbar-items"
          title="Become a specialist"
        >
          Become a specialist
        </NuxtLink>
      </li>
      <li @click="toggleDrawer">
        <NuxtLink
          to="/about-us"
          active-class="link-underline-custom"
          class="navbar-items"
          title="Become a mentor"
        >
          About us
        </NuxtLink>
      </li>
      <li @click="toggleDrawer">
        <NuxtLink
          to="/auth/login"
          active-class="link-underline-custom"
          class="navbar-items"
          title="Login"
        >
          Log in
        </NuxtLink>
      </li>
      <li @click="openSignupModal">
        <NuxtLink
          active-class="link-underline-custom"
          class="navbar-items"
          title="Signup"
        >
          Signup
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
