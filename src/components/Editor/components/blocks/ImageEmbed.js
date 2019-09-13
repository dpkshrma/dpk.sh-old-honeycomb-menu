import React from 'react'
import styled from 'styled-components'
import { EditorBlock } from 'draft-js'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Img = styled.img`
  max-width: 100%;
  align-self: center;
`
const Caption = styled.figcaption`
  padding: 4px;
  font-size: 13px;
  font-family: roboto;
  font-weight: 400;
  color: #999;
  position: relative;
  border: none;
  width: 100%;
`
const CaptionPlaceholder = styled.div`
  position: absolute;
  text-align: center;
  width: 100%;
  color: #aaa;
  font-weight: 300;
  font-family: roboto;
  z-index: 99;
`

// TODO: Add loader
export class ImageEmbed extends React.Component {
  // state = {
  //   captionWidth: 0
  // };
  // componentDidMount() {
  //   this.setCaptionWidth();
  // }
  // setCaptionWidth = () => {
  //   if (this.img && this.img.complete) {
  //     const { width: imageWidth } = this.img.getBoundingClientRect();
  //     this.setState({ captionWidth: imageWidth });
  //   } else {
  //     setTimeout(this.setCaptionWidth, 100);
  //   }
  // };
  render() {
    const data = this.props.block.get('data')
    const blockText = this.props.block.getText()
    const src = data.get('src')
    const alt = data.get('alt')
    const title = data.get('title') || alt
    const { readOnly } = this.props.blockProps

    return (
      <Wrapper>
        <Img
          ref={el => {
            this.img = el
          }}
          src={src}
          alt={alt}
          title={title}
        />
        <Caption>
          {!readOnly &&
            blockText.length === 0 && (
              <CaptionPlaceholder
                contentEditable="false"
                suppressContentEditableWarning
              >
                Add a Caption...
              </CaptionPlaceholder>
            )}
          <EditorBlock
            {...this.props}
            contentEditable="false"
            suppressContentEditableWarning
          />
        </Caption>
      </Wrapper>
    )
  }
}
