import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import ViewPost from './components/ViewPost'
import PostList from './components/PostList'

export default (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/admin" component={PostList} />
      <Route exact path="/admin/new" component={NewPost} />
      <Route exact path="/admin/posts/:id/edit" component={EditPost} />
      <Route exact path="/:id" component={ViewPost} />
    </Switch>
  </App>
)
