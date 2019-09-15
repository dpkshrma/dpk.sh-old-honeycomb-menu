import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Clock } from 'styled-icons/evil/Clock'
import Post from './Post'
import 'typeface-roboto'

const Container = styled.div`
  margin: 40px 0;
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  max-width: 880px;
  padding: 40px;
`
const Heading = styled.div`
  text-shadow: 0px 0px 0px #555;
  font-size: 40px;
  letter-spacing: 1px;
  color: black;
`

class BlogPosts extends React.Component {
  openPost = (id) => () => {
    const { history } = this.props
    history.push(`/posts/${id}`)
  }

  render() {
    const id = 'test-post'
    return (
      <Container>
        <Heading>Blog</Heading>
        <hr />
        <Post>
          <Post.Title onClick={this.openPost(id)}>How does this site works?</Post.Title>
          <Post.Subtitle><Clock size="20px" /> 12 min read</Post.Subtitle>
          <Post.Summary>
            This static site is built on create-react-app and has a simple but interesting story about its inner workings
            <Post.Link onClick={this.openPost(id)}>&nbsp; Read ></Post.Link>
          </Post.Summary>
        </Post>
        <Post>
          <Post.Title onClick={this.openPost(id)}>How does this site works?</Post.Title>
          <Post.Subtitle><Clock size="20px" /> 12 min read</Post.Subtitle>
          <Post.Summary>
            This static site is built on create-react-app and has a simple but interesting story about its inner workings
            <Post.Link onClick={this.openPost(id)}>&nbsp; Read ></Post.Link>
          </Post.Summary>
        </Post>
        <Post>
          <Post.Title onClick={this.openPost(id)}>How does this site works?</Post.Title>
          <Post.Subtitle><Clock size="20px" /> 12 min read</Post.Subtitle>
          <Post.Summary>
            This static site is built on create-react-app and has a simple but interesting story about its inner workings
            <Post.Link onClick={this.openPost(id)}>&nbsp; Read ></Post.Link>
          </Post.Summary>
        </Post>
      </Container>
    )
  }
}

export default withRouter(BlogPosts)
