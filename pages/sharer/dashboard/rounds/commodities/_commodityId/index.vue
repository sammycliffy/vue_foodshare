<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <div class="d-flex justify-content-around">
              <partials-back-nav-button />
              <span class="text_medium">{{ sharingRound.name }} </span>
            </div>
          </div>
          <div class="text-center">
            <div class="item__image">
              <img
                :src="commodity.imageUrl || '/assets/empty-photo.svg'"
                class="commodityToggleImg"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary half-width">
        <p class="mt-32 mb-1">Product Name</p>
        <h5 class="text_medium mb-0" v-text="commodity.commodityName"></h5>
        <div class="d-flex justify-content-between py-20">
          <div class="">
            <p class="mb-1">Size</p>
            <p class="mb-0 text_medium">
              <span v-text="commodity.sharingUnits"></span>
              <span v-text="commodity.unitOfMeasurement"></span>
            </p>
          </div>
          <div class="">
            <p class="mb-1">Sharing price</p>
            <p class="price text_semiBold color-orange mb-0">
              <span> NGN </span>
              <span
                v-text="Intl.NumberFormat().format(commodity.sharingPrice)"
              ></span>
            </p>
          </div>
        </div>
        <p class="mb-1">Number of slot</p>
        <p class="mb-0 text_medium">
          <span v-text="commodity.numberOfSlots"></span>
          <span>{{ commodity.numberOfSlots > 1 ? 'slots' : 'slot' }}</span>
        </p>
        <div v-if="commodity.topMarkets" class="top-b">
          <p class="mb-2 text_medium">Open Market Price</p>
          <div v-for="item in commodity.topMarkets" :key="item.id" class="">
            <div class="row mb-2">
              <div class="col-7">
                <p class="mb-0" v-text="item.name"></p>
              </div>
              <div class="col">
                <p class="mb-0 text_medium">
                  <span>NGN</span>
                  <span v-text="Intl.NumberFormat().format(item.amount)"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="top-b">
          <h5 class="mb-2 color-orange text_medium">Members</h5>
          <div
            v-for="item in commodity.participants"
            :key="item.id"
            class="d-flex justify-content-between align-items-center plain-link color-black mb-3 rounded p-3"
          >
            <div class="d-flex align-items-center">
              <div>
                <img
                  :src="item.imageUrl || '/assets/empty-photo.svg'"
                  class="rounded-circle participantImage"
                />
              </div>
              <span class="participantName">
                <span v-text="`${item.firstName} ${item.lastName}`"></span>
              </span>
            </div>
            <div>
              <span class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="22"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </div>
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
      sharingRound: this.$store.state.round.data,

      commodity: {
        id: null,
        name: null,
        imageUrl: null,
        slots: null,
        sharingPrice: null,
        unitOfMeasurement: null,
        unitSize: null,
        participants: [],
        topMarkets: [],
      },

      participant: {
        id: 1,
        name: null,
        imageUrl: null,
        productSelected: null,
      },
    }
  },

  mounted() {
    const commodityId = this.$route.params.commodityId
    // grab the Array item which matchs the commodityId
    this.commodity = this.sharingRound.commoditiesDetails.find(
      // eslint-disable-next-line eqeqeq
      (item) => item.id == commodityId
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
  top: 210px;
  z-index: 20;
  padding-bottom: 100px;
  overflow-y: auto;
}
.header-overlay {
  height: 240px;
}

.header-overlay > .overlay-bg {
  height: 240px;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}
.mt_5px {
  font-size: 18px;
  line-height: 36px;
  font-weight: bold;
}

.item__image {
  height: 100px;
}

.top-b {
  border-top: 1px solid #ccc;
  padding-top: 20px;
  margin-top: 20px;
}

.participantImage {
  width: 45px;
  height: 45px;
}

.participantName {
  font-size: 15px;
  line-height: 22px;
  margin-left: 13px;
}
</style>
