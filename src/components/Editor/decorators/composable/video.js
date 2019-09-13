import React from 'react'
import styled from 'styled-components'

// Ref. https://www.h3xed.com/web-development/how-to-make-a-responsive-100-width-youtube-iframe-embed
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
`
const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

// TODO: Process youtube/vimeo video urls
const videoStrategy = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity()
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'video'
    )
  }, callback)
}

// TODO: Add loader
const Video = props => {
  const { contentState, entityKey } = props
  const { src } = contentState.getEntity(entityKey).getData()
  return (
    <Wrapper>
      <IFrame title={src} src={src} frameBorder="0" allowFullScreen />
    </Wrapper>
  )
}

export default {
  strategy: videoStrategy,
  component: Video
}
