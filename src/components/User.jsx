import React, { Component } from 'react'
import {
  isLoggedIn,
  getUserName,
  getMyName,
  logOut
} from '../util/user'

export class IsLoggedIn extends Component {
  render () {
    return isLoggedIn() ? this.props.children : null
  }
}

export class NotLoggedIn extends Component {
  render () {
    return !isLoggedIn() ? this.props.children : null
  }
}

export class UserName extends Component {
  constructor () {
    super()
    this.state = {name: ''}
  }

  componentDidMount () {
    getUserName(this.props.id)
      .then(name => {
        this.setState({name})
      })
  }

  render () {
    return (
      <span>
        { this.state.name }
      </span>
    )
  }
}

export class MyUserName extends Component {
  constructor () {
    super()
    this.state = {name: ''}
  }

  componentDidMount () {
    getMyName()
      .then(name => this.setState({name}))
  }

  render () {
    return (
      <IsLoggedIn>
        { this.state.name && this.props.prefix }
        { this.state.name }
        { this.state.name && this.props.suffix }
      </IsLoggedIn>
    )
  }
}

export class LogoutLink extends Component {
  handleClick () {
    logOut()
    window.location.reload()
  }

  render () {
    return (
      <div {...this.props} onClick={this.handleClick}>
        { this.props.children }
      </div>
    )
  }
}
