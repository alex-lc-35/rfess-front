import { defineStore } from 'pinia'
import L, { Map, TileLayer, LayerGroup, Icon } from 'leaflet'
import { communesContour } from '@/modules/communes'

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    map: null as Map | null,
    tileLayer: null as TileLayer | null,
    markersGroup: null as LayerGroup | null,
    options: {
      center: [48.8566, 2.3522] as [number, number],
      zoom: 13,
    },
  }),
  actions: {
    initializeMap(mapElementId: string) {
      if (this.map) return

      this.map = L.map(mapElementId).setView(this.options.center, this.options.zoom)

      this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      })
      this.tileLayer.addTo(this.map as Map)

      this.markersGroup = L.layerGroup().addTo(this.map as Map)

      // Ajouter contours des communes
      L.geoJSON(communesContour, {
        style: { color: '#FF0000', weight: 2, opacity: 0.8 },
      }).addTo(this.map as Map)

      // Centrer et ajuster le zoom pour englober tout le polygone
      this.map.fitBounds(L.geoJSON(communesContour).getBounds())
    },

    setMarkers(points: { lat: number; lng: number; description: string }[]) {
      if (!this.map || !this.markersGroup) return

      this.markersGroup.clearLayers()

      const placeIcon = new Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41], // Taille de l'icône
        iconAnchor: [12, 41], // Point de l'icône correspondant à la position géographique
        popupAnchor: [1, -34], // Position du popup par rapport à l'icône
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41], // Taille de l'ombre
      })

      points.forEach((point) => {
        const marker = L.marker([point.lat, point.lng], { icon: placeIcon })
        marker.bindPopup(point.description).addTo(this.markersGroup as LayerGroup)
      })
    },
  },
})
