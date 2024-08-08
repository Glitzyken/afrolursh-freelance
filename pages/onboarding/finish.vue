<script setup lang="ts">
const handleBaseBtn = () => {
  useRouter().push({ path: "/dashboard" });
};

const handleSecBtn = () => {
  useRouter().push({ path: "/" });
};
</script>

<template>
  <section class="section mt-10 w-full md:w-3/4 lg:w-2/4 m-auto">
    <h1 class="text-center short-title">
      Congratulations! <br />
      You have reached the finish line 🥳
    </h1>

    <p class="text-sm text-center">Welcome onboard</p>

    <img
      src="../../assets/img/congratulations-13773_512.gif"
      alt="congratulations 🎉"
      class="w-96 mx-auto"
    />

    <div class="md:flex md:items-center md:gap-4">
      <ButtonSec @click="handleSecBtn" class="w-full">
        Book a specialist
      </ButtonSec>

      <ButtonBase
        @click="handleBaseBtn"
        type="submit"
        loadingText="Please enter your email"
        class="w-full mt-5 md:mt-0"
      >
        Go to dashboard
        <template #spinner>
          <SpinnerSm />
        </template>
      </ButtonBase>
    </div>
  </section>
</template>
