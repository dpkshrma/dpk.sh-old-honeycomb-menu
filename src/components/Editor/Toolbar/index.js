import React from 'react'
import styled from 'styled-components'
import InlineStyleControls from './InlineCtrls'
import BlockTypeControls from './BlockCtrls'
import SpecialControls from './SpecialCtrls'

const Container = styled.div`
  border: 1px solid #e0e0e0;
  margin-bottom: 24px;
  padding: 8px;
  display: flex;
  align-items: center;
  position: relative;
  position: sticky;
  top: 38px;
  background: #fff;
  z-index: 300;
`
const Separator = styled.div`
  border-right: 1px solid #e0e0e0;
  height: 24px;
  margin: 0 8px;
`

const Toolbar = ({ getEditorState, setEditorState, editorRef }) => {
  return (
    <Container>
      <InlineStyleControls
        getEditorState={getEditorState}
        setEditorState={setEditorState}
      />
      <Separator />
      <BlockTypeControls
        editorRef={editorRef}
        getEditorState={getEditorState}
        setEditorState={setEditorState}
      />
      <Separator />
      <SpecialControls
        editorRef={editorRef}
        getEditorState={getEditorState}
        setEditorState={setEditorState}
      />
    </Container>
  )
}

export default Toolbar
