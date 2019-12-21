import _ from 'lodash'
import { Link } from 'react-router-dom'
import { convertToRaw } from 'draft-js'
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Spinner } from 'reactstrap'
import styled from 'styled-components'
import readingTime from 'reading-time'
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
  width: 920px;
`
const CoverImagePreview = styled.img`
  margin-left: -52px;
`
const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  position: sticky;
  background: #fff;
  border-radius: 4px;
  z-index: 999;
`
const FormFeedback = styled.div`
  font-weight: bold;
  color: ${({ error }) => {
    if (error) {
      return '#d63737'
    }
    return '#28a745'
  }};
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
    saveError: '',
    publishing: false,
    published: false,
    publishError: ''
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleShortcuts)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleShortcuts)
  }

  handleShortcuts = async (e) => {
    if (e.metaKey && e.key === 's') {
      e.preventDefault()
      e.stopPropagation()
      await this.save()
    }
    if (e.metaKey && e.ctrlKey && e.key === 'p') {
      e.preventDefault()
      e.stopPropagation()
      await this.publish()
    }
  }

  save = async () => {
    try {
      this.setState({ saving: true })
      const { onSave, afterSave, editorState, title, summary, coverImageUrl } = this.props
      const plainText = editorState.getCurrentContent().getPlainText()
      const ttr = readingTime(plainText)
      const body = convertToRaw(editorState.getCurrentContent())
      const response = await onSave({ title, summary, body, coverImageUrl, ttr })
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

  publish = async () => {
    try {
      this.setState({ publishing: true })
      const { onPublish } = this.props
      await onPublish()
      this.setState({ publishing: false, published: true }, async () => {
        await wait(2000)
        this.setState({ published: false })
      })
    } catch(err) {
      console.error(err)
      const defaultErrMsg = 'Some unknown error occured'
      const newState = {
        published: false,
        publishing: false,
        publishError: err.message || defaultErrMsg
      }
      this.setState(newState, async () => {
        await wait(2000)
        this.setState({ publishError: '' })
      })
    }
  }

  render() {
    const { title, summary, coverImageUrl, editorState, onTitleChange, onSummaryChange, onEditorChange, onCoverChange } = this.props
    const { saving, saved, saveError, publishing, published, publishError } = this.state
    console.log(coverImageUrl, typeof coverImageUrl)
    return (
      <Container>
        <Content>
          <Toolbar>
            <Link to="/admin" style={{ color: '#222', textDecoration: 'none' }}>
              <Button color="warning">
                &lt; Back
              </Button>
            </Link>
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
            {
              (publishing === true) && (
                <FormFeedback>
                  <Spinner size="sm" color="success" />{' '}
                  Publishing...
                </FormFeedback>
              )
            }
            {
              (published === true) && (
                <FormFeedback>
                  <span role="img" aria-label="thumbs-up">👍</span> Published Successfully
                </FormFeedback>
              )
            }
            {
              (publishError.length > 0) && (
                <FormFeedback error>
                  {publishError}
                </FormFeedback>
              )
            }
            <div style={{ display: 'flex' }}>
              <Button onClick={this.save} color="primary" style={{ marginRight: '4px' }}>
                Save
              </Button>
              <Button onClick={this.publish} color="danger">
                Publish
              </Button>
            </div>
          </Toolbar>
          <Input
            type="text"
            placeholder="Cover Image Url"
            value={coverImageUrl}
            onChange={onCoverChange}
          />
          {
            (_.isString(coverImageUrl) && (coverImageUrl.length > 0)) && (
              <CoverImagePreview src={coverImageUrl} alt="post cover" />
            )
          }
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={onTitleChange}
          />
          <Input
            type="textarea"
            placeholder="Summary"
            rows={4}
            value={summary}
            onChange={onSummaryChange}
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
  title: '',
  summary: ''
}
PostEditor.propTypes = {
  onSave: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  afterSave: PropTypes.func,
  onEditorChange: PropTypes.func.isRequired,
  onTitleChange: PropTypes.func.isRequired,
  onSummaryChange: PropTypes.func.isRequired,
  onCoverChange: PropTypes.func.isRequired,
  editorState: PropTypes.object,
  title: PropTypes.string,
  summary: PropTypes.string
}

export default PostEditor
