import { PureComponent } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'
import L from 'leaflet'

interface PartialProps {
  layer: L.SVGOverlay
}

type Props = Readonly<Partial<PartialProps>>

export default class Content extends PureComponent<Props> {
  public static propTypes = {
    layer: PropTypes.instanceOf(L.SVGOverlay),
    children: PropTypes.node
  }

  public render (): React.ReactNode {
    const { layer, children } = this.props

    if (layer && layer.getElement()) {
      return createPortal(children, layer.getElement())
    }
    return null
  }
}
