import React, { Component } from 'react'

const subjectNameToUrl = name =>
  name
    .split(' ')
    .map(str => str.toLowerCase())
    .join('-')

const subjectStyle = {
  display: 'block',
  border: '1px solid #dadada',
  padding: '5px',
  marginBottom: '5px',
  marginTop: '5px',
  borderRadius: '3px',
  cursor: 'pointer',

  backgroundColor: '#f3f2f2',
  boxShadow: '0px 0px 2px 0px #cacaca'
}

const subjectNameStyle = {
  color: 'rgb(59, 59, 60)'
}

const subjectURL = (name) =>
`/subject/${subjectNameToUrl(name)}`

export default class Subject extends Component {
  render () {
    return (
      <div className='subject' style={subjectStyle} onClick={_ => { window.location = subjectURL(this.props.name) }}>
        <span style={subjectNameStyle}>
          { this.props.name.replace(/=/g, '-') }
        </span>
      </div>
    )
  }
}
