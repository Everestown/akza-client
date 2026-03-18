import { makeAutoObservable } from 'mobx'

export class OrderFormStore {
  isOpen = false
  variantId: string | null = null
  variantSlug: string | null = null
  isSubmitting = false

  constructor() { makeAutoObservable(this) }

  openFor(variantId: string, variantSlug: string) {
    this.variantId = variantId
    this.variantSlug = variantSlug
    this.isOpen = true
  }

  close() {
    this.isOpen = false
    this.variantId = null
    this.variantSlug = null
  }

  setSubmitting(v: boolean) { this.isSubmitting = v }
}
