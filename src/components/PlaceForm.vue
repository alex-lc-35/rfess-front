<!--placeForm.vue-->
<template>
  <div class="w-full h-full">
    <!-- LOAD -->
    <div v-if="load" class="absolute inset-0 flex items-center justify-center bg-white/70 z-50">
      <span class="loading loading-spinner loading-lg text-primary"></span>
    </div>

    <!-- FORM -->
    <div
      v-if="isInit && !load"
      id="place-form"
      class="max-w-md mx-auto p-4 bg-white shadow rounded-lg relative"
    >
      <!-- CLOSE BTN -->
      <button class="btn btn-square btn-outline absolute right-2" @click="placeStore.closForm()">
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

        <!--Name -->
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
          <input id="name" v-model="place.name" type="text" class="input input-bordered w-full" />
        </div>

        <!--Commune -->
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
        <section v-if="selectedCommune.code">
          <!--Address -->
          <div>
            <label for="address" class="block text-sm font-medium mb-1">Adresse</label>
            <AddressInput
              class="mb-1"
              :selectedCommune="selectedCommune"
              :initialAddress="initialAddress"
              @addressSelected="handleAddressSelected"
            />
          </div>

          <!--Informations -->
          <div>
            <label class="block text-sm font-medium mb-1" for="message">Informations</label>
            <textarea
              id="message"
              v-model="place.description"
              class="textarea textarea-bordered w-full mb-1"
              required
            />
          </div>

          <!--Site web -->
          <label class="block text-sm font-medium mb-1" for="message">Site web</label>
          <input
            id="websiteUrl"
            v-model="place.websiteUrl"
            class="input input-bordered w-full mb-1"
          />

          <!--Facebook -->
          <label class="block text-sm font-medium mb-1" for="message">Facebook</label>
          <input
            id="facebookUrl"
            v-model="place.facebookUrl"
            class="input input-bordered w-full mb-1"
          />

          <!--Instagram -->
          <label class="block text-sm font-medium mb-1" for="message">Instagram</label>
          <input
            id="instagramUrl"
            v-model="place.instagramUrl"
            class="input input-bordered w-full mb-1"
          />

          <!--X-->
          <label class="block text-sm font-medium mb-1" for="message">X (twitter)</label>
          <input id="xUrl" v-model="place.xUrl" class="input input-bordered w-full mb-1" />

          <!--Submit -->
          <div class="flex justify-end">
            <button class="btn btn-primary" @click="submitForm">Valider</button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, reactive } from 'vue'
  import { Place } from '@/types/Place'
  import { usePlaceStore } from '@/stores/placeStore'
  import { getCommunesList } from '@/services/communesService'
  import AddressInput from '@/components/AddressInput.vue'
  import { Commune } from '@/types/Commune'

  // ----------------------
  // State & Refs
  // ----------------------
  const isInit = ref(false)
  const load = ref(false)
  const errorForm = ref<string | null>(null)

  const communes = getCommunesList()
  const selectedCommune = ref<Commune>({ code: '', name: '' })
  const selectedAddress = ref<any>()
  const initialAddress = ref()

  import { mapToPlace } from '@/services/placeService'
  const place: Place = reactive(mapToPlace({}))

  // Accès au store
  const placeStore = usePlaceStore()

  // ----------------------
  // Lifecycle
  // ----------------------
  onMounted(() => {
    initForm()
    isInit.value = true
  })

  // ----------------------
  // Methods
  // ----------------------
  function initForm() {
    selectedCommune.value = { code: '', name: '' }
    Object.assign(place, mapToPlace({}))
  }

  function handleAddressSelected(address: any) {
    selectedAddress.value = address
  }

  async function submitForm() {
    load.value = true

    // Renseigner la commune
    if (selectedCommune.value) {
      place.city = selectedCommune.value.name || ''
    }

    // Renseigner l'adresse et les coordonnées
    if (selectedAddress.value) {
      place.address = selectedAddress.value.properties?.name || ''
      place.latitude = selectedAddress.value.geometry?.coordinates?.[1] || null
      place.longitude = selectedAddress.value.geometry?.coordinates?.[0] || null
    }

    try {
      await placeStore.addPlace(place)
      initForm()
      placeStore.closForm()
    } catch (error) {
      errorForm.value = "Erreur d'enregistrement"
      console.error('Error adding place:', error)
    } finally {
      load.value = false
    }
  }
</script>
