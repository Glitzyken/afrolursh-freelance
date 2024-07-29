// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxt/image",
    "@vueuse/motion/nuxt",
    "@pinia/nuxt",
    "nuxt-icon",
    "maz-ui/nuxt",
    "nuxt-headlessui",
  ],
  components: [
    {
      path: "~/components",
      pathPrefix: false,
    },
  ],
  shadcn: {
    componentDir: "./components/ui",
  },
  headlessui: {
    prefix: "Headless",
  },
});
