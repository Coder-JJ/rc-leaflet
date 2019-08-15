import L from 'leaflet'

export type MapHandler = 'boxZoom' | 'doubleClickZoom' | 'dragging' | 'keyboard' | 'scrollWheelZoom' | 'tap' | 'touchZoom'

export type LeafletMouseEventHandlerFn = (e: L.LeafletMouseEvent) => void
