import React from 'react'
import { QnALink as QnAIcon } from '../../icons/editor'
import { addNewBlock } from '../../model'
import { QNA_CTRL, Block } from '../../constants'
import { checkQnaEmbeds } from '../../utils/checkEmbeds'
import Ctrl from './Ctrl'

class QnACtrl extends React.Component {
  state = {
    url: ''
  };

  onChange = e => {
    e.preventDefault()
    this.setState({ url: e.target.value })
  };

  onSubmit = url => {
    const editorState = this.props.getEditorState()
    const newEditorState = addNewBlock(editorState, Block.QNA, { url })
    this.props.setEditorState(newEditorState, this.props.onSubmit)
  };

  render() {
    const { url } = this.state
    const props = {
      Icon: QnAIcon,
      ctrlKey: QNA_CTRL,
      urlIdentifier: 'url',
      getEmbedUrl: checkQnaEmbeds,
      url,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'StackExchange Community Question Link'
    }
    return <Ctrl {...props} />
  }
}

export default QnACtrl
