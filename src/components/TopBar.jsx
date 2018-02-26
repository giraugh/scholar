import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { IsLoggedIn, NotLoggedIn, MyUserName, LogoutLink } from './User'

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

  render () {
    return (
      <div className='TopBar' style={topBarStyle}>
        <Link to='/' style={homeLinkStyle} > Scholar </Link>
        <div style={formLinksStyle}>
          <IsLoggedIn>
            <LogoutLink style={formLinkStyle}>
              <MyUserName suffix=' -' /> Logout
            </LogoutLink>
          </IsLoggedIn>
          <NotLoggedIn>
            <Link to='/register' style={formLinkStyle}> Register </Link>
            <Link to='/login' style={formLinkStyle}> Login </Link>
          </NotLoggedIn>
        </div>
      </div>
    )
  }
}
