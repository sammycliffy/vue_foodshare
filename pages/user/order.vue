<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <span class="">&nbsp;</span>
            <div class="text-center">
              <img
                src="/assets/icons/shopping-basket-white.svg"
                class="orderImgBanner"
              />
              <h5>My Orders</h5>
            </div>
            <span class="">&nbsp;</span>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <nav v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </nav>

        <nav v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </nav>

        <section v-else>
          <b-tabs class="profile_tabs">
            <b-tab class="mt-24" title="Active" active>
              <user-order-list-items :orders="ordersActive" />
            </b-tab>

            <b-tab class="mt-24" title="Closed">
              <user-order-list-items :orders="ordersClosed" />
            </b-tab>
          </b-tabs>
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
      toggleActive: [],
      toggleClosed: [],

      orders: [],
      ordersActive: [],
      ordersClosed: [],

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // Fetch sharer's rounds
    const URL = `/services/orders/sharing-rounds/orders/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.orders = res.result.orders
        this.ordersActive = this.orders.filter(
          (x) =>
            x.sharingRoundStatus === 'ACTIVE' &&
            x.orderStatus !== 'ORDER_CANCELLED'
        )
        this.ordersClosed = this.orders.filter(
          (x) =>
            x.sharingRoundStatus === 'CLOSED' ||
            x.orderStatus === 'ORDER_CANCELLED'
        )
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
  },

  methods: {
    toggleActiveItems(item) {
      this.toggleActive[item] = !this.toggleActive[item]
      this.$forceUpdate()
    },

    toggleClosedItems(item) {
      this.toggleClosed[item] = !this.toggleClosed[item]
      this.$forceUpdate()
    },
  },
}
</script>

<style scoped>
.body-primary {
  background-color: #eef5ee;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 125px;
  z-index: 20;
  overflow-y: auto;
  padding-bottom: 70px;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
  margin-top: 20px;
}

::v-deep .profile_tabs .nav-tabs {
  margin: 22px 0;
  border-bottom: 2px solid rgba(254, 143, 10, 0.4);
}

::v-deep .profile_tabs .nav-tabs .nav-item {
  width: 50%;
}

::v-deep .profile_tabs .nav-tabs .nav-item:last-child {
  text-align: right;
}

::v-deep .profile_tabs .nav-tabs .nav-link {
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.8px;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
}

::v-deep .profile_tabs .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-bottom: 2px solid #fe8f0a !important;
  color: #000000;
}

::v-deep .profile_tabs .nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus {
  border-color: transparent;
}

::v-deep .profile_tabs .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-color: transparent;
}

.orderCard {
  border-radius: 7px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  padding: 26px 20px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
}

.orderRoundName {
  margin-bottom: 12px;
}

.badgeBox {
  margin-bottom: -6px;
  margin-top: 3px;
}
.paymentStatusBadge {
  color: #fe8f0a;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 13px;
  background-color: rgba(254, 143, 10, 0.13);
  margin-bottom: -12px;
}

.itemImage {
  width: 97px;
  height: 93px;
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
.orderDetailsTitle {
  margin-bottom: 3px;
}

.orderImgBanner {
  height: 59px;
  width: 64px;
  margin-bottom: 15px;
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
