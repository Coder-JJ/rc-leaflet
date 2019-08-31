import PropTypes from 'prop-types'
import L from 'leaflet'
import ImageOverlayClass, { Props as ImageOverlayProps } from './Class'

interface RequiredProps {
  url: string
}

type Props = Readonly<L.ImageOverlayOptions & ImageOverlayProps & RequiredProps>

export default class ImageOverlay extends ImageOverlayClass<L.ImageOverlay, Props> {
  public static propTypes = {
    ...ImageOverlayClass.propTypes,
    url: PropTypes.string.isRequired
  }

  public componentDidUpdate (prevProps: Props): void {
    const { url: prevUrl } = prevProps
    const { url } = this.props

    if (url !== prevUrl) {
      this.instance.setUrl(url)
    }
    super.componentDidUpdate(prevProps)
  }

  protected createInstance (props: Props): L.ImageOverlay {
    const { url, bounds, ...options } = props
    return L.imageOverlay(url, bounds, options)
  }
}
