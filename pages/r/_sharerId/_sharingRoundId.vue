<template>
  <div class="">
    <div v-if="$fetchState.pending" class="text-center p-5">
      <partials-skeleton-loader />
    </div>

    <div v-else-if="$fetchState.error" class="text-center p-5">
      Something Occured. Please, Try Again
    </div>

    <div v-else-if="sharingRound.length < 1" class="text-center p-5">
      Round Not Found!
    </div>

    <div v-else class="scroll-overflow half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-around align-items-center">
            <partials-back-nav-button v-if="USER" />
            <partials-back-nav-button v-if="hashbang === '#!home' && !USER" />
            <span>
              <img
                :src="
                  FILE_BLOB ||
                  sharingRound.groupImage ||
                  '/assets/empty-photo.svg'
                "
                class="sharerLogoDisplay mr-2"
              />
            </span>
            <span class="primary-p text_semiBold color-green"
              >{{ sharingRound.name }}
            </span>
          </div>
        </div>
        <div class="mt-3 d-flex justify-content-between">
          <p class="color-orange mb-0">
            Order deadline
            <span class="d-block color-black pr-2">
              {{ sharingRound.cutOffTimeWithDay }}
            </span>
          </p>
          <p class="color-orange mb-0">
            Sharing day
            <span class="d-block color-black">
              {{ sharingRound.endTimeWithDay }}
            </span>
          </p>
        </div>
        <div class="mt-16">
          <p class="color-orange mb-0">
            Sharing Location
            <span class="d-block color-black">
              <span>{{ sharingRound.sharingAddress.lineOne }}</span
              >&comma;
              <span v-if="sharingRound.sharingAddress.lineTwo"
                >{{ sharingRound.sharingAddress.lineTwo }} &comma;</span
              >
              <span>{{ sharingRound.sharingAddress.town }}</span
              >&comma;
              <span>{{ sharingRound.sharingAddress.state }}</span>
            </span>
          </p>
        </div>
      </div>

      <div class="body-primary">
        <section
          v-if="+new Date() > +new Date(sharingRound.endTime)"
          class="bg-white text-center rounded px-3 py-5"
        >
          Sorry, this round is not available anymore
        </section>
        <template v-else>
          <div class="d-flex justify-content-between">
            <div class="">
              <span class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="25"
                  fill="currentColor"
                  class="bi bi-basket2"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0v-2zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0v-2z"
                  />
                  <path
                    d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6H2.163z"
                  />
                </svg>
              </span>

              <span class="text-uppercase text_label">Basket</span>
            </div>
            <p class="m-0 text_bold">
              Total:&nbsp; NGN
              {{ Intl.NumberFormat().format(basketWorth) }}
            </p>
          </div>
          <partials-round-search-bar />
          <section
            v-for="(item, index) in sharingRound.commoditiesDetails"
            :key="item.id"
          >
            <div
              v-if="!cartToggle[index]"
              class="round_commodity"
              :class="
                cartPayload.sharedCommodities[index] &&
                cartPayload.sharedCommodities[index].numberOfSlots > 0
                  ? 'border-2x border-primary'
                  : ''
              "
              @click="toggleDropDown(index)"
            >
              <div class="d-flex justify-content-between">
                <div class="d-flex justify-content-around">
                  <div class="">
                    <div class="item__image">
                      <img
                        :src="item.imageUrl || '/assets/empty-photo.svg'"
                        class="commodityImg"
                      />
                    </div>
                    <div
                      v-show="item.sharingComment"
                      style="
                        width: 80px;
                        overflow: hidden;
                        text-transform: lowercase;
                      "
                      class="mt-1"
                    >
                      <p class="m-0 fs-12" v-text="item.sharingComment"></p>
                    </div>
                  </div>
                  <div class="ml-3 my-auto">
                    <span class="d-block primary-p text_semiBold">{{
                      item.commodityName
                    }}</span>
                    <p
                      v-if="
                        cartPayload.sharedCommodities[index] &&
                        cartPayload.sharedCommodities[index].numberOfSlots > 0
                      "
                      class="mb-0 mt-2"
                    >
                      {{ cartPayload.sharedCommodities[index].numberOfSlots }}
                      <span
                        v-text="
                          cartPayload.sharedCommodities[index].numberOfSlots > 1
                            ? 'slots'
                            : 'slot'
                        "
                      />
                      added
                    </p>
                    <p v-else class="mb-0 mt-2">
                      {{ item.remainingSlots }}
                      <span
                        v-text="item.remainingSlots > 1 ? 'slots' : 'slot'"
                      />
                      available
                    </p>
                    <p class="mb-0 mt-1 color-green text_medium">
                      <span
                        v-if="
                          cartPayload.sharedCommodities[index] &&
                          cartPayload.sharedCommodities[index].numberOfSlots > 0
                        "
                        >NGN
                        {{
                          Intl.NumberFormat().format(
                            item.sharingPrice *
                              cartPayload.sharedCommodities[index].numberOfSlots
                          )
                        }}
                      </span>
                      <span v-else>
                        NGN
                        {{ Intl.NumberFormat().format(item.sharingPrice) }}
                        <span class="d-block toggle_text_sub">
                          <span>
                            <span v-if="item.sharingUnits == 0.25"
                              >per 1/4</span
                            >
                            <span v-if="item.sharingUnits == 0.5">
                              per 1/2</span
                            >
                            <span v-if="item.sharingUnits > 0.5"
                              >per {{ item.sharingUnits }}</span
                            >
                            {{ item.unitOfMeasurement }}
                          </span>
                        </span>
                      </span>
                    </p>
                    <p
                      v-if="
                        cartPayload.sharedCommodities[index] &&
                        cartPayload.sharedCommodities[index].numberOfSlots > 0
                      "
                      class="mb-0 mt-2"
                    >
                      <span class="color-orange text-semiBold">Edit</span>
                    </p>
                  </div>
                </div>
                <span class="align-self-center text-right">
                  <span v-if="item.remainingSlots >= 1" class="toggle_icon">
                    <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-chevron-down"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg> -->
                    <span class="">
                      <span
                        v-if="
                          cartPayload.sharedCommodities[index] &&
                          cartPayload.sharedCommodities[index].numberOfSlots > 0
                        "
                        class=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-check-lg color-green text-center"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"
                          />
                        </svg>
                        <!-- Added -->
                      </span>
                      <span v-else class="btn select-btn text_medium"
                        >Select</span
                      >
                    </span>
                  </span>
                  <span v-else class="toggle_icon color-orange">Sold Out</span>
                </span>
              </div>
              <div class="">
                <hr v-show="item.savings >= 1" class="" />
                <div
                  v-if="item.savings >= 1"
                  class="d-flex justify-content-between mb-0"
                >
                  <p class="mb-0 fs-12">Savings</p>
                  <p
                    v-if="
                      cartPayload.sharedCommodities[index] &&
                      cartPayload.sharedCommodities[index].numberOfSlots > 0
                    "
                    class="mb-0 color-orange text_semiBold fs-12"
                  >
                    NGN
                    {{
                      Intl.NumberFormat().format(
                        item.savings *
                          cartPayload.sharedCommodities[index].numberOfSlots
                      )
                    }}
                  </p>
                  <p v-else class="mb-0 color-orange text_semiBold fs-12">
                    NGN {{ Intl.NumberFormat().format(item.savings) }}
                  </p>
                </div>
                <!-- <div class=" d-flex justify-content-between">
                  <p class="mb-0 fs-12">Open Market Price</p>
                  <p class="mb-0 color-black text_semiBold fs-12">
                    NGN {{ Intl.NumberFormat().format(5000) }}
                  </p>
                </div> -->
              </div>
            </div>

            <div v-show="cartToggle[index]" class="round_commodity_toggle">
              <div class="d-flex justify-content-between">
                <h3 class="text_semiBold toggle_item_name">
                  {{ item.commodityName }}
                </h3>
                <span class="toggle_icon" @click="toggleDropDown(index)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    class="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                    />
                  </svg>
                </span>
              </div>

              <div class="">
                <b-row class="my-2 mx-0">
                  <b-col>
                    <div class="toggle_img_host text-center">
                      <div class="item__image">
                        <img
                          :src="item.imageUrl || '/assets/empty-photo.svg'"
                          class="commodityToggleImg"
                        />
                      </div>
                    </div>
                  </b-col>
                  <b-col class="">
                    <p class="toggle_text m-0">Sharing Price</p>
                    <span class="toggle_price text_bold d-block">
                      NGN
                      {{ Intl.NumberFormat().format(item.sharingPrice) }}</span
                    >
                    <span class="d-block toggle_text_sub">
                      <span v-if="item.sharingUnits == 0.25">per 1/4</span>
                      <span v-if="item.sharingUnits == 0.5"> per 1/2</span>
                      <span v-if="item.sharingUnits > 0.5"
                        >per {{ item.sharingUnits }}</span
                      >
                      {{ item.unitOfMeasurement }}
                    </span>
                  </b-col>
                </b-row>
                <b-row class="mx-0">
                  <b-col class="input-r-seperator input-col">
                    <div class="form-group">
                      <label class="toggle_label" for="remainingSlots">
                        <span>{{ item.remainingSlots }} available </span>
                        <span v-if="item.remainingSlots > 1">slots</span>
                        <span v-else>slot</span>
                      </label>
                      <input
                        v-model="cart[index]"
                        type="number"
                        :min="0"
                        :max="item.remainingSlots"
                        class="form-control toggle_input"
                        :placeholder="
                          cartPayload.sharedCommodities[index]
                            ? cartPayload.sharedCommodities[index].numberOfSlots
                            : 'Enter # of slots'
                        "
                      />
                    </div>
                  </b-col>
                  <b-col class="input-l-seperator input-col">
                    <b-btn
                      class="btn primary-btn mt-sub"
                      @click="addToCart(item, index)"
                      >Add to Basket</b-btn
                    >
                  </b-col>
                </b-row>
              </div>

              <div class="">
                <hr
                  v-show="item.savings >= 1 || item.openMarketPrices"
                  class=""
                />
                <div
                  v-if="item.savings >= 1"
                  class="d-flex justify-content-between mb-0"
                >
                  <p class="mb-0 fs-12">Savings</p>

                  <p
                    v-if="
                      cartPayload.sharedCommodities[index] &&
                      cartPayload.sharedCommodities[index].numberOfSlots > 0
                    "
                    class="mb-0 color-orange text_semiBold fs-12"
                  >
                    NGN
                    {{
                      Intl.NumberFormat().format(
                        item.savings *
                          cartPayload.sharedCommodities[index].numberOfSlots
                      )
                    }}
                  </p>
                  <p v-else class="mb-0 color-orange text_semiBold fs-12">
                    NGN {{ Intl.NumberFormat().format(item.savings) }}
                  </p>
                </div>
                <div
                  v-if="item.openMarketPrices[0]"
                  class="d-flex justify-content-between"
                >
                  <!-- <p class="mb-0 fs-12">Open Market Price</p> -->
                  <p class="mb-0 fs-12">
                    {{ item.openMarketPrices[0].marketName }} Market Price
                  </p>
                  <p class="mb-0 fs-12 color-black text_semiBold">
                    {{
                      Intl.NumberFormat().format(
                        item.openMarketPrices[0].marketPrice
                      )
                    }}
                  </p>
                </div>
              </div>
              <!-- <div v-if="item.topMarkets" class="">
                <h6 class="toggle_text text_medium">Top Open Market Prices</h6>
                <div
                  v-for="market in item.topMarkets"
                  :key="market.id"
                  class=""
                >
                  <div class="row topMarket_item_mb">
                    <div class="col-8 input-r-seperator input-col">
                      <p class="toggle_text m-0">{{ market.name }}:</p>
                    </div>
                    <div class="col-4 input-l-seperator input-col">
                      <p class="toggle_text m-0 text_bold">
                        NGN {{ Intl.NumberFormat().format(market.amount) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div> -->
            </div>
          </section>

          <div class="text-center float-div">
            <b-btn
              v-show="calculateSlot.length >= 1"
              class="btn primary-btn btn-block py-20"
              @click="
                $router.push('/cart/' + sharerId + '/' + sharingRoundId + '/')
              "
              >Checkout</b-btn
            >
            <!-- <div>{{ calculateSlot.length }}</div> -->
          </div>
        </template>
      </div>
    </div>

    <!-- <partials-footer /> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
      cartToggle: [],
      addedSlots: 0,
      calculateSlot: [],
      basketWorth: 0,
      // Hashbang from home page
      hashbang: this.$route.hash,
      // sharerLogo
      FILE_BLOB: null,

      // fetch stuff from vuex
      cartPayload: this.$store.state.cart.payload,

      sharerId: this.$route.params.sharerId,
      sharingRoundId: this.$route.params.sharingRoundId,

      sharingRound: {
        sharingRound: [],
      },

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    this.resetPayload()

    const URI = `/unauth/sharing-rounds/${this.sharerId}/sharer?sharingRoundId=${this.sharingRoundId}`
    await this.$axios
      .$get(URI, {})
      .then((res) => {
        this.sharingRound = res.result
        // Save round form data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_ROUND_DATA', res.result)
        // Reset cartPayload
        this.cartPayload.sharedCommodities = []
        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      })
      .finally(() => {
        try {
          this.cartPayload.sharedCommodities.forEach((element) => {
            element ? this.cart.push(element.numberOfSlots) : this.cart.push(0)
          })
        } catch (e) {
          // do nothing
          this.cart = [0]
        }
      })
  },

  computed: {
    totalItems() {
      let items = 0

      this.cart.forEach((item) => {
        items += item - 0
      })
      // this.cart.forEach((item) => {
      //   items += item - 0
      // })
      return items > 0
    },
  },

  methods: {
    toggleDropDown(index) {
      this.cartToggle[index] = !this.cartToggle[index]
      this.$forceUpdate()
    },

    resetPayload() {
      if (this.cartPayload.orderId) {
        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/RESET_CART_DATA')
        this.cartPayload = this.$store.state.cart.payload
      }
    },

    addToCart(item, index) {
      if (this.cart[index] < 0.25) {
        // Delete from Cart
        this.cartPayload.sharedCommodities[index] = null
        // toggle drop-down
        this.toggleDropDown(index)
        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      } else if (
        this.cart[index] <=
        this.sharingRound.commoditiesDetails[index].remainingSlots
      ) {
        this.cartPayload.sharedCommodities[index] = {
          numberOfSlots: this.cart[index],
          pricePerSlot: item.sharingPrice,
          sharedCommodityId: item.id,
          sharedCommodityName: item.commodityName,
          imageUrl: item.imageUrl,
          unitOfMeasurement: item.unitOfMeasurement,
        }

        // toggle drop-down
        this.toggleDropDown(index)

        // Counting total selected slots
        // this.addedSlots = this.cartPayload.sharedCommodities.filter(
        //     (x) => x.numberOfSlots > 0
        // )
        this.calculateSlot = this.cartPayload.sharedCommodities.map(
          (el) => el.numberOfSlots
        )

        console.log(this.calculateSlot)

        // this.addedSlots +=
        console.log('This is Items when it is higier than 1', this.addedSlots)

        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      } else {
        // Display warning toast notification
        this.$bvToast.toast('Please enter at least one slot to proceed', {
          title: 'No slot entered!',
          variant: 'warning',
          solid: true,
        })
      }
      this.calculateBasketWorth()
    },
    calculateBasketWorth() {
      let worth = 0
      try {
        this.sharingRound.commoditiesDetails.forEach((el, index) => {
          worth += this.cartPayload.sharedCommodities[index]
            ? this.cartPayload.sharedCommodities[index].numberOfSlots *
              el.sharingPrice
            : 0
        })
      } catch (e) {
        this.$router.replace(
          `/r/${this.sharingRound.sharerId}/${this.sharingRound.id}/`
        )
      } finally {
        this.basketWorth = worth
        this.$forceUpdate()
      }
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding-bottom: 0;
  background-color: transparent;
}
.body-primary {
  padding-top: 20px;
  top: 200px;
  z-index: 5;
  bottom: 0;
  min-height: 71vh;
  overflow-y: auto;
  padding-bottom: 80px;
  /* position: absolute; */
}

.top-bar {
  background-color: #ffffff;
  margin-top: unset;
  padding-top: 30px;
  scroll-padding-bottom: 19px;
}

.round_commodity {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid rgba(245, 245, 245, 1);
  font-size: 15px;
  line-height: 22px;
  padding: 10px;
  margin-bottom: 25px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.05);
}

.commodityListBox {
  padding: 30px 0 10px;
}

.item__image {
  height: 80px;
  width: 80px;
  border-radius: 20px;
}

.item__name {
  font-size: 18px;
  line-height: 22px;
  color: rgba(20, 8, 8, 0.9);
  font-weight: bolder;
  text-transform: capitalize;
}

.round_commodity_toggle {
  background-color: #ffffff;
  padding: 10px 17px;
  margin-bottom: 25px;
  border: 2px solid rgba(183, 185, 197, 0.27);
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.05);
}

