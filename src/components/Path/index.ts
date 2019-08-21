import PropTypes from 'prop-types'
import L from 'leaflet'
import InteractiveLayer from '../InteractiveLayer'

export default abstract class Path<T extends L.Path, P extends L.PathOptions> extends InteractiveLayer<T, P> {
  public static propTypes = {
    ...InteractiveLayer.propTypes,
    stroke: PropTypes.bool,
    color: PropTypes.string,
    weight: PropTypes.number,
    opacity: PropTypes.number,
    lineCap: PropTypes.oneOf<L.LineCapShape>(['butt', 'round', 'square', 'inherit']),
    lineJoin: PropTypes.oneOf<L.LineJoinShape>(['miter', 'round', 'bevel', 'inherit']),
    dashArray: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.number)]),
    dashOffset: PropTypes.string,
    fill: PropTypes.bool,
    fillColor: PropTypes.string,
    fillOpacity: PropTypes.number,
    fillRule: PropTypes.oneOf<L.FillRule>(['nonzero', 'evenodd', 'inherit']),
    renderer: PropTypes.instanceOf(L.Renderer),
    className: PropTypes.string
  }

  public componentDidUpdate (prevProps: P): void {
    this.setStyle()
    super.componentDidUpdate(prevProps)
  }

  protected setStyle (): void {
    const theme = this.getTheme()
    const path = this.instance

    let shouldUpdate = false
    for (const [key, value] of Object.entries<string | number | boolean | number[] | L.Renderer>({ ...theme, ...this.props })) {
      if (Path.propTypes[key] && value !== path.options[key]) {
        shouldUpdate = true
        path.options[key] = value
      }
    }
    if (shouldUpdate) {
      path.setStyle(path.options)
    }
  }

  protected getTheme (): L.PathOptions {
    if (this.context && this.context.theme && this.context.theme.path) {
      return this.context.theme.path
    }
    return {}
  }
}
