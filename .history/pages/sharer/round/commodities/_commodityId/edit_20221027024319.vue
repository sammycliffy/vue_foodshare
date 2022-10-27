<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <header class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-between">
            <partials-back-nav-button />
            <div class="div">
              <span class="backGreenTitle">{{ sharingRoundPayload.name }}
              </span>
            </div>
          </div>
        </div>
        <div class="text-center form-filling">
          <img
            src="/assets/icons/form-2.svg"
            class="icon-cusor"
          />
        </div>
      </header>

      <section
        v-if="!commodity"
        class="half-width py-5 text-center"
      >
        Oops! Something Occured.
        </section>

        <section
          v-else
          class="body-primary"
        >
          <div class="form-group">
            <label
              class="createFormLabel d-flex justify-content-between"
              for="productName"
            >
              <div>Product Name</div>

              <div>
                <span
                  class="rounded-pill px-3 py-1 text-white"
                  :class="readonly ? 'bg-warning' : 'bg-primary'"
                  @click="readonly = !readonly"
                >
                  Edit
                  <i class="fas fa-pencil-alt text-white"></i>
                  </span>
              </div>
              </label>

              <v-select
                id="productName"
                v-model="commodity.commodityName"
                placeholder="Select a product"
                class="selectVCustom"
                autocomplete="off"
                :clearable="false"
                required
                disabled
              ></v-select>
          </div>

          <div class="form-row">
            <div class="col input-l-seperator input-col">
              <div class="form-group">
                <label
                  class="createFormLabel"
                  for="sharingUnits"
                >Unit</label>

                  <b-form-input
                    id="sharingUnits"
                    v-model="commodity.sharingUnits"
                    type="number"
                    class="form-control createFormInput"
                    placeholder="Enter NO. of units"
                    required
                    :readonly="!readonly"
                  />
              </div>
            </div>

            <div class="col input-r-seperator input-col">
              <div class="form-group">
                <label
                  class="createFormLabel"
                  for="productSize"
                >Measure</label>

                  <v-select
                    id="productSize"
                    v-model="commodity.unitOfMeasurement"
                    :options="unitsOfMeasurements || []"
                    placeholder="Select a product"
                    class="selectVCustom"
                    autocomplete="off"
                    :clearable="false"
                    required
                    :disabled="!readonly"
                  ></v-select>
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col input-l-seperator input-col">
              <div class="form-group">
                <label class="createFormLabel">Cost price</label>
                <input
                  v-model.number="commodity.costPrice"
                  type="number"
                  class="createFormInput form-control bold-input-value"
                  :readonly="!readonly"
                />
              </div>
            </div>

            <div class="col input-r-seperator input-col">
              <div class="form-group">
                <label class="createFormLabel">Sharing price</label>

                <input
                  v-model.number="commodity.sharingPrice"
                  type="number"
                  class="createFormInput form-control bold-input-value"
                  :readonly="!readonly"
                />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="col">
              <div class="form-group">
                <label
                  class="createFormLabel"
                  for="productSlots"
                >Number of slots</label>

                  <input
                    id="productSlots"
                    v-model.number="commodity.numberOfSlots"
                    type="number"
                    class="form-control createFormInput"
                    :readonly="!readonly"
                  />
              </div>
            </div>

            <div class="col d-none">
              <div class="form-group">
                <label class="createFormLabel">Platform average price</label>

                <div class="createFormInput secondary-background secondary-border">
                  <p class="avgPrice">{{ commodity.averagePrice }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label
              class="createFormLabel"
              for="sharingComment"
            >Sharing Comments/Description</label>
              <b-form-textarea
                id="sharingComment"
                v-model="commodity.sharingComment"
                class="form-control createFormInput"
                placeholder="Enter sharing commment"
                rows="2"
                maxlength="70"
                :readonly="!readonly"
              >
                </b-form-textarea>
          </div>

          <div class="label-margin d-none">
            <a
              class="link-button"
              @click="$bvModal.show('editTopMarketsForm')"
            >Edit Open Market Prices</a>
          </div>
          <div class="text-center mt-4">
            <b-btn
              class="btn primary-btn padded-btn"
              @click="saveCommodity"
            >Save
              <b-spinner
                v-if="spinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              /></b-btn>
          </div>
          </section>

          <b-modal
            id="editTopMarketsForm"
            size="md"
            modal-class="topMarketForm"
            hide-footer
            hide-header-close
            hide-header
          >
            <div class="form-group">
              <label
                class="createFormLabel"
                for=""
              >Select Market State</label>
                <b-form-select
                  id="marketState"
                  v-model="marketStateSelected"
                  class="createFormInput form-control"
                  :options="marketStateList"
                ></b-form-select>
            </div>
            <div
              v-if="marketStateSelected"
              class=""
            >
              <div class="form-row label-margin">
                <div class="col-7 input-l-seperator input-col">
                  <div class="form-group">
                    <b-form-select
                      v-model="topMarketOne.selected"
                      class="createFormInput form-control"
                      :options="topMarketOne.name"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-5 input-r-seperator input-col">
                  <div class="form-group">
                    <input
                      v-model="topMarketOne.price"
                      type="number"
                      class="form-control createFormInput"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row label-margin">
                <div class="col-7 input-l-seperator input-col">
                  <div class="form-group">
                    <b-form-select
                      v-model="topMarketTwo.selected"
                      class="createFormInput form-control"
                      :options="topMarketTwo.name"
                      value=""
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-5 input-r-seperator input-col">
                  <div class="form-group">
                    <input
                      v-model="topMarketTwo.price"
                      type="number"
                      class="form-control createFormInput"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
              <div class="form-row label-margin">
                <div class="col-7 input-l-seperator input-col">
                  <div class="form-group">
                    <b-form-select
                      v-model="topMarketThree.selected"
                      class="createFormInput form-control"
                      :options="topMarketThree.name"
                    ></b-form-select>
                  </div>
                </div>
                <div class="col-5 input-r-seperator input-col">
                  <div class="form-group">
                    <input
                      v-model="topMarketThree.price"
                      type="number"
                      class="form-control createFormInput"
                      placeholder="Enter price"
                    />
                  </div>
                </div>
              </div>
    </div>
    <div class="text-center mt-4">
      <b-btn class="btn primary-btn padded-btn">Add</b-btn>
    </div>
    </b-modal>

  </div>

  <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      readonly: false,
      spinner: false,

      categoriesOptions: [],
      unitsOfMeasurements: [],

      // fetch stuff from vuex
      sharingRoundPayload: this.$store.state.round.payload,
      accessToken: this.$store.state.auth.accessToken,

      commodity: {
        commodityName: null,
        categoryName: null,
        sharingUnits: null,
        sizeType: [],
        averagePrice: null,
        costPrice: null,
        sharingPrice: null,
        numberOfSlots: null,
        sharingComment: null,
      },

      marketStateSelected: null,
      marketStateList: [],

      hashbang: this.$route.hash.split('#!')[1] || null,
    }
  },

  async fetch() {
    const commodityId = this.$route.params.commodityId

    // grab the Array item which matchs the id "2"
    this.commodity = this.sharingRoundPayload.commoditiesDetails.find(
      // eslint-disable-next-line eqeqeq
      item => item.id == commodityId
    )

    const { costPrice, sharingPrice } = this.commodity.commodityFinancials
    this.commodity.costPrice = costPrice
    this.commodity.sharingPrice = sharingPrice

    const URI = `/services/measurements`
    await this.$axios
      .$get(URI, {
        params: {
          categoryName: this.commodity.categoryName,
        },
      })
      .then(res => {
        this.unitsOfMeasurements = res.result.measurements.map(
          el => el.measurementName
        )
      })
      .catch(e => {
        // Display  error toast notification
        this.$bvToast.toast('Unable To Fecth Measuring Units. Try Again!', {
          title: 'Something Occured!',
          variant: 'danger',
          solid: true,
        })
      })
      .finally(() => {
        this.$forceUpdate()
      })
  },

  methods: {
    validateFields(index) {
      if (
        this.commodity.commodityName &&
        this.commodity.costPrice &&
        this.commodity.sharingPrice &&
        this.commodity.numberOfSlots
      ) {
        console.log(this.commodity)
        return true
      } else {
        // Display  error toast notification
        this.$bvToast.toast('All Fields Are Required!', {
          title: 'Error!',
          variant: 'warning',
          solid: true,
        })

        return false
      }
    },

    async saveCommodity() {
      if (this.validateFields()) {
        this.spinner = true

        const URI = `/services/sharing-rounds/${
          this.sharingRoundPayload.sharerId
        }/${this.sharingRoundPayload.id}/commodities/${
          this.commodity.commodityName
        }`
        await this.$axios
          .$put(URI, this.commodity)
          .then(res => {
            // Display Sucess toast notification
            this.$bvToast.toast(`Round Successfully Added`, {
              title: 'Success!',
              variant: 'success',
              solid: true,
            })
            console.log(res)
            // Save round form data to a perstisted Vuex store
            this.$store.commit('round/SAVE_ROUND_DATA', res.result)

            if (this.hashbang) {
              // REdirect user to the specified URL in the #!HashBang
              this.$router.replace(this.hashbang)
            } else {
              // Redirect to the preview page
              this.$router.push('/sharer/round/commodities/preview/')
            }
          })
          .catch(error => {
            let errorList
            let errorMsg

            try {
              // Get the error as an array
              if (error.response) {
                errorList =
                  error.response.data.error.dataErrors.length > 0
                    ? error.response.data.error.dataErrors
                    : error.response.data.error.messages
              }
            } finally {
              // Set default message
              errorMsg = "Sorry, that didn't work. Please try again."
            }
            // Display Toasts
            if (errorList) {
              errorList.forEach(element => {
                this.$bvToast.toast(element.message || element, {
                  title: 'Error',
                  variant: 'danger',
                  solid: true,
                })
              })
            } else {
              // Display  error toast notification
              this.$bvToast.toast(errorMsg, {
                title: 'Error',
                variant: 'danger',
                solid: true,
              })
            }
          })
          .finally(() => {
            // Close the loader
            this.spinner = false
          })
      }
    },
  },
}
</script>

<style scoped>
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

.avgPrice {
  color: #000000;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  margin: 15px;
}

.form-filling {
  margin-top: 20px;
}

.link-button {
  cursor: pointer;
  color: #000000;
  font-size: 14px;
  line-height: 22px;
  font-weight: bold;
}

::v-deep .topMarketForm .modal-dialog {
  margin: 0;
}

::v-deep .topMarketForm .modal-body {
  padding: unset;
}

::v-deep .topMarketForm .modal-content {
  border: none;
  border-radius: 20px 20px 0 0;
  position: fixed;
  bottom: 52px;
  padding: 17px;
  overflow-y: scroll;
}

::v-deep .selectVCustom .vs__dropdown-toggle,
::v-deep .selectVCustom .vs__dropdown-menu {
  border: 1px solid #4f9e55;
  border-radius: 10px;
  padding: 7px 3px;
}

::v-deep .selectVCustom .vs__search::placeholder {
  font-size: 14px;
  line-height: 22px;
  color: #9fa2b1;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

::v-deep .selectVCustom .vs__clear,
::v-deep .selectVCustom .vs__open-indicator {
  fill: #9fa2b1;
}

::v-deep .selectVCustom .vs__dropdown-option--highlight {
  background: #4f9e55;
}
</style>
