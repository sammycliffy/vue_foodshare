<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-row d-flex justify-content-between">
        <span class="back-icon color-black mt-3" @click="$router.back()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21.8"
            height="25"
            fill="currentColor"
            class="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            />
          </svg>
        </span>
        <h5 class="title">Revenue</h5>
        <span>&nbsp;</span>
      </header>
      <div class="colorBox my-3">
        <div class="d-flex justify-content-between mb-3">
          <h6 class="text_medium mb-0">Revenue</h6>
          <p class="mb-0">
            <span v-text="sharingRound.name"></span>
          </p>
        </div>
        <div class="row">
          <div class="b-line-r pl-3 pr-2 col">
            <h6 class="mb-1 text_semiBold">
              <span v-text="sharingRound.commoditiesDetails.length"></span>
            </h6>
            <p>Commodities</p>
          </div>
          <div class="b-line-r pl-3 pr-2 col">
            <h6 class="mb-1 text_semiBold">
              <span
                v-text="sharingRound.sharingRoundSummary.numberOfParticipants"
              ></span>
            </h6>
            <p>Members</p>
          </div>
          <div class="pl-3 pr-2 col">
            <h6 class="mb-1 text_semiBold color-green">
              &#8358;
              <span v-text="Intl.NumberFormat().format(totalProfit)"></span>
            </h6>
            <p>Revenue</p>
          </div>
        </div>
      </div>

      <h6 class="text_medium mt-4 mb-0">Commodity List &amp; Details</h6>
      <div v-for="item in sharingRound.commoditiesDetails" :key="item.id">
        <div class="itemBox mt-3 d-flex justify-content-between">
          <div class="">
            <p class="itemTitle mb-1">
              <span v-text="item.commodityName"></span>
            </p>
            <p class="mb-0">
              <span v-text="item.participants.length"></span>
              <span>
                {{
                  item.participants.length > 1 ? 'Participants' : 'Participant'
                }}
              </span>
            </p>
          </div>
          <div class="">
            <p class="itemTitle mb-1">
              <span>Total Qty</span>
            </p>
            <p class="mb-0">
              <span v-text="item.purchasedSlots * item.sharingUnits"></span>
              <span v-text="item.unitOfMeasurement"></span>
            </p>
          </div>
          <div class="">
            <p class="itemTitle mb-1">
              <span>Revenue</span>
            </p>
            <p class="mb-0 color-green">
              <span> &#8358; </span>
              <span
                v-text="
                  Intl.NumberFormat().format(
                    item.commodityFinancials.totalProfit
                  )
                "
              ></span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      sharingRound: this.$store.state.round.data,
    }
  },

  computed: {
    totalProfit() {
      let total = 0

      this.sharingRound.commoditiesDetails.forEach((element) => {
        total += element.commodityFinancials.totalProfit
        console.log(total)
      })

      return total
    },

    // totalProfit() {
    //   let total = 0

    //   this.sharingRound.commoditiesDetails.forEach((element) => {
    //     total +=
    //       element.profit * (element.numberOfSlots - element.remainingSlots)
    //   })

    //   return total
    // },

    // totalMembers() {
    //   let total = 0

    //   this.sharingRound.commoditiesDetails.forEach((element) => {
    //     total += element.participants.length
    //   })

    //   return total
    // },
  },

  methods: {},
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #ffffff;
  color: #000000;
  padding: 20px 18px 80px;
}

.colorBox {
  padding: 15px 10px 10px;
  background-color: rgba(79, 158, 85, 0.05);
  border-radius: 4px;
  box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -webkit-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -moz-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
}
.b-line-r {
  border-right: 1px solid rgba(151, 151, 151, 0.2);
}
.itemBox {
  padding: 18px 10px 22px;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -webkit-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -moz-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
}
.itemTitle {
  font-size: 15px;
  line-height: 23px;
  font-weight: 700;
  color: #000000;
}
p {
  font-size: 14px;
  line-height: 21px;
}
</style>
