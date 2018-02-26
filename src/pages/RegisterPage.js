import React, { Component } from 'react'
import fetch from 'node-fetch'
import cookies from 'cookies-js'
import { ScaleLoader as Loader } from 'react-spinners'
import { Redirect } from 'react-router-dom'
import { captchaKey } from '../data/config'
import Recaptcha from 'react-recaptcha'

const REGISTER_URL = 'http://friendly-lamp.herokuapp.com/auth/register'

const registerPageStyle = {
  marginTop: '50px'
}

const formStyle = {
  display: 'grid',
  width: '70vw',
  margin: 'auto',
  backgroundColor: '#efefef',
  height: '600px',
  borderRadius: '3px',
  boxShadow: '#000000c7 0px 0px 8px 0px',
  gridTemplateRows: '1fr 8fr',
  marginTop: '100px',
  overflow: 'hidden'
}

const fieldsStyle = {
  display: 'grid',
  padding: '10px',
  gridTemplateRows: 'repeat(5, 1fr)',
  height: 'calc(100% - 40px)'
}

const errorStyle = {
  lineHeight: '30px',
  verticalAlign: 'middle',
  color: '#d40000',
  marginLeft: '10px'
}

const fieldContStyle = {
  display: 'block',
  paddingTop: '10px',
  paddingBottom: '10px'
}

const fieldStyle = {
  width: 'calc(100% - 10px)',
  height: '80%',
  paddingLeft: '10px',
  fontSize: '20px',
  backgroundColor: '#e6e6e6',
  border: 'none',
  outline: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.75) 0px 0px 3px 0px inset'
}

const headerStyle = {
  backgroundColor: '#cecece',
  color: '#000000c7',
  paddingTop: '10px',
  textAlign: 'center',
  verticalAlign: 'center',
  fontSize: '30px',
  boxShadow: 'rgba(0, 0, 0, 0.75) 0px -1px 4px 0px inset'
}

const submitStyle = {
  display: 'block',
  height: 'calc(100% - 20px)',
  border: 'none',
  marginTop: '10px',
  backgroundColor: '#f3f1f1',
  boxShadow: '#000000c7 0px 0px 4px 0px',
  fontSize: '20px',
  cursor: 'pointer',
  outline: 'none',
  '-webkit-appearance': 'none',
  '-moz-appearance': 'none',
  appearance: 'none'
}

export default class RegisterPage extends Component {
  constructor () {
    super()
    this.state = {
      loading: false,
      errorText: '',
      captchaVerified: false
    }
  }

  handleSubmit (event) {
    // Dont submit using FORM req
    event.preventDefault()

    // Get data from form
    const formData = new window.FormData(event.target)
    const data = {}
    formData.forEach((v, k) => { data[k] = v })

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

  handleCaptchaVerified () {
    console.log('Captcha Verified')
    this.setState({captchaVerified: true})
  }

  handleCaptchaExpired () {
    console.log('Captcha Expired')
    this.setState({captchaVerified: false})
  }

  isLoggedIn () {
    return cookies.get('user_token')
  }

  render () {
    return (
      <div className='RegisterPage' style={registerPageStyle}>
        {
          // Redirect to route or show login form
          this.isLoggedIn()
            ? <Redirect to='/' />
            : (
              <form className='GrowPost' method='post' onSubmit={this.handleSubmit.bind(this)} style={formStyle}>
                <h2 style={headerStyle}> Register </h2>
                {
                  this.state.loading
                    ? <div style={{margin: 'auto'}}><Loader color={'#4c4c4c'} /></div>
                    : <div>
                      <span style={this.state.errorText !== '' ? errorStyle : {}}> { this.state.errorText } </span>
                      <div style={fieldsStyle}>
                        <div style={fieldContStyle}>
                          Name
                          <input required type='text' name='name' placeholder='Angus' style={fieldStyle} />
                        </div>
                        <div style={fieldContStyle}>
                          Email
                          <input required type='email' name='email' placeholder='gus@scholar.com' style={fieldStyle} />
                        </div>
                        <div style={fieldContStyle}>
                          Password
                          <input required type='password' name='password' placeholder='' style={fieldStyle} />
                        </div>
                        <div style={fieldContStyle}>
                          <Recaptcha
                            sitekey={captchaKey} />
                        </div>
                        <input
                          type='submit'
                          className='LoginButton'
                          value='REGISTER'
                          style={submitStyle} />
                      </div>
                    </div>
                }
              </form>
            )
        }
      </div>
    )
  }
}
