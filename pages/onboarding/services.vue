<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <div v-motion-slide-visible-once-left>
    <div>This is the Service page</div>

    <div class="cursor-pointer" @click="authStore.logOut">Logout</div>
  </div>
</template>
