import L from 'leaflet'
import { distinct } from '../../util/Array'
import throttle from '../../util/throttle'
import { defaultOptions as defaultIconOptions } from '../Icon/creator'

export type Icon = Partial<{
  iconUrl: string
  iconSize: L.PointExpression
  iconAnchor: L.PointExpression
  popupAnchor: L.PointExpression
  tooltipAnchor: L.PointExpression
}>

export interface Box {
  top: number
  bottom: number
  left: number
  right: number
}

export interface MassPoint extends Icon {
  position: L.LatLngExpression
  [key: string]: any
}

export interface EventTarget {
  index: number
  point: MassPoint
}

export interface MassLayerOptions extends L.InteractiveLayerOptions, Icon {
  points: MassPoint[]
  throttleThreshold?: number
  throttleDuration?: number
}

export const defaultOptions: MassLayerOptions = {
  points: [],
  throttleThreshold: 20480,
  throttleDuration: 60
}

export default class MassLayer extends L.Layer {
  private options: MassLayerOptions

  private canvas: HTMLCanvasElement

  public ctx: CanvasRenderingContext2D

  private icons: { [key: string]: HTMLImageElement }

  private iconsReady: Promise<any[]>

  private prevHover: EventTarget

  private hover: EventTarget

  private click: EventTarget

  private throttledReset: () => void

  public constructor (options?: MassLayerOptions) {
    super(options)
    L.Util.setOptions(this, L.Util.extend(defaultOptions, options))
    this.canvas = L.DomUtil.create('canvas', 'leaflet-zoom-animated') as HTMLCanvasElement
    this.ctx = this.canvas.getContext('2d')
    this.prepareIcons()
    this.setThrottledReset(this.options)
  }

  private setThrottledReset (options: MassLayerOptions): void {
    const threshold = options.throttleThreshold || defaultOptions.throttleThreshold
    const duration = options.throttleDuration || defaultOptions.throttleDuration
    this.throttledReset = options.points.length <= threshold ? this.reset : throttle(this.reset, duration)
  }

  public onAdd (map: L.Map): this {
    const { x, y } = map.getSize()
    this.canvas.width = x
    this.canvas.height = y

    map.on('click', this.onClick, this)
    map.on('mousemove', this.onMouseMove, this)
    map.on('move', this.throttledReset, this)
    map.on('moveend', this.reset, this)
    map.on('zoomanim', this.zoomAnim, this)
    this.on('popupclose', this.onPopupClose)
    this.getPane().appendChild(this.canvas)
    this.draw()
    return this
  }

  public onRemove (map: L.Map): this {
    map.off('click', this.onClick, this)
    map.off('mousemove', this.onMouseMove, this)
    map.off('move', this.throttledReset, this)
    map.off('moveend', this.reset, this)
    map.off('zoomanim', this.zoomAnim, this)
    this.off()
    L.DomUtil.remove(this.canvas)
    return this
  }

  public addTo (map: L.Map): this {
    map.addLayer(this)
    return this
  }

  public getLatLng (): L.LatLngExpression {
    return this.hover ? this.hover.point.position : this._map.getCenter()
  }

  public setOptions (options: MassLayerOptions): void {
    this.closePopup()
    L.Util.setOptions(this, options)
    this._map.off('move', this.throttledReset, this)
    this.setThrottledReset(options)
    this._map.on('move', this.throttledReset, this)
    this.prepareIcons()
    this.draw()
  }

  public getOptions = (): MassLayerOptions => this.options

  public setPoints (points: MassPoint[]): void {
    this.setOptions({ points })
  }

  public getPoints = (): MassPoint[] => this.options.points

  public setIconUrl (url: string): void {
    this.setPopupAnchor(this.options.popupAnchor)
    this.options.iconUrl = url
    this.prepareIcons()
    this.draw()
  }

  public getIconUrl = (point: MassPoint): string => point.iconUrl || this.options.iconUrl || defaultIconOptions.iconUrl

  public setIconSize (size: L.PointExpression): void {
    this.options.iconSize = size
    this.draw()
  }

  public getIconSize (point: MassPoint): L.Point {
    const iconSize = point.iconSize || this.options.iconSize
    if (iconSize) {
      return L.point(iconSize)
    }
    const iconUrl = this.getIconUrl(point)
    if (iconUrl === defaultIconOptions.iconUrl) {
      return L.point(defaultIconOptions.iconSize)
    }
    const icon = this.icons[iconUrl]
    return L.point(icon.width, icon.height)
  }

  public setIconAnchor (anchor: L.PointExpression): void {
    this.options.iconAnchor = anchor
    this.draw()
  }

  public getIconAnchor (point: MassPoint): L.Point {
    const iconAnchor = point.iconAnchor || this.options.iconAnchor
    if (iconAnchor) {
      return L.point(iconAnchor)
    }
    if (this.getIconUrl(point) === defaultIconOptions.iconUrl) {
      return L.point(defaultIconOptions.iconAnchor)
    }
    return L.point(0, 0)
  }

  public setPopupAnchor (anchor: L.PointExpression): void {
    this.options.popupAnchor = anchor
    if (this.isPopupOpen()) {
      (this.getPopup() as any)._updatePosition()
    }
  }

