<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <span class="">
              <span v-text="USER ? USER.firstName : ''" />'s Dashboard
            </span>
          </div>
        </div>
        <div class="statisticsBox row">
          <div class="text-center col statisticsBoxInner mr-1">
            <span class="d-block statisticsNumber text_medium">
              <span>{{ Intl.NumberFormat().format(noOfSharings.length) }}</span>
            </span>
            <span class="d-block statisticsName">My Sharings</span>
          </div>
          <div class="text-center statisticsBoxInner col ml-1">
            <span class="d-block statisticsNumber text_medium">
              <span>{{ Intl.NumberFormat().format(totalExpenses || 0) }}</span>
            </span>
            <span class="d-block statisticsName">Total Expenses</span>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <div class="transactionCard">
          <h5 class="title">Recent Transactions</h5>

          <nav v-if="$fetchState.pending" class="text-center p-5">
            <partials-skeleton-loader />
          </nav>

          <nav v-else-if="$fetchState.error" class="text-center p-5">
            Something Occured. Please, Try Again
          </nav>

          <section
            v-else-if="sharingRoundsActive.length < 1"
            class="bg-white text-center rounded p-3 mt-3"
          >
            No sharing round at the moment
          </section>

          <section v-else>
            <div
              v-for="item in ordersRecent"
              :key="item.orderId"
              class="participatedRoundHost"
            >
              <div class="participatedRoundList">
                <span
                  class="color-green text_semiBold mini-title d-block mb-1"
                  >{{ item.dateOfOrderWithDay }}</span
                >
                <p
                  class="text_semiBold mb-1"
                  v-text="item.sharingRoundName || item.sharingRoundId"
                />
                <div>
                  <span class="primary-p">
                    <span v-text="item.orderedCommodities.length" />
                    <span
                      v-text="
                        item.orderedCommodities.length < 2
                          ? 'commodity'
                          : 'commodities'
                      "
                    />
                  </span>
                  <span class="primary-p"></span>
                  <span class="float-right">
                    <span
                      v-if="
                        item.paymentComplete === true &&
                        item.isCollected === false
                      "
                      class="paymentStatusPaid"
                      >Paid</span
                    >
                    <span
                      v-if="
                        item.paymentComplete === true &&
                        item.isCollected === true
                      "
                      class="paymentStatusPaid"
                      >Delivered</span
                    >
                    <span v-if="item.paymentComplete === false">
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT' ||
                          item.orderStatus === 'AWAITING_PROOF_OF_PAYMENT'
                        "
                        class="paymentStatusPending"
                        >Payment required</span
                      >
                      <span
                        v-if="
                          item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'
                        "
                        class="paymentStatusPending"
                        >Awaiting Approval</span
                      >
                      <span
                        v-if="item.orderStatus === 'ORDER_CANCELLED'"
                        class="paymentStatusPending"
                        >Cancelled</span
                      >
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <h5 class="text_semiBold mb-1 ml-3">Available Sharing round</h5>

        <nav v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </nav>

        <nav v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </nav>

        <section
          v-else-if="sharingRoundsActive.length < 1"
          class="bg-white text-center rounded p-3 mt-3"
        >
          No sharing round at the moment
        </section>

        <section v-else class="sharingRoundCarouselHost">
          <client-only>
            <carousel
              :nav="false"
              :dots="false"
              :autoplay="true"
              :responsive="{
                0: { items: 1, nav: false },
                600: { items: 2, nav: false },
              }"
            >
              <div
                v-for="sharingRound in sharingRoundsActive"
                :key="sharingRound.id"
                class="sharingRoundBox text-left plain-link color-black"
                @click="
                  $router.push(
                    `/r/${sharingRound.sharerId}/${sharingRound.id}/`
                  )
                "
              >
                <p class="text_semiBold mb-2" v-text="sharingRound.name"></p>
                <div class="d-flex justify-content-between">
                  <div class="d-flex align-items-center">
                    <img
                      class="sharingRoundBoxIcon1"
                      src="/assets/icons/shopping-box.svg"
                    />
                    <div class="ml-2 mini-title">
                      <span>
                        {{ sharingRound.commoditiesDetails.length }}
                      </span>
                      <span>
                        {{
                          sharingRound.commoditiesDetails.length > 1
                            ? 'Commodities'
                            : 'Commodity'
                        }}
                      </span>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <img
                      class="sharingRoundBoxIcon2"
                      src="/assets/icons/group-orange.svg"
                    />
                    <div class="ml-2 mini-title">
                      <span v-text="sharingRound.participants.length"></span>
                      <span
                        v-text="
                          sharingRound.participants.length > 1
                            ? 'Members'
                            : 'Member'
                        "
                      ></span>
                    </div>
                  </div>
                </div>
              </div>
            </carousel>
          </client-only>
        </section>
      </div>
    </div>

    <partials-user-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.userData,
      noOfSharings: [],
      totalExpenses: null,
      orders: [],
      ordersRecent: [],
      sharingRoundsActive: [],
    }
  },

  async fetch() {
    // Fetch sharer's rounds
    let URL = `/services/orders/sharing-rounds/orders/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.totalExpenses = res.result.totalExpenses
        const MAX = 5
        this.orders = res.result.orders
        this.ordersRecent =
          this.orders.length > MAX
            ? this.orders.slice(this.orders.length - MAX, this.orders.length)
            : this.orders

        this.noOfSharings = this.orders.filter(
          (x) => x.paymentComplete === true
        )
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })

    // Fetch sharer's rounds
    URL = `/unauth/sharing-rounds/status?name=ACTIVE&size=6&page=0`
    // URL = '/services/sharing-rounds/status?name=ACTIVE'
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRoundsActive = res.result.sharingRounds
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
  },
}
</script>

<style scoped>
.body-primary {
  background-color: #eef5ee;
  padding: 68px 18px 80px;
  border-top-left-radius: unset;
  position: relative;
  border-top-right-radius: unset;
}

.header-overlay {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 210px;
  z-index: 1;
}

.header-overlay > .overlay-img {
  width: 100%;
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  background-clip: content-box;
  background-image: url('/assets/fruits.png');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 239px;
}
.header-overlay > .overlay-bg {
  height: 239px;
  background-color: rgba(79, 158, 85, 0.9);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}

.top-row > span {
  font-weight: bold;
}

.statisticsBox {
  z-index: 20;
  position: relative;
  margin: 57px 18px 0;
}

.statisticsBoxInner {
  border: 1px solid #ececec;
  background-color: #ffffff;
  box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 36px 16px 31px;
}

.statisticsBoxInner > div {
  padding: 12px;
}
.statisticsNumber {
  color: #fe8f0a;
  font-size: 20px;
  line-height: 30px;
  margin-bottom: 8px;
}
.statisticsName {
  font-size: 14px;
  line-height: 21px;
  color: #070606;
}

.transactionCard {
  background-color: #ffffff;
  box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  padding: 25px 0;
  margin-bottom: 38px;
}

.transactionCard > .title {
  font-size: 16px;
  letter-spacing: 0.8px;
  line-height: 25px;
  margin: 0 13px 0;
  color: #070606;
}
.participatedRoundList {
  padding: 16px;
  border-bottom: 0.2px solid rgba(0, 0, 0, 0.2);
}

.paymentStatusPending {
  color: #fe8f0a;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 13px;
  background-color: rgba(254, 143, 10, 0.13);
}

.paymentStatusPaid {
  color: #4f9e55;
  padding: 4px 25px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 13px;
  background-color: rgba(79, 158, 85, 0.13);
}

.sharingRoundBox {
  border: 1px solid rgba(245, 245, 245, 0.05);
  margin: 10px;
  padding: 22px;
  border-radius: 10px;
  background-color: rgba(79, 158, 85, 0.05);
  box-shadow: unset;
  -webkit-box-shadow: unset;
  -moz-box-shadow: unset;
  /* box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05); */
}

.sharingRoundBoxIcon1 {
  height: 26.61px;
  width: 20px !important;
  display: inline !important;
}
.sharingRoundBoxIcon2 {
  height: 16.61px;
  width: 26px !important;
  display: inline !important;
}
</style>
