<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-between">
            <partials-back-nav-button />
          </div>
        </div>

        <div class="item px-2 pb-4">
          <img
            class="item__image"
            :src="commodity.imageUrl || '/assets/empty-photo.svg'"
            alt="photo"
          />
          <hr />
          <span class="d-block item__title__small mt-3"> Product Name </span>
          <span class="d-block item__name mb-4">{{
            commodity.commodityName
          }}</span>

          <div class="d-flex justify-content-between mb-2">
            <div>
              <span class="d-block item__title__small">Size</span>
              <span class="d-block item__info"
                >Per {{ commodity.unitOfMeasurement }}</span
              >
            </div>
            <div class="pr-5">
              <span class="d-block item__title__small">Sharing Price</span>
              <span class="d-block item__price">
                &#8358;
                {{ Intl.NumberFormat().format(commodity.sharingPrice) }}</span
              >
            </div>
          </div>
          <div class="mb-2">
            <span class="d-block item__title__small">Number of slot</span>
            <span class="d-block item__info">{{
              commodity.numberOfSlots
            }}</span>
          </div>

          <hr />

          <span class="d-block item__title mt-2"> Open Market Price </span>

          <table class="mt-1">
            <tr class="">
              <td class="mr-2">-</td>
              <td class="table__price">&#8358;</td>
            </tr>
            <tr class="pt-1">
              <td class="mr-2">-</td>
              <td class="table__price">&#8358;</td>
            </tr>
            <tr class="pt-1">
              <td class="mr-2">-</td>
              <td class="table__price">&#8358;</td>
            </tr>
          </table>
        </div>

        <div class="d-flex flex-column align-items-center mt-4 mb-5">
          <nuxt-link to="/sharer/round/commodities/summary/">
            <button class="btn-share">Back to Summary</button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // fetch stuff from vuex
      sharingRoundPayload: this.$store.state.round.payload,
      accessToken: this.$store.state.auth.accessToken,

      commodity: {
        commodityName: null,
        categoryName: null,
        sharingUnits: null,
        sizeType: [],
        imageUrl: null,
        averagePrice: null,
        costPrice: null,
        sharingPrice: null,
        slots: null,
      },
    }
  },

  mounted() {
    const commodityId = this.$route.params.commodityId

    // grab the Array item which matchs the id "2"
    this.commodity = this.sharingRoundPayload.commoditiesDetails.find(
      // eslint-disable-next-line eqeqeq
      (item) => item.id == commodityId
    )
  },

  methods: {},
}
</script>

<style scoped>
.form-filling {
  margin-top: 23px;
}
.item {
  margin: 0;
  padding: 0;
}
.item__image {
  height: 200px;
  width: 100%;
}
.item__name {
  font-size: 18px;
  font-weight: bold;
}
.item__title {
  font-size: 16px;
  font-weight: 500;
}
.item__title__small {
  font-weight: 400;
  font-size: 13px;
}
.item__info {
  font-size: 16px;
  font-weight: 500;
}
.item__price {
  font-size: 16px;
  font-weight: 500;
  color: #fe8f0a;
}
table {
  border-collapse: collapse;
}
td {
  padding-top: 10px;
}
.table__price {
  padding-left: 50px;
}
</style>
