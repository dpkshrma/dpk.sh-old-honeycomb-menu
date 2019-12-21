import _ from 'lodash'
import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Clock } from 'styled-icons/evil/Clock'
import Post from '../common/PostListItem'
import 'typeface-roboto'

const Container = styled.div`
  font-family: Roboto, -apple-system, BlinkMacSystemFont, 'Segoe UI', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  width: 100%;
  max-width: 880px;
  padding: 0 40px;
  margin-top: 40px;
`
const Heading = styled.div`
  text-shadow: 0px 0px 0px #555;
  font-size: 40px;
  letter-spacing: 1px;
  color: black;
`

class BlogPosts extends React.Component {
  state = {
    posts: {
      items: [],
      page: 0,
      size: 0,
      total: 0
    }
  }

  componentDidMount() {
    const posts = require('../../data/pages/1.json')
    this.setState({ posts })
  }

  openPost = (id) => () => {
    const { history } = this.props
    history.push(`/posts/${id}`)
  }

  render() {
    const { posts } = this.state
    return (
      <Container>
        <Heading>Blog</Heading>
        <hr />
        {
          posts.items.map(post => (
            <Post key={post.id}>
              <Post.Title onClick={this.openPost(post.id)}>{post.title}</Post.Title>
              <Post.Subtitle><Clock size="20px" />{_.get(post, 'ttr.text', '')}</Post.Subtitle>
              <Post.Summary>
                {post.summary}
                <Post.Link onClick={this.openPost(post.id)}>&nbsp; Read</Post.Link>
              </Post.Summary>
            </Post>
          ))
        }
      </Container>
    )
  }
}

export default withRouter(BlogPosts)
