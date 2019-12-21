import _ from 'lodash'
import React from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { Clock } from 'styled-icons/evil/Clock'
import Editor, { createEditorState } from '../Editor'
import Cover from './Cover'
import Topbar from '../Topbar'

const Container = styled.div``
const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Body = styled.div`
  max-width: 920px;
`
const Header = styled.div`
  margin: 40px 0;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 48px;
  text-align: center;
`
const Subtitle = styled.div`
  font-size: 16px;
  text-align: center;
`
const Content = styled.div`
  font-size: 24px;
  padding: 0 20px;
`

class ViewPost extends React.Component {
  state = {
    post: {}
  }

  async componentDidMount() {
    this.setState({
      post: await this.getCurrentPost()
    })
    window.scrollTo(0, 0)
  }

  getCurrentPost = async () => {
    try {
      const { params } = this.props.match
      const postId = _.get(params, 'id')
      const post = _.assign({}, (await import(`../../data/posts/${postId}.json`)).default)
      post.body = createEditorState(post.body)
      return post
    } catch(err) {
      console.error(err)
      return {}
    }
  }

  render() {
    const { post } = this.state
    let content = (
      <Wrapper>
        Loading...
      </Wrapper>
    )
    if (!_.isEmpty(post)) {
      content = (
        <Wrapper>
          {
            post.coverImageUrl && (
              <Cover url={post.coverImageUrl} />
            )
          }
          <Body>
            <Header>
              <Title>
                {post.title}
              </Title>
              <Subtitle>
                <Clock size="20px" />{_.get(post, 'ttr.text', '')}
              </Subtitle>
            </Header>
            <Content>
              <Editor
                readOnly={true}
                editorState={post.body}
              />
            </Content>
          </Body>
        </Wrapper>
      )
    }
    return (
      <Container>
        <Topbar />
        {content}
      </Container>
    )
  }
}

export default withRouter(ViewPost)
