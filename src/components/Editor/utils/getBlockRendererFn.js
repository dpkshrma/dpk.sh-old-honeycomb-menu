import {
  QnAEmbed,
  VideoEmbed,
  ImageEmbed,
  Blockquote
} from '../components/blocks'
import { Block } from '../constants'

const getBlockRendererFn = ({ readOnly }) => contentBlock => {
  const type = contentBlock.getType()
  if (type === Block.QNA) {
    return {
      component: QnAEmbed,
      editable: !readOnly,
      props: {}
    }
  } else if (type === Block.VIDEO) {
    return {
      component: VideoEmbed,
      editable: !readOnly,
      props: {}
    }
  } else if (type === Block.IMAGE) {
    return {
      component: ImageEmbed,
      editable: !readOnly,
      props: { readOnly }
    }
  } else if (type === Block.BLOCKQUOTE) {
    return {
      component: Blockquote,
      editable: !readOnly,
      props: {}
    }
  }
}

export default getBlockRendererFn
