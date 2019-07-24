import React from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import InteractiveLayer from '../InteractiveLayer'
import { Consumer as DivIconConsumer } from '../DivIcon'
import { defaultIcon } from '../DivIcon/creator'

interface RequiredProps {
  position: L.LatLngExpression
}

type Props = Readonly<RequiredProps & L.MarkerOptions>

export default class Point extends InteractiveLayer<L.Marker, Props> {
  public static propTypes = {
    ...InteractiveLayer.propTypes,
    position: Types.Point.isRequired,
    zIndexOffset: PropTypes.number,
    opacity: PropTypes.number,
    clickable: PropTypes.bool,
    draggable: PropTypes.bool,
    keyboard: PropTypes.bool,
    title: PropTypes.string,
    alt: PropTypes.string,
    riseOnHover: PropTypes.bool,
    riseOffset: PropTypes.number,
    autoPan: PropTypes.bool,
    autoPanSpeed: PropTypes.number,
    autoPanPadding: Types.Pixel
  }

  protected createInstance (props: Props): L.Marker {
    const { position, icon = defaultIcon, ...options } = props

    return L.marker(position, { ...options, icon })
  }

  public componentDidUpdate (prevProps: Props): void {
    const { position: prevPosition, icon: prevIcon, zIndexOffset: prevZIndexOffset, opacity: prevOpacity } = prevProps
    const { position, icon, zIndexOffset, opacity } = this.props
    const point = this.instance

    if (position !== prevPosition) {
      point.setLatLng(position)
    }
    if (icon !== prevIcon) {
      point.setIcon(icon)
    }
    if (zIndexOffset !== prevZIndexOffset) {
      point.setZIndexOffset(zIndexOffset)
    }
    if (opacity !== prevOpacity) {
      point.setOpacity(opacity)
    }
    super.bindEvents(prevProps)
  }

  public render (): React.ReactNode {
    const { icon } = this.props

    return (
      <>
        { super.render() }
        <DivIconConsumer>
          { content => (icon instanceof L.DivIcon ? createPortal(content, this.instance.getElement()) : null) }
        </DivIconConsumer>
      </>
    )
  }
}
