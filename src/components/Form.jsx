import React, { Component } from 'react'
import { ScaleLoader as Loader } from 'react-spinners'

const formStyle = {
  display: 'block',
  width: '50vw',
  margin: 'auto',
  backgroundColor: '#efefef',
  height: 'max-content',
  borderRadius: '3px',
  boxShadow: '#000000c7 0px 0px 8px 0px',
  marginTop: '100px',
  overflow: 'hidden'
}

const fieldsStyle = {
  display: 'block',
  padding: '10px',
  height: 'calc(100% - 40px)',
}

const errorStyle = {
  lineHeight: '30px',
  verticalAlign: 'middle',
  color: '#d40000',
  marginLeft: '10px'
}

const fieldContStyle = {
  display: 'block',
  paddingTop: '10px',
  paddingBottom: '10px',
  height: '80px'
}

const fieldStyle = {
  width: 'calc(100% - 10px)',
  height: '80%',
  paddingLeft: '10px',
  fontSize: '20px',
  backgroundColor: '#e6e6e6',
  border: 'none',
  outline: 'none',
  boxShadow: 'rgba(0, 0, 0, 0.75) 0px 0px 3px 0px inset'
}

const headerStyle = {
  height: '50px',
  backgroundColor: '#cecece',
  color: '#000000c7',
  paddingTop: '10px',
  textAlign: 'center',
  verticalAlign: 'center',
  fontSize: '30px',
  boxShadow: 'rgba(0, 0, 0, 0.75) 0px -1px 4px 0px inset'
}

const submitStyle = {
  display: 'block',
  height: '80px',
  width: '100%',
  border: 'none',
  marginTop: '10px',
  backgroundColor: '#f3f1f1',
  boxShadow: '#000000c7 0px 0px 4px 0px',
  fontSize: '20px',
  cursor: 'pointer',
  outline: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none'
}

const loaderStyle = (formHeight) => ({
  width: 'max-content',
  height: 'max-content',
  left: 'calc(50% - 20px)',
  top: `calc(${formHeight}px - 21px)`,
  position: 'absolute',
  zIndex: '100'
})

const loadingFieldsStyle = {
  opacity: '.2'
}

/*
  Expect props of
    - submitText
    - headerText
    - handleSubmit
    - errorText
    - fields
      - label
      - element
      - width[100]
*/

export default class Form extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getFormHeight = this.getFormHeight.bind(this)
  }

  handleSubmit (event) {
    event.preventDefault()
    const formData = new window.FormData(event.target)
    const data = {}
    formData.forEach((v, k) => { data[k] = v })
    this.props.handleSubmit(data, event)
  }

  getFormHeight () {
    return this.props.fields
      .map(field => field.height || 100)
      .reduce((acc, val) => acc + val, 110)
  }

  render () {
    return (<div>
      <form className='GrowPost' method='post' onSubmit={this.handleSubmit} style={formStyle}>
        <h2 style={headerStyle}> {this.props.headerText} </h2>
        { this.props.loading &&
          <div style={loaderStyle(this.getFormHeight())}><Loader color={'#4c4c4c'} /></div> }
        <div style={this.props.loading ? loadingFieldsStyle : {}}>
          <span style={this.props.errorText !== '' ? errorStyle : {}}> { this.props.errorText } </span>
          <div style={fieldsStyle}>
            {
              this.props.fields.map(({label, element, height}) =>
                <div
                  key={label || element}
                  style={{...fieldContStyle, ...({height: height ? `${height}px` : '80px'})}}>
                  { label }
                  { element(fieldStyle) }
                </div>)
            }
            <input
              type='submit'
              className='LoginButton'
              value={this.props.submitText || 'Submit'}
              style={submitStyle} />
          </div>
        </div>
      </form>
    </div>)
  }
}
