export default {
  methods: {
    async COPY_CLIPBOARD(dataToCopy) {
      await navigator.clipboard
        .writeText(dataToCopy)
        .then(() => {
          this.SHOW_TOAST({
            title: 'Copy Data',
            text: 'Copied to clipboard',
            variant: 'success',
          })
        })
        .catch(() => {
          this.SHOW_TOAST({
            title: 'Copy Data',
            text: 'Failed to copy',
            variant: 'danger',
          })
        })
    },

    ERROR_HANDLER(error) {
      // Log user out if s/he is Unautorized or session expired
      if (error.response ? error.response.status === 401 : false) {
        this.$router.push('/account/logout/')
      } else {
        let errorArray
        const defaultErrorMsg = "Sorry, that didn't work. Please try again"

        try {
          // Get the error as an array
          if (error.response) {
            errorArray =
              error.response.data.error.dataErrors.length > 0
                ? error.response.data.error.dataErrors
                : error.response.data.error.messages
          }
        } catch {
          // Do Nothing
        }

        try {
          // Display Toasts
          if (errorArray) {
            errorArray.forEach((element) => {
              this.SHOW_TOAST({
                text: element.message || element,
                title: 'Error!',
                variant: 'danger',
              })
            })
          } else {
            // Display default error toast notification
            this.SHOW_TOAST({ text: defaultErrorMsg, variant: 'danger' })
          }
        } catch (error) {
          // Display default error toast notification
          this.SHOW_TOAST({ text: defaultErrorMsg, variant: 'danger' })
        }
      }
    },

    SHOW_TOAST({ text, title, variant }) {
      // Display the specified toast
      this.$bvToast.toast(text, {
        title: title || 'Oops!',
        variant: variant || 'danger',
        solid: true,
      })
    },

    async REFRESH_TOKEN(oldAccessToken) {
      // Make login request to the API
      const URI = `/auth/login`
      await this.$axios
        .$get(URI, {
          headers: {
            Authorization: `Bearer ${oldAccessToken}`,
          },
        })
        .then((response) => {
          // Get the accessToken from login
          const accessToken = response.result.accessToken
          // Decode the Token
          const userData = JSON.parse(atob(accessToken.split('.')[1]))
          // Save token to a perstisted Vuex store
          this.$store.commit('auth/SAVE_TOKEN', accessToken)
          // Save User Data to a perstisted Vuex store
          this.$store.commit('auth/LOG_USER_IN', userData)
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
    },
  },
}
