<template>
  <div class="h-full w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L from 'leaflet'

onMounted(() => {
  const map = L.map('map').setView([48.8566, 2.3522], 13) // Coordonnées de Paris

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map)

  // Exemple : Ajouter un marqueur
  L.marker([48.8566, 2.3522]).addTo(map).bindPopup('Hello Paris!').openPopup()
})
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
