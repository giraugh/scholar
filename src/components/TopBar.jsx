import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cookies from 'cookies-js'
import fetch from 'node-fetch'

const ME_URL = 'http://friendly-lamp.herokuapp.com/auth/me'

const topBarStyle = {
  display: 'block',
  position: 'fixed',
  top: '0',
  width: '100%',
  height: '40px',
  backgroundColor: '#3b3b3c',
  color: '#e8eaf6',
  boxShadow: '#000000a3 0px 1px 7px 0px'
}

const homeLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.8em',
  marginLeft: '8px',
  verticalAlign: 'middle',
  lineHeight: '40px'
}

const formLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1em',
  marginRight: '15px',
  verticalAlign: 'middle',
  lineHeight: '40px',
  cursor: 'pointer'
}

const formLinksStyle = {
  float: 'right'
}

export default class TopBar extends Component {
  constructor () {
    super()
    this.state = {
      name: ''
    }
  }

  isLoggedIn () {
    return cookies.get('user_token')
  }

  handleLogout () {
    cookies.set('user_token')
    window.location.reload()
  }

  goAndGetName () {
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

  componentDidMount () {
    // Get user name
    if (this.isLoggedIn()) {
      this.goAndGetName()
    }
  }

  render () {
    if (!this.state.name) {
      if (this.isLoggedIn()) {
        this.goAndGetName()
      }
    }
    const namePrefix = this.state.name ? this.state.name + ' - ' : ''
    return (
      <div className='TopBar' style={topBarStyle}>
        <Link to='/' style={homeLinkStyle} > Scholar </Link>
        {
        this.isLoggedIn()
          ? <div style={formLinksStyle}><a onClick={this.handleLogout} style={formLinkStyle}> {namePrefix} Logout </a></div>
          : (<div style={formLinksStyle}>
            <Link to='/register' style={formLinkStyle}> Register </Link>
            <Link to='/login' style={formLinkStyle}> Login </Link>
          </div>)
        }
      </div>
    )
  }
}
