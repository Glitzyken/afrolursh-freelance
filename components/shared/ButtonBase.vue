<script setup lang="ts">
// @ts-ignore
export interface ButtonProps {
  /**
   * If `true`, the button will show a spinner.
   */
  isLoading?: boolean;
  /**
   * If `true`, the button will be styled in its active state.
   */
  isActive?: boolean;
  /**
   * If `true`, the button will be disabled.
   */
  isDisabled?: boolean;
  /**
   * The label to show in the button when `isLoading` is true
   * If no text is passed, it only shows the spinner
   */
  loadingText?: string;
  /**
   * The html button type to use.
   */
  type?: "button" | "reset" | "submit";
  as?: "button" | "link";
  to?: string;
}
withDefaults(defineProps<ButtonProps>(), {
  isActive: true,
  isDisabled: false,
  isLoading: false,
  loadingText: "Loading",
  type: "button",
  spinner: null,
  slots: null,
  as: "button",
});
</script>
<template>
  <button
    :disabled="isDisabled || isLoading"
    v-bind="$attrs"
    class="btn-main"
    :class="isDisabled || isLoading ? 'cursor-not-allowed bg-opacity-60' : ''"
    v-if="as === 'button'"
  >
    <span>
      <span class="relative z-30 inline-flex">
        <span v-if="isLoading">
          <slot name="spinner" />
        </span>
        <span v-else>
          <slot />
        </span>
      </span>
    </span>
  </button>
  <nuxt-link :href="to" v-bind="$attrs" class="btn-main cursor-pointer" v-else>
    <span class="relative z-30">
      <slot />
    </span>
  </nuxt-link>
</template>

<style scoped></style>
