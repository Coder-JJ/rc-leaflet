import { createContext } from 'react'
import L from 'leaflet'

export type ContextType = Readonly<{
  instance: L.Layer
  icon: L.Icon | L.DivIcon
}>

const Context = createContext<ContextType>(undefined)

export default Context
