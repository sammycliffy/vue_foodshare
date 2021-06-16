<template>
  <div class="scroll-overflow">
    <div v-if="!sharingRound">Something Occured. Please, Try Again</div>

    <div class="half-width">
      <div>
        <div class="header-overlay">
          <div class="overlay-img"></div>
          <div class="overlay-bg"></div>
          <div class="top-bar">
            <div class="top-row d-flex justify-content-between">
              <div class="d-flex justify-content-around">
                <partials-back-nav-button />
                <span class=""
                  >{{ sharingRound.name || cartPayload.sharingRoundName }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="body-primary half-width">
          <section>
            <p class="shipping_title mt-2">Choose Payment Method</p>
            <p>How do you want to make your payment?</p>

            <div class="text-center mt-3">
              <b-btn
                class="btn primary-btn padded-btn m-2"
                @click="payNowSelect"
                >Pay Online

                <b-spinner
                  v-if="pn_spinner"
                  variant="white"
                  label="Spinning"
                  class="ml-3"
                  small
                ></b-spinner>
              </b-btn>
              <b-btn
                class="btn primary-btn padded-btn m-2"
                @click="payLaterSelect"
                >Bank Transfer

                <b-spinner
                  v-if="spinner"
                  variant="white"
                  label="Spinning"
                  class="ml-3"
                  small
                ></b-spinner
              ></b-btn>
            </div>
            <!-- <div class="text-center mt-3">
              <b-btn class="btn primary-btn padded-btn" @click="submitPaymentMethod"
                >Next
                <b-spinner
                  v-if="spinner"
                  variant="white"
                  label="Spinning"
                  class="ml-3"
                  small
                />
              </b-btn>
            </div> -->
          </section>
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
      pn_spinner: false,
      cartPayload: this.$store.state.cart.payload,
      sharingRound: this.$store.state.cart.round,
      fetchedOrder: null,
      hashbang: this.$route.hash.split('#!/')[1] || null,
    }
  },

  mounted() {
    if (this.hashbang) {
      this.saveOrderAsCart()

      if (!this.sharingRound.id) {
        this.sharingRound = {
          id: this.cartPayload.sharingRoundId,
        }
      }
    }

    if (!this.cartPayload.paymentDetails) {
      this.cartPayload.paymentDetails = {
        paymentType: null,
      }
    }
  },

  methods: {
    async saveOrderAsCart() {
      const URL = `/services/orders/sharing-rounds/orders/order/${this.hashbang}`
      await this.$axios
        .$get(URL, {})
        .then((res) => {
          this.fetchedOrder = res.result
          if (!this.fetchedOrder.sharedCommodities) {
            this.fetchedOrder.sharedCommodities = this.fetchedOrder.orderedCommodities
            delete this.fetchedOrder.orderedCommodities
          }

          this.$store.commit('cart/SAVE_CART_DATA', this.fetchedOrder)
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
    },
    async payNowSelect() {
      this.pn_spinner = true
      this.cartPayload.paymentDetails.paymentType = 'PAYSTACK'

      this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
        (x) => x
      )

      const URI = `/services/orders/sharing-rounds/${this.sharingRound.id}/new-order`

      await this.$axios
        .$post(URI, this.cartPayload)
        .then((response) => {
          const newCartPayload = response.result
          newCartPayload.sharedCommodities = this.cartPayload.sharedCommodities
          // Save cart data to a perstisted Vuex store
          this.$store.commit('cart/SAVE_CART_DATA', newCartPayload)

          this.$router.push('/cart/checkout/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.pn_spinner = false
        })
    },

    async payLaterSelect() {
      this.spinner = true
      this.cartPayload.paymentDetails.paymentType = 'OFFLINE'

      this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
        (x) => x
      )

      const URI = `/services/orders/sharing-rounds/${this.sharingRound.id}/new-order`

      await this.$axios
        .$post(URI, this.cartPayload)
        .then((response) => {
          const newCartPayload = response.result
          newCartPayload.sharedCommodities = this.cartPayload.sharedCommodities
          // Save cart data to a perstisted Vuex store
          this.$store.commit('cart/SAVE_CART_DATA', newCartPayload)
          this.$router.push('/cart/checkout/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner = false
        })
    },
  },
}
</script>

<style scoped>
.body-primary {
  /* background-color: #ffffff; */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 125px;
  z-index: 20;
  overflow-y: auto;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}

.primary-btn {
  height: 50px;
}

.shipping_title {
  font-size: 15px;
  line-height: 42px;
  font-weight: bold;
  color: #000000;
  letter-spacing: 0.04px;
  margin-bottom: 24px;
}

.location-type {
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  width: 80%;
  background-color: #ffffff;
}

.location-type_inner {
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.05px;
  padding: 16px;
}

.labelHost {
  margin-bottom: 30px;
}

.shippingDetailsBox {
  position: relative;
}

.maker {
  height: 21px;
  width: 14px;
  margin-right: 21px;
  vertical-align: sub;
}
.map_link {
  height: 50px;
  border: dashed 2px rgba(254, 143, 10, 1);
  position: absolute;
  left: 3px;
  top: 30px;
}

label {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
}

.formInputGroup {
  font-size: 15px;
  line-height: 22px;
  background-color: rgba(255, 255, 255, 0.96);
  color: #000000;
  border-radius: 8px;
  margin-bottom: 20px;
  height: 50px;
}
.formInputGroup .input {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
  background-color: #ffffff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  height: inherit !important;
  border: unset;
  padding: unset;
}
.input:focus {
  box-shadow: unset;
}
.input-addon {
  margin-bottom: unset;
  font-size: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #000000;
  background-color: #ffffff;
  border: unset;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.form-control {
  border: unset;
}
.custom-select {
  border: unset;
}
.input-radius {
  border-radius: 8px;
}

.input-sub-text {
  font-size: 10px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.2);
}

.locationQuestion {
  font-size: 18px;
  line-height: 22px;
}

.radioBtns .custom-control-inline {
  margin-right: 5px;
  font-size: 15px;
  line-height: 22px;
}

.address-pinter {
  font-size: 20px;
}

.defaultNameBox {
  background-color: rgba(79, 158, 85, 0.3);
  border-color: transparent;
  padding: 15px;
  font-size: 14px;
  line-height: 22px;
}

.defaultNameBox span {
  color: #070606;
  opacity: 60%;
}

b-form-input::-webkit-input-placeholder {
  /* Edge */
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input::placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}
.custom-control-input:not(:disabled):active ~ .custom-control-label::before {
  border-color: #4f9e55 !important;
  background-color: #4f9e55 !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #4f9e55 !important;
  background-color: #4f9e55 !important;
}

.custom-control-label::before {
  top: 1.25rem;
  border: 1px solid rgba(79, 158, 85, 1);
  right: -2rem;
  left: unset;
}

.custom-control-label::after {
  top: 1.25rem;
  right: -2rem;
  left: unset;
}

.custom-control {
  padding-left: unset;
}

.input-l-seperator {
  padding-right: 6.5px !important;
}

.input-r-seperator {
  padding-left: 6.5px !important;
}
.input-col {
  padding-left: unset;
  padding-right: unset;
}

.verifyImg {
  width: 215.73px;
  margin: 40px auto 24px;
}

.pad-options {
  padding: 25px 16px 30px;
}
</style>
