<template>
  <div>
    <AddressInput :selectedCommune="selectedCommune" @addressSelected="handleAddressSelected" />
    <p v-if="selectedAddress" class="mt-4">Adresse sélectionnée : {{ selectedAddress }}</p>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import AddressInput from '@/components/AddressInput.vue'

  const selectedCommune = ref({ code: '35002', name: 'Amanlis' })
  const selectedAddress = ref('')

  const handleAddressSelected = (address: string) => {
    selectedAddress.value = address
  }
</script>
