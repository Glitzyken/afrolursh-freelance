<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div>This is the Bio page</div>

    <div class="cursor-pointer" @click="authStore.logOut">Logout</div>
  </div>
</template>
