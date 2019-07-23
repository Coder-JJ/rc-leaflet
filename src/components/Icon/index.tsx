import L from 'leaflet'
import creator from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

interface PartialProps {
  iconUrl: string
}

type Props = Readonly<BaseIconProps & L.IconOptions>

interface State {
  instance: L.Icon
}

export default class Icon extends BaseIcon<L.Icon, Props> {
  protected static defaultProps: PartialProps

  public static getDerivedStateFromProps (nextProps: Props, prevState: State): State {
    const { layer, children, ...options } = nextProps
    let { instance: icon } = prevState

    icon = creator(options)
    if (layer) {
      layer.setIcon(icon)
    }
    return { instance: icon }
  }

  protected createInstance (options: L.IconOptions): L.Icon {
    return creator(options)
  }
}
