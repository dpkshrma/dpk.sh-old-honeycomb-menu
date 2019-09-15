import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Polygon = styled.polygon`
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
    let { b, l, h, scale, origin, fill, stroke } = this.props
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
        ([x, y]) => {
          return `${x + origin.x + offset.x} ${y + origin.y + offset.y}`
        }
      ).join(' ')
      return points
    }
    const style = {
      transformOrigin: `${origin.x + b + (h / 2)}px ${origin.y + h}px`
    }
    if (this.state.loaded) {
      style.transform = 'scale(1)'
    }
    return (
      <>
        {
          (fill !== 'none' && stroke !== 'none') && (
            <Polygon points={calcPoints({ x: 2, y: 5 })} fill="#333" style={style} />
          )
        }
        <Polygon points={calcPoints()} fill={fill} stroke={stroke} style={style} />
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
  scale: 10,
  origin: { x: 0, y: 0 },
  fill: '#ffd700',
  stroke: '#000'
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
  stroke: PropTypes.string
}

export default Hex
