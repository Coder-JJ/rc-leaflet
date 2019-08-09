import { createContext } from 'react'
import L from 'leaflet'
import { ContextType as ThemeContextType } from '../Theme'

export type ContextType = Readonly<{
  map: L.Map
  theme: ThemeContextType
}>

const Context = createContext<ContextType>(null)

export default Context
