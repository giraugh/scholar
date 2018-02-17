import React, { Component } from 'react'

const outerStyle = {
  width: '95%',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '20px'
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: '300px',
  borderRadius: '3px',
  padding: '10px',
  overflow: 'scroll',
  overflowY: 'hidden'
}

export default class SubjectBox extends Component {
  render () {
    return (
      <div className='SubjectBox' style={outerStyle}>
        <h1> {this.props.title} </h1>
        <div style={containerStyle}>
          { this.props.children }
        </div>
      </div>
    )
  }
}
