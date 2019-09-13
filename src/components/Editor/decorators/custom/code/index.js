import React from 'react'
import PrismDecorator from 'draft-js-prism'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'
import 'prismjs/components/prism-python.min'
import 'prismjs/components/prism-java.min'
import 'prismjs/components/prism-go.min'
import 'prismjs/components/prism-php.min'
import 'prismjs/components/prism-scala.min'
import 'prismjs/components/prism-json.min'
import { DEFAULT_CODEBLOCK_LANG } from '../../../constants'
import './prism.css'
import './custom.css'

const codeDecorator = new PrismDecorator({
  defaultSyntax: DEFAULT_CODEBLOCK_LANG,
  prism: Prism,
  render: props => {
    const className = `prism-token token ${props.type}`
    return <span className={className}>{props.children}</span>
  }
})

export default codeDecorator
