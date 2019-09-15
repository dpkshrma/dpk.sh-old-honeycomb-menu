import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import Hex from './Hex'
import { ThreeBars } from 'styled-icons/octicons/ThreeBars'
import { Close } from 'styled-icons/material/Close'

const defaultWinOnScrollFn = window.onscroll

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
`
const OpenMenuIcon = styled(ThreeBars)`
  position: absolute;
  top: 60px;
  left: 115px;
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
  left: 115px;
  fill: #aaa;
  cursor: pointer;
  &:hover {
    fill: #560bd0;
  }
  &:active {
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
    this.setState({ vw: window.innerWidth, vh: window.innerHeight })
  }

  toggleMenu = () => {
    if (!this.state.menuOpen) {
      window.onscroll = function () { window.scrollTo(0, 0) }
    } else {
      window.onscroll = defaultWinOnScrollFn
    }
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

    const maxDRows = Math.floor(vw / X)

    let points = []
    let initialSameColTimes = 3
    for (let dRowNo = 4; dRowNo <= maxDRows; dRowNo++) {
      const startY = (dRowNo % 2 === 0) ? 0 : -1
      if (startY === -1) {
        initialSameColTimes += 1
      }
      const maxY = dRowNo * 2 + 1
      let sameColTimes = initialSameColTimes
      let i = dRowNo
      for (let j = startY; j < maxY + 1; ) {
        points.push({
          y: Oy + j,
          x: i
        })
        sameColTimes -= 1
        if (sameColTimes > 0) {
          j += 2
        } else {
          i -= 1
          j += 1
        }
      }
    }
    const excludePoints = Array.from({ length: 40 }).map(() => _.random(points.length))
    const noStrokePoints = []
    // const noStrokePoints = [81, 82, 83, 84, 85, 51, 52, 53, 54, 55, 65, 66, 67, 68, 69, 70, 38, 39, 40, 41, 27, 28 ]
    points = _.map(points, (point, i) => {
      if (_.includes(noStrokePoints, i)) {
        point.noStroke = true
      }
      return point
    })
    points = _.filter(points, (point, i) => {
      if (point.noStroke) {
        return true
      }
      if (_.includes(excludePoints, i)) {
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
        {
          (menuOpen === true) ? (
            <CloseMenuIcon size="40px" onClick={this.toggleMenu} />
          ) : (
            <OpenMenuIcon size="40px" onClick={this.toggleMenu} />
          )
        }
        <svg viewBox={`0 0 ${containerSize.w} ${containerSize.h}`}>
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
          <Hex origin={{ x: Ox + X, y: Oy + Y }} fill="none" />
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
            (this.state.menuOpen === true) && (
              this.renderMenu()
            )
          }
        </svg>
        {
          (this.state.menuOpen === 'osindfosifn') && (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center'
            }}>
              <div className="menu" style={{
                position: 'absolute',
                zIndex: '1100',
                top: '180px',
                margin: 'auto',
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'gold',
                boxShadow: '0 0 100px gold',
                padding: '40px',
                color: 'white',
                textShadow: '0 0 2px',
                alignSelf: 'center',
                justifySelf: 'center'
              }}>
                Home
              </div>
            </div>
          )
        }
      </Container>
    )
  }
}

export default HoneycombMenu
