<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <span class="">
              Hey, <span v-text="USER ? USER.firstName : ''" />
            </span>
          </div>
        </div>
        <div class="statisticsBox row">
          <div class="text-center col">
            <span class="d-block statisticsNumber">
              <b-skeleton v-if="$fetchState.pending"></b-skeleton>
              <span
                v-else
                v-text="
                  Intl.NumberFormat().format(sharerDetails.members.length)
                "
              />
            </span>
            <span class="d-block statisticsName">Members</span>
          </div>
          <div class="text-center middleStatisticsInner col">
            <span class="d-block statisticsNumber">
              <b-skeleton v-if="$fetchState.pending"></b-skeleton>
              <span v-else v-text="totalReviews" />
            </span>
            <span class="d-block statisticsName">Reviews</span>
          </div>
          <div class="text-center col">
            <span class="d-block statisticsNumber">
              <b-skeleton v-if="$fetchState.pending"></b-skeleton>
              <span
                v-else
                v-text="
                  sharingRounds.filter((x) => x.commoditiesDetails.closed)
                    .length
                "
              />
            </span>
            <span class="d-block statisticsName">Completed Rounds</span>
          </div>
        </div>
      </div>
      <div class="body-primary mt-2">
        <div class="">
          <div class="d-flex justify-content-between">
            <span class="dashboard-title">Active Round</span>
            <nuxt-link to="/sharer/dashboard/rounds/" class="text-link">
              <span>View Rounds</span>
            </nuxt-link>
          </div>
        </div>

        <nav v-if="$fetchState.pending" class="sharingRoundListBox">
          <partials-skeleton-loader />
        </nav>

        <section v-else>
          <div v-if="sharingRoundsActive.length > 0">
            <round-list-item
              sharable
              editable
              clickable
              :sharing-rounds="sharingRoundsActive"
            />
          </div>
          <div v-else class="bg-white p-3 text-center rounded my-3">
            No Active Round
          </div>
        </section>

        <div class="mt-4">
          <b-dropdown
            id="dropdown-left"
            text="Income Chart"
            class="textBtnDropdown"
          >
            <b-dropdown-item href="#">Commodity</b-dropdown-item>
            <b-dropdown-item href="#">Monthly</b-dropdown-item>
            <b-dropdown-item href="#">Spread Sheet View</b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="chartBox">
          <bar-chart
            :data="barChartData"
            :options="barChartOptions"
            :height="244"
          />
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
      USER: this.$store.state.auth.userData,
      sharerDetails: null,

      publishLink: '#',
      totalReviews: 0,

      sharingRounds: [],
      sharingRoundsActive: [],

      barChartData: {
        labels: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        datasets: [
          {
            label: 'purchase',
            data: [24, 57, 23, 68, 72, 25, 64, 133, 143, 165, 33, 56],
            backgroundColor: '#4f9e55',
          },
          {
            label: 'failed purchase',
            data: [40, 15, 20, 30, 20, 50, 55, 70, 34, 45, 11, 45],
            backgroundColor: '#fe8f0a',
          },
        ],
      },
      barChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: '#070606',
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
      },
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    let URL = `/services/sharing-groups/${this.USER.id}`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.sharerDetails = response.result
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
      })

    // Fetch sharer's rounds
    URL = `/services/sharing-rounds/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds
        this.sharingRoundsActive = this.sharingRounds.filter(
          (element) => element.status === 'ACTIVE'
        )
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })

    // Fetch sharer's review
    URL = `/services/reviews/sharer/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.totalReviews = res.result.reviews.length
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
  padding: 0 18px 80px;
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
  border: 1px solid #ececec;
  background-color: rgba(255, 255, 255, 0.99);
  box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 1px 7px 10px 0 rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  min-height: 80px;
  z-index: 20;
  position: relative;
  margin: 27px 18px 10px;
}
.middleStatisticsInner {
  border-right: 1px solid rgba(236, 236, 236, 1);
  border-left: 1px solid rgba(236, 236, 236, 1);
}

.statisticsBox > div {
  padding: 13px 8px 7px;
}
.statisticsNumber {
  color: #fe8f0a;
  font-size: 20px;
  line-height: 30px;
  font-weight: 600;
  margin-bottom: 4px;
}
.statisticsName {
  font-size: 11px;
  line-height: 17px;
  color: #000000;
}

.dashboard-title {
  font-size: 15px;
  line-height: 23px;
  color: #000000;
}

.text-link {
  font-size: 12px;
  line-height: 18px;
  color: #000000;
  font-weight: 600;
}

.mini-title {
  font-size: 14px;
  line-height: 22px;
}
.chartBox {
  box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -webkit-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  -moz-box-shadow: 4px 4px 16px 0 rgba(225, 225, 225, 0.5);
  margin: 12px 0 15px;
  padding: 11px 5px 30px;
  background-color: #ffffff;
}

::v-deep .textBtnDropdown .dropdown-toggle {
  background: transparent;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #000000;
  border: unset;
  box-shadow: unset;
  margin-top: 20px;
  padding: unset;
}

::v-deep .textBtnDropdown .dropdown-toggle:active {
  background: transparent;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  color: #000000;
  border: unset;
  box-shadow: unset !important;
  padding: unset;
}
::v-deep .textBtnDropdown .btn-group.show .dropdown-toggle {
  box-shadow: unset;
}

::v-deep .textBtnDropdown .dropdown-menu {
  font-size: 12px;
  line-height: 18px;
}

@media (max-width: 330px) {
  .statisticsBox {
    margin: 32px 18px 10px;
  }
}
</style>
