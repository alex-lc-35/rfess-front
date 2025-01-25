<template>
  <a v-if="url" :href="url" target="_blank" rel="noopener noreferrer">
    <font-awesome-icon :icon="icon" :class="`w-${size} h-${size}`" />
  </a>
</template>

<script setup lang="ts">
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  // Typage des props
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = withDefaults(
    defineProps<{
      icon: [string, string]
      url: string | null | undefined
      size?: number // La taille reste optionnelle pour utiliser un défaut
    }>(),
    {
      size: 6,
    }
  )
</script>
