import React, { Component } from 'react'
import fetch from 'node-fetch'
import { scholarBaseUrl, scholarLinks } from '../data/config'
import Posts from './Posts'
import Post from './Post'

const LINKS_URL = scholarBaseUrl + scholarLinks

const getLinks = (subject) =>
  fetch(`${LINKS_URL}?subject=${subject}`)
    .then(response => response.json())

class Link extends Component {
  render () {
    return (
      <Post
        {...this.props}
      />
    )
  }
}

export default class Links extends Component {
  render () {
    return (
      <Posts
        titlePrefix={this.props.titlePrefix || 'Featured '}
        type='link'
        postClass={Link}
        subject={this.props.subject}
        getPosts={this.props.getPosts || getLinks}
      />
    )
  }
}
