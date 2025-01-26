/*placeService.ts*/
import { get, post } from '@/services/apiService'
import { Place } from '@/types/Place'
import { MapPoint } from '@/types/MapPoint'
import { createApp } from 'vue'
import CardPlace from '@/components/CardPlace.vue'

export const fetchPlaces = async (): Promise<Place[]> => {
  const places: Place[] = await get('/places')
  return places.map(mapToPlace)
}

export async function createPlace(place: Place): Promise<Place> {
  const record = await post('/places', place)
  return mapToPlace(record)
}

// Fonction pour transformer un tableau de lieux en points GeoJSON
export const placesPoints = (places: Place[]): MapPoint[] => {
  return places.map(mapToGeoJsonPoint)
}

// Fonction pour convertir un objet brut en Place
export const mapToPlace = (data: Partial<Place>): Place => {
  return {
    id: data.id ?? null,
    name: data.name || '',
    city: data.city || '',
    address: data.address || '',
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    description: data.description || '',
    createdAt: data.createdAt || new Date().toISOString(),
    facebookUrl: data.facebookUrl || null,
    instagramUrl: data.instagramUrl || null,
    xUrl: data.xUrl || null,
    websiteUrl: data.websiteUrl || null,
    category: data.category || null,
  }
}

// Fonction pour convertir un objet Place en un point GeoJSON
export const mapToGeoJsonPoint = (place: Place): MapPoint => {
  if (place.latitude === null || place.longitude === null) {
    throw new Error('Invalid Place: latitude and longitude are required to create a GeoJSON point')
  }

  const popupContainer = document.createElement('div')
  createApp(CardPlace, { place }).mount(popupContainer)

  return {
    latitude: place.latitude,
    longitude: place.longitude,
    description: popupContainer,
    object: null,
  }
}
