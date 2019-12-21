import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import chroma from 'chroma-js'
import Hex, { Polygon } from './Hex'
import { ThreeBars } from 'styled-icons/octicons/ThreeBars'
import { Close } from 'styled-icons/material/Close'

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`
const Svg = styled.svg`
  overflow: visible;
`
const OpenMenuIcon = styled(ThreeBars)`
  position: absolute;
  top: 60px;
  left: 114px;
  fill: #aaa;
  cursor: pointer;
  &:hover {
    fill: #560bd0;
  }
  &:active {
    fill: #000;
  }
`
const CloseMenuIcon = styled(Close)`
  position: absolute;
  top: 60px;
  left: 114px;
  fill: white;
  cursor: pointer;
`
const MenuContainer = styled.div`
  position: absolute;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -132px;
  display: ${({ show }) => show ? 'flex' : 'none'};
  transition: opacity 1s ease-in;
  opacity: ${({ show }) => show ? 1 : 0};
`
class Menu extends React.Component {
  state = {
    show: false
  }
  componentDidUpdate(prevProps) {
    if (prevProps.show !== this.props.show) {
      clearTimeout(this.timer)
      if (this.props.show) {
        this.timer = setTimeout(() => {
          this.setState({ show: true })
        }, 2)
      } else {
        this.setState({ show: false })
      }
    }
  }
  render() {
    const { show } = this.state
    const { children } = this.props
    return (
      <MenuContainer show={show}>
        {children}
      </MenuContainer>
    )
  }
}
const MenuItem = styled.div`
  color: #0008;
  font-weight: bold;
  font-size: 40px;
  cursor: pointer;
  letter-spacing: 3px;
  margin-bottom: 12px;
  line-height: 1.5;
  &:hover {
    text-decoration: underline;
    color: #560bd0;
  }
`
const MenuHex = styled(Polygon)`
  cursor: pointer;
  &:hover + ${OpenMenuIcon} {
    fill: #560bd0;
  }
  &:active + ${OpenMenuIcon} {
    fill: #000;
  }
