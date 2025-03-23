<script setup>

import { ref } from 'vue';

// Dark Mode toggle

const darkMode = ref(false);

function toggleDarkMode() {
  document.documentElement.classList.toggle('app-dark');
  darkMode.value = !darkMode.value;
}

</script>

<template>

  <div name="header" class="flex justify-between items-center px-8 pt-8">
    <div class="flex items-center gap-3">
      <img src="/virtual-network.svg" width="50" />
      <div class="text-nowrap text-2xl font-medium">VNET Size</div>
    </div>
    <div class="flex items-center gap-2">
      <i v-if="darkMode" class="pi pi-sun"></i>
      <i v-else class="pi pi-moon"></i>
      <ToggleSwitch label="Toggle Dark Mode" @click="toggleDarkMode()" />
    </div>
  </div>

</template>