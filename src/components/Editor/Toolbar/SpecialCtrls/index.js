import React from 'react'
import styled from 'styled-components'
import controls from './controls'

const ControlsContainer = styled.div`
  display: flex;
  flex: 1;
`

class SpecialControls extends React.Component {
  state = {
    activeCtrlKey: null,
    url: ''
  };
  onUrlSubmit = () => {
    this.setState({ activeCtrlKey: null })
    const { editorRef } = this.props
    editorRef && editorRef.focus()
  };
  setActiveCtrl = activeCtrlKey => {
    this.setState({ activeCtrlKey }, () => {
      this.urlInput && this.urlInput.focus()
    })
  };
  renderControls = () => {
    const { activeCtrlKey } = this.state
    const { getEditorState, setEditorState } = this.props
    return Object.entries(controls).map(([_, control]) => {
      const { key, Component } = control
      return (
        <Component
          key={key}
          activeCtrl={activeCtrlKey}
          toggleCtrl={e => {
            e && e.preventDefault()
            // toggle active control
            if (activeCtrlKey) this.setActiveCtrl(null)
            else this.setActiveCtrl(key)
          }}
          onSubmit={this.onUrlSubmit}
          getEditorState={getEditorState}
          setEditorState={setEditorState}
        />
      )
    })
  };
  render() {
    return <ControlsContainer>{this.renderControls()}</ControlsContainer>
  }
}

export default SpecialControls
