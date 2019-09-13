import { IMAGE_CTRL, VIDEO_CTRL, LINK_CTRL, QNA_CTRL } from '../../constants'
import LinkCtrl from './LinkCtrl'
import ImageCtrl from './ImageCtrl'
import VideoCtrl from './VideoCtrl'
import QnACtrl from './QnACtrl'

const controls = {
  [LINK_CTRL]: {
    key: LINK_CTRL,
    Component: LinkCtrl
  },
  [IMAGE_CTRL]: {
    key: IMAGE_CTRL,
    Component: ImageCtrl
  },
  [VIDEO_CTRL]: {
    key: VIDEO_CTRL,
    Component: VideoCtrl
  },
  [QNA_CTRL]: {
    key: QNA_CTRL,
    Component: QnACtrl
  }
}

export default controls
