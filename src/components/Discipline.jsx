import React, { Component } from 'react'
import Subject from './Subject'

const disciplineStyle = {
  display: 'block',
  height: '400px',
  border: '2px solid rgb(230, 230, 230)',
  margin: '10px',
  padding: '10px',
  borderRadius: '3px'
}

const subjectListStyle = {
  marginTop: '10px',
  listStyleType: 'none'
}

export default class TopBar extends Component {
  render () {
    return (
      <div className='Discipline' style={disciplineStyle}>
        <h3 className='Discipline-Name'> { this.props.discipline.name } </h3>
        <ul style={subjectListStyle}>
          {this.props.discipline.subjects.map((name, i) =>
            <li key={i}> <Subject name={name} /> </li>
          )}
        </ul>
      </div>
    )
  }
}
