import React, { Component } from 'react'
import { IsLoggedIn } from './User'

const outerStyle = {
  width: '95%',
  margin: 'auto',
  marginTop: '20px',
  marginBottom: '20px'
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  width: 'calc(100% - 10px)',
  height: '150px',
  borderRadius: '3px',
  padding: '10px'
}

const linksStyle = {
  display: 'block',
  color: 'black',
  marginTop: '10px',
  alignSelf: 'start',
  justifySelf: 'end',
  userSelect: 'none'
}

const linkStyle = {
  marginRight: '10px',
  display: 'span',
  width: 'max-content',
  textDecoration: 'none',
  color: 'black',
  padding: '5px',
  borderRadius: '3px',
  backgroundColor: '#f7f7f7',
  userSelect: 'none'
}

const headerStyle = {
  width: '95%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr'
}

export default class SubjectBox extends Component {
  render () {
    return (
      <div className='SubjectBox' style={outerStyle}>
        <div className='SBHeader' style={headerStyle}>
          {
            this.props.title &&
            <h1> {this.props.title} </h1>
          }
          {
            <div style={linksStyle} className='Linkify'>
              {
                this.props.link && this.props.rows &&
                <span
                  style={linkStyle}
                  className='Linkify FadeInBox'
                  onClick={this.props.onLink}>
                  { this.props.link }
                </span>
              }
              {
                this.props.secondaryLink &&
                <IsLoggedIn>
                  <span
                    style={linkStyle}
                    className='FadeInBox'
                    onClick={this.props.onSecondaryLink}>
                    { this.props.secondaryLink }
                  </span>
                </IsLoggedIn>
              }
            </div>
          }
        </div>
        {
          (this.props.rows || [this.props.children]).map((row, i) =>
            <div style={containerStyle} key={i}>
              { (row && row.length) ? row : 'There\'s nothing here...' }
            </div>
          )
        }
      </div>
    )
  }
}
