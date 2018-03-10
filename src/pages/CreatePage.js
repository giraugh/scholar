import React, { Component } from 'react'
import fetch from 'node-fetch'
import cookies from 'cookies-js'
import { Redirect, Switch, Route } from 'react-router-dom'
import { IsLoggedIn, NotLoggedIn } from '../components/User'
import Form from '../components/Form'
import { scholarBaseUrl, scholarEvents, scholarLinks } from '../data/config'

const EVENTS_URL = scholarBaseUrl + scholarEvents
const LINKS_URL = scholarBaseUrl + scholarLinks

const createPageStyle = {
  marginTop: '30px'
}

const textAreaStyle = {
  paddingLeft: '10px',
  paddingTop: '10px'
}

class EventForm extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: false,
      errorText: ''
    }
  }

  handleSubmit (data) {
    // Start spinner
    this.setState({loading: true})

    // Get validation token
    const token = cookies.get('user_token')
    if (!token) {
      this.setState({
        loading: false,
        errorText: 'Not logged in'
      })
    }

    // Transform to correct format
    const requestData = {
      name: data.name,
      description: data.description,
      date: new Date(data.date).getTime(),
      subject: this.props.subject
    }

    // Send form data to backend and accept token
    fetch(EVENTS_URL, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(({auth, token}) => {
      this.setState({loading: false, done: true})
    })
    .catch(err => {
      console.log(err)
      let errorText = ''
      switch (err.message) {
        default:
          errorText = 'An error occured while creating event.'
          break
      }
      this.setState({loading: false, errorText})
    })
  }

  render () {
    return (<div>
      {
        this.state.done && <Redirect to={`/subject/${this.props.subject}`} />
      }
      <Form
        errorText={this.state.errorText}
        loading={this.state.loading}
        headerText='Create Event'
        submitText='CREATE'
        handleSubmit={this.handleSubmit}
        fields={[
          {
            label: 'Name',
            element: style =>
              <input required type='text' name='name' placeholder='My birthday' style={style} />
          },
          {
            label: 'Date',
            element: style =>
              <input required type='date' name='date' style={style} />
          },
          {
            label: 'Description',
            height: 280,
            element: style =>
              <textarea name='description' style={{...style, ...textAreaStyle}} />
          }
        ]}
      />
    </div>)
  }
}

class LinkForm extends Component {
  constructor () {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      loading: false,
      errorText: ''
    }
  }

  handleSubmit (data) {
    // Start spinner
    this.setState({loading: true})

    // Get validation token
    const token = cookies.get('user_token')
    if (!token) {
      this.setState({
        loading: false,
        done: false,
        errorText: 'Not logged in'
      })
    }

    // Transform to correct format
    const requestData = {
      name: data.name,
      description: data.description,
      link: data.link,
      subject: this.props.subject
    }

    // Send form data to backend and accept token
    fetch(LINKS_URL, {
      method: 'POST',
      body: JSON.stringify(requestData),
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error(response.statusText)
      }
    })
    .then(({auth, token}) => {
      this.setState({loading: false, done: true})
    })
    .catch(err => {
      console.log(err)
      let errorText = ''
      switch (err.message) {
        default:
          errorText = 'An error occured while creating event.'
          break
      }
      this.setState({loading: false, errorText})
    })
  }

  render () {
    return (<div>
      {
        this.state.done && <Redirect to={`/subject/${this.props.subject}`} />
      }
      <Form
        errorText={this.state.errorText}
        loading={this.state.loading}
        headerText='Create Link'
        submitText='CREATE'
        handleSubmit={this.handleSubmit}
        fields={[
          {
            label: 'Name',
            element: style =>
              <input required type='text' name='name' placeholder='Wikipedia' style={style} />
          },
          {
            label: 'Link',
            element: style =>
              <input required type='text' name='link' placeholder='https://wikipedia.org' style={style} />
          },
          {
            label: 'Description',
            height: 280,
            element: style =>
              <textarea name='description' style={{...style, ...textAreaStyle}} />
          }
        ]}
      />
    </div>)
  }
}

const CreateForm = (props) => {
  return <div style={createPageStyle}> {
    props.type === 'event'
    ? <EventForm {...props} />
    : props.type === 'link'
      ? <LinkForm {...props} />
      : <Redirect to='/' />
  } </div>
}

export default class CreatePage extends Component {
  render () {
    return (<div>
      <IsLoggedIn>
        <Switch>
          <Route path='/create/:subject/:type' render={({match: {params}}) => <CreateForm {...params} />} />
          <Route exact path='/create/:subject/' render={() => <Redirect to='/' />} />
          <Route exact path='/create/' render={() => <Redirect to='/' />} />
        </Switch>
      </IsLoggedIn>
      <NotLoggedIn>
        <Redirect to='/login' />
      </NotLoggedIn>
    </div>
    )
  }
}
