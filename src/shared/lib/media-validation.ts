/** Detect media type from MIME or URL extension */
export function detectMediaType(
  mimeType?: string | null,
  url?: string | null,
): 'image' | 'video' | 'unknown' {
  if (mimeType) {
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
  }
  if (url) {
    const lower = url.toLowerCase().split('?')[0] ?? ''
    if (/\.(jpg|jpeg|png|webp|gif|avif|svg)$/.test(lower)) return 'image'
    if (/\.(mp4|webm|mov|avi|mkv|m4v)$/.test(lower)) return 'video'
  }
  return 'unknown'
}
