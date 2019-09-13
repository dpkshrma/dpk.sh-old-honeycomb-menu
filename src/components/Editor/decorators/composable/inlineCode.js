import React from 'react'
import styled from 'styled-components'

const Code = styled.span`
  font-family: monospace;
  word-wrap: break-word;
  color: rgb(218, 64, 0);
  background: #eee;
  padding: 0 4px;
  border-radius: 6px;
`

const codeStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findStyleRanges(character => {
    return character.hasStyle('CODE')
  }, callback)
}

const InlineCode = props => {
  return <Code>{props.children}</Code>
}

export default {
  strategy: codeStrategy,
  component: InlineCode
}
