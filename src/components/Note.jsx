import React, { Component } from 'react'

const noteStyle = {
  display: 'block',
  height: '95%',
  backgroundColor: '#eaeaea',
  boxShadow: '#8a8a8a 0px 0px 9px 0px',
  borderRadius: '3px',
  marginRight: '20px',
  flexGrow: '1',
  flexShrink: '0',
  flexBasis: '130px',
  padding: '5px'
}

export default class Note extends Component {
  render () {
    return (
      <div className='Note' style={noteStyle}>
        Note
      </div>
    )
  }
}
