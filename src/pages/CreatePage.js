import React, { Component } from 'react'
import { Redirect, Switch, Route } from 'react-router-dom'
import { IsLoggedIn, NotLoggedIn } from '../components/User'

const createPageStyle = {
  marginTop: '50px'
}

class EventForm extends Component {
  render () {
    return (<div>
      EVENT: { this.props.subject }
    </div>)
  }
}

class LinkForm extends Component {
  render () {
    return (<div>
      LINK: { this.props.subject }
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
