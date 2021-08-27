<template>
  <div class="contentBox">
    <div class="half-width">
      <header class="top-row d-flex justify-content-between">
        <partials-back-nav-button />
        <h3 class="title">Create Sharing Round</h3>
        <span>&nbsp;</span>
      </header>

      <div class="text-center form-filling">
        <img src="/assets/icons/form-1.svg" />
      </div>

      <nav v-if="$fetchState.pending" class="text-center p-5">
        <partials-skeleton-loader />
      </nav>

      <section v-else class="createFormBox mt-3">
        <label class="createFormLabel" for="sharingRoundName"
          >Default Round Name</label
        >
        <div class="defaultNameBox createFormInput">
          <span class="text_semiBold"> {{ defaultRoundName }}</span>
        </div>
        <label class="createFormLabel" for="sharingRoundName"
          >Sharing Round Name</label
        >
        <b-form-input
          v-model.trim="sharingRound.name"
          class="createFormInput"
          type="text"
          placeholder="Optional"
        />
        <client-only>
          <div class="form-group">
            <div class="form-row">
              <div class="col-6 input-l-seperator input-col">
                <div>
                  <label class="createFormLabel" for="sharingRoundDay"
                    >Order Deadline</label
                  >
                </div>

                <b-form-datepicker
                  id="example-datepicker-1               "
                  v-model="sharingRound.effectivity.cutOffTime"
                  placeholder="Order Deadline"
                  class="noBoxShadow createFormInput form-control"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  :min="new Date()"
                  locale="en"
                />
                <!-- <v-calendar
                  v-model="sharingRound.effectivity.cutOffTime"
                  :min-date="new Date()"
                  model-config="iso"
                  color="green"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <input
                      class="createFormInput form-control"
                      :value="inputValue"
                      placeholder="Order Deadline"
                      v-on="inputEvents"
                    />
                  </template>
                </v-calendar> -->
              </div>

              <div class="col-6 input-r-seperator input-col">
                <div>
                  <label class="createFormLabel" for="sharingRoundDay"
                    >Sharing Day</label
                  >
                </div>

                <b-form-datepicker
                  id="example-datepicker-2"
                  v-model="sharingRound.effectivity.endTime"
                  placeholder="Sharing day"
                  class="noBoxShadow createFormInput form-control mb-3"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                    weekday: 'short',
                  }"
                  :min="
                    new Date(
                      new Date(sharingRound.effectivity.cutOffTime).getTime() +
                        86400000
                    )
                  "
                  locale="en"
                />

                <!-- <v-date-picker
                  v-model="sharingRound.effectivity.endTime"
                  :min-date="
                    new Date(
                      new Date(sharingRound.effectivity.cutOffTime).getTime() +
                        86400000
                    )
                  "
                  mask="iso"
                  mode="date"
                  color="green"
                >
                  <template #default="{ inputValue, inputEvents }">
                    <input
                      class="createFormInput form-control mb-3"
                      :value="inputValue"
                      placeholder="Sharing day"
                      v-on="inputEvents"
                    />
                  </template>
                </v-date-picker> -->
              </div>
            </div>
          </div>
        </client-only>

        <div class="form-group">
          <label class="createFormLabel" for="waitingWindow">
            Waiting window for reservation
          </label>
          <b-input-group class="formInputGroup">
            <b-form-input
              v-model.trim="sharingRound.waitingTime"
              class="createFormInput"
              type="number"
              max="60"
              min="5"
              placeholder="Enter waiting time"
              required
            />
            <b-input-group-append>
              <b-input-group-text
                class="input-addon bg-white createFormInput-r-addon"
              >
                <span>Minutes</span>
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="form-group">
          <label class="createFormLabel" for="serviceCharge"
            >Service Charge</label
          >
          <div class="form-row">
            <div class="col-6 input-l-seperator input-col">
              <div class="form-group">
                <v-select
                  v-model="sharingRound.serviceCharge.serviceChargeType"
                  :options="serviceChargeTypes"
                  :reduce="(serviceChargeTypes) => serviceChargeTypes.option"
                  class="selectVCustom"
                  placeholder="Charge Type"
                  :clearable="false"
                  :filterable="false"
                  :required="!sharingRound.serviceCharge.serviceChargeType"
                ></v-select>
              </div>
            </div>
            <div class="col-6 input-r-seperator input-col">
              <div
                v-if="sharingRound.serviceCharge.serviceChargeType"
                class="form-group"
              >
                <input
                  v-model="sharingRound.serviceCharge.serviceChargeAmount"
                  :placeholder="
                    sharingRound.serviceCharge.serviceChargeType == 'percentage'
                      ? 'Enter percentage'
                      : 'Enter amount'
                  "
                  class="form-control createFormInput"
                  type="number"
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div class="text-center mt-5">
          <b-btn class="btn primary-btn padded-btn" @click="moveToLocationPage">
            <!-- <b-btn
            class="btn primary-btn padded-btn"
            @click="$router.replace('/sharer/round/wrongtester/')"
          > -->
            Continue
          </b-btn>
        </div>
      </section>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      USER: this.$store.state.auth.userData,
      defaultRoundName: null,
      sharingGroupDetails: null,
      serviceChareTypeSelected: '',
      serviceChargeTypes: [
        { label: 'Flat Rate', option: 'flatrate' },
        { label: 'Percentage', option: 'percentage' },
      ],

      // request payload data & form template
      sharingRound: {
        name: null,
        serviceCharge: {
          serviceChargeAmount: null,
          serviceChargeType: null,
        },
        effectivity: {
          cutOffTime: null,
          endTime: null,
        },
        waitingTime: null,
        waitingTimeUnit: 'minutes',
        commodities: [
          {
            commodityName: null,
            costPrice: null,
            sharingPrice: null,
            numberOfSlots: null,
            marketPrice: null,
          },
        ],
        sharingAddress: {
          country: null,
          currentAddressId: 0,
          lineOne: null,
          lineTwo: null,
          state: null,
          town: null,
        },
      },
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    const URL = `/services/sharing-groups/${this.USER.id}`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.sharingGroupDetails = response.result
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
      })

    // check if round name exist and covert default-name
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    let today = new Date()

    today = `${days[today.getDay()]} ${today.getDate()} ${
      months[today.getMonth()]
    } ${today.getFullYear()}`

    this.defaultRoundName = `${this.sharingGroupDetails.groupName}, ${today}`
    // if(this.sharingRound.effectivity.endTime){
    //   this.defaultRoundName = `${this.sharingGroupDetails.groupName}, ${this.sharingRound.effectivity.endTime}`
    // }

    // console.log(this.defaultRoundName)

    const URI = `/services/sharing-rounds/${this.USER.id}/${this.defaultRoundName}`
    await this.$axios
      .$get(URI, {})
      .then(() => {
        const twoDigits = Math.random().toString().substr(2, 2)
        this.defaultRoundName += '-' + twoDigits
      })
      .catch((e) => {
        //
      })
      .finally(() => {
        // Close the loader
        this.sharingRound.name = this.defaultRoundName
        // Reset round form data to a perstisted Vuex store
        this.$store.commit('round/SAVE_ROUND_DATA', this.sharingRound)
      })
  },

  methods: {
    moveToLocationPage() {
      if (
        this.sharingRound.name &&
        this.sharingRound.serviceCharge.serviceChargeAmount &&
        this.sharingRound.serviceCharge.serviceChargeType &&
        this.sharingRound.effectivity.cutOffTime &&
        this.sharingRound.effectivity.endTime &&
        this.sharingRound.waitingTime > 0 &&
        this.sharingRound.waitingTimeUnit
      ) {
        if (
          this.sharingRound.waitingTime < 5 ||
          this.sharingRound.waitingTime > 60
        ) {
          this.$bvToast.toast(
            'Enter a valid waiting time, from 5 to 60 minutes.',
            {
              title: 'Wrong waiting Time!',
              variant: 'warning',
              solid: true,
            }
          )
        } else {
          let oldDate = this.sharingRound.effectivity.cutOffTime.replaceAll(
            '-',
            '/'
          )
          this.sharingRound.effectivity.cutOffTime = new Date(
            +new Date(`${oldDate} UTC`)
          )
            .toISOString()
            .split('.')[0]

          oldDate = this.sharingRound.effectivity.endTime.replaceAll('-', '/')
          this.sharingRound.effectivity.endTime = new Date(
            +new Date(`${oldDate} UTC`)
          )
            .toISOString()
            .split('.')[0]

          // Save round form data to a perstisted Vuex store
          this.$store.commit('round/SAVE_ROUND_DATA', this.sharingRound)
          //  Redirect
          this.$router.replace('/sharer/round/location/')
        }
      } else {
        // Display  error toast notification
        this.$bvToast.toast('All Fields Are Required!', {
          title: 'Error!',
          variant: 'warning',
          solid: true,
        })
      }
    },
    // gotoNext() {
    //   this.$router.push('/sharer/round/location/')
    // },
  },
}
</script>

