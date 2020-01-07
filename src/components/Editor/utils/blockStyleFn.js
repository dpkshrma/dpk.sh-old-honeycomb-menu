import { Block } from '../constants'

const BASE_BLOCK_CLASS = 'sc-block'

export default block => {
  switch (block.getType()) {
  case Block.IMAGE:
    return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-image`
  default:
    return BASE_BLOCK_CLASS
  }
}
