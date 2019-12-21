import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const Polygon = styled.polygon`
  transform: scale(0);
  transition: transform 0.4s ease-in;
`

class Hex extends React.Component {
  state = {
    loaded: false
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ loaded: true })
    })
  }

  renderHex = () => {
    let { b, l, h, scale, origin, fill, stroke, children, onClick, polygonStyle, polygonComp } = this.props
    const Comp = polygonComp
    b = b * scale
    l = l * scale
    h = h * scale
    const calcPoints = (offset = { x: 0, y: 0 }) => {
      let points = [
        [b, 0],
        [0, l],
        [b, 2 * l],
        [b + h, 2 * l],
        [2 * b + h, l],
        [b + h, 0]
      ]
      points = points.map(
        ([x, y]) => `${x + origin.x + offset.x} ${y + origin.y + offset.y}`
      )
      return points
    }
    const style = {
      transformOrigin: `${origin.x + b + (h / 2)}px ${origin.y + h}px`,
      ...polygonStyle
    }
    if (this.state.loaded) {
      style.transform = 'scale(1)'
    }
    const points = calcPoints()
    const centerPoint = {
      x: (b + h / 2) + origin.x,
      y: l + origin.y
    }
    return (
      <>
        {
          (fill !== 'none' && stroke !== 'none') && (
            <Comp points={calcPoints({ x: 2, y: 5 }).join(' ')} fill="#333" style={style} />
          )
        }
        <Comp
          points={points.join(' ')}
          fill={fill}
          stroke={stroke}
          style={style}
          onClick={onClick}
        />
        {/* <text x={centerPoint.x} y={centerPoint.y} style={{ font: 'italic 13px sans-serif' }}>
          {this.props.row}
        </text> */}
        {
          _.isFunction(children) && (
            React.Children.toArray(children({ centerPoint })).map(child => (
              React.cloneElement(child, {
                onClick,
                style
              })
            ))
          )
        }
      </>
    )
  }

  render() {
    return this.renderHex()
  }
}
Hex.defaultProps = {
  b: 3,
  l: 4,
  h: 5,
  scale: 9,
  origin: { x: 0, y: 0 },
  fill: '#ffd700',
  stroke: '#0007',
  onClick: () => {},
  polygonStyle: {},
  polygonComp: Polygon
}
Hex.propTypes = {
  b: PropTypes.number,
  l: PropTypes.number,
  h: PropTypes.number,
  scale: PropTypes.number,
  origin: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  fill: PropTypes.string,
  stroke: PropTypes.string,
  onClick: PropTypes.func,
  polygonStyle: PropTypes.object, // eslint-disable-line
  polygonComp: PropTypes.any // eslint-disable-line
}

export default Hex
