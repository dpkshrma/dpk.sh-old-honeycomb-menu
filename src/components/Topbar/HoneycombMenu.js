import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import Hex from './Hex'
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
const MenuIconContainer = styled.div`
  z-index: -10;
  background-color: ${({ open }) => open ? '#560bd0' : 'white'};
  padding: 40px;
  position: absolute;
  top: 40px;
  left: 80px;
  width: 120px;
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
const Menu = styled.div`
  position: absolute;
  top: 140px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  width: 100%;
  display: ${({ show }) => show ? 'flex' : 'none'};
`
const MenuItem = styled.div`
  color: white;
  font-weight: bold ;
  font-size: 60px;
  cursor: pointer;
  letter-spacing: 3px;
  &:hover {
    text-decoration: underline;
    color: gold;
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
    this.setState({ vw: document.body.scrollWidth, vh: window.innerHeight })
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  renderMenu = () => {
    const { vh, vw } = this.state
    const { l, b, h, scale, origin } = Hex.defaultProps
    const B = scale * b
    const L = scale * l
    const H = scale * h
    const Ox = origin.x
    const Oy = origin.y
    const X = B + H
    const Y = L

    const hexArea = (L * (2 * B + H)) +  L * H
    const totalScreenArea = (vw * vh)
    console.log('hexArea, totalScreenArea :', hexArea, totalScreenArea)
    const totalPoints = Math.ceil(totalScreenArea / hexArea)

    let points = []
    let initialSameColTimes = 2
    for (let dRowNo = 3;; dRowNo++) {
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
        const point = { y: j, x: i }
        if (
          (j * L) > ((vh / 2) - 300) &&
          (j * L) < ((vh / 2) + 200) &&
          (i * (B + H)) > ((vw / 2) - 300) &&
          (i * (B + H)) < ((vw / 2) + 200)
        ) {
          point.noStroke = true
        }

        points.push(point)
        sameColTimes -= 1
        if (sameColTimes > 0) {
          j += 2
        } else {
          i -= 1
          j += 1
        }
      }
      if (points.length >= totalPoints) break
    }
    console.log('points, totalPoints : ', points.length, totalPoints)

    const excludePoints = Array.from({ length: 40 }).map(() => _.random(points.length))
    points = _.filter(points, (point, i) => {
      if (!point.noStroke && _.includes(excludePoints, i)) {
        return false
      }
      return true
    })

    return (
      <>
        {
          points.map((point, i) => {
            if (point.noStroke) {
              return (
                <Hex origin={{ x: Ox + (point.x * X), y: Oy + (point.y * Y) }} key={i} stroke="none" fill="#560bd0" />
              )
            }
            return (
              <Hex origin={{ x: Ox + (point.x * X), y: Oy + (point.y * Y) }} key={i} />
            )
          })
        }
      </>
    )
  }

  render() {
    const { vw, vh, menuOpen } = this.state
    const { l, b, h, scale, origin } = Hex.defaultProps
    const B = scale * b
    const H = scale * h
    const L = scale * l
    const X = B + H
    const Y = L
    const Ox = origin.x
    const Oy = origin.y
    let containerSize = { w: 520, h: 300 }
    if (menuOpen) {
      containerSize = { w: vw, h: vh }
    }
    return (
      <Container style={{ height: `${containerSize.h}px`, width: `${containerSize.w}px` }}>
        <MenuIconContainer open={menuOpen} />
        {
          (menuOpen === true) ? (
            <CloseMenuIcon size="40px" onClick={this.toggleMenu} />
          ) : (
            <OpenMenuIcon size="40px" onClick={this.toggleMenu} />
          )
        }
        <Svg viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(255,255,0)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(255,0,0)', stopOpacity: 1 }} />
          </linearGradient>
          {/* Row 0 */}
          <Hex origin={{ x: Ox - X, y: Oy - Y }} />
          <Hex origin={{ x: Ox + X, y: Oy - Y }} />
          <Hex origin={{ x: Ox + 3 * X, y: Oy - Y }} />
          <Hex origin={{ x: Ox + 5 * X, y: Oy - Y }} />
          {/* Row 1 */}
          <Hex />
          <Hex origin={{ x: Ox + 2 * X, y: Oy }}/>
          <Hex origin={{ x: Ox + 4 * X, y: Oy }}/>
          {/* Row 2 */}
          <Hex origin={{ x: Ox - X, y: Oy + Y }} />

          <Hex origin={{ x: Ox + 3 * X, y: Oy + Y }} />
          {/* Row 3 */}
          <Hex origin={{ x: Ox, y: Oy + 2 * Y }}/>
          <Hex origin={{ x: Ox + 2 * X, y: Oy + 2 * Y }}/>
          {/* Row 4 */}
          {/* <Hex origin={{ x: Ox - X, y: Oy + 3 * Y }} /> */}
          <Hex origin={{ x: Ox + X, y: Oy + 3 * Y }} />
          <Hex origin={{ x: Ox + 3 * X, y: Oy + 3 * Y }} />
          {/* Row 5 */}
          <Hex origin={{ x: Ox, y: Oy + 4 * Y }}/>
          {/* Row 6 */}
          <Hex origin={{ x: Ox - X, y: Oy + 5 * Y }} />
          <Hex origin={{ x: Ox + X, y: Oy + 5 * Y }} />

          {
            (menuOpen === true) && (
              this.renderMenu()
            )
          }
        </Svg>
        <Menu show={menuOpen}>
          <MenuItem>
            HOME
          </MenuItem>
          <MenuItem>
            BLOG
          </MenuItem>
          <MenuItem>
            PROJECTS
          </MenuItem>
          <MenuItem>
            CONNECT
          </MenuItem>
        </Menu>
      </Container>
    )
  }
}

export default HoneycombMenu
