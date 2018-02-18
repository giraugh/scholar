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
  width: 'calc(100% - 10px)',
  height: '150px',
  borderRadius: '3px',
  padding: '10px'
}

const linkStyle = {
  display: 'block',
  width: 'max-content',
  textDecoration: 'none',
  color: 'black',
  padding: '5px',
  borderRadius: '3px',
  marginTop: '10px',
  backgroundColor: '#f7f7f7',
  alignSelf: 'start',
  justifySelf: 'end',
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
            this.props.link &&
            <span
              className='Linkify FadeInBox'
              style={linkStyle}
              onClick={this.props.onLink}>
                {this.props.link}
            </span>
          }
        </div>
        {
          (this.props.rows || [this.props.children]).map((row, i) =>
            <div style={containerStyle} key={i}>
              { row }
            </div>
          )
        }
      </div>
    )
  }
}
