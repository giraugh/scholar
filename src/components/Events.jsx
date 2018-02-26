import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import chunk from 'lodash.chunk'
import fetch from 'node-fetch'
import SubjectBox from './SubjectBox'
import Event from './Event'

const EVENTS_URL = 'https://friendly-lamp.herokuapp.com/get-events'

// #TODO: Sort events by date

export default class Events extends Component {
  constructor () {
    super()
    this.state = {
      events: [],
      width: window.innerWidth,
      showAll: false,
      reToCreate: false
    }
  }

  render () {
    let upcomingNumber = 5
    const width = this.state.width
    if (width < 900) { upcomingNumber = 4 }
    if (width < 800) { upcomingNumber = 3 }
    if (width < 600) { upcomingNumber = 2 }
    if (width < 420) { upcomingNumber = 1 }
    const title = this.state.showAll
      ? 'All Events'
      : (
        'Featured Event' +
        (upcomingNumber > 1
        ? 's' : '')
      )

    const sortedEvents = this.state.events.sort((a, b) => b.date - a.date)
    const events = sortedEvents.map((event, i) =>
      <Event {...event} key={event.name + i} />
    )
    let rows = this.state.showAll
      ? chunk(events, upcomingNumber)
      : [chunk(events, upcomingNumber)[0]]
    return (
      <div>
        {
          this.state.reToCreate &&
          <Redirect to={`/create/${this.props.subject}/event`} />
        }
        <SubjectBox
          title={title}
          link={
            events.length > upcomingNumber
              ? this.state.showAll
                ? 'Show less events...'
                : 'See all events...'
              : null
          }
          secondaryLink='Create event...'
          onLink={() => this.setState({showAll: !this.state.showAll})}
          onSecondaryLink={() => this.setState({reToCreate: true})}
          rows={rows}
        />
      </div>
    )
  }

  updateDimensions () {
    const width = window.innerWidth
    this.setState({width})
  }

  componentDidMount () {
    // Watch for resize events
    window.addEventListener('resize', this.updateDimensions.bind(this))

    // Get events data from backend
    fetch(`${EVENTS_URL}?subject=${this.props.subject}`)
      .then(response => response.json())
      .then(data => this.setState({events: data.events}))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }
}
