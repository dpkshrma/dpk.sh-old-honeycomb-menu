import _ from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PostEditor from '../PostEditor'
import { createEditorState } from '../Editor'

class NewPost extends React.Component {
  state = {
    title: '',
    editorState: createEditorState()
  }

  onEditorChange = (editorState) => this.setState({ editorState })
  onTitleChange = (e) => this.setState({ title: e.target.value })

  onSave = ({ title, body }) => {
    const url = 'http://localhost:4000/api/dpksh/posts'
    return axios.post(url, { title, body })
  }

  afterSave = async (response) => {
    const { history } = this.props
    const id = _.get(response, 'data.id')
    const body = _.get(response, 'data.body')
    const title = _.get(response, 'data.title')
    const url = `/admin/posts/${id}/edit`
    history.push(url, { title, body })
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
        afterSave={this.afterSave}
      />
    )
  }
}

export default withRouter(NewPost)
