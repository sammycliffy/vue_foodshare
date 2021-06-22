<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <h5 class="title mb-0 mt-0 color-white">Reviews</h5>
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
          <p class="mb-0">Sharing round</p>
          <div class="mt-20">
            <v-select
              v-model="selectedRound"
              class="selectVCustom"
              placeholder="Name of sharing round"
              :clearable="false"
              :options="sharingRounds"
              label="name"
              @input="roundSelected()"
            ></v-select>
          </div>
          <div class="reviewsDeck">
            <template v-if="reviews.length">
              <article
                v-for="review in reviews"
                :key="review.id"
                class="reviewContent d-flex justify-content-around"
              >
                <div class="">
                  <img
                    v-if="review.imgSrc"
                    :src="review.imgSrc"
                    class="rounded-circle userImg"
                  />
                </div>
                <div class="reviewLeftPanel">
                  <p class="text_medium mb-8px">
                    <span v-text="review.participantName"></span>
                  </p>
                  <b-form-rating
                    v-model="review.stars"
                    no-border
                    class="starsHost mb-8px"
                    color="#FE8F0A"
                    size="md"
                  ></b-form-rating>
                  <p class="mb-0 text_light" v-text="review.reviewComment"></p>
                </div></article
            ></template>

            <nav v-else-if="skeletonLoader" class="text-center">
              <partials-skeleton-loader />
            </nav>

            <article v-else class="bg-white rounded p-3 text-center">
              {{
                selectedRound ? 'No Reviews Found' : 'Select a Sharing-round'
              }}
            </article>
          </div>
        </section>
      </div>
    </div>
    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      skeletonLoader: false,

      reviews: [],
      sharingRounds: [],

      selectedRound: null,
      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // Fetch sharer's review
    const URL = `/services/sharing-rounds/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds.filter(
          (element) => element.isClosed
        )
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
  },

  methods: {
    async roundSelected() {
      this.skeletonLoader = true
      const URL = `/services/reviews/sharingRound/${this.selectedRound.id}`
      await this.$axios
        .$get(URL, {})
        .then((res) => {
          this.reviews = res.result.reviews
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
        .finally(() => {
          this.skeletonLoader = false
        })
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
  top: 90px;
  z-index: 20;
  overflow-y: auto;
  padding: 32px 16px 80px;
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

::v-deep .selectVCustom .vs__dropdown-toggle,
::v-deep .selectVCustom .vs__dropdown-menu {
  border: 1px solid #4f9e55;
  border-radius: 5px;
  padding: 10px;
}

::v-deep .selectVCustom .vs__search::placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

::v-deep .selectVCustom .vs__clear,
::v-deep .selectVCustom .vs__open-indicator {
  fill: rgba(0, 0, 0, 0.7);
}

::v-deep .selectVCustom .vs__dropdown-option--highlight {
  background: #4f9e55;
}

.reviewsDeck {
  margin: 28px 0 30px;
}

.userImg {
  height: 45px;
  width: 45px;
}

.reviewContent {
  margin-bottom: 25px;
}
.reviewLeftPanel {
  margin-left: 13px;
}
.starsHost {
  background-color: transparent;
  box-shadow: unset;
  width: 65%;
  height: 15px;
  font-size: 15px;
  padding: unset;
}

.starsHost:first-child {
  padding-right: 0;
  justify-content: left;
}
</style>
