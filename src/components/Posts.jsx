import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import chunk from 'lodash.chunk'
import SubjectBox from './SubjectBox'
import Post from './Post'

// Requires,
// - '' | type
// - (a, b) => | sorting
// - (subject) ~> | getPosts

const capitalize = str => str.slice(0, 1).toUpperCase() + str.slice(1)

export default class Posts extends Component {
  constructor () {
    super()
    this.state = {
      posts: [],
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
      ? `All ${capitalize(this.props.type)}s`
      : (
        `${this.props.titlePrefix}${capitalize(this.props.type)}${(upcomingNumber > 1 ? 's' : '')}`
      )

    const sortedPosts = this.state.posts.sort(this.props.sorting)
    const PostClass = this.props.postClass || Post
    const posts = sortedPosts.map((post, i) =>
      <PostClass {...post} key={post.name + i} />
    )
    let rows = this.state.showAll
      ? chunk(posts, upcomingNumber)
      : [chunk(posts, upcomingNumber)[0]]
    return (
      <div>
        {
          this.state.reToCreate &&
          <Redirect to={`/create/${this.props.subject}/${this.props.type}`} />
        }
        <SubjectBox
          title={title}
          link={
            posts.length > upcomingNumber
              ? this.state.showAll
                ? `Show less ${this.props.type}s...`
                : `See all ${this.props.type}s...`
              : null
          }
          secondaryLink={`Create ${this.props.type}...`}
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
    // Watch for resize posts
    window.addEventListener('resize', this.updateDimensions.bind(this))

    // Get posts data from backend
    this.props.getPosts(this.props.subject)
      .then(posts => this.setState({posts}))
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateDimensions.bind(this))
  }
}
