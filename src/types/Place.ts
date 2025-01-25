export interface Place {
  id: number | null
  name: string | null
  latitude: number | null
  longitude: number | null
  description?: string | null
  city: string | null
  address?: string | null
  category?: string | null
  createdAt: string | null // Format ISO string
  facebookUrl?: string | null
  instagramUrl?: string | null
  xUrl?: string | null // Remplacement de twitterUrl par xUrl
  websiteUrl?: string | null
}
