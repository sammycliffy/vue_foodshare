<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex justify-content-between generalHomeHost">
        <div class="generalHome">
          <h5 class="text_semiBold mb-8px">Good to see you&comma; 😊</h5>
          <!-- <p class="mb-0">What will you like to do?</p> -->
        </div>
        <div class="d-flex align-items-center"></div>
      </div>

      <div class="sharingRoundCarouselHost">
        <no-ssr>
          <carousel
            v-if="fetchedImages.length > 0"
            :responsive="{
              0: { items: 1, nav: false },
              600: { items: 1, nav: false },
              1000: { items: 1, nav: false },
              1200: { items: 1, nav: false },
            }"
            :autoplay="true"
            :nav="false"
          >
            <div v-for="img in fetchedImages" :key="img.id" class="gHImgHost">
              <div
                class="gHImg"
                :style="{ 'background-image': 'url(' + img.url + ')' }"
              ></div>
            </div>
          </carousel>
        </no-ssr>
      </div>

      <nav>
        <b-input-group class="searchBarDiv bg-transparent poppins mt-2 mb-4">
          <b-form-input
            v-model="searchInput"
            class="searchBarInput bg-transparent border-right-0 addon-left"
            placeholder="Search for Sharing Rounds"
            required
            @input="searchItem()"
            @keyup.enter="searchItem()"
          />
          <b-input-group-append @click="searchItem()">
            <b-input-group-text
              class="color-white input-addon bg_green border-left-0 pl-4 pr-4 addon-right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                />
              </svg>
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
      </nav>

      <div class="d-flex justify-content-between">
        <p class="text_semiBold mb-0">
          {{ searchInput ? 'Search Result' : 'Available Sharing' }}
          <span v-if="!searchInput && sharingRounds.length > 1"> Rounds</span>
          <span v-if="!searchInput && sharingRounds.length == 1"> Round</span>
        </p>
        <span v-if="numberOfPages > 1" class="showingResult"
          >showing <span v-text="currentPageNumber" /> of
          <span v-text="numberOfPages" />
        </span>
      </div>

      <div class="sharingRoundListHost">
        <nav v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </nav>

        <nav v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </nav>
        <section
          v-else-if="sharingRounds.length < 1"
          class="bg-white text-center rounded p-3 mt-3"
        >
          No sharing round at the moment
        </section>
        <section v-else class="row mx-0">
          <div
            v-for="item in sharingRounds"
            :key="item.id"
            class="col-12 col-md-6 col-lg-6 py-2 px-1"
            @click="$router.push(`/r/${item.sharerId}/${item.id}/#!home`)"
          >
            <div
              class="sRoundBox h-100 d-flex flex-column justify-content-between"
            >
              <p class="mb-0 text_semiBold" v-text="item.name"></p>

              <div class="d-flex justify-content-between mt-16">
                <span class="mr-4">
                  <img
                    class="sharingRoundBoxIcon1"
                    src="/assets/icons/shopping-box.svg"
                  />
                  <span class="ml-1 mini-title">
                    <span
                      >{{ item.commoditiesDetails.length }}
                      {{
                        item.commoditiesDetails.length > 1
                          ? 'commodities'
                          : 'commodity'
                      }}</span
                    >
                  </span>
                </span>
                <!-- <span class="">
                  <img
                    class="sharingRoundBoxIcon2"
                    src="/assets/icons/group-orange.svg"
                  />
                  <span class="ml-1 mini-title">
                    <span
                      >{{ item.participants.length }}
                      {{
                        item.participants.length > 1
                          ? 'Participants'
                          : 'Participant'
                      }}</span
                    >
                  </span>
                </span> -->
                <span class="text_medium mini-title">
                  <span class="d-block text_normal">
                    <span class="color-orange"
                      >{{ item.sharingAddress.lineTwo.trim() }}, </span
                    ><span class="color-black">{{
                      item.sharingAddress.state.trim()
                    }}</span>
                  </span>
                </span>
              </div>
              <div class="d-flex justify-content-between mt-1">
                <span class="text_medium color-green mini-title">
                  <span class="d-block fs-12 color-black text_normal">
                    <span class="fs-10 text_semiBold"
                      >Order Deadline&colon;</span
                    >
                    {{ item.cutOffTimeWithDay.trim() }}
                  </span>
                </span>
                <span class="text_medium color-green mini-title">
                  <span class="d-block fs-12 color-black text_normal">
                    <span class="fs-10 text_semiBold">Sharing Day&colon;</span>
                    {{ item.sharingDayWithoutTime.trim() }}
                  </span>
                </span>
                <!-- <span class="text_medium mini-title">
                  <span class="d-block text_normal">
                    <span class="color-orange"
                      >{{ item.sharingAddress.lineTwo.trim() }}, </span
                    ><span class="color-black">{{
                      item.sharingAddress.state.trim()
                    }}</span>
                  </span>
                </span> -->
              </div>
            </div>
          </div>
        </section>
        <div v-if="numberOfPages > 1">
          <div class="d-flex justify-content-around mt-24">
            <span
              v-if="currentPageNumber > 1"
              class="text_medium color-green mb-0"
              :to="`#!/${currentPageNumber - 1}`"
              @click="pagination(-1)"
            >
              &laquo; Previous
            </span>
            <span
              v-if="numberOfPages - currentPageNumber > 0"
              class="text_medium color-green mb-0 text-right"
              @click="pagination(1)"
            >
              Next &raquo;
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      middleware: 'public',
      // fetchedImages: this.$store.state.round.imagePayload,

      btnSpinner: null,
      numberOfPages: 1,
      searchInput: null,
      sharingRounds: [],
      sharingRoundsDefault: [],
    }
  },

  async fetch() {
    console.log('QA WORKS')
    // Fetch Banner images
    const BANNERURL = `/unauth/banner/images`
    await this.$axios
      .$get(BANNERURL)
      .then((res) => {
        this.fetchedImages = res.result.banners
        this.$store.commit('round/SAVE_IMAGEPAYLOAD_DATA', this.fetchedImages)
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })

    // Fetch sharer's rounds
    const URL = `/unauth/sharing-rounds/status?name=ACTIVE&size=10&page=${
      this.currentPageNumber - 1
    }`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds
        this.sharingRoundsDefault = res.result.sharingRounds
        this.numberOfPages = res.result.numberOfPages

        // this.sharingRounds.
        // str.trim()

        // Save round form data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_ROUND_DATA', this.sharingRounds)
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
      .finally(() => {
        this.$forceUpdate()
      })
  },

  computed: {
    fetchedImages: {
      get() {
        return this.$store.state.round.imagePayload
      },
      set(newValue) {
        this.$store.state.round.imagePayload = newValue
      },
    },

    currentPageNumber() {
      return this.$route.hash.replace('#!/', '') || 1
    },
  },

  watch: {
    // call again the method if the route changes
    $route: '$fetch',
  },

  methods: {
    pagination(val) {
      this.$router.push(`#!/${+this.currentPageNumber + +val}`)
    },

    searchItem() {
      const vueThis = this
      this.sharingRounds = this.sharingRoundsDefault.filter(function (element) {
        if (
          element.name.toLowerCase().includes(vueThis.searchInput.toLowerCase())
        ) {
          return element
        } else if (
          element.sharingAddress.lineTwo
            .toLowerCase()
            .includes(vueThis.searchInput.toLowerCase())
        ) {
          return element
        } else if (
          element.sharingAddress.town
            .toLowerCase()
            .includes(vueThis.searchInput.toLowerCase())
        ) {
          return element
        } else if (
          element.sharingAddress.state
            .toLowerCase()
            .includes(vueThis.searchInput.toLowerCase())
        ) {
          return element
        }
        const commoditiesDetails = element.commoditiesDetails
        const commoditiesResult = commoditiesDetails.filter(function (
          commodity
        ) {
          if (
            commodity.commodityName
              .toLowerCase()
              .includes(vueThis.searchInput.toLowerCase())
          ) {
            return element
          }
          return false
        })
        if (commoditiesResult.length > 0) {
          return commoditiesResult[0]
        }
        return false
      })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
  padding: 24px 16px 80px;
  overflow-y: scroll;
}
.generalHomeHost {
  margin: 24px 0 16px;
}

.generalHome > p {
  margin-bottom: 10px;
}

.gHImg {
  /* height: 273px; */
  height: 200px;
  background-position: inherit;
  background-size: cover;
  width: 100%;
  border-radius: 20px;
  background-repeat: no-repeat;
}

::v-deep .sharingRoundCarouselHost .owl-theme .owl-dots .owl-dot span {
  height: 7px;
  width: 7px;
  margin: 5px 3px;
  background: rgba(79, 158, 85, 0.7);
}

::v-deep .sharingRoundCarouselHost .owl-theme .owl-dots .owl-dot.active span,
.owl-theme .owl-dots .owl-dot:hover span {
  background: #4f9e55 !important;
  height: 11px;
  width: 11px;
  margin: 3px 3px;
}

.showingResult {
  color: rgba(94, 93, 93, 0.5);
  font-size: 12px;
  letter-spacing: 0.18px;
  line-height: 27px;
}

.sharingRoundListHost {
  margin: 10px 0 24px;
}

.sRoundBox {
  padding: 16px 10px 16px 10px;
  border-radius: 7px;
  background-color: #ffffff;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.05);
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

.header {
  font-size: 25px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 1.25px;
  margin: 85px auto 2px;
  color: #313131;
}

p {
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 30px;
  color: #313131;
}

.formBox {
  margin: 30px 16px;
}

.formInputGroup .input {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
  background-color: #ffffff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  height: inherit;
  border: unset;
  padding: unset;
}
.input:focus {
  box-shadow: unset;
}
.input-addon {
  margin-bottom: unset;
  font-size: inherit;
  font-weight: inherit;
  font-size: inherit;
  line-height: inherit;
  color: #000000;
  background-color: #ffffff;
  border: unset;
  border-radius: 10px;
}

.searchBarInput::-webkit-input-placeholder {
  color: #ababab !important;
}
.searchBarInput:-ms-input-placeholder {
  color: #ababab !important;
}
.searchBarInput::placeholder {
  color: #ababab !important;
}

.btnSharer {
  background: #4f9e55;
  color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -moz-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
}
.btnSharer:active {
  background: #313131;
}

h4 {
  font-size: 20px;
  line-height: 25px;
  font-weight: bold;
  color: #000000;
}

.bold-link {
  margin-left: 7px;
  color: #070606;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.link-p {
  color: #070707;
  margin-top: 15px;
  font-size: 14px;
  line-height: 14px;
}

.primary-btn-link {
  background-color: #ffffff;
  background: unset;
  box-shadow: unset;
  color: #4f9e55;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.8px;
  cursor: pointer;
  border: unset;
  border-radius: unset;
}

@media (min-width: 768px) {
  .gHImg {
    height: 300px;
    background-position: inherit;
    background-size: cover;
  }
}
@media (min-width: 1025px) {
  .gHImg {
    height: 450px;
    background-position: inherit;
    background-size: cover;
  }
}
</style>
