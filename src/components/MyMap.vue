<template>
  <div class="h-full w-full">
    <div id="leaflet-map" class="h-full w-full"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useMapStore } from '@/stores/mapStore'
  import { getPlacesGeoJson } from '@/services/placeService'

  const mapStore = useMapStore()
  const places = ref([])

  onMounted(async () => {
    init()
    places.value = await getPlacesGeoJson()
    mapStore.setMarkers(places.value)
  })
  const init = () => {
    mapStore.initializeMap('leaflet-map')
  }
</script>

<style>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
