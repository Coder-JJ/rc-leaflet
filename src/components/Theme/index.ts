import React from 'react'
import L from 'leaflet'

export interface Theme {
  path?: L.PathOptions
}

const ThemeContext = React.createContext<Theme>(null)
const ThemeProvider = ThemeContext.Provider

export type ThemeContextType = React.ContextType<typeof ThemeContext>

export {
  ThemeContext,
  ThemeProvider
}
