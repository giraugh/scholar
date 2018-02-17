import React, { Component } from 'react'
import Jumbotron from '../components/Jumbotron'
import DisciplineList from '../components/DisciplineList'

import images from '../imgs/images'
const {books} = images

export default class HomePage extends Component {
  render () {
    return (
      <div className='HomePage'>
        <Jumbotron imageSource={books}>
          Scholar
        </Jumbotron>
        <DisciplineList />
      </div>
    )
  }
}
