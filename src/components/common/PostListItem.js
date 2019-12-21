import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 40px 0;
`

const PostListItem = ({ children }) => (
  <Container>
    {children}
  </Container>
)
PostListItem.Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #560bd0;
  }
  &:active {
    color: black;
  }
`
PostListItem.Subtitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #999;
  margin: 8px 0;
`
PostListItem.Summary = styled.div`
  font-size: 22px;
`
PostListItem.Link = styled.span`
  color: #560bd0;
  cursor: pointer;
`

export default PostListItem
