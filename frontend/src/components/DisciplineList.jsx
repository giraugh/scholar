import React, { Component } from 'react'
import Discipline from './Discipline'
import {disciplines} from '../data/disciplines.json'

const disciplineListStyle = {
  display: 'grid',
  width: '98%',
  margin: 'auto',
  gridTemplateColumns: 'repeat(3, 1fr)'
}

export default class DisciplineList extends Component {
  render () {
    return (
      <div className='DisciplineList' style={disciplineListStyle}>
        { disciplines.map((discipline, i) =>
          <Discipline key={i} discipline={discipline} />
        ) }
      </div>
    )
  }
}
