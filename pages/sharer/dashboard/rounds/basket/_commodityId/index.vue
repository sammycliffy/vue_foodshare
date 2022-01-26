<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-row d-flex justify-content-between">
        <partials-back-nav-button />
        <h5 class="title">Ongoing Sharing Rounds</h5>
        <span>&nbsp;</span>
      </header>

      <nav v-if="$fetchState.pending" class="text-center p-5">
        <partials-skeleton-loader />
      </nav>

      <nav v-else-if="$fetchState.error" class="text-center p-5">
        Something Occured. Please, Try Again
      </nav>

      <section v-else>
        <div class="detailsBox">
          <p class="text_medium mb-0" v-text="sharingRound.name"></p>
          <p class="item_day mt-1 mb-0">
            <span>Sharing Day&colon;</span>
            <span v-text="sharingRound.endTimeWithDay"></span>
          </p>
        </div>

        <div v-if="orders.length < 1" class="bg-white text-center py-3">
          No Order Found
        </div>

        <div v-else>
          <p class="color-orange text_medium">Round Members</p>
          <div class="accordion" role="tablist">
            <!--Orders Awaiting Payment-->
            <div class="itemBox">
              <div v-b-toggle.awaitingOrders block class="text_medium">
                Awaiting Payment
                <span class="primary-p color-orange float-right">
                  <span v-if="awaitingOrders.length">{{
                    awaitingOrders.length
                  }}</span>
                  <span v-if="awaitingOrders.length > 1"> Orders </span>
                  <span v-if="awaitingOrders.length == 1"> Order </span>
                </span>
              </div>
              <b-collapse
                id="awaitingOrders"
                accordion="my-accordion"
                role="tabpanel"
              >
                <div
                  v-for="item in awaitingOrders"
                  :key="item.id"
                  class="member mt-16"
                >
                  <label class="row mx-0">
                    <div class="col px-0 pr-2">
                      <img
                        class="rounded-circle border border-primary"
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        height="75"
                        width="75"
                      />
                    </div>
                    <div class="col-8 px-0">
                      <span class="nameBox">
                        <strong
                          class="mb-0"
                          v-text="`${item.firstName} ${item.lastName}`"
                        ></strong>
                        <p class="mb-0" v-text="item.emailAddress"></p>
                        <nuxt-link
                          :to="`/sharer/dashboard/rounds/basket/${sharingRound.id}/${item.orderId}/`"
                          class="plain-link text_medium basketLink"
                        >
                          <span class="mr-2">View Basket</span>
                        </nuxt-link>
                      </span>
                      <span
                        v-if="item.orderStatus === 'ORDER_CANCELLED'"
                        class="paymentStatusBadge"
                        >Order cancelled</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
                        "
                        class="paymentStatusBadge"
                        >Awaiting Payment Confirmation</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT' ||
                          item.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
                        "
                        class="paymentStatusBadge"
                        >Payment required</span
                      >
                      <span
                        v-if="item.paymentComplete"
                        class="paymentStatusPaid"
                        >Payment Confirmed</span
                      >
                      <span
                        class="deliveryTypeSTyle"
                        v-text="item.deliveryDetails.deliveryMethod"
                      ></span>
                    </div>
                  </label>
                </div>
              </b-collapse>
            </div>
            <!--Orders Pending Approval -->
            <div class="itemBox">
              <div v-b-toggle.pendingOrders block class="text_medium">
                Awaiting Confirmation
                <span class="primary-p color-orange float-right">
                  <span v-if="pendingOrders.length">{{
                    pendingOrders.length
                  }}</span>
                  <span v-if="pendingOrders.length > 1"> Orders </span>
                  <span v-if="pendingOrders.length == 1"> Order </span>
                </span>
              </div>
              <b-collapse
                id="pendingOrders"
                accordion="my-accordion"
                role="tabpanel"
              >
                <div
                  v-for="item in pendingOrders"
                  :key="item.id"
                  class="member mt-16"
                >
                  <label class="row mx-0">
                    <div class="col px-0 pr-2">
                      <img
                        class="rounded-circle border border-primary"
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        height="75"
                        width="75"
                      />
                    </div>
                    <div class="col-8 px-0">
                      <span class="nameBox">
                        <strong
                          class="mb-0"
                          v-text="`${item.firstName} ${item.lastName}`"
                        ></strong>
                        <p class="mb-0" v-text="item.emailAddress"></p>
                        <nuxt-link
                          :to="`/sharer/dashboard/rounds/basket/${sharingRound.id}/${item.orderId}/`"
                          class="plain-link text_medium basketLink"
                        >
                          <span class="mr-2">View Basket</span>
                        </nuxt-link>
                      </span>
                      <span
                        v-if="item.orderStatus === 'ORDER_CANCELLED'"
                        class="paymentStatusBadge"
                        >Order cancelled</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
                        "
                        class="paymentStatusBadge"
                        >Awaiting Payment Confirmation</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT' ||
                          item.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
                        "
                        class="paymentStatusBadge"
                        >Payment required</span
                      >
                      <span
                        v-if="item.paymentComplete"
                        class="paymentStatusPaid"
                        >Payment Confirmed</span
                      >
                      <span
                        class="deliveryTypeSTyle"
                        v-text="item.deliveryDetails.deliveryMethod"
                      ></span>
                    </div>
                  </label>
                </div>
              </b-collapse>
            </div>
            <!--Confirmed Orders -->
            <div class="itemBox">
              <div v-b-toggle.confirmedOrders block class="text_medium">
                Approved
                <span class="primary-p color-orange float-right when-closed">
                  <span v-if="confirmedOrders.length">{{
                    confirmedOrders.length
                  }}</span>
                  <span v-if="confirmedOrders.length > 1"> Orders </span>
                  <span v-if="confirmedOrders.length == 1"> Order </span>
                </span>
              </div>
              <b-collapse
                id="confirmedOrders"
                accordion="my-accordion"
                role="tabpanel"
              >
                <div class="text_medium mt-1 mb-2">
                  <span class="primary-p color-orange when-open fs-14">
                    <span v-if="confirmedOrders.length">{{
                      confirmedOrders.length
                    }}</span>
                    <span v-if="confirmedOrders.length > 1">
                      Orders Approved</span
                    >
                    <span v-if="confirmedOrders.length == 1">
                      Order Approved</span
                    >
                  </span>
                </div>
                <div
                  v-for="item in confirmedOrders"
                  :key="item.id"
                  class="member mt-16"
                >
                  <label class="row mx-0">
                    <div class="col px-0 pr-2">
                      <img
                        class="rounded-circle border border-primary"
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        height="75"
                        width="75"
                      />
                    </div>
                    <div class="col-8 px-0">
                      <span class="nameBox">
                        <strong
                          class="mb-0 fs-14 d-block"
                          v-text="`${item.firstName} ${item.lastName}`"
                        ></strong>
                        <!-- <p class="mb-0" v-text="item.emailAddress"></p> -->
                        <nuxt-link
                          :to="`/sharer/dashboard/rounds/basket/${sharingRound.id}/${item.orderId}/`"
                          class="plain-link text_medium basketLink"
                        >
                          <span class="mr-2">View Basket</span>
                        </nuxt-link>
                      </span>
                      <span
                        class="deliveryTypeSTyle"
                        v-text="item.deliveryDetails.deliveryMethod"
                      ></span>
                      <!-- <span
                        v-if="item.orderStatus === 'ORDER_CANCELLED'"
                        class="paymentStatusBadge"
                        >Order cancelled</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
                        "
                        class="paymentStatusBadge"
                        >Awaiting Payment Confirmation</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT' ||
                          item.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
                        "
                        class="paymentStatusBadge"
                        >Payment required</span
                      >
                      <span
                        v-if="item.paymentComplete"
                        class="paymentStatusPaid"
                        >Payment Confirmed</span
                      > -->
                    </div>
                    <div class="col px-0">
                      <b-form-checkbox
                        :id="item.orderId + ''"
                        v-model="checkStatus[item.orderId]"
                        class="roundBasket"
                        @change="checkOrderModal = true"
                      >
                      </b-form-checkbox>
                    </div>
                  </label>
                  <b-modal
                    v-model="checkOrderModal"
                    centered
                    modal-class="logOutModalStyle text-center"
                    size="sm"
                    hide-footer
                    hide-header
                    no-close-on-backdrop
                  >
                    <p>Are you sure you want mark this order as collected?</p>
                    <div class="text-center mt-24">
                      <b-button
                        variant="outline-danger"
                        :disabled="verifClicked === true"
                        class="mr-2"
                        @click="checkOrderModal = false"
                      >
                        Cancel
                      </b-button>
                      <b-button
                        :disabled="verifClicked === true"
                        variant="outline-success"
                        @click="confirmCollection(item)"
                        >Confirm</b-button
                      >
                    </div>
                  </b-modal>
                </div>
              </b-collapse>
            </div>
            <!--Cancelled Orders -->
            <div class="itemBox">
              <div v-b-toggle.cancelledOrders block class="text_medium">
                Cancelled
                <span class="primary-p color-orange float-right">
                  <span v-if="cancelledOrders.length">{{
                    cancelledOrders.length
                  }}</span>
                  <span v-if="cancelledOrders.length > 1"> Orders </span>
                  <span v-if="cancelledOrders.length == 1"> Order </span>
                </span>
              </div>
              <b-collapse
                id="cancelledOrders"
                accordion="my-accordion"
                role="tabpanel"
              >
                <div
                  v-for="item in cancelledOrders"
                  :key="item.id"
                  class="member mt-16"
                >
                  <label class="row mx-0">
                    <div class="col px-0 pr-2">
                      <img
                        class="rounded-circle border border-primary"
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        height="75"
                        width="75"
                      />
                    </div>
                    <div class="col-8 px-0">
                      <span class="nameBox">
                        <strong
                          class="mb-0"
                          v-text="`${item.firstName} ${item.lastName}`"
                        ></strong>
                        <p class="mb-0" v-text="item.emailAddress"></p>
                        <nuxt-link
                          :to="`/sharer/dashboard/rounds/basket/${sharingRound.id}/${item.orderId}/`"
                          class="plain-link text_medium basketLink"
                        >
                          <span class="mr-2">View Basket</span>
                        </nuxt-link>
                      </span>
                      <span
                        v-if="item.orderStatus === 'ORDER_CANCELLED'"
                        class="paymentStatusBadge"
                        >Order cancelled</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
                        "
                        class="paymentStatusBadge"
                        >Awaiting Payment Confirmation</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT' ||
                          item.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
                        "
                        class="paymentStatusBadge"
                        >Payment required</span
                      >
                      <span
                        v-if="item.paymentComplete"
                        class="paymentStatusPaid"
                        >Payment Confirmed</span
                      >
                    </div>
                  </label>
                </div>
              </b-collapse>
            </div>
          </div>
        </div>
        <div class="text-center mt-32">
          <b-btn
            v-if="!roundClosed && sharingRound.sharingDayPassed"
            class="btn closeRound-btn"
            @click="closeRound()"
            >Close Round
            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
            />
          </b-btn>
          <div v-if="roundClosed" class="badge badge-warning text-wrap p-2">
            Round Closed
          </div>
        </div>
      </section>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      verifClicked: false,
      checkOrderModal: false,

      spinner: false,
      checkStatus: [],
      orders: [],
      roundClosed: false,

      awaitingOrders: [],
      pendingOrders: [],
      confirmedOrders: [],
      cancelledOrders: [],

      sharingRound: this.$store.state.round.data,
    }
  },

  async fetch() {
    const commodityId = this.$route.params.commodityId
    // Fetch user's rounds
    const URL = `/services/orders/sharing-rounds/${commodityId}/order`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.orders = res.result.orders
        this.checkStatus = {}
        this.orders.forEach((el) => {
          this.checkStatus[el.orderId] = el.isCollected || false
        })

        this.awaitingOrders = this.orders.filter(
          (x) =>
            x.orderStatus === 'AWAITING_PAYMENT' ||
            x.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
        )
        this.pendingOrders = this.orders.filter(
          (x) => x.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
        )
        this.confirmedOrders = this.orders.filter(
          (x) => x.paymentComplete === true
        )
        this.cancelledOrders = this.orders.filter(
          (x) => x.orderStatus === 'ORDER_CANCELLED'
        )
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
        throw error
      })
  },

  methods: {
    async confirmCollection(item) {
      this.verifClicked = true
      const PAYLOAD = {
        particpants: [
          {
            collected: this.checkStatus[item.orderId],
            orderId: item.orderId,
            userId: item.id,
          },
        ],
      }

      const URL = `/services/sharing-rounds/${this.sharingRound.sharerId}/${item.sharingRoundId}/participants`
      await this.$axios
        .$put(URL, PAYLOAD)
        .then((res) => {
          this.roundBasket = res.result

          this.SHOW_TOAST({
            title: 'Success',
            variant: 'success',
            text: 'Orders successfully updated',
          })

          this.checkOrderModal = false
          this.verifClicked = false
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
    },

    async closeRound() {
      // const checkedItems = Object.values(this.checkStatus).filter((x) => x)
      this.spinner = true

      const itemId = this.$route.params.commodityId

      // Close the particular round
      const URL = `/services/sharing-rounds/${this.sharingRound.id}/${itemId}/close`
      await this.$axios
        .$put(URL, {})
        .then(() => {
          this.roundClosed = true
          this.SHOW_TOAST({
            text: 'Round Closed Successfully',
            variant: 'success',
            title: 'Success',
          })
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
          throw error
        })
        .finally(() => {
          this.spinner = false
        })
      // if (checkedItems.length > 0) {
      //   this.spinner = true

      //   const itemId = this.$route.params.commodityId

      //   // Close the particular round
      //   const URL = `/services/sharing-rounds/${this.sharingRound.id}/${itemId}/close`
      //   await this.$axios
      //     .$put(URL, {})
      //     .then(() => {
      //       this.SHOW_TOAST({
      //         text: 'Round Closed Successfully',
      //         variant: 'success',
      //         title: 'Success',
      //       })
      //     })
      //     .catch((error) => {
      //       this.ERROR_HANDLER(error)
      //       throw error
      //     })
      //     .finally(() => {
      //       this.spinner = false
      //     })
      // } else {
      //   this.SHOW_TOAST({
      //     text: 'Confirm at least one order collection before closing round',
      //     variant: 'warning',
      //     title: 'Hint',
      //   })
      // }
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  color: #000000;
  padding: 20px 18px 80px;
}

.detailsBox {
  margin-top: 20px;
  margin-bottom: 24px;
}

.item_day {
  font-size: 14px;
  line-height: 22px;
}

.perticipantImage {
  width: 45px;
  height: 45px;
}

.member {
  margin-bottom: 24px;
}

.basketLink {
  font-size: 13px;
  line-height: 22px;
  color: #4f9e55;
}

.closeRound-btn {
  background: #4f9e55;
  color: #ffffff;
  padding: 15px 28px;
  font-size: 15px;
  line-height: 12px;
  border-radius: 2px;
  box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -moz-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  border: unset;
}

::v-deep .roundBasket .custom-control-label::before {
  height: 20px !important;
  width: 20px !important;
  border: 1px solid #000000 !important;
  box-shadow: unset !important;
  border-radius: 50px !important;
  background-color: transparent;
}

::v-deep .roundBasket .custom-control-label::after {
  height: 20px !important;
  width: 20px !important;
}

/* ::v-deep
  .roundBasket
  .custom-control-input:checked
  ~ .custom-control-label::before {
  background: transparent;
} */

::v-deep .roundBasket .custom-control-label {
  float: right;
}

.paymentStatusBadge {
  color: #fe8f0a;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 22px;
  white-space: nowrap;
  border-radius: 13px;
  background-color: rgba(254, 143, 10, 0.13);
}
.paymentStatusPaid {
  color: #4f9e55;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 22px;
  white-space: nowrap;
  border-radius: 13px;
  background-color: rgba(79, 158, 85, 0.13);
  margin-left: 10px;
}

.itemBox {
  padding: 24px 22px;
  margin-bottom: 18px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 5px 10px 0 rgba(0, 0, 0, 0.05);
  font-size: 15px;
}

.itemBox > .not-collapsed > .when-closed {
  display: none;
}

img {
  height: 35px !important;
  width: 35px !important;
}

::v-deep .logOutModalStyle .modal-backdrop {
  background-color: rgba(0, 0, 0, 0.07) !important;
}

::v-deep .logOutModalStyle .modal-body {
  padding: 32px 0 50px;
}

::v-deep .logOutModalStyle .modal-body p {
  margin: 0 20%;
}

::v-deep .logOutModalStyle .modal-dialog {
  padding: 20% 42px;
}
</style>
