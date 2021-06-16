<template>
  <div>Logging out. Please wait.</div>
</template>

<script>
export default {
  mounted() {
    // Removes default Authorization header from `common` scope (all requests)
    this.$axios.setToken(false)
    // Remove User Data from a perstisted Vuex store
    this.$store.commit('auth/LOG_USER_OUT')
    this.$store.commit('cart/RESET_CART_DATA')
    //  Redirect to login page
    this.$router.replace('/account/login/')
  },
}
</script>
