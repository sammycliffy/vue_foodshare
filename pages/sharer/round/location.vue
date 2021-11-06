<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-between">
            <partials-back-nav-button />
            <div class="div">
              <span class="backGreenTitle">
                {{ sharingRound.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-center form-filling">
          <img src="/assets/icons/form-2.svg" />
        </div>
      </header>
      <!-- v-text="
            new Date(sharingRound.effectivity.endTime)
              .toLocaleString()
              .split(',')[0]
          " -->
      <div class="px-16">
        <p class="mb-1">Sharing day</p>
        <p class="mb-0 color-green text_semiBold" v-text="convertedDay"></p>
      </div>
      <div class="mapBox my-24">
        <img src="/assets/map.png" alt="default map" />
      </div>

      <section>
        <section v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </section>

        <section v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </section>

        <section v-else class="px-16">
          <div class="row mx-0">
            <div class="col-7 pl-0">
              <span><i class="fas fa-map-marker-alt color-green"></i></span>
              <span class="locationQuestion text_medium ml-1"
                >Default Location?</span
              >
            </div>
            <div class="col-5 px-0">
              <b-form-group>
                <b-form-radio-group
                  id="sharingLocation"
                  v-model="sameLocationQuery"
                  class="radioBtns"
                >
                  <b-form-radio value="YES">Yes</b-form-radio>
                  <b-form-radio value="NO">No</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </div>
          </div>

          <div v-if="sameLocationQuery === 'YES'" class="mt-32">
            <div class="createFormInput defaultNameBox">
              {{ defaultSharingAddress.lineOne }}
            </div>
            <div class="createFormInput defaultNameBox mt-20">
              {{ defaultSharingAddress.lineTwo }}
            </div>
            <div class="createFormInput defaultNameBox mt-20">
              {{ defaultSharingAddress.town }}
            </div>
            <div class="createFormInput defaultNameBox mt-20">
              {{ defaultSharingAddress.state }}
            </div>
          </div>
          <div v-else class="mt-32">
            <p class="mb-20">Enter Address</p>
            <b-form-input
              v-model.trim="sharingRound.sharingAddress.lineOne"
              class="formInputGroup"
              placeholder="Contact address"
              required
            />
            <b-form-input
              v-model.trim="sharingRound.sharingAddress.lineTwo"
              class="formInputGroup"
              placeholder="Area"
              required
            />
            <b-container>
              <b-row align-h="between">
                <b-col xs="6" class="input-l-seperator input-col">
                  <b-form-input
                    v-model.trim="sharingRound.sharingAddress.town"
                    class="formInputGroup"
                    placeholder="Town"
                    required
                  />
                </b-col>
                <b-col xs="6" class="input-r-seperator input-col">
                  <b-form-select
                    v-model.trim="sharingRound.sharingAddress.state"
                    class="formInputGroup"
                    :options="stateOptions"
                    placeholder="State"
                    required
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </section>
      </section>

      <div class="text-center my-24">
        <b-btn
          v-if="recreateHash"
          class="btn primary-btn"
          @click="recreateRound"
        >
          Recreate Round
        </b-btn>
        <b-btn v-else class="btn primary-btn" @click="addCommodities">
          Add Commodity
        </b-btn>
      </div>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      // fetch stuff from vuex
      sharingRound: this.$store.state.round.data,
      accessToken: this.$store.state.auth.accessToken,
      USER: this.$store.state.auth.userData,
      convertedDay: null,
      spinner: false,
      sameLocationQuery: 'YES',
      defaultSharingAddress: {},
      recreateHash: this.$route.hash,

      stateOptions: [
        { value: null, text: 'Select state', disabled: true },
        'FCT - Abuja',
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara',
      ],
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    const URL = `/services/sharing-groups/${this.USER.id}`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.defaultSharingAddress = response.result.address
        this.sharingRound.sharingAddress = { ...this.defaultSharingAddress }

        this.$forceUpdate()
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
      })
  },
  mounted() {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = [
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
    ]

    const convertSharingDate = new Date(this.sharingRound.effectivity.endTime)
    this.convertedDay = `${
      days[convertSharingDate.getDay()]
    } ${convertSharingDate.getDate()} ${
      months[convertSharingDate.getMonth()]
    }, ${convertSharingDate.getFullYear()}`
  },
  methods: {
    addCommodities() {
      if (
        this.sameLocationQuery === 'YES' ||
        (this.sharingRound.sharingAddress.lineOne &&
          this.sharingRound.sharingAddress.lineTwo &&
          this.sharingRound.sharingAddress.town &&
          this.sharingRound.sharingAddress.state)
      ) {
        if (this.sameLocationQuery === 'YES') {
          const { currentAddressId } = this.sharingRound.sharingAddress
          this.sharingRound.sharingAddress = { currentAddressId }
        } else {
          this.sharingRound.sharingAddress.currentAddressId = ''
        }

        // Save round form data to a perstisted Vuex store
        this.$store.commit('round/SAVE_ROUND_DATA', this.sharingRound)
        //  Redirect
        this.$router.push('/sharer/round/commodities/add/')
      } else {
        // Display  error toast notification
        this.$bvToast.toast('All Fields Are Required!', {
          title: 'Error!',
          variant: 'warning',
          solid: true,
        })
      }
    },
    async recreateRound() {
      this.spinner = true
      const URI = `/services/sharing-rounds/${this.USER.id}`
      await this.$axios
        .$post(URI, this.sharingRound)
        .then((res) => {
          // Display Sucess toast notification
          this.$bvToast.toast(`Round Successfully Recreated`, {
            title: 'Success!',
            variant: 'success',
            solid: true,
          })

          // Save round form data to a perstisted Vuex store
          this.$store.commit('round/SAVE_PAYLOAD_DATA', res.result)
          this.$store.commit('round/RESET_RECREATE_DATA')
          this.$store.commit('round/RESET_ROUND_DATA')

          // Redirect to the Preview page
          this.$router.replace('/sharer/round/commodities/preview/')
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Re-log users in upon session expiration
            this.REFRESH_TOKEN(this.accessToken)
          } else {
            // Display Toast Notifications
            this.ERROR_HANDLER(error)
          }
        })
        .finally(() => {
          // Close the loader
          this.spinner = false
        })
    },
  },
}
</script>

<style scoped>
.mapBox img {
  width: 100%;
  height: 185px;
}
.px-16 {
  padding-left: 16px;
  padding-right: 16px;
}

.locationQuestion {
  font-size: 16px;
  line-height: 22px;
}

.radioBtns .custom-control-inline {
  margin-right: 5px;
}

.defaultNameBox {
  background-color: rgba(79, 158, 85, 0.3);
  border-color: transparent;
  padding: 15px;
  font-size: 14px;
  line-height: 22px;
}

.defaultNameBox span {
  color: #070606;
  opacity: 60%;
}

.formInputGroup {
  font-size: 14px;
  line-height: 22px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  color: #000000;
  border-radius: 10px;
  margin-bottom: 20px;
  height: 50px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
}

b-form-input::-webkit-input-placeholder {
  /* Edge */
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input::placeholder {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
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

.input-l-seperator {
  padding-right: 6.5px !important;
}

.input-r-seperator {
  padding-left: 6.5px !important;
}
.input-col {
  padding-left: unset;
  padding-right: unset;
}
</style>
