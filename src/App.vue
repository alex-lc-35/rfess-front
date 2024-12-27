<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-base-100 shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <!-- App Title -->
        <router-link to="/" class="text-xl font-bold">My App</router-link>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex space-x-4">
          <router-link to="/" class="btn btn-ghost">Accueil</router-link>
          <router-link to="/carte" class="btn btn-ghost">Carte</router-link>
          <router-link to="/test" class="btn btn-ghost">Test</router-link>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden btn btn-square btn-ghost" @click="toggleMenu">
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
      </div>

      <!-- Mobile Navigation -->
      <div v-if="isMenuOpen" class="lg:hidden">
        <router-link to="/" class="block py-2 px-4 text-sm">Home</router-link>
        <router-link to="/about" class="block py-2 px-4 text-sm">About</router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-base-200 p-4 text-center">
      <p>&copy; 2024 My App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  // Reactive state for the menu
  const isMenuOpen = ref(false)

  // Toggle menu visibility
  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }
</script>

<style scoped>
  /* Ajoutez des styles spécifiques ici si nécessaire */
</style>
