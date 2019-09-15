import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import HoneycombMenu from './HoneycombMenu'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  width: 100vw;
  border-top: 6px solid #444;
  user-select: none;
`
const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`
const Brand = styled.div`
  font-family: geomanistregular;
  font-weight: bold;
  font-size: 32px;
  letter-spacing: 2px;
  text-align: right;
  cursor: pointer;
`
const Tagline = styled.div`
  font-size: 16px;
  font-weight: normal;
`
const Dot = styled.span`
  color: red;
`

class Topbar extends React.Component {
  onBrandClick = () => {
    const { history } = this.props
    history.push('/')
  }
  render() {
    return (
      <Container>
        <HoneycombMenu />
        <Content>
          <Brand onClick={this.onBrandClick}>
            dpk<Dot>.</Dot>sh
            <Tagline>
              Learn, Develop, Teach
            </Tagline>
          </Brand>
        </Content>
      </Container>
    )
  }
}

export default withRouter(Topbar)
