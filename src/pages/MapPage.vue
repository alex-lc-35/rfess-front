<template>
  <!-- CONTENEUR GLOBAL -->
  <div class="relative h-[calc(100vh-4rem)]">
    <!-- MAP -->
    <div class="absolute inset-0 z-0">
      <LeafletMap />
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
    <div
      v-if="showFormAddedPlaceForm"
      class="absolute inset-0 z-20 bg-white flex items-center justify-center"
    >
      <place-form @place-added="placeAdded" />
      <button class="absolute top-4 right-4 text-red-500" @click="showFormAddedPlaceForm = false">
        Fermer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import PlaceForm from '@/components/PlaceForm.vue'
  import LeafletMap from '@/components/LeafletMap.vue'

  const showFormAddedPlaceForm = ref(false)

  const placeAdded = () => {
    console.log('PLACE ADDED')
    showFormAddedPlaceForm.value = false
  }
</script>
