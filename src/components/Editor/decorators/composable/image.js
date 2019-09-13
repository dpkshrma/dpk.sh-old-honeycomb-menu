import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div``
const Img = styled.img`
  max-width: 100%;
  max-height: 480px;
`

const imageStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'IMAGE'
    )
  }, callback)
}

const Image = props => {
  const { contentState, entityKey } = props
  const { src, title, alt } = contentState.getEntity(entityKey).getData()
  return (
    <Wrapper>
      <Img src={src} alt={alt} title={title} />
    </Wrapper>
  )
}

export default {
  strategy: imageStrategy,
  component: Image
}
