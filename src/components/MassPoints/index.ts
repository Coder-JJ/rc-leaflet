import { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Point, Pixel } from '../../util/PropTypes'
import { getBounds } from '../../util/Map'
import { ContextType } from '../RCMap/Context'
import InteractiveLayer from '../InteractiveLayer'
import { defaultOptions } from '../Icon/creator'
import Popup from '../Popup'
import Tooltip from '../Tooltip'

interface Box {
  top: number
  bottom: number
  left: number
  right: number
}

interface RequiredProps {
  points: L.LatLngExpression[]
}

interface PartialProps {
  iconUrl: string
  iconSize: L.PointExpression
  iconAnchor: L.PointExpression
  popupAnchor: L.PointExpression
  tooltipAnchor: L.PointExpression
}

type Props = Readonly<L.ImageOverlayOptions & Partial<PartialProps> & RequiredProps>

type State = Readonly<{
  clickPoint: L.LatLngExpression
  hoverPoint: L.LatLngExpression
}>

export default class MassPoints extends InteractiveLayer<L.ImageOverlay, Props, State> {
  public static propTypes = {
    ...InteractiveLayer.propTypes,
    points: PropTypes.arrayOf(Point).isRequired,
    iconUrl: PropTypes.string,
    iconSize: Pixel,
    iconAnchor: Pixel,
    popupAnchor: Pixel,
    tooltipAnchor: Pixel
  }

  private canvas: HTMLCanvasElement

  private ctx: CanvasRenderingContext2D

  private cursor: string | null

  private image: HTMLImageElement

  private imageReady: Promise<void>

  protected constructor (props: Props, context: ContextType) {
    super(props, context)
    this.state = { clickPoint: undefined, hoverPoint: undefined }
    const map = context.map

    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.setCanvasSize()
    const element = this.instance.getElement()
    element.style['pointer-events'] = 'inherit'
    this.cursor = element.style.cursor
    this.image = new Image()
    this.image.src = this.getIcon()
    this.imageReady = new Promise(resolve => {
      this.image.onload = () => {
        this.draw()
        resolve()
      }
    })
    map.on('moveend', this.onMoveEnd)
    map.on('click', this.onClick)
    map.on('mousemove', this.onMouseMove)
  }

  public async componentDidUpdate (prevProps: Props): Promise<void> {
    const { points: prevPoints, iconUrl: prevIconUrl, iconSize: prevIconSize, iconAnchor: prevIconAnchor } = prevProps
    const { points, iconUrl, iconSize, iconAnchor } = this.props

    if (iconUrl !== prevIconUrl) {
      this.image.src = this.getIcon()
      return
    }
    if (points !== prevPoints || iconSize !== prevIconSize || iconAnchor !== prevIconAnchor) {
      await this.imageReady
      this.draw()
    }
    super.componentDidUpdate(prevProps)
  }

  public componentWillUnmount (): void {
    const map = this.context.map
    map.off('moveend', this.onMoveEnd)
    map.off('click', this.onClick)
    map.off('mousemove', this.onMouseMove)
    super.componentWillUnmount()
  }

  protected createInstance (props: Props, context: ContextType): L.ImageOverlay {
    const { points, iconUrl, iconSize, iconAnchor, popupAnchor, tooltipAnchor, ...options } = props

    return L.imageOverlay(document.createElement('canvas').toDataURL('image/png'), getBounds(context.map, 3), options)
  }

  private setCanvasSize (): void {
    const size = this.context.map.getSize()
    this.canvas.width = 3 * size.x
    this.canvas.height = 3 * size.y
  }

  private draw (): void {
    const { points } = this.props
    const size = this.context.map.getSize()

    const [width, height] = this.getIconSize()
    this.setState({ clickPoint: undefined, hoverPoint: undefined })
    this.ctx.clearRect(0, 0, 3 * size.x, 3 * size.y)
    this.forEach(points, (position: L.LatLngExpression, box: Box) => this.ctx.drawImage(this.image, box.left + size.x, box.top + size.y, width, height))
    this.instance.setUrl(this.canvas.toDataURL('image/png'))
  }

