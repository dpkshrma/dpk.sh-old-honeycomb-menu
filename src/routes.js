import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './components/App'
import Home from './components/Home'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import ViewPost from './components/ViewPost'

export default (
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/posts/:id" component={ViewPost} />
      <Route exact path="/admin/posts/new" component={NewPost} />
      <Route exact path="/admin/posts/:id/edit" component={EditPost} />
    </Switch>
  </App>
)
