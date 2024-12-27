import { Feature, Point } from 'geojson'

export interface Place {
  name: string
  city: string
  address: string
  latitude: number | null
  longitude: number | null
  description: string
}

export const mapToPlace = (data: Partial<Place> = {}): Place => {
  return {
    name: data.name || '',
    city: data.city || '',
    address: data.address || '',
    latitude: data.latitude ?? null,
    longitude: data.longitude ?? null,
    description: data.description || '',
  }
}

export const mapToGeoJsonPoint = (place: Place): Feature<Point> => {
  if (place.latitude === null || place.longitude === null) {
    throw new Error('Invalid Place: latitude and longitude are required to create a GeoJSON point')
  }

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [place.longitude, place.latitude],
    },
    properties: {
      name: place.name,
      city: place.city,
      address: place.address,
      description: place.description,
    },
  }
}