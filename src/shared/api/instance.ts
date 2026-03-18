import axios from 'axios'
export const api = axios.create({
  baseURL: (import.meta as { env: Record<string,string> }).env.VITE_API_URL ?? '/api/v1',
  headers: { 'Content-Type': 'application/json' },
  timeout: 12_000,
})
