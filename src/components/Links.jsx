import React, { Component } from 'react'
import SubjectBox from './SubjectBox'
import chunk from 'lodash.chunk'
import Link from './Link'

const sampleLinksData = {
  links: [
    {
      name: 'Test Link',
      description: 'Should probably link to a test...',
      link: 'http://google.com'
    },
    {
      name: 'Test Link',
      description: 'Should probably link to a test...',
      link: '#'
    },
    {
      name: 'Test Link',
      description: 'Should probably link to a test...',
      link: '#'
    },
    {
      name: 'Test Link',
      description: 'Should probably link to a test...',
      link: '#'
    },
    {
      name: 'Test Link',
      description: 'Should probably link to a test...',
      link: '#'
    }
  ]
}

export default class Links extends Component {
  constructor () {
    super()
    this.state = {
      links: sampleLinksData.links,
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
        <SubjectBox
          title={title}
          link={
            this.state.showAll
            ? 'Show less links...'
            : 'See all links...'
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