.toggle_label {
  font-size: 12px;
  color: #000000;
  margin: 6px 10px;
}

.toggle_input {
  border: 1px solid #4f9e55;
  color: #000000;
  padding: 10px;
  height: 40px;
}

.toggle_input::-webkit-input-placeholder {
  /* Edge */
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
}

.toggle_input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
}

.toggle_input::placeholder {
  font-size: 12px;
  line-height: 22px;
  color: rgba(100, 100, 100, 0.81);
}

.mt-sub {
  margin-top: 30px;
  font-size: 14px;
  line-height: 7px;
  height: 40px;
}

.topMarket_item_mb {
  margin-bottom: 8px;
}

.toggle_text {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
}

.toggle_text_sub {
  font-size: 12px;
  line-height: 22px;
  color: #b7b9c5;
}

.toggle_price {
  font-size: 20px;
  line-height: 22px;
  color: #4f9e55;
  margin: 2px 0;
}

.toggle_icon > svg {
  color: #000000;
}

.toggle_item_name {
  font-size: 18px;
  line-height: 22px;
  margin-top: 13px;
}

.toggle_img_host {
  /* background-color: #fcd4d4; */
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.toggle_img_host > .item__image {
  height: 100px;
  width: 100px;
}

.float-div {
  position: fixed;
  bottom: 0;
  padding: 20px 16px;
  left: 0;
  width: 100%;
}
hr {
  margin-bottom: 5px;
  margin-top: 15px;
}
</style>
