import { createContext, useContext } from 'react'
import { rootStore, type RootStore } from './root.store'

export const StoreContext = createContext<RootStore>(rootStore)
export const useStore = (): RootStore => useContext(StoreContext)
