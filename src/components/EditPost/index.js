import _ from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import PostEditor from '../PostEditor'
import { createEditorState } from '../Editor'

class EditPost extends React.Component {
  state = {
    title: '',
    summary: '',
    editorState: createEditorState()
  }

  onEditorChange = (editorState) => this.setState({ editorState })
  onTitleChange = (e) => this.setState({ title: e.target.value })
  onSummaryChange = (e) => this.setState({ summary: e.target.value })
  onCoverChange = (e) => this.setState({ coverImageUrl: e.target.value })

  async componentDidMount() {
    const { match } = this.props
    const response = await axios.get(`http://localhost:4000/api/dpksh/posts/${match.params.id}`)
    const data = _.get(response, 'data')
    const body = _.get(data, 'body')
    delete data.body
    const editorState = createEditorState(body)
    this.setState({ ...data, editorState })
  }

  onSave = async (data) => {
    const { match } = this.props
    const url = `http://localhost:4000/api/dpksh/posts/${match.params.id}`
    await axios.patch(url, data)
  }

  onPublish = async () => {
    const { match } = this.props
    const url = `http://localhost:4000/api/dpksh/posts/${match.params.id}/publish`
    await axios.post(url)
  }

  onUnpublish = async () => {
    const { match } = this.props
    const url = `http://localhost:4000/api/dpksh/posts/${match.params.id}/unpublish`
    await axios.post(url)
  }

  render() {
    const { title, summary, coverImageUrl, editorState } = this.state
    return (
      <PostEditor
        title={title}
        summary={summary}
        coverImageUrl={coverImageUrl}
        editorState={editorState}
        onEditorChange={this.onEditorChange}
        onTitleChange={this.onTitleChange}
        onSummaryChange={this.onSummaryChange}
        onCoverChange={this.onCoverChange}
        onSave={this.onSave}
        onPublish={this.onPublish}
        onUnpublish={this.onUnpublish}
      />
    )
  }
}

export default withRouter(EditPost)
