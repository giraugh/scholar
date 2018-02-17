import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '1.8em',
  marginLeft: '8px',
  verticalAlign: 'middle',
  lineHeight: '40px'
}

export default class TopBar extends Component {
  render () {
    return (
      <div className='TopBar' style={topBarStyle}>
        <Link to='/' style={linkStyle} > Scholar </Link>
      </div>
    )
  }
}
