import React from 'react'
import { Route, Switch } from 'react-router-dom'
import App from './components/App'
// import Home from './components/Home'
import Editor from './components/Editor'

export default (
  <App>
    <Switch>
      {/* <Route exact component={Home} /> */}
      <Route exact path="/editor" component={Editor} />
    </Switch>
  </App>
)
