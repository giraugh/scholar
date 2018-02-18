import React, { Component } from 'react'
import SubjectBox from './SubjectBox'
import Event from './Event'
import chunk from 'lodash.chunk'

// #TODO: Sort events by date

const sampleEventData = {
  events: [
    {
      name: 'Exams',
      date: 1512838038765,
      description: 'Exams for this subject'
    },
    {
      name: 'Exams 2',
      date: 1513838019765,
      description: 'More exams for this subject'
    },
    {
      name: 'Exams 3',
      date: 1514838019765,
      description: 'Even more exams for this subject'
    },
    {
      name: 'Exams 4',
      date: 1514838019765,
      description: 'How many exams are there?'
    },
    {
      name: 'Exams 5',
      date: 2012838019765,
      description: 'I can\'t believe I haven\'t failed yet!'
    },
    {
      name: 'Exams 6',
      date: 1518838019765,
      description: 'Final exam!'
    }
  ]
}

export default class Events extends Component {
  constructor () {
    super()
    this.state = {
      events: sampleEventData.events,
      width: window.innerWidth,
      showAll: false
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
        'Upcoming Event' +
        (upcomingNumber > 1
        ? 's' : '')
      )

    const events = this.state.events.map((event, i) =>
      <Event {...event} key={event.name + i} />
    )
    let rows = this.state.showAll
      ? chunk(events, upcomingNumber)
      : [chunk(events, upcomingNumber)[0]]
    return (
      <div>
        <SubjectBox
          title={title}
          link={
            this.state.showAll
            ? 'Show less events...'
            : 'See all events...'
          }
          onLink={() => this.setState({showAll: !this.state.showAll})}
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
    window.addEventListener('resize', this.updateDimensions.bind(this))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }
}
