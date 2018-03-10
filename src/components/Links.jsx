import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import fetch from 'node-fetch'
import SubjectBox from './SubjectBox'
import chunk from 'lodash.chunk'
import Link from './Link'
import { scholarBaseUrl, scholarLinks } from '../data/config'

const LINKS_URL = scholarBaseUrl + scholarLinks

export default class Links extends Component {
  constructor () {
    super()
    this.state = {
      links: [],
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
      ? 'All Links'
      : (
        'Featured Link' +
        (upcomingNumber > 1
        ? 's' : '')
      )

    const links = this.state.links.map((link, i) =>
      <Link {...link} key={link.name + i} />
    )
    let rows = this.state.showAll
      ? chunk(links, upcomingNumber)
      : [chunk(links, upcomingNumber)[0]]
    return (
      <div>
        {
          this.state.reToCreate &&
          <Redirect to={`/create/${this.props.subject}/link`} />
        }
        <SubjectBox
          title={title}
          secondaryLink='Create link...'
          link={
            links.length > upcomingNumber
              ? this.state.showAll
                ? 'Show less links...'
                : 'See all links...'
              : null
          }
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
    // Listen for resize
    window.addEventListener('resize', this.updateDimensions.bind(this))

    // Get data
    fetch(`${LINKS_URL}?subject=${this.props.subject}`)
      .then(response => response.json())
      .then(data => this.setState({links: data}))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }
}
