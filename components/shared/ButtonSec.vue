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
  link?: string;
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
  <button v-bind="$attrs" class="btn-sec" v-if="as === 'button'">
    <span class="relative z-30">
      <slot />
    </span>
    <span>
      <span v-if="isLoading">
        <slot name="spinner" />
      </span>
    </span>
  </button>
  <nuxt-link :to="link" v-bind="$attrs" class="btn-sec cursor-pointer" v v-else>
    <span class="relative z-30">
      <slot />
    </span>
  </nuxt-link>
</template>
