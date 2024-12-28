<template>
  <div class="h-full w-full">
    <div id="map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import L, { Map, Icon } from 'leaflet'
  import { communesContour } from '@/modules/communes'

  let map: Map | null = null

  // Fonction pour ajouter des points sur la carte
  function addPointsToMap(mapPlaces: { lat: number; lng: number; description: string }[]) {
    if (!map) return

    const placeIcon = new Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconSize: [25, 41], // Taille de l'icône
      iconAnchor: [12, 41], // Point de l'icône correspondant à la position géographique
      popupAnchor: [1, -34], // Position du popup par rapport à l'icône
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [41, 41], // Taille de l'ombre
    })

    // Créer un LayerGroup pour regrouper les marqueurs
    const markersGroup = L.layerGroup()

    mapPlaces.forEach((point) => {
      const marker = L.marker([point.lat, point.lng], { icon: placeIcon })
      marker.bindPopup(point.description)
      markersGroup.addLayer(marker) // Ajouter le marqueur au LayerGroup
    })

    markersGroup.addTo(map) // Ajouter le LayerGroup à la carte
  }

  onMounted(() => {
    // Initialisation de la carte
    map = L.map('map')

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map)

    // Ajouter contours des communes
    L.geoJSON(communesContour, {
      style: { color: '#FF0000', weight: 2, opacity: 0.8 },
    }).addTo(map)

    // Centrer et ajuster le zoom pour englober tout le polygone
    map.fitBounds(L.geoJSON(communesContour).getBounds())

    // Ajouter des points à la carte
    const mapPlaces = [
      { lat: 48.8566, lng: 2.3522, description: 'Centre - Paris' },
      { lat: 48.857, lng: 2.353, description: 'Point proche 1' },
      { lat: 48.856, lng: 2.351, description: 'Point proche 2' },
    ]
    addPointsToMap(mapPlaces)
  })
</script>

<style scoped>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
