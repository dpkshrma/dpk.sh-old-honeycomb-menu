import React from 'react'
import styled from 'styled-components'
import Topbar from '../Topbar'
import About from './About'
import BlogPosts from './BlogPosts'

const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
`

class Home extends React.Component {
  render() {
    return (
      <Container>
        <Topbar />
        <About />
        <BlogPosts />
      </Container>
    )
  }
}

export default Home
