import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { getMyId, getUserName } from '../util/user'

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

const footerStyle = {
  textAlign: 'center',
  paddingTop: '5px',
  fontStyle: 'italic',
  color: '#737373',
  backgroundColor: '#d2d2d2',
  boxShadow: 'inset 0px 2px 2px 0px #0000001c'
}

const descriptionStyle = {
  marginTop: '10px',
  display: 'block'
}

const hrStyle = {
  width: '100%',
  marginTop: '5px',
  border: 'none',
  borderBottom: '2px solid #d2d2d2'
}

const userNameStyle = {
  color: '#949393'
}

export default class Post extends Component {
  constructor () {
    super()
    this.state = {
      isMine: false,
      userName: ''
    }
  }

  componentDidMount () {
    getMyId()
      .then(id => {
        const isMine = this.props.user === id
        this.setState({isMine})
      })
    getUserName(this.props.user)
      .then(userName => {
        this.setState({userName})
      })
  }

  render () {
    return (
      <div href={this.props.link} className='Link LinkBox' style={linkStyle}>
        <div className='LinkContent' style={contentStyle}>
          <h3> { this.props.name } </h3>
          { this.state.userName && <Link to={`/user/${this.props.user}`} style={userNameStyle}>
            <h5> { this.state.userName } </h5>
          </Link> }
          <hr style={hrStyle} />
          <span style={descriptionStyle}> { this.props.description } </span>
        </div>
        {this.props.footerContent &&
          <span style={{...footerStyle, ...(this.props.footerStyle || {})}}> {this.props.footerContent} </span>
        }
      </div>
    )
  }
}
