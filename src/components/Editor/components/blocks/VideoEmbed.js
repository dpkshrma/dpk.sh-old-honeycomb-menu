import React from 'react'
import styled from 'styled-components'
import { EditorBlock } from 'draft-js'

// Ref. https://www.h3xed.com/web-development/how-to-make-a-responsive-100-width-youtube-iframe-embed
const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  border: 1px solid #e0e0e0;
`
const IFrame = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

// TODO: Add loader
export const VideoEmbed = props => {
  const src = props.block.get('data').get('src')
  return (
    <div>
      <Wrapper>
        <IFrame title={src} src={src} frameBorder="0" allowFullScreen />
      </Wrapper>
      <EditorBlock {...props} />
    </div>
  )
}
