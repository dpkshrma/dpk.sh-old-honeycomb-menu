import { convertToRaw } from 'draft-js'
import React from 'react'
import axios from 'axios'
import { Button, Input, Spinner } from 'reactstrap'
import styled from 'styled-components'
import EditorComp from './editor'
import { createEditorState } from './model'

const wait = (ms) => new Promise((resolve) => {
  setTimeout(() => {
    resolve()
  }, ms)
})

const Container = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`
const Wrapper = styled.div`
  min-width: 800px;
`
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const FormFeedback = styled.div`
  font-weight: bold;
  color: ${({ error }) => {
    if (error) {
      return '#d63737'
    }
    return '#28a745'
  }};
;
`
const Content = ({ children }) => (
  <Wrapper>
    {
      React.Children
        .toArray(children)
        .map(child => React.cloneElement(child, {
          style: { marginBottom: '12px' }
        }))
    }
  </Wrapper>
)

class Editor extends React.Component {
  state = {
    editorState: createEditorState(),
    title: '',
    saving: false,
    saved: false,
    saveError: ''
  }

  onEditorChange = (editorState) => this.setState({ editorState })
  onTitleChange = (e) => this.setState({ title: e.target.value })

  save = async () => {
    try {
      const { editorState, title } = this.state
      const body = convertToRaw(editorState.getCurrentContent())
      const url = 'http://localhost:4000/api/dpksh/posts'
      this.setState({ saving: true })
      await axios.post(url, { title, body })
      this.setState({ saving: false, saved: true, saveError: '' }, async () => {
        await wait(2000)
        this.setState({ saved: false })
      })
    } catch(err) {
      console.error(err)
      this.setState({ saved: false, saving: false, saveError: err.message || 'Some unknown error occured' }, async () => {
        await wait(2000)
        this.setState({ saveError: '' })
      })
    }
  }

  render() {
    const { editorState, saving, saved, saveError } = this.state
    return (
      <Container>
        <Content>
          <Toolbar>
            <Button onClick={this.save} color="primary">
              Save
            </Button>
            {
              (saving === true) && (
                <FormFeedback>
                  <Spinner size="sm" color="success" />{' '}
                  Saving...
                </FormFeedback>
              )
            }
            {
              (saved === true) && (
                <FormFeedback>
                  <span role="img" aria-label="thumbs-up">👍</span> Saved Successfully
                </FormFeedback>
              )
            }
            {
              (saveError.length > 0) && (
                <FormFeedback error>
                  {saveError}
                </FormFeedback>
              )
            }
          </Toolbar>
          <Input type="text" placeholder="Title" />
          <EditorComp
            onChange={this.onEditorChange}
            editorState={editorState}
          />
        </Content>
      </Container>
    )
  }
}

export default Editor
