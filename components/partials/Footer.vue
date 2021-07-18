<template>
  <footer>
    <nav v-if="USER">
      <partials-sharer-footer-bar
        v-if="
          USER.roles.includes('ROLE_SHARER') &&
          USER.isSharerGroupActivated === true
        "
      />
      <partials-user-footer-bar v-else />
    </nav>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.userData,
    }
  },
}
</script>
