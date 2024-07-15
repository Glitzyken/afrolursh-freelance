<script setup lang="ts">
import { useBurgerStore } from "@/store/burger";
import { useAuthStore } from "@/store/auth";

const burgerStore = useBurgerStore();

const toggleDrawer = () => burgerStore.toggle();

const useLoggedIn = () => {
  return false;
};
</script>

<template>
  <nav class="sticky top-0 z-50 py-5 bg-white text-sec">
    <div class="flex justify-between items-center gap-1.5 sm:gap-2">
      <Logo />

      <div @click="toggleDrawer" class="md:hidden">
        <Icon
          name="iconamoon:menu-burger-horizontal-bold"
          size="40"
          class="text-sec"
        />
      </div>

      <ul class="hidden md:flex items-center gap-6">
        <li>
          <NuxtLink
            to="/find-a-specialist"
            active-class="link-underline-custom"
            class="navbar-items"
            title="Find a specialist"
            >Find a specialist</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="/become-a-specialist"
            active-class="link-underline-custom"
            class="navbar-items"
            title="Become a specialist"
          >
            Become a specialist
          </NuxtLink>
        </li>
        <li>
          <NuxtLink
            to="/about-us"
            active-class="link-underline-custom"
            class="navbar-items"
            title="About us"
          >
            About us
          </NuxtLink>
        </li>
      </ul>

      <ClientOnly>
        <div class="hidden md:flex gap-6">
          <div v-if="useLoggedIn()" class="flex items-center">
            <ButtonBase
              as="link"
              class="h-10 px-5 text-sm font-medium transition-all ease-in-out"
            >
              Account
            </ButtonBase>
          </div>
          <div v-if="!useLoggedIn()" class="flex items-center gap-8x">
            <NuxtLink to="/login" title="Login">
              <ButtonSec class="h-10 bg-sec px-5 py-8x text-sm font-medium">
                Log in
              </ButtonSec>
            </NuxtLink>
            <ButtonBase
              @click="useAuthStore().isLoginModalOpen = true"
              class="h-10 px-5 py-8x text-sm font-medium"
            >
              Sign up
            </ButtonBase>
          </div>
        </div>
      </ClientOnly>
    </div>
  </nav>
</template>
