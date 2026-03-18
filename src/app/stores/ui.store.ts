import { makeAutoObservable } from 'mobx'

export class UIStore {
  isNavOpen = false

  constructor() { makeAutoObservable(this) }

  openNav()  { this.isNavOpen = true }
  closeNav() { this.isNavOpen = false }
  toggleNav(){ this.isNavOpen = !this.isNavOpen }
}
