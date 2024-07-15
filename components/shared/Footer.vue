<script setup lang="ts">
const year = new Date().getFullYear();
</script>

<template>
  <footer class="pb-20">
    <div class="flex flex-col lg:flex-row gap-6 justify-between mb-10">
      <div class="flex flex-col items-center md:block">
        <Logo />

        <p class="mt-3">Nurturing every strand with care</p>
      </div>

      <div>
        <ul class="items-center flex flex-col md:flex-row gap-2 md:gap-6">
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
              title="Become a mentor"
            >
              Privacy policy
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/about-us"
              active-class="link-underline-custom"
              class="navbar-items"
              title="Become a mentor"
            >
              Terms
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="flex justify-between">
      <div>
        <Icon
          name="fa6-brands:square-x-twitter"
          size="20"
          class="text-sec mr-1"
        />
        <Icon
          name="fa-brands:instagram-square"
          size="20"
          class="text-sec mr-1"
        />
        <Icon name="entypo-social:facebook" size="20" class="text-sec mr-1" />
      </div>

      <div>
        <p class="text-xs">Copyright {{ year }} - Afrolursh</p>
      </div>
    </div>

    <div class="h-3 mt-10 grid grid-cols-3">
      <div class="bg-grey1"></div>
      <div class="bg-sec"></div>
      <div class="bg-pri"></div>
    </div>
  </footer>
</template>
