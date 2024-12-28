<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-base-100 shadow-md">
      <div class="container mx-auto flex justify-between items-center pt-1 pb-2 px-2">
        <!-- App Title -->
        <router-link to="/" class="text-xl font-bold">
          <div>Roche aux Fées</div>
          <div class="text-sm">écologique, sociale et solidaire</div>
        </router-link>

        <!-- Desktop Navigation -->
        <DesktopNavigation />

        <!-- Mobile Navigation -->
        <MobileNavigation />
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow bg-gray-300">
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
  import DesktopNavigation from '@/components/DesktopNavigation.vue'
  import MobileNavigation from '@/components/MobileNavigation.vue'

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
