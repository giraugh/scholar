import React, { Component } from 'react'
import humanDate from 'human-date'

const eventStyle = {
  display: 'grid',
  height: '95%',
  flexBasis: '130px',
  flexGrow: '1',
  backgroundColor: '#eaeaea',
  boxShadow: 'rgba(0, 0, 0, 0.57) 0px 0px 6px 1px',
  borderRadius: '3px',
  marginRight: '20px',

  gridTemplateColumns: '1fr',
  gridTemplateRows: '4fr 1fr',

  overflow: 'hidden'
}

const contentStyle = {
  padding: '5px'
}

const dateStyle = {
  textAlign: 'center',
  paddingTop: '5px',
  fontStyle: 'italic',
  color: '#737373',
  backgroundColor: '#d2d2d2',
  boxShadow: 'inset 0px 2px 2px 0px #0000001c'
}

export default class Event extends Component {
  render () {
    const date = new Date(this.props.date)
    return (
      <div className='Event' style={eventStyle}>
        <div className='EventContent' style={contentStyle}>
          <h3> { this.props.name } </h3>
          <span> { this.props.description } </span>
        </div>
        <span style={dateStyle}> { humanDate.prettyPrint(date) } </span>
      </div>
    )
  }
}
