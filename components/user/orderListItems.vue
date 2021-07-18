<template>
  <section>
    <div v-if="orders.length < 1" class="bg-white text-center rounded p-3 mt-3">
      No Orders Found
    </div>
    <template v-else>
      <div
        v-for="(item, i) in orders"
        :key="item.orderId"
        class="orderCard mb-24"
      >
        <div class="d-flex justify-content-between">
          <p
            class="orderRoundName text_semiBold"
            v-text="item.sharingRoundName"
          ></p>
          <span
            v-if="!toggleActive[i]"
            class="toggle_icon text-right"
            @click="toggleActiveItems(i)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-down align-top icon-cusor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </span>
          <span
            v-else
            class="toggle_icon text-right"
            @click="toggleActiveItems(i)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="18"
              fill="currentColor"
              class="bi bi-chevron-down align-top icon-cusor"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
              />
            </svg>
          </span>
        </div>
        <p class="mb-0">
          Sharing day&colon;
          <!-- <span
            class="ml-1"
            v-text="new Date(item.sharingDay).toLocaleString()"
          ></span> -->
          <span class="ml-1" v-text="item.sharingDayWithDay"></span>
        </p>
        <div v-if="item.paymentComplete === false" class="text-right badgeBox">
          <span
            v-if="
              item.orderStatus === 'AWAITING_PAYMENT' ||
              item.orderStatus == 'AWAITING_PROOF_OF_PAYMENT'
            "
            class="paymentStatusBadge"
            >Payment required</span
          >
          <span
            v-if="item.orderStatus === 'AWAITING_PAYMENT_CONFIRMATION'"
            class="paymentStatusBadge"
            >Awaiting payment Confirmation</span
          >
          <span
            v-if="item.orderStatus === 'ORDER_CANCELLED'"
            class="paymentStatusBadge"
            >Cancelled</span
          >
        </div>
        <div v-if="item.paymentComplete === true" class="text-right badgeBox">
          <span v-if="item.isCollected === true" class="paymentStatusPaid"
            >Delivered</span
          >
          <span v-if="item.isCollected === false" class="paymentStatusPaid"
            >Paid</span
          >
        </div>
        <div v-if="toggleActive[i]">
          <div
            v-for="commodity in item.orderedCommodities"
            :key="commodity.sharedCommodityId"
            class="my-24"
          >
            <div class="d-flex flex-row">
              <div class="item__image">
                <img
                  :src="commodity.imageUrl || '/assets/empty-photo.svg'"
                  class="itemImage"
                />
              </div>
              <div class="ml-4 my-auto">
                <span
                  class="d-block itemName"
                  v-text="commodity.sharedCommodityName"
                ></span>
                <span class="d-block itemPrice mt-2 color-orange"
                  >&#8358;
                  {{ Intl.NumberFormat().format(commodity.totalCost) }}</span
                >
                <span class="d-block itemSlot mt-2">
                  {{ commodity.numberOfSlots }}
                  {{ commodity.numberOfSlots > 1 ? 'slots' : 'slot' }}
                </span>
              </div>
            </div>
          </div>
          <div class="">
            <div class="row">
              <div class="col-6 orderDetailsBox">
                <p class="orderDetailsTitle color-orange">Sub Total</p>
                <h5 class="text_medium">
                  &#8358;
                  <span>{{ Intl.NumberFormat().format(item.subTotal) }}</span>
                </h5>
              </div>
              <div class="col-6 orderDetailsBox">
                <p class="orderDetailsTitle color-orange">shipping Fee</p>
                <h5 class="text_medium">
                  &#8358;
                  <span>{{
                    Intl.NumberFormat().format(item.shippingFee)
                  }}</span>
                </h5>
              </div>
            </div>
            <div class="row mt-24">
              <div class="col-6 orderDetailsBox">
                <p class="orderDetailsTitle color-orange">Service Charge</p>
                <h5 class="">
                  &#8358;
                  <span>{{
                    Intl.NumberFormat().format(item.serviceCharge)
                  }}</span>
                </h5>
              </div>
              <div
                v-if="item.paymentDetails.paymentType === 'PAYSTACK'"
                class="orderDetailsBox col-6"
              >
                <p class="orderDetailsTitle color-orange">Paystack Fee</p>
                <h5 class="">
                  &#8358;
                  <span>{{
                    Intl.NumberFormat().format(item.paystackFees)
                  }}</span>
                </h5>
              </div>
              <div class="orderDetailsBox col-6">
                <p class="orderDetailsTitle color-orange">Total</p>
                <h5 class="text_medium">
                  &#8358;
                  <span v-if="item.paymentDetails.paymentType === 'PAYSTACK'">
                    {{
                      Intl.NumberFormat().format(
                        item.subTotalPlusServiceChargePlusShippingPlusPaystackfees
                      )
                    }}
                  </span>
                  <span v-else>{{
                    Intl.NumberFormat().format(
                      item.subTotalPlusServiceChargePlusShipping
                    )
                  }}</span>
                </h5>
              </div>
            </div>

            <div
              v-if="
                item.orderStatus === 'AWAITING_PAYMENT' ||
                item.orderStatus == 'AWAITING_PROOF_OF_PAYMENT'
              "
              class="text-center"
            >
              <nuxt-link :to="`/cart/payment/#!/${item.orderId}`" class="mt-3">
                <b-btn class="btn primary-btn padded-btn">Make Payment </b-btn>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  props: {
    orders: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      toggleActive: [],
      toggleClosed: [],
    }
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

<style>
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
.paymentStatusPaid {
  color: #4f9e55;
  padding: 4px 12px;
  font-size: 12px;
  line-height: 22px;
  border-radius: 13px;
  background-color: rgba(79, 158, 85, 0.13);
}
.itemImage {
  width: 97px;
  height: 93px;
  border-radius: 5px;
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
</style>
