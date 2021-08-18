<template>
  <main class="min-vh-100 d-flex flex-column justify-content-center bg-white">
    <div class="text-center mb-26">
      <img src="/favicon.svg" alt="FoodShare" />
    </div>
    <div class="text-center">
      <img src="/assets/logo-orange.svg" alt="FoodShare Logo" class="logo" />
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      // fetch stuff from vuex
      USER: this.$store.state.auth.userData,
      USER_LOGGED_IN: this.$store.state.auth.loggedIn,
    }
  },

  created() {
    if (this.USER_LOGGED_IN) {
      // Redirect to dashboard on successful login
      if (this.USER.roles.some((el) => el === 'ROLE_SHARER')) {
        // If user if SHARER redirect to /sharer
        this.$router.replace('/sharer/')
      } else {
        this.$router.replace('/user/')
      }
    } else {
      setTimeout(() => {
        this.$router.replace('/account/login/')
      }, 3000)
    }

    this.promptAppInstall()
  },

  methods: {
    promptAppInstall() {
      const isIos = () => {
        const userAgent = window.navigator.userAgent.toLocaleLowerCase()
        return /iphone|ipad|ipod/.test(userAgent)
      }

      const isInStandaloneMode = () =>
        'standalone' in window.navigator && window.navigator.standalone

      if (isIos() && !isInStandaloneMode()) {
        this.setState({ showInstallMessage: true })
      }
    },
  },
}
</script>

<style scoped>
#reflection {
  -moz-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  transform: scaleY(-1);
  -webkit-mask-imageo: -webkit-gradient(
    linear,
    right top,
    right bottom,
    from(transparent),
    color-stop(20%, transparent),
    to(rgba(0, 0, 0, 0.4))
  );
}
</style>
