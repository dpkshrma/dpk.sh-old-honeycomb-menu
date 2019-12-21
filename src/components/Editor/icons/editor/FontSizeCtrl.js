import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import highlighted from './highlighted'

const Container = styled.div`
  padding: 0 6px;
  cursor: pointer;
  color: ${({ style }) => _.get(style, 'fill')};
  font-size: 19px;
  display: flex;
  align-items: center;
`

const FontSizeCtrl = ({ children, ...restProps }) => {
  return (
    <Container {...restProps}>
      {children}
    </Container>
  )
}

export default highlighted(FontSizeCtrl)
