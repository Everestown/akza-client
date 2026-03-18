import { OrderFormStore } from './order-form.store'
import { UIStore } from './ui.store'

export class RootStore {
  orderForm: OrderFormStore
  ui: UIStore

  constructor() {
    this.orderForm = new OrderFormStore()
    this.ui = new UIStore()
  }
}

export const rootStore = new RootStore()
