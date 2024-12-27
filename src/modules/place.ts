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