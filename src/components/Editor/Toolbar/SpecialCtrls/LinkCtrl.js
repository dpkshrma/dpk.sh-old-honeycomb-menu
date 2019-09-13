import React from 'react'
import { EditorState, RichUtils } from 'draft-js'
import { Link as LinkIcon } from '../../icons/editor'
import { LINK_CTRL } from '../../constants'
import Ctrl from './Ctrl'

// TODO: when selection is collapsed use the link url as value for the anchor entity
class LinkCtrl extends React.Component {
  state = {
    url: ''
  };

  onChange = e => {
    e.preventDefault()
    this.setState({ url: e.target.value })
  };

  componentWillReceiveProps(nextProps) {
    const { getEditorState, activeCtrl } = nextProps
    if (activeCtrl === LINK_CTRL) {
      const editorState = getEditorState()
      const selection = editorState.getSelection()
      if (!selection.isCollapsed()) {
        const contentState = editorState.getCurrentContent()
        const startKey = editorState.getSelection().getStartKey()
        const startOffset = editorState.getSelection().getStartOffset()
        const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
        const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
        let url = ''
        if (linkKey) {
          const linkInstance = contentState.getEntity(linkKey)
          url = linkInstance.getData().href
        }
        this.setState({ url })
      }
    }
  }

  onSubmit = url => {
    const editorState = this.props.getEditorState()
    if (url) {
      // TODO: validate url
      const contentState = editorState.getCurrentContent()
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'SEGMENTED',
        { href: url }
      )
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
      let newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity
      })
      this.props.setEditorState(
        RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        this.props.onSubmit
      )
    }
  };

  render() {
    const data = {
      Icon: LinkIcon,
      ctrlKey: LINK_CTRL,
      url: this.state.url,
      updateUrl: this.onChange,
      submitUrl: this.onSubmit,
      onIconClick: this.props.toggleCtrl,
      activeCtrl: this.props.activeCtrl,
      inputPlaceholder: 'Paste your url here'
    }
    return <Ctrl {...data} />
  }
}

export default LinkCtrl