  private pointExpressionToTuple = (pixel: L.PointExpression): L.PointTuple => (pixel instanceof L.Point ? [pixel.x, pixel.y] : pixel)

  private getIcon = (): string => this.props.iconUrl || defaultOptions.iconUrl

  private getIconSize (): L.PointTuple {
    const { iconSize } = this.props

    if (iconSize) {
      return this.pointExpressionToTuple(iconSize)
    }
    return [this.image.width, this.image.height]
  }

  private getIconAnchor (): L.PointTuple {
    const { iconAnchor } = this.props

    if (iconAnchor) {
      return this.pointExpressionToTuple(iconAnchor)
    }
    if (this.getIcon() === defaultOptions.iconUrl) {
      return this.pointExpressionToTuple(defaultOptions.iconAnchor)
    }
    return [0, 0]
  }

  private getPopupAnchor (): L.PointTuple {
    const { popupAnchor } = this.props

    if (popupAnchor) {
      return this.pointExpressionToTuple(popupAnchor)
    }
    if (this.getIcon() === defaultOptions.iconUrl) {
      const [x, y] = this.pointExpressionToTuple(defaultOptions.popupAnchor)
      return [x, y + 7]
    }
    return undefined
  }

  private getTooltipAnchor (): L.PointTuple {
    const { tooltipAnchor } = this.props

    if (tooltipAnchor) {
      return this.pointExpressionToTuple(tooltipAnchor)
    }
    if (this.getIcon() === defaultOptions.iconUrl) {
      return this.pointExpressionToTuple(defaultOptions.tooltipAnchor)
    }
    return undefined
  }

  private forEach (points: L.LatLngExpression[], callback: (position: L.LatLngExpression, box: Box) => boolean | void): void {
    const map = this.context.map
    const size = map.getSize()
    const [width, height] = this.getIconSize()
    const [x, y] = this.getIconAnchor()

    for (const position of points) {
      const pixel = map.latLngToContainerPoint(position)
      const iconTop = pixel.y - y
      const bottom = pixel.y + height - y
      const left = pixel.x - x
      const right = pixel.x + width - x
      if (bottom <= -size.y || iconTop >= 2 * size.y) {
        continue
      }
      if (right <= -size.x || left >= 2 * size.x) {
        continue
      }
      if (callback(position, { top: iconTop, bottom, left, right })) {
        break
      }
    }
  }

  private onMoveEnd = async (e: L.LeafletEvent): Promise<void> => {
    await this.imageReady
    this.setCanvasSize()
    this.draw()
    this.instance.setBounds(getBounds(this.context.map, 3))
  }

  private onClick = (e: L.LeafletMouseEvent): void => this.setState(({ clickPoint, hoverPoint }) => ({ clickPoint: clickPoint === hoverPoint ? undefined : hoverPoint }))

  private onMouseMove = (e: L.LeafletMouseEvent): void => {
    const { points } = this.props

    const element = this.instance.getElement()
    let isMouseOver = false
    this.forEach([...points].reverse(), (position: L.LatLngExpression, box: Box): boolean => {
      const { x, y } = e.containerPoint
      if (x > box.left && x < box.right && y > box.top && y < box.bottom) {
        this.setState({ hoverPoint: position })
        element.style.cursor = 'pointer'
        isMouseOver = true
      }
      return isMouseOver
    })
    if (!isMouseOver) {
      this.setState({ hoverPoint: undefined })
      element.style.cursor = this.cursor
    }
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const { clickPoint, hoverPoint } = this.state

    return children ? (
      Children.map(children, child => {
        if (isValidElement(child)) {
          let position
          let offset: [number, number]
          const type = child.type as any
          if (type === Popup) {
            position = clickPoint
            offset = this.getPopupAnchor()
          } else if (type === Tooltip) {
            position = hoverPoint
            offset = this.getTooltipAnchor()
          }
          if (position) {
            return cloneElement<{ position: L.LatLngExpression, offset: L.PointExpression }>(child as React.ReactElement, { position, offset })
          }
          return cloneElement<{ layer: L.ImageOverlay }>(child as React.ReactElement, { layer: this.instance })
        }
        return child
      })
    ) : null
  }
}
