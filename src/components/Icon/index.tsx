import L from 'leaflet'
import { Omit } from '../Util/Types'
import creator, { defaultOptions } from './creator'
import BaseIcon, { Props as BaseIconProps } from '../BaseIcon'

interface PartialProps {
  iconUrl: string
}

type Props = Readonly<BaseIconProps & Partial<PartialProps> & Omit<L.IconOptions, 'iconUrl'>>

export default class Icon extends BaseIcon<L.Icon, Props> {
  protected static defaultProps = {
    ...BaseIcon.defaultProps,
    ...defaultOptions
  }

  protected createInstance (options: L.IconOptions): L.Icon {
    return creator(options)
  }
}
