import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Jumbotron from '../components/Jumbotron'
import {disciplines} from '../data/disciplines.json'
import images from '../imgs/images'
import Events from '../components/Events'
import Links from '../components/Links'

const disciplineOfSubject = code =>
  disciplines.find(discipline =>
    discipline.subjects
      .map(subject => subject.toLowerCase())
      .includes(subjectCodeToName(code).toLowerCase())
  )

// Neccessary as some subject names have lowercase starting letters
const subjectName = code =>
  disciplineOfSubject(code).subjects
    .find(subject =>
      subjectCodeToName(code).toLowerCase() === subject.toLowerCase()
    ).replace(/=/g, '-')

const subjectCodeToName = code =>
  code
    .split('-')
    .map(str => str.substring(0, 1).toUpperCase() + str.substring(1))
    .join(' ')

const disciplineHeadingStyle = {
  fontSize: '4vw',
  alignSelf: 'end'
}

const gridStyle = {
  display: 'grid',
  gridTemplateRows: '2fr 3fr',
  gridAutoRows: '125px',
  height: '250px'
}

const spanStyle = {
  lineHeight: 'normal',
  alignSelf: 'start',
  justifySelf: 'center',
  display: 'block'
}

export default class SubjectPage extends Component {
  render () {
    return (
      <Switch>
        <Route exact path='/subject' render={() => <Redirect to='/' />} />
        <Route path='/subject/:code' render={(props) => {
          const discipline = disciplineOfSubject(props.match.params.code)
          const image = images[discipline.image]
          return (
            <div className='SubjectPage'>
              <Jumbotron imageSource={image}>
                <div style={gridStyle}>
                  <span className='Sub' style={{...spanStyle, ...disciplineHeadingStyle}}>
                    { discipline.name }
                  </span>
                  <span style={spanStyle}>
                    { subjectName(props.match.params.code) }
                  </span>
                </div>
              </Jumbotron>
              <Events />
              <Links />
            </div>
          )
        }} />
      </Switch>
    )
  }
}
