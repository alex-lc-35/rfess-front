<template>
  <div>
    <input
      id="address"
      v-model="query"
      type="text"
      placeholder="Commencez à saisir et sélectionner dans la liste"
      class="input input-bordered w-full"
      @input="fetchSuggestions"
    />
    <ul v-if="suggestions.length" class="mt-2 bg-white shadow rounded">
      <li
        v-for="suggestion in suggestions"
        :key="suggestion.properties.id"
        class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion.properties.name }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { ref, defineProps, defineEmits, watch } from 'vue'

  // Définir les props
  const { selectedCommune } = defineProps<{
    selectedCommune: { code: string; name: string }
  }>()

  // Définir les événements
  const emit = defineEmits(['addressSelected'])

  const query = ref('')
  const suggestions = ref([])

  const fetchSuggestions = async () => {
    if (query.value.length < 5) {
      suggestions.value = []
      return
    }

    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query.value)}&citycode=${
          selectedCommune.code
        }`
      )
      const data = await response.json()
      suggestions.value = data.features || []
    } catch (error) {
      console.error('Erreur lors de la récupération des suggestions :', error)
    }
  }

  const selectSuggestion = (suggestion: any) => {
    query.value = suggestion.properties.name
    suggestions.value = []
    emit('addressSelected', suggestion)
  }

  watch(
    () => selectedCommune.code,
    () => {
      query.value = ''
      suggestions.value = []
      emit('addressSelected', null)
    }
  )
</script>

<!--<style scoped>
  .input {
    @apply border rounded-md px-4 py-2 w-full;
  }
  .input-bordered {
    @apply border-gray-300 focus:ring focus:ring-blue-300;
  }
</style>-->
