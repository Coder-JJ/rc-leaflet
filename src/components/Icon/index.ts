import L from 'leaflet'
import creator, { defaultIcon } from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

interface PartialProps {
  iconUrl: string
}

type Props = Readonly<L.IconOptions & BaseIconProps>

interface State {
  instance: L.Icon
}

export default class Icon extends BaseIcon<L.Icon, Props> {
  public static defaultProps: PartialProps

  public static getDerivedStateFromProps (nextProps: Props, prevState: State): State {
    const { layer, children, ...options } = nextProps
    let { instance: icon } = prevState

    icon = creator(options)
    if (layer) {
      layer.setIcon(icon)
    }
    return { instance: icon }
  }

  public componentWillUnmount (): void {
    const { layer } = this.props

    if (layer) {
      layer.setIcon(defaultIcon)
    }
  }
}
