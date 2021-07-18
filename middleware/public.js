// This is the middle ware for pages that doesn't require authentication

export default ({ store, redirect }) => {
  let authenticated
  const userDataStored = store.state.auth.userData
  try {
    authenticated = store.state.auth.loggedIn
  } catch {
    // do nothing
  }

  if (authenticated) {
    if (userDataStored.roles.some((el) => el === 'ROLE_SHARER')) {
      if (userDataStored.isSharerGroupActivated === false) {
        redirect('/account/inactive/')
      } else {
        const URL = `/services/sharing-rounds/${userDataStored.id}`
        this.$axios.$get(URL, {}).then((res) => {
          const rounds = res.result.sharingRounds
          // decide if user has at least one round
          if (rounds.length > 0) {
            redirect('/sharer/dashboard/')
          } else {
            redirect('/sharer/')
          }
        })
      }
    } else {
      redirect('/user/')
    }
  }
}
