import React from 'react'
import styled from 'styled-components'
import { RichUtils } from 'draft-js'
import { Bullets, Numbering, Code, Blockquote, FontSizeCtrl } from '../icons/editor'

const ControlsContainer = styled.div`
  display: flex;
`
const Separator = styled.div`
  border-right: 1px solid #e0e0e0;
  height: 24px;
  margin: 0 8px;
`

const BlockTypeControls = props => {
  const { getEditorState, setEditorState, editorRef } = props
  const editorState = getEditorState()
  const selection = editorState.getSelection()
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  const onClick = blockType => e => {
    e.preventDefault()
    setEditorState(RichUtils.toggleBlockType(editorState, blockType))
    editorRef && editorRef.focus()
  }
  return (
    <ControlsContainer>
      <FontSizeCtrl
        onMouseDown={onClick('header-one')}
        active={currentBlockType === 'header-one'}
      >
        H1
      </FontSizeCtrl>
      <FontSizeCtrl
        onMouseDown={onClick('header-two')}
        active={currentBlockType === 'header-two'}
      >
        H2
      </FontSizeCtrl>
      <FontSizeCtrl
        onMouseDown={onClick('header-three')}
        active={currentBlockType === 'header-three'}
      >
        H3
      </FontSizeCtrl>
      <Separator />
      <Numbering
        onMouseDown={onClick('ordered-list-item')}
        active={currentBlockType === 'ordered-list-item'}
      />
      <Bullets
        onMouseDown={onClick('unordered-list-item')}
        active={currentBlockType === 'unordered-list-item'}
      />
      <Blockquote
        onMouseDown={onClick('blockquote')}
        active={currentBlockType === 'blockquote'}
      />
      <Code
        onMouseDown={onClick('code-block')}
        active={currentBlockType === 'code-block'}
      />
    </ControlsContainer>
  )
}

export default BlockTypeControls
