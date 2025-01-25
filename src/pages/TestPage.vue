<template>
  <!-- CONTENEUR GLOBAL -->
  <div v-if="place">

    <div class="w-[300px] min-h-[200px] bg-white m-10 p-2">
      <div class="p-4 bg-white rounded-lg shadow-md max-w-xs">
        <h3 class="text-lg font-semibold text-gray-800 m-0 mb-2">{{ place.name }}</h3>
        <p class="text-sm text-gray-600 m-0">{{ place.address }}</p>
        <p class="text-sm text-gray-600 m-0">{{ place.city }}</p>
        <p class="mt-2 text-gray-700 m-0">{{ place.description }}</p>
        <div class="flex items-center space-x-3 mt-4">
          <link-icon :icon="['fas', 'globe']" :url="place.websiteUrl" />
          <link-icon :icon="['fab', 'facebook']" :url="place.websiteUrl" />
          <link-icon :icon="['fab', 'instagram']" :url="place.websiteUrl" />
          <link-icon :icon="['fab', 'x-twitter']" :url="place.websiteUrl" />
        </div>
      </div>
    </div>

    <p>--------------------------</p>

    <card-place :place="place" />



  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { Place } from '@/types/Place'
  import { get } from '@/services/apiService'
  import LinkIcon from '@/components/LinkIcon.vue'
  import CardPlace from '@/components/CardPlace.vue'

  const places = ref([])
  const place = ref<Place | null>(null)
  const fetchPlaces = async () => {
    places.value = await get('/places')
  }

  onMounted(async () => {
    await fetchPlaces()
    place.value = places.value[0]
  })
</script>
