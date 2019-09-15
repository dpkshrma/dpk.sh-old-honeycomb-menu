import _ from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PostEditor from '../PostEditor'
import { createEditorState } from '../Editor'

class EditPost extends React.Component {
  state = {
    title: '',
    editorState: createEditorState()
  }

  onEditorChange = (editorState) => this.setState({ editorState })
  onTitleChange = (e) => this.setState({ title: e.target.value })

  async componentDidMount() {
    const { match } = this.props
    const response = await axios.get(`http://localhost:4000/api/dpksh/posts/${match.params.id}`)
    const title = _.get(response, 'data.title')
    const body = _.get(response, 'data.body')
    const editorState = createEditorState(body)
    this.setState({ title, editorState })
  }

  onSave = async ({ title, body }) => {
    const { match } = this.props
    const url = `http://localhost:4000/api/dpksh/posts/${match.params.id}`
    await axios.patch(url, { title, body })
  }

  render() {
    const { title, editorState } = this.state
    return (
      <PostEditor
        title={title}
        editorState={editorState}
        onEditorChange={this.onEditorChange}
        onTitleChange={this.onTitleChange}
        onSave={this.onSave}
      />
    )
  }
}

export default withRouter(EditPost)
