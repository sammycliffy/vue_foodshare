<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-around">
            <partials-back-nav-button />
            <h5 class="title color-green">{{ sharingRoundPayload.name }}</h5>
          </div>
          <span>&nbsp;</span>
        </div>
        <div class="text-center form-filling">
          <img src="/assets/icons/form-2.svg" class="icon-cusor" />
        </div>
      </header>

      <div class="body-primary">
        <div class="commodityListBox">
          <div
            v-for="item in sharingRoundPayload.commoditiesDetails"
            :key="item.id"
            class="d-block plain-link"
          >
            <div class="commoditycard">
              <div class="d-flex justify-content-end">
                <span>
                  <nuxt-link
                    :to="`/sharer/round/commodities/${item.id}/edit/`"
                    class="pa-1"
                  >
                    <i class="fas fa-pencil-alt color-orange"></i>
                  </nuxt-link>
                </span>

                <span
                  class="pa-1 ml-4"
                  @click="confirmDelete(item.commodityName)"
                >
                  <i class="far fa-trash-alt text-danger"></i>
                </span>
              </div>

              <div class="d-block" v-text="item.commodityName" />
            </div>
          </div>
        </div>

        <b-overlay v-if="confirmationDialog" show no-wrap>
          <template #overlay>
            <div v-if="spinner" class="text-center">
              <b-spinner variant="primary" label="deleting"></b-spinner>
              <div class="pt-3">Processing. Please wait.</div>
            </div>

            <div
              v-else
              ref="dialog"
              tabindex="-1"
              role="dialog"
              aria-modal="false"
              aria-labelledby="form-confirm-label"
              class="text-center p-3"
            >
              <p><strong id="form-confirm-label">Are you sure?</strong></p>
              <div class="d-flex">
                <b-button
                  variant="outline-danger"
                  class="mr-3"
                  @click="confirmationDialog = false"
                >
                  Cancel
                </b-button>
                <b-button variant="outline-success" @click="deleteItem()"
                  >OK</b-button
                >
              </div>
            </div>
          </template>
        </b-overlay>

        <div v-if="!sharingRoundPayload.isPublished" class="text-center">
          <nuxt-link to="/sharer/round/commodities/summary/">
            <b-btn class="btn primary-btn">Proceed to Summary</b-btn>
          </nuxt-link>
        </div>

        <div class="text-center pt-5">
          <nuxt-link
            :to="`/sharer/round/commodities/add/#!/update/${sharingRoundPayload.id}/`"
          >
            <b-btn class="btn sameBtnWithPrimary">Add More commodities</b-btn>
          </nuxt-link>
        </div>
      </div>
    </div>
    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinner: false,
      confirmationDialog: false,

      itemToDelete: null,

      // fetch stuff from vuex
      sharingRoundPayload: this.$store.state.round.payload,

      hashbang: this.$route.hash.split('#!')[1] || null,
    }
  },

  methods: {
    confirmDelete(commodityName) {
      this.itemToDelete = commodityName
      this.confirmationDialog = true
    },

    async deleteItem() {
      this.spinner = true

      const URI = `/services/sharing-rounds/${this.sharingRoundPayload.sharerId}/${this.sharingRoundPayload.id}/commodities/${this.itemToDelete}`
      await this.$axios
        .$delete(URI, {})
        .then((res) => {
          if (res.result.commoditiesDetails.length) {
            // Refresh round-payload data
            this.sharingRoundPayload = res.result
            // Save round payload data to a perstisted Vuex store
            this.$store.commit(
              'round/SAVE_PAYLOAD_DATA',
              this.sharingRoundPayload
            )
          } else {
            // redirect to the Add-Comodity Page
            this.$router.replace(`/sharer/round/commodities/add/`)
          }
        })
        .catch((error) => {
          // Display  error toast notification
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner = false
          this.confirmationDialog = false
        })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: transparent;
  padding-bottom: 55px;
}
.body-primary {
  padding-bottom: 30px;
  min-height: 100vh;
}

.top-bar {
  margin-top: 25px;
}

.form-filling {
  margin-top: 10px;
}

.commoditycard {
  background-color: #ffffff;
  border-radius: 10px;
  font-size: 15px;
  line-height: 22px;
  padding: 20px;
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
  text-decoration: none;
}

.commodityListBox {
  padding: 30px 0 10px;
}

h5 {
  font-size: 16px;
}
</style>