  public getPopupAnchor (point: MassPoint): L.Point {
    const popupAnchor = point.popupAnchor || this.options.popupAnchor
    if (popupAnchor) {
      return L.point(popupAnchor)
    }
    if (this.getIconUrl(point) === defaultIconOptions.iconUrl) {
      return L.point(defaultIconOptions.popupAnchor)
    }
    return L.point(0, 0)
  }

  public setTooltipAnchor (anchor: L.PointExpression): void {
    this.options.tooltipAnchor = anchor
    if (this.isTooltipOpen()) {
      (this.getTooltip() as any)._updatePosition()
    }
  }

  public getTooltipAnchor (point: MassPoint): L.Point {
    const tooltipAnchor = point.tooltipAnchor || this.options.tooltipAnchor
    if (tooltipAnchor) {
      return L.point(tooltipAnchor)
    }
    if (this.getIconUrl(point) === defaultIconOptions.iconUrl) {
      return L.point(defaultIconOptions.tooltipAnchor)
    }
    return L.point(0, 0)
  }

  public getIconBox (point: MassPoint): Box {
    const iconSize = this.getIconSize(point)
    const iconAnchor = this.getIconAnchor(point)
    const pixel = this._map.latLngToContainerPoint(point.position)
    const top = pixel.y - iconAnchor.y
    const bottom = pixel.y + iconSize.y - iconAnchor.y
    const left = pixel.x - iconAnchor.x
    const right = pixel.x + iconSize.x - iconAnchor.x
    return { top, bottom, left, right }
  }

  private _getPopupAnchor (): L.PointExpression {
    return this.click ? this.getPopupAnchor(this.click.point) : [0, 0]
  }

  private _getTooltipAnchor (): L.PointExpression {
    return this.hover ? this.getTooltipAnchor(this.hover.point) : [0, 0]
  }

  private prepareIcons (): void {
    const { points } = this.options
    this.iconsReady = Promise.resolve([])
    if (points && points.length) {
      this.icons = {}
      const urls = distinct(points.map(this.getIconUrl))
      this.iconsReady = Promise.all(
        urls.map(url => new Promise(resolve => {
          const image = new Image()
          image.onload = resolve
          image.src = url
          this.icons[url] = image
        }))
      )
    }
  }

  private async draw (): Promise<void> {
    const { points } = this.options
    await this.iconsReady
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    if (points && points.length) {
      const mapSize = this._map.getSize()
      this.closeTooltip()
      for (const point of points) {
        const { top, bottom, left, right } = this.getIconBox(point)
        if (bottom <= 0 || top >= mapSize.y || right <= 0 || left >= mapSize.x) {
          continue
        }
        this.ctx.drawImage(this.icons[this.getIconUrl(point)], left, top, right - left, bottom - top)
      }
    }
  }

  private onClick = (e: L.LeafletMouseEvent): void => {
    this.click = this.hover
    if (this.click) {
      this.fire('click', this.click)
    }
  }

  private onMouseMove = (e: L.LeafletMouseEvent): void => {
    const { points } = this.options
    if (points && points.length) {
      const { x, y } = e.containerPoint
      const length = points.length
      const array = [...points].reverse()
      let target: EventTarget
      for (const [index, point] of array.entries()) {
        const { top, bottom, left, right } = this.getIconBox(point)
        if (x > left && x < right && y > top && y < bottom) {
          target = { index: length - index - 1, point }
          break
        }
      }
      if (target) {
        L.DomUtil.addClass(this.canvas, 'leaflet-interactive')
        this.fire('mousemove', { ...target, latlng: this._map.containerPointToLatLng(e.containerPoint) })
      } else {
        L.DomUtil.removeClass(this.canvas, 'leaflet-interactive')
      }
      this.hover = target
      if (this.prevHover && (!target || this.prevHover.point !== target.point)) {
        this.fire('mouseout', this.prevHover)
      }
      if (target && (!this.prevHover || target.point !== this.prevHover.point)) {
        this.fire('mouseover', target)
      }
      this.prevHover = target
    }
  }

  private reset = (): void => {
    const { x, y } = this._map.getSize()
    if (this.canvas.width !== x || this.canvas.height !== y) {
      this.canvas.width = x
      this.canvas.height = y
    }
    if (!this._map) {
      return
    }
    const point = L.DomUtil.getPosition(this._map.getPanes().mapPane)
    L.DomUtil.setPosition(this.canvas, L.point(-Math.round(point.x), -Math.round(point.y)))
    this.draw()
  }

  private zoomAnim = (e: L.LeafletEvent & { center: L.LatLng, zoom: number }): void => {
    const scale = this._map.getZoomScale(e.zoom, this._map.getZoom())
    const position = L.DomUtil.getPosition(this.canvas)
    const viewHalf = this._map.getSize().multiplyBy(0.5)
    const currentCenterPoint = this._map.project(this._map.getCenter(), e.zoom)
    const destCenterPoint = this._map.project(e.center, e.zoom)
    const centerOffset = destCenterPoint.subtract(currentCenterPoint)
    const topLeftOffset = viewHalf.multiplyBy(-scale).add(position).add(viewHalf).subtract(centerOffset)
    L.DomUtil.setTransform(this.canvas, topLeftOffset, scale)
  }

  private onPopupClose = (): void => { this.click = undefined }
}
