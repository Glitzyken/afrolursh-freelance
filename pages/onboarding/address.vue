<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();
</script>

<template>
  <div>
    <div>This is the address page</div>

    <div class="cursor-pointer" @click="authStore.logOut">Logout</div>
  </div>
</template>
