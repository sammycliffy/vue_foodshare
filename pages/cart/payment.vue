<template>
  <div class="scroll-overflow">
    <div v-if="!sharingRound">Something Occured. Please, Try Again</div>
    <div class="half-width">
      <div v-if="$fetchState.pending" class="text-center p-5">
        <partials-skeleton-loader />
      </div>
      <div v-else>
        <div class="d-flex">
          <partials-back-nav-button />
          <div class="ml-2">
            <h4>Payment method</h4>
            <p>Select one of the payment methods</p>
          </div>
        </div>
        <b-form-radio-group
          v-model="selectedPaymentMethod"
          class="radioBtns mt-20"
        >
          <b-form-radio value="bankPay">
            <div
              class="paymentOption_label d-flex justify-content-start mb-20"
              :class="selectedPaymentMethod === 'bankPay' ? 'bg_selected' : ''"
            >
              <img src="/assets/icons/bank.svg" />
              <div class="label_textBox">
                <span class="d-block labelTitle">Bank Transfer</span>
                <span class="d-block labelDesc"
                  >Pay directly to bank account
                </span>
              </div>
            </div>
          </b-form-radio>
          <b-form-radio value="cardPay">
            <div
              class="paymentOption_label d-flex justify-content-start mt-10 mb-20"
              :class="selectedPaymentMethod === 'cardPay' ? 'bg_selected' : ''"
            >
              <img src="/assets/icons/credit-card.svg" />
              <div class="label_textBox">
                <span class="d-block labelTitle">Debit Card</span>
                <span class="d-block labelDesc"
                  >Pay with MasterCard, Visa or Verve
                </span>
              </div>
            </div>
          </b-form-radio>
        </b-form-radio-group>
        <div class="text-center mt-20">
          <b-btn
            :disabled="verifClicked === true"
            class="btn primary-btn padded-btn m-2"
            @click="payForOrder"
            >Continue

            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-1"
              small
            ></b-spinner
          ></b-btn>
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
      selectedPaymentMethod: 'bankPay',

      fetchedOrder: null,
      hashbang: this.$route.hash.split('#!/')[1] || null,
      // USER: this.$store.state.auth.userData,
      // AUTH: this.$store.state.auth.loggedIn,

      // disable button on-click
      verifClicked: false,
    }
  },

  async fetch() {
    if (this.hashbang) {
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

      this.sharingRound.id = this.cartPayload.sharingRoundId
      this.sharingRound.name = this.cartPayload.sharingRoundName
      this.sharingRound.sharerId = this.cartPayload.sharerId
      this.$store.commit('cart/SAVE_ROUND_DATA', this.sharingRound)
    }
    if (!this.sharingRound.id) {
      this.sharingRound.id = this.cartPayload.sharingRoundId
      this.sharingRound.name = this.cartPayload.sharingRoundName
      this.sharingRound.sharerId = this.cartPayload.sharerId
      this.$store.commit('cart/SAVE_ROUND_DATA', this.sharingRound)
    }
    if (!this.cartPayload.paymentDetails) {
      this.cartPayload.paymentDetails = {
        paymentType: null,
      }
    }

    this.$forceUpdate()
  },

  computed: {
    cartPayload() {
      return this.$store.state.cart.payload
    },
    sharingRound() {
      return this.$store.state.cart.round
    },
  },
  methods: {
    payForOrder() {
      if (this.selectedPaymentMethod === 'bankPay') {
        this.payLaterSelect()
      } else {
        this.payNowSelect()
      }
    },
    async payNowSelect() {
      this.verifClicked = true
      this.spinner = true
      this.cartPayload.paymentDetails.paymentType = 'PAYSTACK'

      this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
        (x) => x
      )
      const URI = `/unauth/orders/sharing-rounds/${this.sharingRound.id}/new-order`

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
          this.verifClicked = false
        })
    },

    async payLaterSelect() {
      this.verifClicked = true
      this.spinner = true
      this.cartPayload.paymentDetails.paymentType = 'OFFLINE'

      this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
        (x) => x
      )

      const URI = `/unauth/orders/sharing-rounds/${this.sharingRound.id}/new-order`

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
          this.verifClicked = false
        })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding: 34px;
}
.paymentOption_label {
  background-color: rgba(79, 158, 85, 0.06);
  padding: 11px 50px 11px 11px;
  margin-left: 10px;
}
h4 {
  font-size: 18px;
  line-height: 42px;
  letter-spacing: 0.05px;
  font-weight: bold;
  margin-bottom: unset;
}
p {
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.05px;
  margin-bottom: unset;
}
label {
  display: block;
  margin: 20px 0 30px;
}
.label_textBox {
  margin-left: 15px;
}
.labelTitle {
  font-size: 14px;
  /* line-height: 15px; */
  letter-spacing: 0.32px;
  color: #000000;
  font-weight: 500;
}
.labelDesc {
  font-size: 12px;
  /* line-height: 48px; */
  letter-spacing: 0.04px;
  color: rgba(108, 115, 138, 0.52);
}

.custom-control-label {
  width: 100% !important;
}
::v-deep .radioBtns .custom-control-label {
  width: 100% !important;
}
::v-deep .radioBtns .custom-control-label::before {
  top: 1.5rem !important;
  border: 1px solid rgba(79, 158, 85, 1);
  width: 1.5rem !important;
  right: unset;
  height: 1.5rem !important;
}
/* .custom-control-inline{

} */

::v-deep .radioBtns .custom-control-label::after {
  top: 1.5rem !important;
  right: unset;
  width: 1.5rem !important;
  height: 1.5rem !important;
}
</style>
