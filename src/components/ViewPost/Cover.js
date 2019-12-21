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

const CoverImage = ({ url }) => (
  <Container>
    <Image src={url} />
  </Container>
)

export default CoverImage
