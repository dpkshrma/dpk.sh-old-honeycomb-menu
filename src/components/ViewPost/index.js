import React from 'react'
import styled from 'styled-components'
import { Clock } from 'styled-icons/evil/Clock'
import Cover from './Cover'
import Topbar from '../Topbar'

const Container = styled.div``
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  max-width: 1024px;
`
const Header = styled.div`
  margin: 40px 0;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 48px;
  text-align: center;
`
const Subtitle = styled.div`
  font-size: 16px;
  text-align: center;
`
const Content = styled.div`
  font-size: 24px;
  padding: 0 20px;
`

class ViewPost extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <Container>
        <Topbar />
        <Wrapper>
          <Cover />
          <Body>
            <Header>
              <Title>
                How does this site works?
              </Title>
              <Subtitle>
                <Clock size="20px" /> 12 min read
              </Subtitle>
            </Header>
            <Content>
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              <br />
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings
              This static site is built on create-react-app and has a simple but interesting story about its inner workings

            </Content>
          </Body>
        </Wrapper>
      </Container>
    )
  }
}

export default ViewPost
