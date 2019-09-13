import React from 'react'
import { VideoIcon } from '../../icons/editor'
import { addNewBlock } from '../../model'
import { VIDEO_CTRL, Block } from '../../constants'
import Ctrl from './Ctrl'
import { checkVideoEmbeds } from '../../utils/checkEmbeds'

class VideoCtrl extends React.Component {
  state = {
    url: ''
  };

  onChange = e => {
    e.preventDefault()
    this.setState({ url: e.target.value })
  };

  onSubmit = src => {
    const editorState = this.props.getEditorState()
    const newEditorState = addNewBlock(editorState, Block.VIDEO, { src })
    this.props.setEditorState(newEditorState, this.props.onSubmit)
  };

  render() {
    const { url } = this.state
    const props = {
      Icon: VideoIcon,
      ctrlKey: VIDEO_CTRL,
      urlIdentifier: 'src',
      getEmbedUrl: checkVideoEmbeds,
      url,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Youtube | Vimeo | Twitch | DailyMotion'
    }
    return <Ctrl {...props} />
  }
}

export default VideoCtrl
