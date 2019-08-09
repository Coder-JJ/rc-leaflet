import { createContext } from 'react'
import L from 'leaflet'

export interface ContextType {
  path?: L.PathOptions
}

const Context = createContext<ContextType>(null)

export default Context
