import type { AxiosError } from 'axios'
interface ApiErr { error?: { message?: string } }
export function getErrorMessage(error: unknown): string {
  const e = error as AxiosError<ApiErr>
  return e.response?.data?.error?.message ?? e.message ?? 'Произошла ошибка'
}
