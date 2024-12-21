import type { Polygon } from 'geojson'

export const comcomCoordinates: Polygon = {
  type: 'Polygon',
  coordinates: [
    [
      [-1.507, 47.96],
      [-1.495, 47.96],
      [-1.495, 47.97],
      [-1.507, 47.97],
      [-1.507, 47.96], // Fermeture
    ],
  ],
}
