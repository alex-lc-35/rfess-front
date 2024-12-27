import axios, { AxiosRequestConfig } from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Remplacez par l'URL de votre backend
  headers: {
    'Content-Type': 'application/json',
  },
})

// Fonction générique pour les requêtes GET
export const get = async (route: string, config?: AxiosRequestConfig) => {
  const response = await api.get(route, config)
  return response.data
}

// Fonction générique pour les requêtes POST
export const post = async (route: string, data: unknown, config?: AxiosRequestConfig) => {
  const response = await api.post(route, data, config)
  return response.data
}

// Fonction générique pour les requêtes PUT
export const put = async (route: string, data: unknown, config?: AxiosRequestConfig) => {
  const response = await api.put(route, data, config)
  return response.data
}

// Fonction générique pour les requêtes DELETE
export const del = async (route: string, config?: AxiosRequestConfig) => {
  const response = await api.delete(route, config)
  return response.data
}
