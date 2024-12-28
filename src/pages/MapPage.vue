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
        @click="showFormAddedPlaceForm = true"
      >
        Ajouter un lieu
      </button>
    </div>

    <!-- FORM -->
    <div v-if="showFormAddedPlaceForm" class="absolute inset-0 z-20 bg-white flex">
      <place-form @place-added="placeAdded" @close="showFormAddedPlaceForm = false" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useMapStore } from '@/stores/mapStore'
  import { getPlacesGeoJson } from '@/modules/place'
  import PlaceForm from '@/components/PlaceForm.vue'

  const mapStore = useMapStore()
  const places = ref([])
  const showFormAddedPlaceForm = ref(false)
  const init = () => {
    mapStore.initializeMap('leaflet-map')
  }
  const placeAdded = async () => {
    await fetchPlaces()
    showFormAddedPlaceForm.value = false
  }
  const fetchPlaces = async () => {
    places.value = await getPlacesGeoJson()
    mapStore.setMarkers(places.value)
  }

  onMounted(async () => {
    init()
    await fetchPlaces()
  })
</script>

<style scoped></style>
