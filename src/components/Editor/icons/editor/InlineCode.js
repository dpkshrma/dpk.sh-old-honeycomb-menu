import React from 'react'
import styled from 'styled-components'
import highlighted from './highlighted'
import { CodeCurly } from 'styled-icons/boxicons-regular/CodeCurly'

const Icon = styled(CodeCurly)`
  cursor: pointer;
  fill: #777;
  margin-left: 4px;
`

const InlineCode = (props) => {
  return (
    <Icon {...props} size="22" />
  )
}

export default highlighted(InlineCode)
