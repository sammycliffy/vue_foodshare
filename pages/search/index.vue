<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex">
        <partials-back-nav-button />
        <h6 class="mb-0 mt-1">Search</h6>
      </div>

      <div>
        <div v-if="sharingRound.length < 1" class="text-center p-5">
          Round Not Found!
        </div>

        <div class="scroll-overflow">
          <partials-round-search-bar />

          <div class="py-3 lead font-weight-bold">Search result</div>

          <section>
            <template v-if="searchResult.length > 0">
              <section v-for="(item, index) in searchResult" :key="item.id">
                <div
                  v-if="!cartToggle[index]"
                  class="round_commodity"
                  :class="
                    cartPayload.sharedCommodities[index] &&
                    cartPayload.sharedCommodities[index].numberOfSlots > 0
                      ? 'border border-primary'
                      : ''
                  "
                >
                  <div class="d-flex justify-content-between">
                    <div class="d-flex justify-content-around">
                      <div class="item__image">
                        <img
                          :src="item.imageUrl || '/assets/empty-photo.svg'"
                        />
                      </div>
                      <div class="ml-3 my-auto">
                        <span class="d-block item__name">{{
                          item.commodityName
                        }}</span>
                        <p
                          v-if="
                            cartPayload.sharedCommodities[index] &&
                            cartPayload.sharedCommodities[index].numberOfSlots >
                              0
                          "
                          class="mb-0 mt-2"
                        >
                          {{
                            cartPayload.sharedCommodities[index].numberOfSlots
                          }}
                          &nbsp;Selected&nbsp;
                          <span
                            v-text="
                              cartPayload.sharedCommodities[index]
                                .numberOfSlots > 1
                                ? 'slots'
                                : 'slot'
                            "
                          />
                        </p>
                        <p v-else class="mb-0 mt-2">
                          {{ item.remainingSlots }}
                          &nbsp;Available&nbsp;
                          <span
                            v-text="item.remainingSlots > 1 ? 'slots' : 'slot'"
                          />
                        </p>
                      </div>
                    </div>
                    <span
                      class="align-self-center toggle_icon text-right"
                      @click="toggleDropDown(index)"
                    >
                      <svg
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
                      </svg>
                    </span>
                  </div>
                </div>

                <div v-show="cartToggle[index]" class="round_commodity_toggle">
                  <div class="d-flex justify-content-between">
                    <h3 class="text_bold toggle_item_name">
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
                    <b-row class="my-2">
                      <b-col>
                        <div class="toggle_img_host text-center">
                          <div class="item__image">
                            <img
                              :src="item.image || '/assets/empty-photo.svg'"
                            />
                          </div>
                        </div>
                      </b-col>
                      <b-col>
                        <p class="toggle_text m-0">Sharing Price</p>
                        <span class="toggle_price text_bold d-block">
                          &#8358; {{ item.sharingPrice }}</span
                        >
                        <span class="d-block toggle_text_sub"
                          >per {{ item.sharingUnits }}
                          {{ item.unitOfMeasurement }}</span
                        >
                      </b-col>
                    </b-row>
                    <b-row class="">
                      <b-col class="input-r-seperator input-col">
                        <div class="form-group">
                          <label class="toggle_label" for="remainingSlots">
                            <span
                              >{{
                                item.remainingSlots
                              }}
                              &nbsp;Available&nbsp;</span
                            >
                            <span v-if="item.remainingSlots > 1">slots</span>
                            <span v-else>slot</span>
                          </label>
                          <input
                            v-model="cart[index]"
                            type="number"
                            min="0"
                            :max="item.remainingSlots"
                            class="form-control toggle_input"
                            :placeholder="
                              cartPayload.sharedCommodities[index]
                                ? cartPayload.sharedCommodities[index]
                                    .numberOfSlots
                                : 'Enter NO. of slots'
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
                  <hr />

                  <div v-if="item.topMarkets" class="">
                    <h6 class="toggle_text text_medium">
                      Top Open Market Prices
                    </h6>
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
                            &#8358; &nbsp;{{ market.amount }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section></template
            >

            <div v-else class="text-center px-3 py-5">
              <em class="font-weight-bold" v-text="searchInput" /> Not Found!
            </div>

            <div class="text-center">
              <b-btn
                class="btn primary-btn padded-btn"
                @click="$router.back()"
                >{{ searchResult.length > 0 ? 'continue' : 'Go Back' }}</b-btn
              >
            </div>
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
      searchInput: this.$route.hash.split('#!/')[1] || null,
      newSearchList: false,

      cart: [],
      cartToggle: [],

      // fetch stuff from vuex
      cartPayload: this.$store.state.cart.payload,
      sharingRound: this.$store.state.cart.round,

      searchResult: [],
    }
  },

  watch: {
    '$route.hash': {
      handler(v) {
        this.searchInput = v.split('#!/')[1] || null
        this.searchItem()
      },
      deep: true,
      immediate: true,
    },
  },

  methods: {
    searchItem() {
      this.searchResult = this.sharingRound.commoditiesDetails.filter(
        (element) =>
          element.commodityName
            .toLowerCase()
            .includes(this.searchInput.toLowerCase())
      )
    },

    toggleDropDown(index) {
      this.cartToggle[index] = !this.cartToggle[index]
      this.$forceUpdate()
    },

    addToCart(item, index) {
      if (this.cart[index] < 1) {
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
        }

        // toggle drop-down
        this.toggleDropDown(index)
        // Save cart data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_CART_DATA', this.cartPayload)
      } else {
        // Display warning toast notification
        this.$bvToast.toast(
          'The slot you entered more than the available slot',
          {
            title: 'Oops!',
            variant: 'warning',
            solid: true,
          }
        )
      }
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding: 30px 15px;
  background-color: #ffffff;
}

.border-right-0 {
  border-right: 0;
}
.border-left-0 {
  border-left: 0;
}

.input:focus {
  box-shadow: unset;
}
.addon-right {
  border-top-right-radius: 8px !important;
  border-bottom-right-radius: 8px !important;
}

.addon-left {
  border-top-left-radius: 8px !important;
  border-bottom-left-radius: 8px !important;
}

.joinRound_details {
  font-weight: 500;
}

.round_commodity {
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid rgba(245, 245, 245, 1);
  font-size: 15px;
  line-height: 22px;
  padding: 10px 17px;
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
  padding: 20px 17px 40px;
  margin-bottom: 25px;
  border: 1px solid rgba(183, 185, 197, 0.27);
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
  font-size: 23px;
  line-height: 22px;
  margin-top: 13px;
}

.toggle_img_host {
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.toggle_img_host > .item__image {
  height: 100px;
  width: 100px;
}
</style>
