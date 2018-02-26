import React, { Component } from 'react'
import fetch from 'node-fetch'
import cookies from 'cookies-js'
import Form from '../components/Form'
import { Redirect } from 'react-router-dom'
import { IsLoggedIn, NotLoggedIn } from '../components/User'

const LOGIN_URL = 'http://friendly-lamp.herokuapp.com/auth/login'

export default class LoginPage extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: false,
      errorText: ''
    }
  }

  handleSubmit (data) {
    // Start spinner
    this.setState({loading: true})

    // Send form data to backend and accept token
    fetch(LOGIN_URL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(({auth, token}) => {
      this.setState({loading: false})
      if (auth) {
        this.handleLogin(token)
      }
    })
    .catch(err => {
      let errorText = ''
      switch (err.message) {
        case 'Not Found':
          errorText = 'No user exists with given email.'
          break
        case 'Unauthorized':
          errorText = 'Invalid password.'
          break
        default:
          errorText = 'An error occured while logging in.'
          break
      }
      this.setState({loading: false, errorText})
    })
  }

  handleLogin (token) {
    // Save token to cookies
    cookies.set('user_token', token)

    // Force refresh for redirect
    this.forceUpdate()
  }

  isLoggedIn () {
    return cookies.get('user_token')
  }

  render () {
    return (<div>
      <NotLoggedIn>
        <Form
          submitText='LOGIN'
          headerText='Login'
          errorText={this.state.errorText}
          loading={this.state.loading}
          handleSubmit={this.handleSubmit}
          fields={[
            {
              label: 'Email',
              element: style =>
                <input required type='email' name='email' placeholder='gus@scholar.com' style={style} />
            },
            {
              label: 'Password',
              element: style =>
                <input required type='password' name='password' placeholder='' style={style} />
            }
          ]} />
      </NotLoggedIn>
      <IsLoggedIn>
        <Redirect to='/' />
      </IsLoggedIn>
    </div>)
  }
}
