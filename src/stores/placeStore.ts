/*placeStore.ts*/
import { defineStore } from 'pinia'
import {
  fetchPlaces,
  createPlace,
  mapToGeoJsonPoint,
  placesPoints,
  mapToPlace,
} from '@/services/placeService'
import { Place } from '@/types/Place'
import { useMapStore } from '@/stores/mapStore'

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
    async fetchPlaces() {
      const places = await fetchPlaces()
      this.list = places
      const points = placesPoints(places)
      const mapStore = useMapStore()
      mapStore.setMarkers(points)
    },
    async addPlace(place: Place) {
      const newPlace = await createPlace(place)
      this.list.push(newPlace)
      const point = mapToGeoJsonPoint(newPlace)
      const mapStore = useMapStore()
      mapStore.addMarker(point)
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
      this.selected = null
    },
  },
})
