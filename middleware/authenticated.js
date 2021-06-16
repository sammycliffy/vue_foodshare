// This is the middle ware for pages that requires authentication

export default ({ store, redirect }) => {
  let authenticated = ''
  let sessionExpired = true

  try {
    authenticated = store.state.auth.loggedIn

    const now = +new Date()
    const expiry = +new Date(store.state.auth.userData.exp * 1000)
    sessionExpired = now > expiry
  } catch {
    // do nothing
  }

  if (!authenticated || sessionExpired) {
    // Remove User Data from a perstisted Vuex store
    store.commit('auth/LOG_USER_OUT')
    store.commit('cart/RESET_CART_DATA')
    //  Redirect to login page
    redirect('/account/login/')
  }
}
