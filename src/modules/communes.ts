import type { FeatureCollection, Geometry, Feature } from 'geojson'
import communes from '@/assets/data/communes.json'
import communesCoordinates from '@/assets/data/communesCoordinates.json'

export const communesContour: FeatureCollection = {
  type: 'FeatureCollection',
  features: communes.map((commune) => {
    const contourData = communesCoordinates.find((coordinate) => coordinate.code === commune.code)

    if (contourData && contourData.contour) {
      return {
        type: 'Feature',
        properties: { name: commune.name },
        geometry: contourData.contour,
      } as Feature<Geometry, { name: string }>
    }

    throw new Error(`Contour manquant pour le code ${commune.code}`)
  }),
}

export const getCommunesList = (): { code: string; name: string }[] => {
  return communes
    .map((commune) => ({
      code: commune.code,
      name: commune.name,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
}
