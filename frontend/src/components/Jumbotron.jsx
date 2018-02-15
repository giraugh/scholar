import React, { Component } from 'react'

const jumbotronStyle = {
  display: 'block',
  width: '100%',
  height: '250px',
  backgroundColor: '#e6e6e6',
  color: '#3b3b3c',
  fontSize: '7vw',
  textAlign: 'center',
  verticalAlign: 'middle',
  lineHeight: '250px'
}

const getImageStyle = (imageSource) => (
  imageSource ? {
    backgroundImage: `url(${imageSource})`,
    backgroundSize: 'cover',
    color: 'white',
    boxShadow: 'inset 1px 1px 5px 0px black',
    textShadow: '0px 2px 9px black'
  } : {})

export default class Jumbotron extends Component {
  render () {
    return (
      <div className='Jumbotron' style={{...jumbotronStyle, ...(getImageStyle(this.props.imageSource))}}>
        { this.props.children }
      </div>
    )
  }
}
