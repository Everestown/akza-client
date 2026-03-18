import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { VariantGallery } from './variant-gallery'
import type { VariantImage } from '@/entities/variant/types/variant.types'

// Use placeholder images that actually load
const mkImg = (i: number): VariantImage => ({
  id: String(i),
  url: `https://picsum.photos/seed/akza${i}/400/533`,
  s3_key: `img-${i}`, sort_order: i, created_at: '2026-01-01T00:00:00Z',
})

const images = Array.from({ length: 4 }, (_, i) => mkImg(i + 1))

const meta: Meta = {
  title: 'widgets/VariantGallery',
  tags: ['autodocs'],
}
export default meta

export const SingleImage: StoryObj = {
  render: () => <div className="w-80"><VariantGallery images={[images[0]!]} /></div>,
}
export const MultipleImages: StoryObj = {
  render: () => <div className="w-80"><VariantGallery images={images} /></div>,
}
export const Empty: StoryObj = {
  render: () => <div className="w-80"><VariantGallery images={[]} /></div>,
}
export const TwoImages: StoryObj = {
  render: () => <div className="w-80"><VariantGallery images={images.slice(0, 2)} /></div>,
}
