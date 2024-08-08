<template>
  <svg class="h-4 w-4 me-2" fill="none" viewBox="0 0 20 15">
    <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    <mask
      id="a"
      style="mask-type: luminance"
      width="20"
      height="15"
      x="0"
      y="0"
      maskUnits="userSpaceOnUse"
    >
      <rect width="19.6" height="14" y=".5" fill="#fff" rx="2" />
    </mask>
    <g mask="url(#a)">
      <!-- Left Green Stripe -->
      <rect fill="#008751" x="0" y="0.5" width="6.533" height="14" />
      <!-- Middle White Stripe -->
      <rect fill="#fff" x="6.533" y="0.5" width="6.533" height="14" />
      <!-- Right Green Stripe -->
      <rect fill="#008751" x="13.067" y="0.5" width="6.533" height="14" />
    </g>
  </svg>
</template>
