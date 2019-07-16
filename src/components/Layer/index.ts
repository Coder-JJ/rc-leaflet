import React, { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Context, ContextType } from '../RCMap'
import Evented from '../Evented'

interface PartialProps {
  children: React.ReactNode
}

type Props = Readonly<Partial<PartialProps>>

export default abstract class Layer<T extends L.Layer, P extends L.LayerOptions> extends Evented<T, Props & P> {
  protected static propTypes = {
    ...Evented.propTypes,
    pane: PropTypes.string,
    attribution: PropTypes.string,
    children: PropTypes.node
  }

  protected static defaultProps: typeof Evented.defaultProps & PartialProps = {
    ...Evented.defaultProps,
    children: null
  }

  public static contextType = Context

  public context: ContextType

  protected constructor (props: Props & P, context: ContextType) {
    super(props)
    const { children, ...restProps } = props

    this.instance = this.createInstance({ ...this.getOptions(), ...restProps } as P)
    if (context.map) {
      this.instance.addTo(context.map)
    }
  }

  public componentWillUnmount (): void {
    this.instance.remove()
  }

  protected abstract createInstance (props: P): T

  protected getOptions (context?: ContextType): object {
    return {}
  }

  public render (): React.ReactNode {
    const { children } = this.props
    const layer = this.instance

    return children ? Children.map(children, child => (isValidElement(child) ? cloneElement<{ layer: T }>(child as React.ReactElement, { layer }) : child)) : null
  }
}
