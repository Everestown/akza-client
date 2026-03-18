import { makeAutoObservable } from 'mobx'

export class GalleryStore {
  activeIndex = 0

  constructor() { makeAutoObservable(this) }

  setActive(i: number) { this.activeIndex = i }
  next(total: number) { this.activeIndex = (this.activeIndex + 1) % total }
  prev(total: number) { this.activeIndex = (this.activeIndex - 1 + total) % total }
}

export const galleryStore = new GalleryStore()
