<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-row d-flex justify-content-between">
        <partials-back-nav-button />
        <h5 class="title">Round Basket</h5>
        <span>&nbsp;</span>
      </header>

      <nav v-if="$fetchState.pending" class="text-center p-5">
        <partials-skeleton-loader />
      </nav>

      <nav v-else-if="$fetchState.error" class="text-center p-5">
        Something Occured. Please, Try Again
      </nav>

      <section
        v-else-if="sharingRounds.length < 1"
        class="itemBox text-center my-4"
      >
        No Round Found
      </section>

      <section v-else>
        <div
          v-for="item in sharingRounds"
          :key="item.id"
          class="itemBoxList plain-link color-black"
          @click="listClicked(item)"
        >
          <div class="itemBox">
            <p class="text_medium mb-0" v-text="item.name"></p>
            <p class="item_day mt-3 mb-0">
              <span>Sharing Day &colon;</span>
              <span v-text="item.endTimeWithDay"></span>
            </p>
          </div>
        </div>
      </section>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.userData,
      sharingRounds: [],
    }
  },

  async fetch() {
    // Fetch user's rounds
    const URL = `/services/sharing-rounds/${this.USER.id}/active-round`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
        throw error
      })
  },

  methods: {
    listClicked(item) {
      // Save cart data to a perstisted Vuex store
      this.$store.commit('round/SAVE_ROUND_DATA', item)
      // Redirect
      this.$router.push(`/sharer/dashboard/rounds/basket/${item.id}/`)
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  color: #000000;
  padding: 20px 18px 80px;
}

.itemBoxList {
  margin-top: 30px;
}
.itemBox {
  padding: 24px 22px;
  margin-bottom: 18px;
  border-radius: 10px;
  background-color: rgba(79, 158, 85, 0.1);
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
}

.item_day {
  font-size: 14px;
  line-height: 22px;
}
</style>
