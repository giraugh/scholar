import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Events from '../components/Events'
import Links from '../components/Links'
import {
  getUserName
} from '../util/user'

const getUserEvents = id => () => new Promise((resolve, reject) => resolve([]))
const getUserLinks = id => () => new Promise((resolve, reject) => resolve([]))

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
              <Events titlePrefix=' ' subject='' getPosts={getUserEvents(id)} />
              <Links titlePrefix=' ' subject='' getPosts={getUserLinks(id)} />
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
