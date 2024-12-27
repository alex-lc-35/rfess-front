<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-4xl font-bold">TEST</h1>

    <div class="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Contact Form</h2>
      <form class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
        </div>
        <input
          id="name"
          type="text"
          class="input input-bordered w-full"
          required
        />

        <div>
          <label for="commune" class="block text-sm font-medium mb-1">Commune</label>
          <select id="commune" v-model="selectedCommune" class="select select-bordered w-full">
            <option value="" disabled selected>Sélectionner une commune</option>
            <option v-for="commune in communes" :key="commune.code" :value="commune.name">
              {{ commune.name }}
            </option>
          </select>
        </div>
      </form>
    </div>

    <pre>{{ selectedCommune }}</pre>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { get, post } from '@/modules/api'
  import { getCommunesList } from '@/modules/communes'

  const places = ref([])

  const communes = getCommunesList()

  const selectedCommune = ref<string | null>(null)

  const loadPlaces = async () => {
    try {
      places.value = await get('/places')
    } catch (error) {
      console.error('Error fetching places:', error)
    }
  }

  const addPlace = async () => {
    try {
      const newPlace = {
        name: 'New Place',
        city: 'New City',
        address: '123 Example St',
      }
      const result = await post('/places', newPlace)
      console.log('Place added:', result)
      await loadPlaces() // Recharge la liste après ajout
    } catch (error) {
      console.error('Error adding place:', error)
    }
  }
</script>
