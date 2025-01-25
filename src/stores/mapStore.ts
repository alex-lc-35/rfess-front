/*mapStore.ts*/
import { defineStore } from 'pinia'
import L, { Map, TileLayer, LayerGroup, Icon } from 'leaflet'
import { communesContour } from '@/services/communesService'
import { MapPoint } from '@/types/MapPoint'

export const useMapStore = defineStore('mapStore', {
  state: () => ({
    map: null as Map | null,
    tileLayer: null as TileLayer | null,
    markersGroup: null as LayerGroup | null,
    options: {
      center: [48.8566, 2.3522] as [number, number],
      zoom: 13,
    },
    selectedPoint: null as MapPoint | null,
    editPoint: null as MapPoint | null,
  }),
  actions: {
    initializeMap(mapElementId: string) {
      if (this.map) {
        this.map.remove() // Supprime l'ancienne instance de la carte
        this.map = null
      }

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

    // Crée et configure un marqueur pour un point donné
    createMarker(point: MapPoint): L.Marker {
      // On crée l'icône ici, pour éviter la duplication de code
      const placeIcon = new Icon({
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        iconSize: [25, 41], // Taille de l'icône
        iconAnchor: [12, 41], // Point de l'icône correspondant à la position géographique
        popupAnchor: [1, -34], // Position du popup par rapport à l'icône
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        shadowSize: [41, 41], // Taille de l'ombre
      })

      // Création du marqueur
      const marker = L.marker([point.latitude, point.longitude], { icon: placeIcon })

      // Gérer le popup
      if (point.description) {
        marker.bindPopup(point.description)
      }

      // Gérer l'événement clic
      if (point.object) {
        marker.on('click', () => {
          this.selectedPoint = point
        })
      }

      return marker
    },

    // Mettre à jour tous les marqueurs d'un coup
    setMarkers(points: MapPoint[]) {
      if (!this.map || !this.markersGroup) return

      // Supprime tous les marqueurs existants
      this.markersGroup.clearLayers()

      // Pour chaque point, on crée un marqueur et on l'ajoute au groupe
      points.forEach((point) => {
        const marker = this.createMarker(point)
        marker.addTo(this.markersGroup as LayerGroup)
      })
    },

    // Ajouter un marqueur unique
    addMarker(point: MapPoint) {
      if (!this.map || !this.markersGroup) return

      const marker = this.createMarker(point)
      marker.addTo(this.markersGroup as LayerGroup)
    },
  },
})
