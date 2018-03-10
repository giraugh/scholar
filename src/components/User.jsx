import React, { Component } from 'react'
import cookies from 'cookies-js'
import fetch from 'node-fetch'
import { scholarBaseUrl, scholarMe } from '../data/config'

const ME_URL = scholarBaseUrl + scholarMe

export class IsLoggedIn extends Component {
  render () {
    return cookies.get('user_token') ? this.props.children : null
  }
}

export class NotLoggedIn extends Component {
  render () {
    return !cookies.get('user_token') ? this.props.children : null
  }
}

export class MyUserName extends Component {
  constructor () {
    super()
    this.state = {name: ''}
  }

  componentDidMount () {
    const token = cookies.get('user_token')
    fetch(ME_URL, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    }).then(response => response.json())
    .then(data => {
      if (data && data.name) {
        this.setState({name: data.name})
      }
    })
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
    cookies.set('user_token')
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
