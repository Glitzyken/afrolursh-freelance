<script setup lang="ts">
import Navbar from "~~/components/navigation/NavBar.vue";
import { Toaster } from "vue-sonner";
import SignupModal from "./components/auth/SignupModal.vue";

useHead({
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
  title: "Afrolursh - Nurturing every strand with care",
  meta: [
    {
      name: "description",
      content:
        "Afrolursh is a community that connects you to world-class afro hair stylists for free",
    },
    {
      name: "url",
      content: `https://afrolursh.com`,
    },
  ],
});
</script>

<template>
  <Html lang="en">
    <Head>
      <Link rel="preconnect" href="https://fonts.googleapis.com" />
      <Link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <Link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <Meta name="copyright" content="Afrolursh" />

      <Meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta charset="UTF-8" />
      <Meta content="text/html; charset=UTF-8" name="Content-Type" />

      <Meta
        name="description"
        content="Afrolursh is a community that connects you to world-class afro hair stylists for free"
      />
      <meta
        property="og:site_name"
        content="Afrolursh: Nurturing every strand with care"
      />

      <!-- Twitter  -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta
        name="twitter:title"
        content="Afrolursh - Nurturing every strand with care"
      />
      <Meta
        name="twitter:description"
        content="Afrolursh is a community that connects you to world-class afro hair stylists for free"
      />
      <Meta name="twitter:site" content="@AfroLursh" />
      <Meta name="twitter:creator" content="@AfroLursh" />
      <Meta name="twitter:url" content="https://AfroLursh.com" />
      <Meta name="twitter:image" content="https://afrolursh.com/og-image.png" />
      <!-- Twitter end -->
      <Meta name="msvalidate.01" content="40D82B28F2238EB9335D27627A0D3DCF" />
      <Meta
        property="og:title"
        content="Afrolursh - Nurturing every strand with care"
      />
      <Meta name="author" property="og:author" content="Afrolursh" />
      <Meta name="author" content="Afrolursh" />

      <Meta
        name="image"
        property="og:image"
        content="https://afrolursh.com/og-image.png"
      />
      <Meta property="og:image" content="https://afrolursh.com/og-image.png" />
      <Meta property="og:locale" content="en_US" />
      <Meta property="og:type" content="website" />
      <Meta property="og:site_name" content="Afrolursh" />
      <Meta name="og:url" content="https://afrolursh.com" />

      <Meta property="og:url" content="https://afrolursh.com" />
      <Meta name="og:email" content="hello@afrolursh.com" />

      <Meta
        property="og:description"
        content="Afrolursh - Nurturing every strand with care."
      />
      <Meta name="application-name" content="Afrolursh" />
      <Meta name="og:country-name" content="Nigeria" />
      <Meta
        name="keywords"
        content="Afrolursh, Hair, African, Hair stylist, Makeovers, Braids"
      />

      <Meta name="theme-color" content="#FAF9F6" />
      <meta
        name="theme-color"
        content="#FAF9F6"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#333333"
        media="(prefers-color-scheme: dark)"
      />
    </Head>
  </Html>
  <div class="mx-5 md:mx-10 lg:mx-32 text-sec">
    <ClientOnly>
      <Toaster richColors closeButton position="bottom-right" />
    </ClientOnly>
    <SignupModal />
    <Navbar />
    <Drawer />
    <main class="min-h-screen">
      <NuxtPage />
    </main>
    <Footer />
  </div>
</template>
