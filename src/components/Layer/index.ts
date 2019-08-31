import React, { Children, isValidElement, cloneElement } from 'react'
import PropTypes from 'prop-types'
import L from 'leaflet'
import Context, { ContextType } from '../RCMap/Context'
import Evented from '../Evented'

interface PartialProps {
  group: L.LayerGroup
  onCreate (layer: L.Layer): void
  onAdd (e: L.LeafletEvent, layer: L.Layer): void
  onUpdate (layer: L.Layer): void
  onBeforeRemove (layer: L.Layer): void
  onRemove (e: L.LeafletEvent, layer: L.Layer): void
  children: React.ReactNode
}

type Props = Readonly<Partial<PartialProps>>

export default abstract class Layer<T extends L.Layer, P extends L.LayerOptions, S = {}> extends Evented<T, Props & P, S> {
  public static propTypes = {
    ...Evented.propTypes,
    group: PropTypes.instanceOf(L.LayerGroup),
    pane: PropTypes.string,
    attribution: PropTypes.string,
    onCreate: PropTypes.func,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func,
    onBeforeRemove: PropTypes.func,
    onRemove: PropTypes.func,
    children: PropTypes.node
  }

  public static contextType = Context

  public context: ContextType

  protected constructor (props: Props & P, context: ContextType) {
    super(props, context)
    const { group, onCreate, onAdd, onRemove, children, ...restProps } = props

    this.instance = this.createInstance({ ...this.getTheme(), ...restProps } as P, context)
    onCreate && onCreate(this.instance)
    super.bindEvents()
    this.instance.on({ add: this.onAdd, remove: this.onRemove })
    group ? group.addLayer(this.instance) : this.instance.addTo(context.map)
  }

  public componentDidUpdate (prevProps: Props & P): void {
    const { group: prevGroup } = prevProps
    const { group } = this.props
    const { map } = this.context

    if (group && group !== prevGroup) {
      prevGroup ? prevGroup.removeLayer(this.instance) : map.removeLayer(this.instance)
      group.addLayer(this.instance)
    } else if (!group && prevGroup) {
      prevGroup.removeLayer(this.instance)
      this.instance.addTo(map)
    }
    this.props.onUpdate && this.props.onUpdate(this.instance)
  }

  public componentWillUnmount (): void {
    this.props.onBeforeRemove && this.props.onBeforeRemove(this.instance)
    this.instance.remove()
  }

  protected abstract createInstance (props: P, context: ContextType): T

  protected getTheme (): object {
    return {}
  }

  private onAdd = (e: L.LeafletEvent) => this.props.onAdd && this.props.onAdd(e, this.instance)

  private onRemove = (e: L.LeafletEvent) => this.props.onRemove && this.props.onRemove(e, this.instance)

  public render (): React.ReactNode {
    const { children } = this.props
    const layer = this.instance

    return children ? Children.map(children, child => (isValidElement(child) ? cloneElement<{ layer: T }>(child as React.ReactElement, { layer }) : child)) : null
  }
}
