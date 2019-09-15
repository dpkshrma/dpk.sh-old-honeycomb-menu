import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
const Image = styled.img`
  max-width: 1024px;
  z-index: -10;
`

const url = 'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'

const CoverImage = () => (
  <Container>
    <Image src={url} />
  </Container>
)

export default CoverImage
