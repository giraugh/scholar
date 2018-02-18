import React, { Component } from 'react'

const linkStyle = {
  display: 'grid',
  height: '95%',
  flexBasis: '130px',
  flexGrow: '1',
  backgroundColor: '#eaeaea',
  boxShadow: 'rgba(0, 0, 0, 0.57) 0px 0px 6px 1px',
  borderRadius: '3px',
  marginRight: '20px',

  cursor: 'pointer',
  textDecoration: 'none',
  color: '#0e1f2a',

  gridTemplateColumns: '1fr',
  gridTemplateRows: '4fr 1fr',

  overflow: 'hidden'
}

const contentStyle = {
  padding: '5px'
}

export default class Link extends Component {
  render () {
    return (
      <a href={this.props.link} className='Link LinkBox' style={linkStyle}>
        <div className='LinkContent' style={contentStyle}>
          <h3> { this.props.name } </h3>
          <span> { this.props.description } </span>
        </div>
      </a>
    )
  }
}
