import React, { Component } from 'react'
import SubjectBox from './SubjectBox'
import Note from './Note'

export default class Notes extends Component {
  render () {
    return (
      <SubjectBox title='Notes'>
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
        <Note />
      </SubjectBox>
    )
  }
}
