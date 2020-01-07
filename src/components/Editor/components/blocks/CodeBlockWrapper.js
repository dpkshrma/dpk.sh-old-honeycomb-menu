import React from 'react'
import styled from 'styled-components'
import { updateDataOfBlock } from '../../model'
import Popper from '../Popper'
import { DEFAULT_CODEBLOCK_LANG } from '../../constants'

const SUPPORTED_LANGS = {
  html: 'HTML',
  css: 'CSS',
  javascript: 'Javascript',
  jsx: 'Babel JSX',
  python: 'Python',
  json: 'JSON',
  scala: 'Scala',
  clike: 'C/C++',
  java: 'Java',
  go: 'go',
  php: 'PHP',
  text: 'PlainText'
}

const Container = styled.div`
  background: #272822;
  border-radius: 4px;
  position: relative;
  border: 1px solid #ddd;
  padding-bottom: 16px;
  margin: 12px 0;
`
const MenuBar = styled.div`
  display: flex;
  position: relative;
  justify-content: space-between;
`
const CustomMenu = styled(Popper.Menu)`
  background: #45453f;
  border: none;
`
const CurrentLang = styled.div`
  color: #878787;
  font-size: 16px;
  padding: 0.5em 1em;
  font-weight: 300;
  letter-spacing: 1px;
  font-family: roboto;
`
const LangSelectButton = props => {
  const Btn = styled.div`
    background: #fff2;
    padding: 8px;
    cursor: pointer;
    border-radius: 2px;
    top: 0;
    right: 8px;
    z-index: 999;
    font-family: roboto;
    font-size: 12px;
    color: #bbb;
  `
  return <Btn {...props}>Set Language &#8964;</Btn>
}
const LangSelectItem = props => {
  const { children, ...restProps } = props
  const { MenuItem } = Popper
  const Item = styled(MenuItem)`
    padding: 2px 8px;
    background: #45453f;
    border-radius: 2px;
    z-index: 999;
    cursor: pointer;
    font-family: roboto;
    font-size: 12px;
    color: #bbb;
  `.withComponent('div')
  return <Item {...restProps}>{children}</Item>
}

export class CodeBlockWrapper extends React.Component {
  state = {
    langPopperIsOpen: false,
    currentSyntax: DEFAULT_CODEBLOCK_LANG
  };

  componentDidMount() {
    const [firstBlockKey] = React.Children.map(
      this.props.children,
      child => child.props.children.key
    )
    const editorState = this.props.getEditorState()
    const block = editorState.getCurrentContent().getBlockForKey(firstBlockKey)
    const currentSyntax = block.getData().get('syntax')
    if (currentSyntax) {
      this.setState({ currentSyntax })
    }
  }

  toggleLangPopper = e => {
    e.preventDefault()
    this.setState({ langPopperIsOpen: !this.state.langPopperIsOpen })
  };

  closeLangPopper = () => {
    this.setState({ langPopperIsOpen: false })
  };

  setSyntax = syntax => e => {
    e.preventDefault()
    this.setState({
      langPopperIsOpen: false,
      currentSyntax: syntax
    }, () => {
      if (syntax === 'text') {
        syntax = null
      }
      const blockKeys = React.Children.map(
        this.props.children,
        child => child.props.children.key
      )
      const editorState = this.props.getEditorState()
      let newEditorState = editorState
      blockKeys.forEach(blockKey => {
        const block = editorState.getCurrentContent().getBlockForKey(blockKey)
        newEditorState = updateDataOfBlock(newEditorState, block, { syntax })
      })
      this.props.setEditorState(newEditorState)
    })
  };

  render() {
    const { children, readOnly, ...restProps } = this.props
    const target = (
      <LangSelectButton
        onMouseDown={this.toggleLangPopper}
        contentEditable="false"
        suppressContentEditableWarning
      />
    )
    const langSelect = (
      <Popper
        isOpen={this.state.langPopperIsOpen}
        target={target}
        onClickOutside={this.closeLangPopper}
        alignMenuRight={true}
        Menu={CustomMenu}
      >
        {Object.entries(SUPPORTED_LANGS).map(([lang, langDisplay]) => {
          return (
            <LangSelectItem key={lang} onMouseDown={this.setSyntax(lang)}>
              {langDisplay}
            </LangSelectItem>
          )
        })}
      </Popper>
    )
    return (
      <Container {...restProps}>
        <MenuBar>
          <CurrentLang contentEditable="false" suppressContentEditableWarning>
            {SUPPORTED_LANGS[this.state.currentSyntax]}
          </CurrentLang>
          {!readOnly && langSelect}
        </MenuBar>
        {children}
      </Container>
    )
  }
}
