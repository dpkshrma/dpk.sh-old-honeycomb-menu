import React from 'react'
import styled from 'styled-components'
import { EditorBlock } from 'draft-js'
// import { fetchQuestion } from '../../../../actions/question';
import communityIcons from '../../icons/community'

const Wrapper = styled.a`
  background-color: #f7f7f7;
  border: 1px solid #eee;
  padding: 12px;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  font-family: roboto;
`
const Title = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: #333;
  margin-bottom: 4px;
`
const Link = styled.div`
  position: relative;
  color: #07c;
  padding-bottom: 2px;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.7px;
`
const Tags = styled.div`
  display: flex;
  margin-top: 8px;
`
const Tag = styled.div`
  padding: 0 8px;
  font-size: 12px;
  background-color: #fff;
  border-radius: 40px;
  margin-right: 20px;
  color: #222;
  border: 1px solid rgba(246, 155, 85, 0.7);
`
const FlexSection = props => {
  const getFlexDirection = ({ vertical, horizontal }) => {
    if (vertical) return 'column'
    return 'row'
  }
  const Component = styled.div`
    display: flex;
    flex-direction: ${getFlexDirection};
  `
  return <Component {...props} />
}

class CommunityLogo extends React.Component {
  state = {
    src: null
  };
  componentDidMount() {
    const { site } = this.props
    if (site) this.setSrc(site)
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.site !== nextProps.site) {
      this.setSrc(nextProps.site)
    }
  }
  setSrc = site => {
    if (Object.keys(communityIcons).indexOf(site) !== -1) {
      communityIcons[site].then(src => {
        this.setState({ src })
      })
    }
  };
  render() {
    const Component = styled.img`
      max-height: 48px;
      max-width: 48px;
      margin-right: 6px;
    `
    return <Component src={this.state.src} />
  }
}

const OriginalPoster = ({ user }) => {
  return <FlexSection />
}

class QnA extends React.Component {
  state = {
    questionId: null
  };
  componentDidMount() {
    const urlString = this.props.block.get('data').get('url')
    this.props
      .fetchQuestion(urlString)
      .then(data => {
        const { value: { question } } = data || { value: {} }
        this.setState({ questionId: question.question_id })
      })
      .catch(console.error)
  }
  render() {
    const { title, tags, link, owner, site } =
      this.props.questions[this.state.questionId] || {}
    return (
      <div>
        <Wrapper
          href={link}
          target="_blank"
          rel="noopener noreferer"
          contentEditable="false"
          suppressContentEditableWarning
        >
          <FlexSection horizontal>
            <CommunityLogo site={site} />
            <FlexSection vertical>
              <Title>{title}</Title>
              <Link>{link}</Link>
              <Tags>{tags && tags.map(tag => <Tag key={tag}>{tag}</Tag>)}</Tags>
            </FlexSection>
            <OriginalPoster user={owner} />
          </FlexSection>
        </Wrapper>
        <EditorBlock {...this.props} />
      </div>
    )
  }
}


export const QnAEmbed = QnA
