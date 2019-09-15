import { convertToRaw } from 'draft-js'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Spinner } from 'reactstrap'
import styled from 'styled-components'
import Editor, { createEditorState } from '../Editor'

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
  width: 800px;
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

class PostEditor extends React.Component {
  state = {
    saving: false,
    saved: false,
    saveError: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeySave)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeySave)
  }

  handleKeySave = async (e) => {
    if (e.metaKey && e.key === 's') {
      e.preventDefault()
      e.stopPropagation()
      await this.save()
    }
  }

  save = async () => {
    try {
      this.setState({ saving: true })
      const { onSave, afterSave, editorState, title } = this.props
      const body = convertToRaw(editorState.getCurrentContent())
      const response = await onSave({ title, body })
      this.setState({ saving: false, saved: true }, async () => {
        await wait(2000)
        this.setState({ saved: false })
      })
      await afterSave(response)
    } catch(err) {
      console.error(err)
      const defaultErrMsg = 'Some unknown error occured'
      const newState = {
        saved: false,
        saving: false,
        saveError: err.message || defaultErrMsg
      }
      this.setState(newState, async () => {
        await wait(2000)
        this.setState({ saveError: '' })
      })
    }
  }

  render() {
    const { title, editorState, onTitleChange, onEditorChange } = this.props
    const { saving, saved, saveError } = this.state
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
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          <Editor
            onChange={onEditorChange}
            editorState={editorState}
          />
        </Content>
      </Container>
    )
  }
}
PostEditor.defaultProps = {
  afterSave: () => {},
  editorState: createEditorState(),
  title: ''
}
PostEditor.propTypes = {
  onSave: PropTypes.func.isRequired,
  afterSave: PropTypes.func,
  onEditorChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  editorState: PropTypes.object,
  title: PropTypes.string
}

export default PostEditor
