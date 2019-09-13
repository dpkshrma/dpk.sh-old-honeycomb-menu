import React from 'react'
import { ImageIcon } from '../../icons/editor'
import { addNewBlock } from '../../model'
import { IMAGE_CTRL, Block } from '../../constants'
import Ctrl from './Ctrl'

class ImageCtrl extends React.Component {
  state = {
    url: ''
  };

  onChange = e => {
    e.preventDefault()
    this.setState({ url: e.target.value })
  };

  onSubmit = src => {
    const editorState = this.props.getEditorState()
    const newEditorState = addNewBlock(editorState, Block.IMAGE, { src })
    this.props.setEditorState(newEditorState, this.props.onSubmit)
  };

  render() {
    const { url } = this.state
    const props = {
      Icon: ImageIcon,
      ctrlKey: IMAGE_CTRL,
      url,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Image URL (Imgur, Flickr, etc.)'
    }
    return <Ctrl {...props} />
  }
}

export default ImageCtrl
