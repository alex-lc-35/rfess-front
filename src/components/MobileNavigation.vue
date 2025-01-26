<template>
  <div>
    <button class="lg:hidden btn btn-square btn-ghost" @click="isMenuOpen = !isMenuOpen">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-base-200 z-50 flex flex-col items-center justify-center space-y-4"
    >
      <router-link to="/" class="text-lg font-bold py-2" @click="isMenuOpen = false">
        Accueil
      </router-link>
      <router-link to="/carte" class="text-lg font-bold py-2" @click="isMenuOpen = false">
        Carte
      </router-link>
      <button class="btn btn-ghost absolute top-4 right-4" @click="isMenuOpen = false">
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const isMenuOpen = ref(false)
</script>
