<template>
  <!-- CONTENEUR GLOBAL -->
  <div class="relative h-[calc(100vh-4rem)]">
    <!-- MAP -->
    <div class="absolute inset-0 z-0">
      <div id="leaflet-map" class="h-full w-full"></div>
    </div>

    <!-- BTN -->
    <div class="absolute top-4 right-4 z-10">
      <button
        class="btn bg-blue-500 text-white px-4 py-2 rounded"
        @click="openForm"
      >
        Ajouter un lieu
      </button>
    </div>

    <!-- FORM -->
    <div v-if="placeStore.showForm" class="absolute inset-0 z-20">
      <place-form
        class="h-full w-full bg-white md:h-auto md:w-auto md:bg-transparent md:mt-4"
        @close="placeStore.closForm()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import { useMapStore } from '@/stores/mapStore'
  import { usePlaceStore } from '@/stores/placeStore'
  import { fetchPlaces, placesPoints } from '@/services/placeService'
  import PlaceForm from '@/components/PlaceForm.vue'

  const mapStore = useMapStore()
  const placeStore = usePlaceStore()

  const openForm = () => {
    placeStore.initPlace()
    placeStore.openForm()
  }

  onMounted(async () => {
    mapStore.initializeMap('leaflet-map')
    const places = await fetchPlaces()
    placeStore.setList(places)
    const points = placesPoints(places)
    mapStore.setMarkers(points)
  })
</script>

<style scoped></style>
