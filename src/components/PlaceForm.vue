<template>
  <div class="w-full h-full">
    <!-- LOAD -->
    <div v-if="load">
      <span class="loading loading-spinner loading-xs"></span>
    </div>

    <!-- FORM -->
    <div
      v-if="isInit && !load"
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

        <!--Name -->
        <div>
          <label class="block text-sm font-medium mb-1" for="name">Name</label>
          <input id="name"
v-model="place.name" type="text"
class="input input-bordered w-full" />
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
  import { onMounted, ref, reactive, defineEmits } from 'vue'
  import { usePlaceStore } from '@/stores/placeStore'
  import { useMapStore } from '@/stores/mapStore'
  import { Place } from '@/types/Place'
  import { MapPoint } from '@/types/MapPoint'

  import { post } from '@/services/apiService'
  import { getCommunesList } from '@/services/communesService'
  import { mapToPlace, mapToGeoJsonPoint } from '@/services/placeService'

  import AddressInput from '@/components/AddressInput.vue'

  // ==============================
  // State & Refs
  // ==============================
  const isInit = ref(false)
  const load = ref(false)
  const errorForm = ref<string | null>(null)

  const communes = getCommunesList()
  const selectedCommune = ref<{ code?: string; name?: string }>({ code: '', name: '' })
  const selectedAddress = ref<any>() // votre type d'auto-complétion ?

  // Création d’un objet Place réactif à partir d’un mapping de base
  const place: Place = reactive(mapToPlace({}))

  // Émissions d’événements
  const emit = defineEmits(['placeAdded', 'close'])

  // Accès aux stores Pinia
  const placeStore = usePlaceStore()
  const mapStore = useMapStore()

  // ==============================
  // Lifecycle
  // ==============================
  onMounted(() => {
    initForm()
    isInit.value = true
  })

  // ==============================
  // Methods
  // ==============================
  function initForm() {
    // On réinitialise la commune et les erreurs
    selectedCommune.value = { code: '', name: '' }
    errorForm.value = null
  }

  /**
   * Récupère l'adresse sélectionnée dans le composant AddressInput
   */
  function handleAddressSelected(address: any) {
    selectedAddress.value = address
  }

  /**
   * Soumet le formulaire :
   * - Envoie la nouvelle place à l’API
   * - Met à jour la liste dans le store
   * - Ajoute le marqueur sur la carte
   * - Affiche un message ou gère les erreurs en conséquence
   */
  async function submitForm() {
    load.value = true

    if (selectedCommune.value) {
      place.city = selectedCommune.value.name || ''
    }
    if (selectedAddress.value) {
      place.address = selectedAddress.value.properties?.name || ''
      place.latitude = selectedAddress.value.geometry?.coordinates?.[1] || null
      place.longitude = selectedAddress.value.geometry?.coordinates?.[0] || null
    }

    try {
      const savedPlace = await post('/places', place)
      const newPlace = mapToPlace(savedPlace)

      placeStore.addPlace(newPlace)
      mapStore.addMarker(mapToGeoJsonPoint(newPlace))

      initForm()
      placeStore.closForm()
    } catch (error) {
      errorForm.value = "Erreur d'enregistrement"
      console.error('Error adding place:', error)
    } finally {
      // Quoi qu'il arrive, on arrête le chargement
      load.value = false
    }
  }
</script>
