import PropTypes from 'prop-types'
import L from 'leaflet'
import ImageOverlayClass, { Props as ImageOverlayProps } from '../ImageOverlay/Class'

type VideoOverlayClass = L.VideoOverlay & { setZIndex (value: number): L.VideoOverlay }

interface RequiredProps {
  video: string | string[] | HTMLVideoElement
}

type Props = Readonly<L.VideoOverlayOptions & ImageOverlayProps & RequiredProps>

export default class VideoOverlay extends ImageOverlayClass<VideoOverlayClass, Props> {
  public static propTypes = {
    ...ImageOverlayClass.propTypes,
    video: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.instanceOf(HTMLVideoElement)
    ]).isRequired
  }

  protected createInstance (props: Props): VideoOverlayClass {
    const { video, bounds, ...options } = props
    return L.videoOverlay(video, bounds, options) as VideoOverlayClass
  }
}
