<template>
  <div>
    <nav class="p-4 bg-gray-100">
      <ul class="flex gap-4">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>
</template>
