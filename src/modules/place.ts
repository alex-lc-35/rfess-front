import { Feature, Point } from 'geojson'
import { get } from '@/modules/api'

export interface Place {
  name: string
  city: string
  address: string
  latitude: number | null
  longitude: number | null
  description: string
}

// Fonction principale pour obtenir les données GeoJSON
export const getPlacesGeoJson = async () => {
  const res = await get('/places') // Supposé retourner un tableau
  const places = res.map(mapToPlace) // Conversion des données en objets Place
  return places.map(mapToGeoJsonPoint) // Conversion en GeoJSON
}

// Fonction pour convertir un objet brut en Place
export const mapToPlace = (data: Partial<Place>): Place => {
  return {
    name: data.name || '',
    city: data.city || '',
    address: data.address || '',
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    description: data.description || '',
  }
}

// Fonction pour convertir un objet Place en GeoJSON
export const mapToGeoJsonPoint = (place: Place) => {
  if (place.latitude === null || place.longitude === null) {
    throw new Error('Invalid Place: latitude and longitude are required to create a GeoJSON point')
  }
  return {
    lat: place.latitude,
    lng: place.longitude,
    description: place.description,
  }
}
