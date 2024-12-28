<template>
  <div v-if="isInit" class="container mx-auto mt-4">
    <!-- FORM -->
    <div
      v-if="isInit"
      id="place-form"
      class="max-w-md mx-auto p-4 bg-white shadow rounded-lg relative"
    >
      <!-- CLOSE BTN -->
      <button class="btn btn-square btn-outline absolute right-2" @click="emit('close')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">Ajouter un lieu</h2>
      <div class="space-y-4">
        <!--error -->
        <div v-if="errorForm" class="bg-red-500 w-full p-4 font-bold">{{ errorForm }}</div>
        <!--name -->
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
        </div>
        <input id="name" v-model="place.name" type="text" class="input input-bordered w-full" />
        <!--commune -->
        <div>
          <label for="commune" class="block text-sm font-medium mb-1">Commune</label>
          <select id="commune" v-model="selectedCommune" class="select select-bordered w-full">
            <option value="" disabled selected>Sélectionner une commune</option>
            <option v-for="commune in communes" :key="commune.code" :value="commune">
              {{ commune.name }}
            </option>
          </select>
        </div>
        <!-- address | message | submit -->
        <section v-if="place.name && selectedCommune.code">
          <!--address -->
          <div>
            <label for="address" class="block text-sm font-medium mb-1">Adresse</label>
            <AddressInput
              :selectedCommune="selectedCommune"
              @addressSelected="handleAddressSelected"
            />
          </div>
          <!--message -->
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
          <!--submit -->
          <div class="flex justify-end">
            <button class="btn btn-primary" @click="submitForm">Valider</button>
          </div>
        </section>
      </div>
    </div>
    <!-- TEST -->
    <!--    <div class="grid grid-cols-1 lg:grid-cols-3">
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
    </div>-->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, defineEmits } from 'vue'
  import { post } from '@/modules/api'
  import { getCommunesList } from '@/modules/communes'
  import { Place, mapToPlace } from '@/modules/place'
  import AddressInput from '@/components/AddressInput.vue'

  const isInit = ref(false)
  const communes = getCommunesList()

  const selectedCommune = ref()
  const selectedAddress = ref()
  const place = ref<Place>(mapToPlace({}))
  const errorForm = ref<string | null>()

  const emit = defineEmits(['placeAdded', 'close'])
  onMounted(() => {
    initForm()
    isInit.value = true
  })
  const initForm = () => {
    place.value = mapToPlace({})
    selectedCommune.value = { code: '', name: '' }
    errorForm.value = null
  }
  const handleAddressSelected = (address: string) => {
    selectedAddress.value = address
  }
  const submitForm = async () => {
    if (selectedCommune.value) {
      place.value.city = selectedCommune.value.name
    }
    if (selectedAddress.value) {
      place.value.address = selectedAddress.value.properties.name
      place.value.latitude = selectedAddress.value.geometry.coordinates[1]
      place.value.longitude = selectedAddress.value.geometry.coordinates[0]
    }

    try {
      await post('/places', place.value)
      initForm()
      emit('placeAdded')
    } catch (error) {
      errorForm.value = "Erreur d'enregistrement"
      console.error('Error adding place:', error)
    }
  }
</script>
