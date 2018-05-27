import React, { Component } from 'react'
import fetch from 'node-fetch'
import humanDate from 'human-date'
import { scholarBaseUrl, scholarEvents } from '../data/config'
import Posts from './Posts'
import Post from './Post'

const EVENTS_URL = scholarBaseUrl + scholarEvents

const sortEvents = (a, b) =>
  b.date - a.date

const getEvents = (subject) =>
  fetch(`${EVENTS_URL}?subject=${subject}`)
    .then(response => response.json())
    .then(data => data)

class Event extends Component {
  render () {
    const date = new Date(this.props.date)
    return (
      <Post
        {...this.props}
        footerStyle={{textDecoration: date < Date.now() ? 'line-through' : 'none'}}
        footerContent={humanDate.prettyPrint(date)}
      />
    )
  }
}

export default class Events extends Component {
  render () {
    return (
      <Posts
        titlePrefix={this.props.titlePrefix || 'Featured '}
        type='event'
        postClass={Event}
        subject={this.props.subject}
        sorting={sortEvents}
        getPosts={this.props.getPosts || getEvents}
      />
    )
  }
}
