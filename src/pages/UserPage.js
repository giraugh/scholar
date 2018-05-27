import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import fetch from 'node-fetch'
import Events from '../components/Events'
import Links from '../components/Links'
import {
  getUserName
} from '../util/user'
import {
  scholarBaseUrl,
  scholarUsersLinks,
  scholarUsersEvents
} from '../data/config'

const EVENTS_URL = scholarBaseUrl + scholarUsersEvents
const LINKS_URL = scholarBaseUrl + scholarUsersLinks

const getUserEvents = id => () =>
  fetch(`${EVENTS_URL}?id=${id}`)
    .then(response => response.json())
const getUserLinks = id => () =>
  fetch(`${LINKS_URL}?id=${id}`)
    .then(response => response.json())

const headingStyle = {
  marginTop: '50px',
  marginLeft: '10px'
}

export class UserPage extends Component {
  constructor () {
    super()
    this.state = {
      name: undefined,
      noSuchUser: false
    }
  }

  componentDidMount () {
    const id = this.props.match.params.id
    getUserName(id)
      .then(name => this.setState({ name }))
      .catch(_ => {
        this.setState({noSuchUser: true})
      })
  }

  render () {
    const id = this.props.match.params.id
    return (
      this.state.noSuchUser
        ? <Redirect to='/' />
        : (
          this.state.name
            ? <div className='SubjectPage'>
              <h1 style={headingStyle}> {this.state.name} </h1>
              <Events titlePrefix={this.state.name + '\'s '} subject='' getPosts={getUserEvents(id)} />
              <Links titlePrefix={this.state.name + '\'s '} subject='' getPosts={getUserLinks(id)} />
            </div>
            : <div />
        )
    )
  }
}

export default () => (
  <Switch>
    <Route exact path='/user' render={() => <Redirect to='/' />} />
    <Route path='/user/:id' component={UserPage} />
  </Switch>
)
