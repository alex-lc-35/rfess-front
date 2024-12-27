<template>
  <div class="h-full w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import L, { Map } from 'leaflet'
  import { communesContour } from '@/modules/communes' // Chemin vers le fichier

  onMounted(() => {
    // Initialisation de la carte
    const map: Map = L.map('map')

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    // Ajouter le polygone GeoJSON
    L.geoJSON(communesContour, {
      style: { color: '#FF0000', weight: 2, opacity: 0.8 },
    }).addTo(map)

    // Centrer et ajuster le zoom pour englober tout le polygone
    map.fitBounds(L.geoJSON(communesContour).getBounds())
  })
</script>

<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
