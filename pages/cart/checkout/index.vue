<template>
  <main class="scroll-overflow">
    <div v-if="!sharingRound">Something Occured. Please, Try Again</div>

    <section class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <div class="d-flex justify-content-around">
              <partials-back-nav-button />
              <span class="">
                <span class="text_medium"
                  >{{ cartPayload.sharingRoundName }}
                </span>

                <span class="text_light"
                  >{{ sharingRound.cutOffTimeWithDay }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary half-width">
        <div class="checkoutBox">
          <p class="color-orange mb-0">
            Sharing Location
            <span class="d-block color-black">
              <span v-if="sharingRound.sharingAddress.lineOne"
                >{{ sharingRound.sharingAddress.lineOne.trim() }}&comma;</span
              >
              <span v-if="sharingRound.sharingAddress.lineTwo"
                >{{ sharingRound.sharingAddress.lineTwo.trim() }}&comma;</span
              >
              <span v-if="sharingRound.sharingAddress.town"
                >{{ sharingRound.sharingAddress.town.trim() }}&comma;</span
              >
              <span v-if="sharingRound.sharingAddress.state">{{
                sharingRound.sharingAddress.state.trim()
              }}</span>
            </span>
          </p>
        </div>
        <div class="checkoutBox">
          <b-row class="checkoutBox_inner">
            <b-col>
              <p class="checkBox_title mb-1">Sub Total</p>
              <p class="primary_price mb-26">
                &#8358; {{ Intl.NumberFormat().format(cartPayload.subTotal) }}
              </p>
            </b-col>
            <b-col v-if="cartPayload.paymentDetails.paymentType === 'PAYSTACK'">
              <p class="checkBox_title mb-1">Paystack Fee</p>
              <p class="text_normal primary_price fs-15 mb-26">
                &#8358;
                {{ Intl.NumberFormat().format(cartPayload.paystackFees) }}
              </p>
            </b-col>
          </b-row>
          <b-row class="checkoutBox_inner">
            <b-col>
              <p class="checkBox_title mb-1">Delivery Fee</p>
              <p class="text_normal primary_price fs-15 mb-26">
                &#8358;
                {{ Intl.NumberFormat().format(cartPayload.shippingFee || 0) }}
              </p>
            </b-col>
            <b-col>
              <p class="checkBox_title mb-1">Service Charge</p>
              <p class="text_normal primary_price fs-15 mb-26">
                <!-- {{
                  cartPayload.serviceChargeType === 'flatrate'
                    ? `&#8358; ${cartPayload.serviceChargeRate}`
                    : `${cartPayload.serviceChargeRate} %`
                }} -->
                &#8358;
                {{ Intl.NumberFormat().format(cartPayload.serviceCharge) }}
              </p>
            </b-col>
          </b-row>
          <b-row class="checkoutBox_inner">
            <b-col>
              <p class="checkBox_title mb-1">Total</p>
              <p
                v-if="cartPayload.paymentDetails.paymentType === 'PAYSTACK'"
                class="primary_price"
              >
                &#8358;
                {{
                  Intl.NumberFormat().format(
                    cartPayload.subTotalPlusServiceChargePlusShippingPlusPaystackfees
                  )
                }}
              </p>
              <p
                v-if="cartPayload.paymentDetails.paymentType === 'OFFLINE'"
                class="primary_price"
              >
                &#8358;
                {{
                  Intl.NumberFormat().format(
                    cartPayload.subTotalPlusServiceChargePlusShipping
                  )
                }}
              </p>
            </b-col>
            <b-col>
              <p class="checkBox_title mb-1">Savings</p>
              <p class="text_normal primary_price fs-15 mb-26">
                &#8358;
                {{ Intl.NumberFormat().format(cartPayload.savings) }}
              </p>
            </b-col>
          </b-row>
          <div class="text-center">
            <paystack
              v-if="cartPayload.paymentDetails.paymentType === 'PAYSTACK'"
              :disabled="verifClicked === true"
              :amount="amount"
              :email="email"
              :paystackkey="paystackkey"
              :reference="reference"
              :callback="callback"
              :close="close"
              :embed="false"
              class="btn primary-btn btn-block text-white"
            >
              Complete Payment
              <b-spinner
                v-if="ps_spinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              ></b-spinner>
            </paystack>
            <b-btn
              v-if="cartPayload.paymentDetails.paymentType === 'OFFLINE'"
              :disabled="verifClicked === true"
              class="btn primary-btn btn-block"
              @click="payLater()"
              >Complete Payment
              <b-spinner
                v-if="spinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              ></b-spinner
            ></b-btn>
          </div>
        </div>
        <div class="basketBox">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25.68"
              height="23.67"
              fill="currentColor"
              class="bi bi-basket"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z"
              />
            </svg>
            <span class="basketTitle"> Basket </span>
          </span>
          <div
            v-for="(item, index) in cartPayload.sharedCommodities"
            :key="index + '-sharedCommodity'"
            class=""
          >
            <template
              v-if="item"
              class="previewCard d-flex justify-content-between"
            >
              <div class="d-flex flex-row my-3">
                <div class="item__image">
                  <img
                    :src="item.imageUrl || '/assets/empty-photo.svg'"
                    class="commodityImg"
                  />
                </div>
                <div class="ml-3 my-auto">
                  <span class="d-block itemName">{{
                    item.sharedCommodityName
                  }}</span>
                  <span class="d-block itemPrice mt-2 color-orange"
                    >&#8358;
                    {{
                      Intl.NumberFormat().format(
                        item.pricePerSlot * item.numberOfSlots
                      )
                    }}</span
                  >
                  <span class="d-block itemSlot mt-2">
                    {{ item.numberOfSlots }}
                    <span v-if="item.numberOfSlots > 1">slots</span>
                    <span v-else>slot</span>
                  </span>
                </div>
                <!-- <span
                  v-b-tooltip.hover
                  class="icon-cusor deleteItem align-self-center"
                  title="Delete Item from basket."
                  @click="deleteCommodity(item.sharedCommodityId)"
                >
                  <i class="far fa-trash-alt align-middle"></i>
                </span> -->
              </div>
            </template>
          </div>
        </div>
      </div>
    </section>
    <partials-footer v-if="AUTH" />
  </main>
</template>

<script>
import paystack from 'vue-paystack'
export default {
  components: {
    paystack,
  },
  data() {
    return {
      AUTH: this.$store.state.auth.loggedIn,
      // disable button on-click
      verifClicked: false,
      sharingRound: this.$store.state.cart.round,
      cartPayload: this.$store.state.cart.payload,
      paymentPayload: this.$store.state.cart.payment,
      spinner: false,
      ps_spinner: false,
      // paystackkey:
      //   process.env.PAYKEY ||
      //   'pk_test_37f0940b6486906976a15a1cb6fcf7feb64ce024',

      // paystackkey: 'pk_live_02fd774b299b7aa5a1395738f20c38642e2e55fb',
      // paystack public key
      paystackkey: 'pk_test_37f0940b6486906976a15a1cb6fcf7feb64ce024', // paystack public key
      email: this.$store.state.cart.payload.emailAddress, // Customer email
      amount:
        this.$store.state.cart.payload
          .subTotalPlusServiceChargePlusShippingPlusPaystackfees * 100,
    }
  },
  computed: {
    reference() {
      let text = ''
      const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

      for (let i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

      return text
    },
  },

  mounted() {
    if (location.host === 'app.foodshare.ng') {
      this.paystackkey = 'pk_live_02fd774b299b7aa5a1395738f20c38642e2e55fb'
    } else {
      this.paystackkey = 'pk_test_37f0940b6486906976a15a1cb6fcf7feb64ce024'
    }
  },

  methods: {
    payNow() {
      // this.SHOW_TOAST({ text: 'Feature Not Available', variant: 'warning' })
    },

    deleteCommodity(itemToDelete) {
      if (this.cartPayload.sharedCommodities.length > 1) {
        this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
          // eslint-disable-next-line eqeqeq
          (el) => el.sharedCommodityId != itemToDelete
        )

        this.sharingRound.commoditiesDetails = this.sharingRound.commoditiesDetails.filter(
          // eslint-disable-next-line eqeqeq
          (el) => el.id != itemToDelete
        )
      }
    },

    async payLater() {
      this.spinner = true
      this.verifClicked = true
      this.paymentPayload.paymentDetails.paymentType = 'OFFLINE'
      this.paymentPayload.orderId = this.cartPayload.orderId
      // this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
      //   (x) => x
      // )

      const URI = `/unauth/orders/sharing-rounds/${this.sharingRound.id}/order/pay`
      await this.$axios
        .$post(URI, this.paymentPayload)
        .then((response) => {
          const newCartPayload = response.result
          newCartPayload.sharedCommodities = this.cartPayload.sharedCommodities
          // Save cart data to a perstisted Vuex store
          console.log('Check Id:', newCartPayload)
          this.$store.commit('cart/SAVE_CART_DATA', newCartPayload)
          // this.$store.commit('cart/SAVE_OFFLINE_CART_DATA', newCartPayload)

          this.$router.replace('/cart/checkout/details/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner = false
          this.verifClicked = false
        })
    },
    async callback(response) {
      this.ps_spinner = true
      this.verifClicked = true
      this.paymentPayload.paymentDetails.paymentType = 'PAYSTACK'
      this.paymentPayload.paymentDetails.paystackVerificationCode =
        response.reference
      this.paymentPayload.orderId = this.cartPayload.orderId
      // this.cartPayload.sharedCommodities = this.cartPayload.sharedCommodities.filter(
      //   (x) => x
      // )

      const URI = `/unauth/orders/sharing-rounds/${this.sharingRound.id}/order/pay`
      await this.$axios
        .$post(URI, this.paymentPayload)
        .then((response) => {
          const latestCartPayload = response.result
          console.log('Check Id:', latestCartPayload)
          this.$store.commit('cart/SAVE_CART_DATA', latestCartPayload)
          this.$router.replace('/cart/checkout/success/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner = false
          this.verifClicked = false
        })
    },
    close() {
      console.log('Payment closed')
    },
  },
}
</script>

<style scoped>
.body-primary {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 125px;
  overflow: inherit;
  z-index: 20;
}

.scroll-overflow {
  position: relative;
}
.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}

.primary-btn {
  padding: 15px 31px;
}

.checkoutBox {
  border-bottom: 0.5px solid #4f9e55;
  margin-left: -18px;
  margin-right: -18px;
  padding: 32px 18px 24px;
}

.checkBox_title {
  font-size: 14px;
  line-height: 22px;
  color: #000000;
}

.itemImage {
  width: 97.63px;
  height: 92.65px;
  border-radius: 9px;
}

.itemName {
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
}
.itemPrice .itemSlot {
  font-size: 14px;
  line-height: 22px;
}

.basketBox {
  padding-bottom: 80px;
}
</style>
