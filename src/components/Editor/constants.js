export const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  QNA: 'atomic:qna',
  VIDEO: 'atomic:video',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break'
}

export const Inline = {
  BOLD: 'BOLD',
  CODE: 'CODE',
  ITALIC: 'ITALIC',
  STRIKETHROUGH: 'STRIKETHROUGH',
  UNDERLINE: 'UNDERLINE',
  HIGHLIGHT: 'HIGHLIGHT'
}

export const Entity = {
  LINK: 'LINK'
}

export const HYPERLINK = 'hyperlink'
export const HANDLED = 'handled'
export const NOT_HANDLED = 'not_handled'

export const KEY_COMMANDS = {
  addNewBlock: () => 'add-new-block',
  changeType: (type = '') => `changetype:${type}`,
  showLinkInput: () => 'showlinkinput',
  unlink: () => 'unlink',
  toggleInline: (type = '') => `toggleinline:${type}`,
  deleteBlock: () => 'delete-block'
}

export const IMAGE_CTRL = 'IMAGE_EMBED'
export const VIDEO_CTRL = 'VIDEO_EMBED'
export const LINK_CTRL = 'LINK_EMBED'
export const QNA_CTRL = 'QNA_EMBED'
export const CODE_EMBED_CTRL = 'CODE_EMBED'

export const DEFAULT_CODEBLOCK_LANG = null

export default {
  Block,
  Inline,
  Entity
}
