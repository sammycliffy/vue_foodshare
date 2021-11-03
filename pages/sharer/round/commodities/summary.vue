<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-between">
            <partials-back-nav-button />
            <div class="">
              <span class="backGreenTitle color-green"
                >{{ sharingRoundPayload.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-center form-filling">
          <img src="/assets/icons/form-3.svg" class="" />
        </div>
        <div class="preview-title-row d-flex justify-content-between">
          <h3 class="title">Round Summary</h3>
          <span
            v-if="sharingRoundPayload.commoditiesDetails"
            class="light-dark"
          >
            {{ sharingRoundPayload.commoditiesDetails.length }}
            commodities</span
          >
        </div>

        <div class="previewBox">
          <div class="d-block plain-link">
            <nuxt-link
              v-for="item in sharingRoundPayload.commoditiesDetails"
              :key="item.id"
              class="previewCard d-flex justify-content-between align-items-center"
              :to="`/sharer/round/commodities/${item.id}/`"
            >
              <div class="d-flex flex-row">
                <div class="item__image">
                  <img
                    :src="item.imageUrl || '/assets/empty-photo.svg'"
                    class="commodityImg"
                  />
                </div>
                <div class="ml-3 my-auto">
                  <span class="d-block">{{ item.commodityName }}</span>

                  <span class="d-block item__price mt-2"
                    >&#8358;
                    {{ Intl.NumberFormat().format(item.sharingPrice) }}</span
                  >
                </div>
              </div>

              <div>{{ item.numberOfSlots }} Slots</div>

              <i class="fas fa-angle-right angle-right-icon"></i>
            </nuxt-link>
          </div>
        </div>

        <div class="d-flex mt-3">
          <div class="mr-5">
            <span class="d-block span-header">Order Deadline</span>
            <span
              class="d-block font-weight-light"
              v-text="sharingRoundPayload.cutOffTimeWithDay"
            ></span>
          </div>
          <div>
            <span class="d-block span-header">Sharing day</span>
            <span
              class="d-block font-weight-light"
              v-text="sharingRoundPayload.endTimeWithDay"
            ></span>
          </div>
        </div>
        <div class="mt-3">
          <span class="d-block span-header"
            >Waiting window for Reservation</span
          >
          <span class="d-block font-weight-light">
            <span class="" v-text="sharingRoundPayload.waitingTime"></span>
            <span v-text="sharingRoundPayload.waitingTimeType" />
          </span>
        </div>
        <div class="mt-3">
          <span class="d-block span-header">Service Charge</span>
          <div class="font-weight-light">
            <span v-if="sharingRoundPayload.serviceChargeType === 'flatrate'"
              ><span class="color-orange mr-2"
                >&#8358; {{ sharingRoundPayload.serviceChargeAmount }}</span
              >
              Flat Rate
            </span>

            <span v-else>
              <span class="color-orange mr-2">
                {{ sharingRoundPayload.serviceChargeAmount }} %</span
              >
              Percentage
            </span>
          </div>
        </div>

        <div class="d-flex flex-column align-items-center mt-4 mb-5">
          <button class="btn-share" @click="publishSharingRound">
            Publish Sharing Round
            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
            ></b-spinner>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinner: false,

      // fetch stuff from vuex
      sharingRoundPayload: this.$store.state.round.payload,
      accessToken: this.$store.state.auth.accessToken,
      userData: this.$store.state.auth.userData,
    }
  },

  methods: {
    async publishSharingRound() {
      this.spinner = true

      const URI = `/services/sharing-rounds/${this.sharingRoundPayload.sharerId}/${this.sharingRoundPayload.id}/publish`
      await this.$axios
        .$put(URI, {})
        .then((res) => {
          // Display Success toast notification
          this.$bvToast.toast('Round Successfully Added', {
            title: 'Success!',
            variant: 'success',
            solid: true,
          })

          // Save round payload data to a perstisted Vuex store
          this.$store.commit('round/SAVE_PAYLOAD_DATA', res.result)
          // Redirect to publish page
          this.$router.replace('/sharer/round/publish/')
        })
        .catch((error) => {
          // Display  error toast notification
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          // Close the loader
          this.spinner = false
        })
    },
  },
}
</script>

<style scoped>
.form-filling {
  margin-top: 23px;
}

.preview-title-row {
  padding: 20px 0 15px;
}

.preview-title-row > span {
  margin: 0;
  font-size: 18px;
  line-height: 22px;
  padding-top: 8px;
}

.preview-title-row > h3 {
  margin: 0;
}

.previewBox {
  border-top: 0.3px solid #e6e6ea;
  border-bottom: 0.3px solid #e6e6ea;
  margin-left: -18px;
  margin-right: -18px;
  padding: 18px;
}

.previewCard {
  background-color: transparent;
  border-radius: 10px;
  font-size: 15px;
  line-height: 22px;
  padding: 1px;
  /* text-align: center; */
  margin-bottom: 20px;
  color: #000000;
  text-decoration: none;
}

.item__image {
  height: 65px;
  width: 65px;
}
.item__price {
  color: #fe8f0a;
}
.angle-right-icon {
  font-size: 26px;
}

span {
  color: #000000;
}

.span-header {
  font-weight: 600;
}

.font-weight-light {
  font-weight: 400;
  font-size: 15px;
  line-height: 22px;
}
.commodityImg {
  width: 70px;
  height: 70px;
}
</style>
