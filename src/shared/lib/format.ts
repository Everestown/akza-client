export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 0 }).format(amount)
}
export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(iso))
}
export function formatCountdown(ms: number): { d: string; h: string; m: string; s: string } {
  if (ms <= 0) return { d: '00', h: '00', m: '00', s: '00' }
  const sec = Math.floor(ms / 1000)
  const pad = (n: number) => String(n).padStart(2, '0')
  return { d: pad(Math.floor(sec / 86400)), h: pad(Math.floor((sec % 86400) / 3600)), m: pad(Math.floor((sec % 3600) / 60)), s: pad(sec % 60) }
}
