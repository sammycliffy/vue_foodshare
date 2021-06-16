// store/auth.js
export const strict = false

export const state = () => ({
  userData: null,
  accessToken: null,
  loggedIn: false,
})

export const mutations = {
  // Save accessToken
  SAVE_TOKEN(state, payload) {
    state.accessToken = payload
  },

  // Log user in
  LOG_USER_IN(state, payload) {
    state.userData = payload
    state.loggedIn = true
  },

  // Log user in
  UPDATE_USER_DATA(state, payload) {
    state.userData.phone = payload.phone
    state.userData.user = payload.emailAddress
    state.userData.lastName = payload.lastName
    state.userData.firstName = payload.firstName
  },

  // Log User out
  LOG_USER_OUT(state) {
    state.userData = null
    state.loggedIn = false
  },
}
