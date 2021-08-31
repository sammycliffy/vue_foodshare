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

      <section v-else>
        <div class="memberDetails">
          <p class="text_medium">
            <span v-text="sharingRound.name"></span>
          </p>
          <span class="item_day">
            Sharing Day&colon;&nbsp;
            <span v-text="sharingRound.endTimeWithDay"></span>
          </span>
        </div>

        <div class="body-main">
          <template v-if="orderAddress.state">
            <p class="mb-8px text_medium">Delivery Location</p>
            <div class="deliveryAddress">
              <p class="mb-0">
                {{
                  `${orderAddress.lineOne}, ${orderAddress.lineTwo}, ${orderAddress.town}, ${orderAddress.state}, ${orderAddress.country}`
                }}
              </p>
            </div>
          </template>
          <div class="row mx-0">
            <div class="col-7 px-0">
              <p class="mb-2">Products Selected</p>
            </div>
            <div class="col px-0">
              <p class="mb-2">Number of Slots</p>
            </div>
          </div>
          <div
            v-for="i in roundBasket.orderedCommodities"
            :key="i.id"
            class="row mx-0"
          >
            <div class="col-7 px-0">
              <div class="list">
                <p class="text_medium" v-text="i.sharedCommodityName"></p>
              </div>
            </div>
            <div class="col px-0">
              <div class="list">
                <p class="text_medium" v-text="i.numberOfSlots"></p>
              </div>
            </div>
          </div>
          <div class="mt-16">
            <p class="mb-8px">Total Price</p>
            <h5 class="color-orange text_bold mb-24">
              <span>&#8358;</span>
              <span
                v-text="
                  Intl.NumberFormat().format(
                    roundBasket.subTotalPlusServiceChargePlusShippingPlusPaystackfees
                  )
                "
              />
            </h5>
          </div>
          <div class="row mx-0">
            <div class="col-7 px-0">
              <div class="paymentProveBox">
                <p>Proof of Payment</p>
                <div v-if="!roundBasket.paymentComplete">
                  <div v-if="paymentProof" class="">
                    <img
                      v-if="paymentProof"
                      :src="paymentProof"
                      @click="previewPhoto = true"
                    />
                    <b-skeleton
                      v-else
                      type="square"
                      height="120px"
                      width="136px"
                    ></b-skeleton>
                  </div>
                  <div
                    v-if="
                      roundBasket.orderStatus ===
                        'AWAITING_PAYMENT_CONFIRMATION' ||
                      'AWAITING_PROOF_OF_PAYMENT' ||
                      'AWAITING_PAYMENT'
                    "
                    class="mt-20 btnBox d-flex"
                  >
                    <b-btn
                      class="btn primary-btn btn-sm mr-1"
                      @click="confirmPayment()"
                    >
                      Approve
                      <b-spinner
                        v-if="spinner1"
                        variant="white"
                        label="Spinning"
                        class="ml-3"
                        small
                      />
                    </b-btn>
                    <b-btn
                      class="btn btn-transparent btn-sm ml-1 borderPrimary"
                      @click="cancelOrder()"
                    >
                      Decline
                      <b-spinner
                        v-if="spinner2"
                        variant="white"
                        label="Spinning"
                        class="ml-3"
                        small
                      />
                    </b-btn>
                  </div>
                </div>
                <div
                  v-if="roundBasket.orderStatus === 'ORDER_CANCELLED'"
                  class="badge badge-danger text-wrap"
                >
                  Order cancelled
                </div>
                <div
                  v-if="
                    roundBasket.orderStatus ===
                      'AWAITING_PAYMENT_CONFIRMATION' && !paymentProof
                  "
                  class="badge badge-secondary text-wrap"
                >
                  Payment proof not yet uploaded.
                </div>
              </div>
              <p class="paymentStatus">
                <span class="">Payment Method:</span>
                <span
                  class="text_bold ml-1"
                  v-text="roundBasket.paymentMethod"
                />
              </p>
            </div>
          </div>
        </div>

        <b-modal
          v-model="previewPhoto"
          title="Payment Proof"
          scrollable
          hide-footer
        >
          <div>
            <img
              v-if="paymentProof"
              :src="paymentProof"
              style="max-width: 100%"
            />
          </div>
        </b-modal>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinner1: false,
      spinner2: false,
      previewPhoto: false,

      roundBasket: null,
      sharingRound: this.$store.state.round.data,

      orderAddress: {},
      paymentProof: null,
    }
  },

  async fetch() {
    const orderId = this.$route.params.orderId

    // Fetch order rounds
    const URL = `/services/orders/sharing-rounds/orders/order/${orderId}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.roundBasket = res.result
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
        throw error
      })

    await this.fetchOrderAddress()

    if (
      this.roundBasket.paymentMethod === 'OFFLINE' &&
      this.roundBasket.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
    ) {
      await this.fetchPaymentProof()
    }
  },

  methods: {
    async fetchOrderAddress() {
      // Fetch order rounds
      const URL = `/services/orders/sharing-rounds/${this.sharingRound.id}/address`

      await this.$axios
        .$get(URL, {})
        .then((res) => {
          this.orderAddress = res.result
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
    },

    async fetchPaymentProof() {
      if (this.roundBasket.paymentMethod === 'OFFLINE') {
        const orderId = this.$route.params.orderId
        // Fetch order rounds
        const URL = `/services/orders/${orderId}/proof/link`

        await this.$axios
          .$get(URL, {})
          .then((res) => {
            this.paymentProof = res.result.url
          })
          .catch((error) => {
            this.ERROR_HANDLER(error)
          })
      }
    },

    async confirmPayment() {
      this.spinner1 = true

      const orderId = this.$route.params.orderId
      // if(this.roundBasket.orderStatus === 'AWAITING_PROOF_OF_PAYMENT' ||'AWAITING_PAYMENT'){
      //   this.roundBasket.paymentReference = `APPROVED_BY_SHARER_${this.roundBasket.sharerId}`
      //   console.log(this.roundBasket.paymentReference)
      // }
      const PAYLOAD = {
        paymentConfirmed: true,
        paymentReference: this.roundBasket.paymentReference,
      }

      // Fetch user's rounds
      const URL = `/services/orders/sharing-rounds/${this.sharingRound.id}/order/${orderId}`
      await this.$axios
        .$put(URL, PAYLOAD)
        .then((res) => {
          this.roundBasket = res.result

          this.SHOW_TOAST({
            title: 'Success',
            variant: 'success',
            text: 'Payment Confirmed',
          })
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner1 = false
        })
    },

    async cancelOrder() {
      this.spinner2 = true

      const orderId = this.$route.params.orderId

      // Fetch user's rounds
      const URL = `/services/orders/sharing-rounds/${this.sharingRound.id}/order/${orderId}`
      await this.$axios
        .$delete(URL, {})
        .then(() => {
          this.SHOW_TOAST({
            text: 'Order Cancelled Successfully',
            variant: 'success',
            title: 'Success',
          })
          this.$router.go(-1)
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          this.spinner2 = false
        })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #ffffff;
  color: #000000;
  padding: 20px 0 0;
}

.top-row {
  padding: 3px 18px 24px;
}

.item_day {
  font-size: 14px;
  line-height: 22px;
}

.participantImage {
  width: 45px;
  height: 45px;
}

.body-main {
  border-radius: 20px 20px 0 0;
  background-color: #eef5ee;
  padding: 24px 16px 40px;
  min-height: 80vh;
}
.memberDetails p {
  margin-bottom: 8px;
}

.memberDetails {
  padding: 0 16px 24px;
}

.deliveryAddress {
  border-bottom: 1px solid #4f9e55;
  padding-bottom: 16.5px;
  margin-bottom: 16.5px;
}

.paymentProveBox img {
  height: 200px;
  width: 250px;
}

.paymentProveBox {
  padding-bottom: 29px;
}
.paymentProveBox p {
  margin-bottom: 13px;
}

.borderPrimary {
  border-color: 4f9e55;
}
</style>
