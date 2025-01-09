import axios, { AxiosRequestConfig, AxiosError } from 'axios'

console.log('API IMPORT', process.env.VUE_APP_API_BASE_URL)

const api = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Gestion des erreurs
const handleError = (error: AxiosError) => {
  if (error.response) {
    // Erreur HTTP (codes de réponse 4xx ou 5xx)
    console.error(`HTTP Error: ${error.response.status} - ${error.response.statusText}`)
    console.error('Details:', error.response.data)
    throw new Error(`HTTP Error: ${error.response.statusText}`)
  } else if (error.request) {
    // Pas de réponse du serveur
    console.error('No response received:', error.request)
    throw new Error('No response from server')
  } else {
    // Erreur inconnue
    console.error('Error:', error.message)
    throw new Error(error.message)
  }
}

// Fonction générique pour les requêtes GET
export const get = async (route: string, config?: AxiosRequestConfig) => {
  try {
    const response = await api.get(route, config)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}

// Fonction générique pour les requêtes POST
export const post = async (route: string, data: unknown, config?: AxiosRequestConfig) => {
  try {
    const response = await api.post(route, data, config)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}

// Fonction générique pour les requêtes PUT
export const put = async (route: string, data: unknown, config?: AxiosRequestConfig) => {
  try {
    const response = await api.put(route, data, config)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}

// Fonction générique pour les requêtes DELETE
export const del = async (route: string, config?: AxiosRequestConfig) => {
  try {
    const response = await api.delete(route, config)
    return response.data
  } catch (error) {
    handleError(error as AxiosError)
  }
}
