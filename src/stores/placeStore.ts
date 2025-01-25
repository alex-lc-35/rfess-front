/*placeStore.ts*/
import { defineStore } from 'pinia'
import { mapToPlace } from '@/services/placeService'
import { Place } from '@/types/Place'

interface MapStoreState {
  list: Place[]
  selected: Place | null
  showForm: boolean
}

export const usePlaceStore = defineStore('placeStore', {
  state: (): MapStoreState => ({
    list: [],
    selected: null,
    showForm: false,
  }),
  actions: {
    setList(list: Place[]) {
      this.list = list
    },
    addPlace(place: Place) {
      this.list.push(place)
    },
    setPlace(place: Place) {
      this.selected = place
    },
    initPlace() {
      this.selected = mapToPlace({})
    },
    openForm() {
      this.showForm = true
    },
    closForm() {
      this.showForm = false
    },
  },
})
