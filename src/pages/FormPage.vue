<template>
  <div class="container mx-auto mt-4">
    <h1 class="text-4xl font-bold">TEST</h1>

    <div class="max-w-md mx-auto p-4 bg-white shadow rounded-lg">
      <h2 class="text-2xl font-bold mb-4">Contact Form</h2>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
        </div>
        <input id="name" v-model="place.name" type="text" class="input input-bordered w-full" />

        <div>
          <label for="commune" class="block text-sm font-medium mb-1">Commune</label>
          <select id="commune" v-model="selectedCommune" class="select select-bordered w-full">
            <option value="" disabled selected>Sélectionner une commune</option>
            <option v-for="commune in communes" :key="commune.code" :value="commune">
              {{ commune.name }}
            </option>
          </select>
        </div>

        <div>
          <label for="address" class="block text-sm font-medium mb-1">Adresse</label>
          <AddressInput
            :selectedCommune="selectedCommune"
            @addressSelected="handleAddressSelected"
          />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1" for="message">Informations</label>
          <textarea
            id="message"
            v-model="place.description"
            class="textarea textarea-bordered w-full"
            placeholder="Your message"
            required
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button class="btn btn-primary" @click="submitForm">Valider</button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3">
      <div>
        <p>selectedCommune</p>
        <pre>{{ selectedCommune }}</pre>
      </div>
      <div>
        <p>selectedAddress</p>
        <pre>{{ selectedAddress }}</pre>
      </div>
      <div>
        <p>place</p>
        <pre>{{ place }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { get, post } from '@/modules/api'
  import { getCommunesList } from '@/modules/communes'
  import AddressInput from '@/components/AddressInput.vue'

  const places = ref([])

  const communes = getCommunesList()

  const selectedCommune = ref({ code: '', name: '' })
  const selectedAddress = ref({})
  const place = ref({
    name: '',
    city: '',
    address: '',
    latitude: null,
    longitude: null,
    description: '',
  })

  const handleAddressSelected = (address: string) => {
    selectedAddress.value = address
  }
  const loadPlaces = async () => {
    try {
      places.value = await get('/places')
    } catch (error) {
      console.error('Error fetching places:', error)
    }
  }

  const submitForm = () => {
    if (selectedCommune.value) {
      place.value.city = selectedCommune.value.name
    }
    if (selectedAddress.value) {
      console.log('yooo', selectedAddress.value.properties.name)
      place.value.address = selectedAddress.value.properties.name
      place.value.latitude = selectedAddress.value.geometry.coordinates[1]
      place.value.longitude = selectedAddress.value.geometry.coordinates[0]
    }
    addPlace()
  }

  const addPlace = async () => {
    try {
      console.log('CREATE', place.value)
      const result = await post('/places', place.value)
      console.log('Place added:', result)
      await loadPlaces() // Recharge la liste après ajout
    } catch (error) {
      console.error('Error adding place:', error)
    }
  }
</script>