`

class HoneycombMenu extends React.Component {
  state = {
    vh: 0,
    vw: 0,
    menuOpen: false
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    const vw = window.innerWidth
    // const vw = (window.innerWidth > 1440) ? 1440 : window.innerWidth
    const vh = window.innerHeight
    this.setState({ vw, vh })
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  getHexScale = () => {
    const { vw } = this.state
    if (vw > 600) return Hex.defaultProps.scale
    if (vw > 500) return 7
    if (vw > 450) return 6
    if (vw > 400) return 5
    return 4
  }

  renderPartialHoneycomb = () => {
    const { menuOpen, vw } = this.state
    const { l, b, h, origin } = Hex.defaultProps
    const scale = this.getHexScale()
    const B = scale * b
    const H = scale * h
    const L = scale * l
    const X = B + H
    const Y = L
    const Ox = origin.x
    const Oy = origin.y

    const points = [
      [-1, -1], [1, -1], [3, -1], [5, -1], [0, 0],
      [2, 0], [4, 0], [-1, 1], [-1, 3], [3, 1], [0, 2],
      [2, 2], [1, 3], [3, 3], [0, 4], [-1, 5], [1, 5]
    ].map(([fx, fy]) => ({ x: Ox + (fx * X), y: Oy + (fy * Y) }))

    return (
      <>
        {
          points.map((pointOrigin, i) => {
            return (
              <Hex scale={scale} origin={pointOrigin} key={i} />
            )
          })
        }
        <Hex
          scale={scale}
          origin={{ x: Ox + X, y: Oy + Y }}
          fill={menuOpen ? '#560bd0' : '#0000'}
          stroke="none"
          onClick={this.toggleMenu}
          polygonComp={MenuHex}
          polygonStyle={{ zIndex: 5000 }}
        >
          {
            ({ centerPoint }) => {
              const size = (vw > 500) ? 34 : 20
              const x = centerPoint.x - size / 2
              const y = centerPoint.y - size / 2
              if (menuOpen === true) {
                return <CloseMenuIcon size={`${size}px`} x={x} y={y} />
              }
              return <OpenMenuIcon className="menu-icon-open" size={`${size}px`} x={x} y={y} />
            }
          }
        </Hex>
      </>
    )
  }

  renderFullHoneycomb = () => {
    const { vh, vw } = this.state
    const { l, b, h, origin } = Hex.defaultProps
    const scale = this.getHexScale()
    const B = scale * b
    const L = scale * l
    const H = scale * h
    const Ox = origin.x
    const Oy = origin.y
    const X = B + H
    const Y = L

    const hexArea = (L * (2 * B + H)) +  L * H
    const totalScreenArea = (vw * vh)
    // console.log('vh: ', vh, 'vw :', vw)
    // console.log('hexArea, totalScreenArea :', hexArea, totalScreenArea)
    const totalPoints = Math.ceil(totalScreenArea / hexArea)

    let points = []
    let initialSameColTimes = 2
    for (let dRowNo = 3;; dRowNo++) {
      const pointsRow = []
      const startY = (dRowNo % 2 === 0) ? 0 : -1
      if (startY === -1) {
        initialSameColTimes += 1
      }
      const maxY = dRowNo * 2 + 1
      let sameColTimes = initialSameColTimes
      let i = dRowNo

      for (let j = startY; j < maxY + 1; ) {
        if ((j * L) > vh) {
          break
        }
        const point = { y: j, x: i, row: dRowNo }
        if (
          (j * L) > ((vh / 2) - 250) &&
          (j * L) < ((vh / 2) + 150) &&
          (i * (B + H)) > ((vw / 2) - 250) &&
          (i * (B + H)) < ((vw / 2) + 120)
        ) {
          point.stroke = 'none'
          point.fill = '#eee'
        }

        if ((i * (B + H)) < vw) {
          pointsRow.push(point)
        }
        sameColTimes -= 1
        if (sameColTimes > 0) {
          j += 2
        } else {
          i -= 1
          j += 1
        }
      }
      if (pointsRow.length === 0) break
      points.push(pointsRow)
      // if (_.flatten(points).length >= totalPoints) break
    }

    let rowNo = 1
    const colorScale = chroma.scale(['#ffd700', '#560bd0'])
    const pointRows = _.cloneDeep(points)
    points = []
    for (const pointRow of pointRows) { // eslint-disable-line
      const fill = colorScale(rowNo / pointRows.length).hex()
      // console.log(rowNo, rowNo / pointRows.length)
      rowNo++
      for (const point of pointRow) { // eslint-disable-line
        if (point.stroke !== 'none') {
          point.fill = fill
        }
        points.push(point)
      }
    }

    // console.log('points drawn :', points.length, 'target points :', totalPoints)

    const excludePoints = _.concat(
      // Array.from({ length: (vw > 500) ? 40 : 20 }).map(() => points[_.random(points.length)]),
      { y: -1, x: 3 }, { x: 4, y: 0 }, { x: 5, y: -1 },
      { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 5 }
    )
    points = _.filter(points, (point, i) => {
      if (point.stroke !== 'none' && _.some(excludePoints, point)) {
        return false
      }
      return true
    })

    return (
      <>
        {
          points.map((point, i) => {
            const props = {
              stroke: point.stroke,
              fill: point.fill
            }
            return (
              <Hex
                scale={scale}
                origin={{ x: Ox + (point.x * X), y: Oy + (point.y * Y) }}
                row={point.row}
                key={i}
                polygonStyle={{ zIndex: 2000 }}
                {...props}
              />
            )
          })
        }
      </>
    )
  }

  render() {
    const { vw, vh, menuOpen } = this.state
    let containerSize = {
      w: (520 < vw) ? 520 : vw / 2,
      h: (300 < vh) ? 300 : vh
    }
    if (menuOpen) {
      containerSize = { w: vw, h: vh }
    }
    return (
      <Container style={{
        height: `${containerSize.h}px`,
        width: `${containerSize.w}px`
      }}>
        <Menu show={menuOpen}>
          <MenuItem>
            HOME
          </MenuItem>
          <MenuItem>
            BLOG
          </MenuItem>
          <MenuItem>
            ABOUT
          </MenuItem>
          <MenuItem>
            PROJECTS
          </MenuItem>
        </Menu>
        <Svg viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}>
          {this.renderPartialHoneycomb()}
          {
            (menuOpen === true) && (
              this.renderFullHoneycomb()
            )
          }
        </Svg>
      </Container>
    )
  }
}

export default HoneycombMenu
