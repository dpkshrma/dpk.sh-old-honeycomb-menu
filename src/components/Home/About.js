import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 40px;
  font-size: 32px;
  margin-top: 40px;
  @media (max-width: 1200px) {
    margin-top: 72px;
  }
`
const Wrapper = styled.div`
  max-width: 800px;
  width: 100%;
  margin: auto;
`
const H = styled.b`
  color: ${({ color = '#560bd0' }) => color};
`

const About = () => (
  <Container>
    <Wrapper>
      Hi! <span role="img" aria-label="wave">👋</span><br /> My name is <H>Deepak Sharma</H>. I'm a <H color="#ffb200">Javascript</H> <H>developer</H> with over <H>3 years</H> of experience.
      I've worked in <H>Healthcare</H> and <H>Fintech</H> sectors<br />
      Ping to know more about me!
    </Wrapper>
  </Container>
)

export default About
