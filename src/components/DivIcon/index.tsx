import React, { createContext } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'
import { Types } from '../../config'
import creator, { defaultOptions } from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

interface PartialProps {
  content: React.ReactElement
}

type Props = Readonly<Partial<PartialProps> & BaseIconProps & L.DivIconOptions>

const Context = createContext<React.ReactElement>(null)

export const Consumer = Context.Consumer

export default class DivIcon extends BaseIcon<L.DivIcon, Props> {
  protected static propTypes = {
    ...BaseIcon.propTypes,
    html: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([false])]),
    bgPos: Types.Pixel,
    iconSize: Types.Pixel,
    iconAnchor: Types.Pixel,
    popupAnchor: Types.Pixel,
    className: PropTypes.string,
    content: PropTypes.element
  }

  protected static defaultProps: typeof BaseIcon.defaultProps & typeof defaultOptions & PartialProps = {
    ...BaseIcon.defaultProps,
    ...defaultOptions,
    content: null
  }

  public static getDerivedStateFromProps (nextProps, prevState): null {
    const { layer, children, html, ...options } = nextProps
    const { instance: icon } = prevState

    if (layer) {
      icon.options.html = layer.getElement() ? layer.getElement().firstElementChild : null
    }
    return BaseIcon.getDerivedStateFromProps({ layer, ...options }, prevState)
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
