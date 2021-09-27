/* eslint-disable eqeqeq */
<template>
  <div>
    <div class="scroll-overflow">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <div class="d-flex justify-content-around">
              <span class="text_semiBold"> Member’s Info</span>
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <h5 class="mb-0 text_medium">
          <span v-text="participant.name || participant.email"></span>
        </h5>
        <div class="deliveryLocate text_medium">
          <p class="mb-1">Delivery Location</p>
          <p class="mb-0" v-text="participant.deliveryLocation"></p>
        </div>
        <div class="row mx-0">
          <div class="col-7 px-0">
            <p class="mb-2">Products Selected</p>
          </div>
          <div class="col px-0">
            <p class="mb-2">Number of Slots</p>
          </div>
        </div>
        <div
          v-for="i in participant.productSelected"
          :key="i.id"
          class="row mx-0"
        >
          <div class="col-7 px-0">
            <div class="list">
              <p class="text_medium" v-text="i.name"></p>
            </div>
          </div>
          <div class="col px-0">
            <div class="list">
              <p class="text_medium" v-text="i.slots"></p>
            </div>
          </div>
        </div>
        <div class="singleSlotTotalBox">
          <p>Total Price</p>
          <h5 class="color-orange text_bold mb-0">
            NGN
            <span v-text="totalCost"></span>
          </h5>
        </div>
        <div class="mt-10 row mx-0">
          <div class="col-7 px-0">
            <div v-if="participant.paymentProof" class="paymentProveBox">
              <p>Prove of Payment</p>
              <div class="item__image">
                <img
                  :src="participant.commodityImage || '/assets/empty-photo.svg'"
                />
              </div>
              <div class="btnBox d-flex">
                <b-btn class="btn primary-btn btn-sm mr-1"> Approve </b-btn>
                <b-btn class="btn btn-transparent btn-sm ml-1"> Decline </b-btn>
              </div>
            </div>
            <h6 class="paymentStatus">
              <span class="text_light">Payment Status&colon;</span>
              <span
                class="text_semiBold"
                v-text="participant.paymentStatus"
              ></span>
            </h6>
          </div>
          <div class="multiplySlotTotalBox col px-0">
            <p>Total Price</p>
            <h5 class="color-orange text_bold mb-0">
              NGN
              <span v-text="totalCost"></span>
            </h5>
          </div>
        </div>
      </div>

      <partials-sharer-footer-bar />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // fetch stuff from vuex
      sharingRound: this.$store.state.round.data,

      totalCost: 5000,

      participant: {
        id: null,
        name: null,
        paymentStatus: null,
        paymentProof: null,
        deliveryLocation: null,
        productSelected: [],
      },
    }
  },

  mounted() {
    const commodityId = this.$route.params.commodityId
    const participantId = this.$route.params.participantId

    // grab the Array item which matchs the id "2"
    this.commodity = this.sharingRound.commoditiesDetails.find(
      // eslint-disable-next-line eqeqeq
      (commodity) => commodity.id == commodityId
    )

    this.participant = this.commodity.participants.find(
      // eslint-disable-next-line eqeqeq
      (participant) => participant.id == participantId
    )
  },

  methods: {},
}
</script>

<style scoped>
.body-primary {
  background-color: #eef5ee;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 90px;
  z-index: 20;
  overflow-y: auto;
  padding: 39px 18px 80px;
}
.header-overlay > .overlay-bg {
  height: 105px;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  margin-top: 25px;
  position: relative;
}

.deliveryLocate {
  margin: 20px 0 23px;
}

.list p {
  margin-bottom: 15px;
}
.singleSlotTotalBox h5 {
  margin-bottom: 32px;
}
.singleSlotTotalBox p {
  margin: 7px 0;
}
.multiplySlotTotalBox p {
  margin: 0 0 8px;
}
.paymentProveBox p {
  margin-bottom: 13px;
}
.paymentProveBox img {
  height: 120px;
  width: 130px;
  border-radius: 1px;
}
.mt-10 {
  margin-top: 10px;
}
.paymentStatus {
  font-size: 15px;
  line-height: 22px;
}

.btnBox {
  margin: 22px 0 32px;
}

.btn-sm {
  padding-top: 8px;
  padding-bottom: 8px;
}

.btn-transparent {
  border-color: #4f9e55;
}
</style>
