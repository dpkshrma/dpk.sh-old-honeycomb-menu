import React from 'react'
import styled from 'styled-components'
import { RichUtils } from 'draft-js'
import { Bold, Italic, Underline } from '../icons/editor'

const ControlsContainer = styled.div`
  display: flex;
`

const InlineStyleControls = props => {
  const { getEditorState, setEditorState } = props
  const editorState = getEditorState()
  const onClick = inlineStyle => e => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const currentStyle = editorState.getCurrentInlineStyle()

  return (
    <ControlsContainer>
      <Bold onMouseDown={onClick('BOLD')} active={currentStyle.has('BOLD')} />
      <Italic
        onMouseDown={onClick('ITALIC')}
        active={currentStyle.has('ITALIC')}
      />
      <Underline
        onMouseDown={onClick('UNDERLINE')}
        active={currentStyle.has('UNDERLINE')}
      />
    </ControlsContainer>
  )
}

export default InlineStyleControls
