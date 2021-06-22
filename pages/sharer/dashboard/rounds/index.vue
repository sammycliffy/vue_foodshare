<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <span class="mt_5px">Sharing Round </span>
          </div>
        </div>
      </div>

      <div class="body-primary half-width">
        <b-tabs class="profile_tabs">
          <b-tab title="Active" active>
            <div
              v-if="sharingRoundsActive && sharingRoundsActive.length < 1"
              class="text-center"
            >
              <p class="noRoundP">You Don’t have any active sharing round</p>
              <b-btn class="btn primary-btn" to="/sharer/round/create/">
                Create sharing round
              </b-btn>
            </div>
            <div v-else class="">
              <nav v-if="$fetchState.pending" class="sharingRoundListBox">
                <partials-skeleton-loader />
              </nav>
              <nav v-else-if="$fetchState.error" class="noRoundP">
                Something Occured. Please, Try Again
              </nav>
              <round-list-item
                v-else
                clickable
                sharable
                editable
                :sharing-rounds="sharingRoundsActive"
              />
            </div>
          </b-tab>

          <b-tab title="Pending">
            <div
              v-if="sharingRoundsPending && sharingRoundsPending.length < 1"
              class=""
            >
              <p class="noRoundP">You Don’t have any pending sharing round</p>
            </div>
            <div v-else class="">
              <nav v-if="$fetchState.pending" class="sharingRoundListBox">
                <partials-skeleton-loader />
              </nav>
              <nav v-else-if="$fetchState.error" class="noRoundP">
                Something Occured. Please, Try Again
              </nav>
              <round-list-item
                editable
                :sharing-rounds="sharingRoundsPending"
              />
            </div>
          </b-tab>
          <b-tab title="Closed">
            <div
              v-if="sharingRoundsClosed && sharingRoundsClosed.length < 1"
              class=""
            >
              <p class="noRoundP">You Don’t have any closed sharing round</p>
            </div>
            <div v-else class="">
              <nav v-if="$fetchState.pending" class="sharingRoundListBox">
                <partials-skeleton-loader />
              </nav>

              <nav v-else-if="$fetchState.error" class="noRoundP">
                Something Occured. Please, Try Again
              </nav>
              <round-list-item :sharing-rounds="sharingRoundsClosed" />
            </div>
          </b-tab>
        </b-tabs>
      </div>

      <partials-sharer-footer-bar />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.userData,
      sharingRoundPayload: this.$store.state.round.payload,
      linkSharingRound: this.$store.state.round.data,
      publishLink: null,

      sharingRound: null,
      sharingRounds: null,
      sharingRoundsActive: null,
      sharingRoundsPending: null,
      sharingRoundsClosed: null,
    }
  },

  async fetch() {
    // Fetch user's rounds
    const URL = `/services/sharing-rounds/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds
        this.sharingRoundsActive = this.sharingRounds.filter(
          (element) => element.status === 'ACTIVE'
        )
        this.sharingRoundsPending = this.sharingRounds.filter(
          (element) => element.status === 'PENDING'
        )
        this.sharingRoundsClosed = this.sharingRounds.filter(
          (element) => element.isClosed
        )
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
        throw error
      })
  },

  mounted() {
    const baseURL = 'https://foodsharesite.netlify.app'
    this.publishLink = `${baseURL}/r/${this.linkSharingRound.sharerId}/${this.linkSharingRound.id}/`
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
  top: 125px;
  z-index: 20;
  overflow-y: inherit;
  padding-bottom: 70px;
}

.scroll-overflow {
  position: relative;
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

::v-deep .profile_tabs .nav-tabs {
  margin: 22px 20px;
  border-bottom: 2px solid rgba(254, 143, 10, 0.4);
}

::v-deep .profile_tabs .nav-tabs .nav-item {
  width: 33%;
}

::v-deep .profile_tabs .nav-tabs .nav-link {
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.8px;
  padding: 0 30px 0 16px;
  text-align: center;
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

.profile_tabs {
  padding-bottom: 70px;
}
.noRoundP {
  font-size: 16px;
  font-weight: 600;
  line-height: 25px;
  color: #000000;
  text-align: center;
  margin: 100px 50px 16px;
}

::v-deep .iconBtnDropdown .dropdown-toggle {
  background: transparent;
  color: #fe8f0a;
  border: unset;
  box-shadow: unset;
  padding: unset;
}

::v-deep .iconBtnDropdown .dropdown-toggle:active {
  background: transparent;
  color: #fe8f0a;
  border: unset;
  box-shadow: unset !important;
  padding: unset;
}
::v-deep .iconBtnDropdown .btn-group.show .dropdown-toggle {
  box-shadow: unset;
}

::v-deep .iconBtnDropdown .dropdown-menu {
  font-size: 12px;
  letter-spacing: 0.06px;
  padding: 5px;
  color: #000000;
  border: unset;
  border-radius: unset;
}

::v-deep .iconBtnDropdown .dropdown-menu .noXpadding .dropdown-item {
  padding: 0 12px;
}

::v-deep .iconBtnDropdown .dropdown-menu .dropdown-item {
  padding: 0 14px 6px;
  color: #000000;
}

.border_bottom_1 {
  border-bottom: 1px solid #e9ecef;
}

.roundTitle {
  font-weight: 600 !important;
  font-size: 16px;
  line-height: 10px;
  letter-spacing: 0.08px;
}
.padT_10 {
  padding-top: 10px;
}

.unitOfMeasurement {
  text-transform: capitalize;
}

@media (max-width: 400px) {
  ::v-deep .profile_tabs .nav-tabs .nav-link {
    padding: 0 15px;
  }
  ::v-deep .profile_tabs .nav-tabs {
    margin: 20px 16px;
  }
}

@media (max-width: 250px) {
  ::v-deep .profile_tabs .nav-tabs {
    margin: 20px 10px;
  }
}
</style>