<style scoped>
.contentBox {
  background-color: #eef5ee;
}
::-webkit-input-placeholder {
  /* Edge */
  font-size: 14px;
  line-height: 22px;
  color: #9fa2b1;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
  margin: 15px;
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 14px;
  line-height: 22px;
  color: #9fa2b1;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
  margin: 15px;
}

::placeholder {
  font-size: 14px;
  line-height: 22px;
  color: #9fa2b1;
  margin: 15px;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

::v-deep .b-form-btn-label-control.form-control > label {
  font-size: 14px;
  line-height: 22px;
  color: #495057;
  margin: 15px;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
  padding: unset;
  min-height: unset;
  box-shadow: unset;
}

::v-deep .b-form-btn-label-control.form-control > .btn {
  display: none;
}

::v-deep .b-form-btn-label-control .form-control {
  height: unset;
}

::v-deep .selectVCustom .vs__dropdown-toggle,
::v-deep .selectVCustom .vs__dropdown-menu {
  border: 1px solid #4f9e55;
  border-radius: 10px;
  padding: 7px 3px;
  min-height: 50px;
  background-color: #ffffff;
}

::v-deep .selectVCustom .vs__search::placeholder {
  font-size: 14px;
  line-height: 22px;
  color: #9fa2b1;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

.defaultNameBox {
  color: #4f9e55;
  background-color: #d2e7d4;
  border-color: transparent;
  padding: 15px;
  min-height: 50px;
  height: unset;
}

::v-deep .selectVCustom .vs__clear,
::v-deep .selectVCustom .vs__open-indicator {
  fill: #9fa2b1;
}

::v-deep .selectVCustom .vs__dropdown-option--highlight {
  background: #4f9e55;
}
</style>
