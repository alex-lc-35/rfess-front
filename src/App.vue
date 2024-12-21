<template>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-base-100 shadow-md">
      <div class="container mx-auto flex justify-between items-center py-4 px-6">
        <router-link to="/" class="text-xl font-bold">My App</router-link>
        <div class="hidden lg:flex space-x-4">
          <router-link to="/" class="btn btn-ghost">Home</router-link>
          <router-link to="/about" class="btn btn-ghost">About</router-link>
        </div>
        <button
            class="lg:hidden btn btn-square btn-ghost"
            @click="toggleMenu"
        >
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
      <div v-if="isMenuOpen" class="lg:hidden">
        <router-link to="/" class="block py-2 px-4 text-sm">Home</router-link>
        <router-link to="/about" class="block py-2 px-4 text-sm">About</router-link>
      </div>
    </nav>
    <main class="flex-grow">
      <router-view />
    </main>
    <footer class="bg-base-200 p-4 text-center">
      <p>&copy; 2024 My App. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },
};
</script>
