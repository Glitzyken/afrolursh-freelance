<script setup lang="ts">
const becomeSpecialist = () => console.log("Joining...");
</script>

<template>
  <section v-motion-slide-visible-once-right class="section">
    <div class="mb-20">
      <h2 class="h2 text-center">
        Our specialists go through a 5-step onboarding process
      </h2>

      <div class="w-full mx-auto flex items-center select-none">
        <div class="hidden md:block relative">
          <Icon name="mdi:hair-dryer" size="40" class="text-grey1" />
          <div class="absolute text-sm">Services Select</div>
        </div>
        <div class="md:hidden relative">
          <Icon name="mdi:hair-dryer" size="20" class="text-grey1" />
          <div class="absolute text-xs">Services Select</div>
        </div>

        <div
          class="w-10 md:w-full bg-gradient-to-r from-grey1 to-sec h-[0.2rem] md:h-[0.3rem] rounded mx-px"
        ></div>

        <div class="hidden md:block relative">
          <Icon name="solar:user-id-bold" size="40" class="text-sec" />
          <div class="absolute text-sm">ID Verification</div>
        </div>
        <div class="md:hidden relative">
          <Icon name="solar:user-id-bold" size="20" class="text-sec" />
          <div class="absolute text-xs">ID Verification</div>
        </div>

        <div
          class="w-10 md:w-full bg-sec h-[0.2rem] md:h-[0.3rem] rounded mx-px"
        ></div>

        <div class="hidden md:block relative">
          <Icon name="solar:dialog-bold" size="40" class="text-sec" />
          <div class="absolute text-sm">Interview</div>
        </div>
        <div class="md:hidden relative">
          <Icon name="solar:dialog-bold" size="20" class="text-sec" />
          <div class="absolute text-xs">Interview</div>
        </div>

        <div
          class="w-10 md:w-full bg-gradient-to-r from-sec to-pri h-[0.2rem] md:h-[0.3rem] rounded mx-px"
        ></div>

        <div class="hidden md:block relative">
          <Icon name="teenyicons:contract-solid" size="40" class="text-pri" />
          <div class="absolute text-sm">Sign Contract & NDA</div>
        </div>
        <div class="md:hidden relative">
          <Icon name="teenyicons:contract-solid" size="20" class="text-pri" />
          <div class="absolute text-xs">Sign Contract & NDA</div>
        </div>

        <div
          class="w-10 md:w-full bg-pri h-[0.2rem] md:h-[0.3rem] rounded mx-px"
        ></div>

        <div class="hidden md:block relative">
          <Icon name="solar:user-check-bold" size="40" class="text-pri" />
          <div class="absolute text-sm">Activate Account</div>
        </div>
        <div class="relative md:hidden">
          <Icon name="solar:user-check-bold" size="20" class="text-pri" />
          <div class="absolute text-xs">Activate Account</div>
        </div>
      </div>
    </div>

    <ButtonBase @click="becomeSpecialist">
      <Icon
        name="solar:user-check-bold"
        size="20"
        class="text-white -mt-[0.2rem]"
      />
      Become a specialist
    </ButtonBase>
  </section>
</template>
