import { PureComponent } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { LeafletMouseEventHandlerFn } from '../../util/Types'

interface MouseEvents {
  onClick: LeafletMouseEventHandlerFn
  onMouseOver: LeafletMouseEventHandlerFn
  onMouseOut: LeafletMouseEventHandlerFn
}

export type Props = Readonly<Partial<MouseEvents>>

export default abstract class Evented<T extends L.Evented, P, S> extends PureComponent<Props & P, S> {
  public static propTypes = {
    onClick: PropTypes.func,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func
  }

  protected instance: T

  private getEventHandler (name: keyof MouseEvents): LeafletMouseEventHandlerFn {
    return (e: L.LeafletMouseEvent) => this.props[name] && this.props[name](e)
  }

  protected bindEvents (): void {
    const events: L.LeafletEventHandlerFnMap = {}
    for (const key of Object.keys(Evented.propTypes)) {
      events[key.replace('on', '').toLowerCase()] = this.getEventHandler(key as keyof MouseEvents)
    }
    this.instance.on(events)
  }
}
