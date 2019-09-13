import React from 'react'
import styled from 'styled-components'
import { RichUtils } from 'draft-js'
import { Bullets, Numbering, Code, Blockquote } from '../icons/editor'

const ControlsContainer = styled.div`
  display: flex;
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
