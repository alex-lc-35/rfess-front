<template>
  <div class="container mx-auto mt-4">
    <LeafletMap />

  </div>
</template>

<script setup lang="ts">
  import { get } from '@/modules/api'
  import { onMounted, ref } from 'vue'
  import { Place, mapToPlace, mapToGeoJsonPoint } from '@/modules/place'
  import { Feature, Point } from 'geojson'
  import LeafletMap from '@/components/LeafletMap.vue'

  // Typage de la collection `places` comme tableau de `Place`
  const places = ref<Place[]>([])
  const geoPlaces = ref<Feature<Point>[]>([])

  onMounted(async () => {
    const response = await get('/places')
    places.value = response.map((item: Partial<Place>) => mapToPlace(item))
    geoPlaces.value = places.value.map((item) => mapToGeoJsonPoint(item))
  })
</script>

