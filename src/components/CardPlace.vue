<template>
  <div class="p-4 bg-white max-w-xs">
    <p class="text-lg font-semibold text-gray-800 mb-2">{{ place.name }}</p>
    <p class="text-gray-400">{{ place.address }} - {{ place.city }}</p>
    <p v-if="place.description" class="!mt-2 text-sm text-gray-800">{{ place.description }}</p>

    <div class="flex !mt-2">
      <div class="space-x-2 mr-2">
        <link-icon v-if="place.websiteUrl" :icon="['fas', 'globe']" :url="place.websiteUrl" />
        <link-icon v-if="place.facebookUrl" :icon="['fab', 'facebook']" :url="place.facebookUrl" />
        <link-icon
          v-if="place.instagramUrl"
          :icon="['fab', 'instagram']"
          :url="place.instagramUrl"
        />
        <link-icon v-if="place.xUrl" :icon="['fab', 'x-twitter']" :url="place.xUrl" />
      </div>
      <!--      <font-awesome-icon
        :icon="['fas', 'pen']"
        class="w-4 h-4 ml-auto pt-1"
        @click="selectPlace(place)"
      />-->
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Place } from '@/types/Place'
  import LinkIcon from '@/components/LinkIcon.vue'
  /*  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { usePlaceStore } from '@/stores/placeStore'

  const placeStore = usePlaceStore()

  const selectPlace = (place: Place) => {
    placeStore.setPlace(place)
    placeStore.openForm()
  }*/

  defineProps<{
    place: Place
  }>()
</script>
