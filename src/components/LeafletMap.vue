<template>
  <div class="h-full w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import L, { Map } from 'leaflet'
import { comcomCoordinates } from '@/coordinates/comcom' // Chemin vers le fichier

onMounted(() => {
  // Initialisation de la carte
  const map: Map = L.map('map')

  // Ajouter les tuiles OpenStreetMap
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  // Ajouter le polygone GeoJSON
  const geoJsonLayer = L.geoJSON(comcomCoordinates, {
    style: {
      color: '#FF0000', // Couleur rouge pour le contour
      weight: 2,
      opacity: 0.8,
    },
  }).addTo(map)

  // Centrer et ajuster le zoom pour englober tout le polygone
  map.fitBounds(geoJsonLayer.getBounds())
})
</script>

<style scoped>
#map {
  height: 100%;
  width: 100%;
}
</style>
