import fetch from 'node-fetch'
import cookies from 'cookies-js'
import { scholarBaseUrl, scholarMe, scholarUsers } from '../data/config'

const ME_URL = scholarBaseUrl + scholarMe
const USERS_URL = scholarBaseUrl + scholarUsers

export const getMyName = () => fetch(ME_URL, {
  method: 'GET',
  headers: { 'x-access-token': cookies.get('user_token') }
}).then(response => response.json())
  .then(data => data.name)

export const getMyId = () => fetch(ME_URL, {
  method: 'GET',
  headers: { 'x-access-token': cookies.get('user_token') }
}).then(response => response.json())
  .then(data => data._id)

export const getUser = id =>
  fetch(`${USERS_URL}?id=${id}`)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw Error(response.statusText)
      }
    })

export const getUserName = id =>
  getUser(id)
    .then(user => user.name)

export const getUserPermissions = id =>
  getUser(id)
    .then(user => user.permissions)

export const isLoggedIn = () =>
  cookies.get('user_token')

export const logOut = () =>
  cookies.set('user_token')
