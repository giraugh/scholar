import React, { Component } from 'react'
import fetch from 'node-fetch'
import cookies from 'cookies-js'
import Recaptcha from 'react-recaptcha'
import Form from '../components/Form'
import { Redirect } from 'react-router-dom'
import { IsLoggedIn, NotLoggedIn } from '../components/User'
import { captchaKey, scholarBaseUrl, scholarRegister } from '../data/config'

const REGISTER_URL = scholarBaseUrl + scholarRegister

const registerPageStyle = {
  marginTop: '50px'
}

export default class RegisterPage extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: false,
      errorText: ''
    }
  }

  handleSubmit (data) {
    // Exclude captcha key
    const requestData = {
      name: data.name,
      password: data.password,
      email: data.email
    }

    // Get captcha response
    const captchaResponse = data['g-recaptcha-response']
    if (captchaResponse === '') {
      this.setState({errorText: 'Please complete the ReCaptcha.'})
      return
    }

    // Start spinner
    this.setState({loading: true})

    // Do the thing
    fetch(REGISTER_URL, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        'g-recaptcha-response': captchaResponse
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
        case 'Unauthorized':
          errorText = 'A user with that email / name already exists.'
          break
        default:
          errorText = 'An error occured while registering.'
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
    return (<div className='RegisterPage' style={registerPageStyle}>
      <IsLoggedIn>
        <Redirect to='/' />
      </IsLoggedIn>
      <NotLoggedIn>
        <Form
          submitText='REGISTER'
          headerText='Register'
          errorText={this.state.errorText}
          loading={this.state.loading}
          handleSubmit={this.handleSubmit}
          fields={[
            {
              label: 'Name',
              element: style =>
                <input required type='text' name='name' placeholder='Angus' style={style} />
            },
            {
              label: 'Email',
              element: style =>
                <input required type='email' name='email' placeholder='gus@scholar.com' style={style} />
            },
            {
              label: 'Password',
              element: style =>
                <input required type='password' name='password' placeholder='' style={style} />
            },
            {
              element: style =>
                <Recaptcha sitekey={captchaKey} />
            }
          ]} />
      </NotLoggedIn>
    </div>)
  }
}
