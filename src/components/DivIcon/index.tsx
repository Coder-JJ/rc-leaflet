import React, { createContext } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import creator from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

interface PartialProps {
  content: React.ReactElement
}

type Props = Readonly<Partial<PartialProps> & BaseIconProps & L.DivIconOptions>

interface State {
  instance: L.DivIcon
}

const Context = createContext<React.ReactElement>(undefined)

export const Consumer = Context.Consumer

export default class DivIcon extends BaseIcon<L.DivIcon, Props> {
  public static propTypes = {
    ...BaseIcon.propTypes,
    html: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf<false>([false])]),
    bgPos: Types.Pixel,
    iconSize: Types.Pixel,
    iconAnchor: Types.Pixel,
    popupAnchor: Types.Pixel,
    className: PropTypes.string,
    content: PropTypes.element
  }

  public static getDerivedStateFromProps (nextProps: Props, prevState: State): State {
    const { layer, children, html, ...options } = nextProps
    let { instance: icon } = prevState

    if (layer) {
      (options as any).html = layer.getElement() ? layer.getElement().firstElementChild : undefined
    }
    icon = creator(options)
    if (layer) {
      layer.setIcon(icon)
    }
    return { instance: icon }
  }

  protected createInstance ({ html, ...options }: L.DivIconOptions): L.DivIcon {
    return creator(options)
  }

  public render (): React.ReactNode {
    const { layer, content } = this.props

    return (
      <>
        <Context.Provider value={content}>
          { super.render() }
        </Context.Provider>
        { layer && layer.getElement() ? createPortal(content, layer.getElement()) : null }
      </>
    )
  }
}
