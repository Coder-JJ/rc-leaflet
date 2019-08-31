import L from 'leaflet'
import ImageOverlayClass, { Props as ImageOverlayProps } from '../ImageOverlay/Class'
import Content from './Content'

const uri = 'http://www.w3.org/2000/svg'

type Props = Readonly<L.ImageOverlayOptions & ImageOverlayProps>

export default class SVGOverlay extends ImageOverlayClass<L.SVGOverlay, Props> {
  public static Content = Content

  protected createInstance (props: Props): L.SVGOverlay {
    const { bounds, ...options } = props
    const svg = document.createElementNS(uri, 'svg')
    svg.setAttribute('xmlns', uri)
    return L.svgOverlay(svg, bounds, options)
  }
}
