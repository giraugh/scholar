import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SubjectPage from './pages/SubjectPage'
import LoginPage from './pages/LoginPage'
import TopBar from './components/TopBar'

export default class App extends Component {
  render () {
    return (
      <div>
        <TopBar />
        <Switch>
          <Route path='/subject' component={SubjectPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/' component={HomePage} />
        </Switch>
      </div>
    )
  }
}
