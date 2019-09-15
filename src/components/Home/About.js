import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  padding: 40px;
  display: flex;
  justify-content: center;
`
const Wrapper = styled.div`
  max-width: 1024px;
  width: 100%;
`
const Content = styled.div`
  font-family: geomanistregular;
  font-size: 32px;
  margin-top: 40px;
  text-align: right;
  width: 650px;
  margin-left: auto;
  line-height: 1.6em;
`
const H = styled.strong`
  color: ${({ color = '#560bd0' }) => color};
`

const About = () => (
  <Container>
    <Wrapper>
      <Content>
        Hi! My name is <H>Deepak</H>. I'm a <H color="#ffb200">Javascript</H> <H>developer</H> with over <H>3 years</H> of experience.
        I've worked in <H>Healthcare</H> and <H>Fintech</H> sectors.<br />
        Ping to know more about me!
      </Content>
    </Wrapper>
  </Container>
)

export default About
