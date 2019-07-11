import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'

interface MouseEvents {
  onClick: L.LeafletEventHandlerFn
  onMouseOver: L.LeafletEventHandlerFn
  onMouseOut: L.LeafletEventHandlerFn
}

export type Props = Readonly<Partial<MouseEvents>>

export default abstract class Evented<T extends L.Evented, P> extends PureComponent<Props & P> {
  protected static propTypes = {
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
  }

  protected static defaultProps: MouseEvents = {
    onClick: null,
    onMouseOver: null,
    onMouseOut: null
  }

  protected instance: T

  public componentDidMount (): void {
    this.bindEvents()
  }

  protected bindEvents (prevProps?: Props & P): void {
    for (const key of Object.keys(Evented.defaultProps)) {
      const prevHandler = (prevProps && prevProps[key]) || null
      const handler = this.props[key]

      if (handler !== prevHandler) {
        const type = key.replace('on', '').toLowerCase()

        if (prevHandler) {
          this.instance.off(type, prevHandler)
        }
        if (handler) {
          this.instance.on(type, handler)
        }
      }
    }
  }
}