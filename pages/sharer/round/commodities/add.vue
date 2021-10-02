<template>
  <div class="scroll-overflow">
    <div class="">
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

      <div class="text-center mb-3">
        <b-button variant="primary" size="sm">
          Commodities
          <b-badge variant="secondary" class="mx-2">{{
            commoditiesLength + 1
          }}</b-badge>
        </b-button>
      </div>

      <b-form v-if="sharingRound.commodities" class="body-primary half-width">
        <div class="form-group">
          <label class="createFormLabel" for="productCategory">Category</label>
          <v-select
            v-model="sharingRound.commodities[commoditiesLength].category"
            class="selectVCustom"
            label="categoryName"
            placeholder="Select product category"
            :clearable="false"
            :filterable="true"
            :options="categoriesOptions || []"
            @input="selectedCategory(commoditiesLength)"
          ></v-select>
        </div>

        <div
          v-if="sharingRound.commodities[commoditiesLength].category"
          class="form-group"
        >
          <label class="createFormLabel" for="productName">Product Name</label>

          <div class="form-group">
            <v-select
              id="selecedProductCommodity"
              v-model="
                sharingRound.commodities[commoditiesLength].commodityName
              "
              :options="commoditiesArr[commoditiesLength].name || []"
              :disable="!commoditiesArr[commoditiesLength].name"
              placeholder="Select a product"
              class="selectVCustom"
              autocomplete="off"
              :clearable="false"
              :filterable="true"
              required
              @input="selectedProductName(commoditiesLength)"
            ></v-select>
          </div>
        </div>

        <div class="form-row">
          <div class="col input-l-seperator input-col">
            <div class="form-group">
              <label class="createFormLabel" for="sharingUnits">Size</label>
              <b-form-input
                id="sharingUnits"
                v-model.number="
                  sharingRound.commodities[commoditiesLength].sharingUnits
                "
                type="number"
                class="form-control createFormInput"
                placeholder="Enter NO. of units"
                required
              />
            </div>
          </div>
          <div class="col input-r-seperator input-col">
            <div class="form-group">
              <label class="createFormLabel" for="productSize">Size type</label>

              <v-select
                id="productSize"
                v-model="
                  sharingRound.commodities[commoditiesLength].unitOfMeasurement
                "
                :options="unitsOfMeasurements || []"
                placeholder="Select a unit of measurement"
                class="selectVCustom"
                autocomplete="off"
                :clearable="false"
                required
              ></v-select>
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="col input-l-seperator input-col">
            <div class="form-group">
              <label class="createFormLabel" for="productCostPrice"
                >Cost Price</label
              >
              <b-form-input
                id="productCostPrice"
                v-model.number="
                  sharingRound.commodities[commoditiesLength].costPrice
                "
                type="number"
                class="form-control createFormInput"
                placeholder="Enter cost price"
                required
              />
            </div>
          </div>

          <div class="col input-r-seperator input-col">
            <div class="form-group">
              <label class="createFormLabel" for="productSharePrice"
                >Sharing Price</label
              >
              <b-form-input
                id="productSharePrice"
                v-model.number="
                  sharingRound.commodities[commoditiesLength].sharingPrice
                "
                type="number"
                class="form-control createFormInput"
                placeholder="Enter sharing price"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-row">
          <div class="col">
            <div class="form-group">
              <label class="createFormLabel" for="commoditySlot"
                >Number of slots</label
              >
              <b-form-input
                id="commoditySlot"
                v-model.number="
                  sharingRound.commodities[commoditiesLength].numberOfSlots
                "
                type="number"
                class="form-control createFormInput"
                placeholder="Enter slots"
                required
              />
            </div>
          </div>
          <div class="col">
            <div class="form-group d-none">
              <label class="createFormLabel">Platform average price</label>
              <div
                class="createFormInput secondary-background secondary-border"
              >
                <p class="avgPrice">
                  NGN
                  {{ sharingRound.commodities[commoditiesLength].marketPrice }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="createFormLabel" for="sharingComment"
            >Sharing Comments/Description</label
          >
          <b-form-input
            id="sharingComment"
            v-model="sharingRound.commodities[commoditiesLength].sharingComment"
            class="form-control createFormInput"
            type="text"
            placeholder="Enter sharing commment"
            maxlength="10"
          >
          </b-form-input>
        </div>
      </b-form>

      <div class="label-margin primary-BoxColor ml-3 d-none">
        <a class="link-button" @click="$bvModal.show('addTopMarketsForm')"
          >Add Top 3 Open Market Price</a
        >
      </div>
      <div
        class="d-flex justify-content-around pt-3 pb-5 primary-BoxColor half-width"
      >
        <b-btn class="btn light-btn primary-btn padded-btn" @click="addMore"
          >Add More</b-btn
        >

        <b-btn class="btn primary-btn padded-btn" @click="submitForm"
          >{{ updateHashbang ? 'Update' : 'Submit' }}
          <b-spinner
            v-if="spinner"
            variant="white"
            label="Spinning"
            class="ml-3"
            small
          />
        </b-btn>
      </div>

      <b-modal
        id="addTopMarketsForm"
        size="md"
        modal-class="topMarketForm"
        hide-footer
        hide-header-close
        hide-header
      >
        <div class="form-group">
          <label class="createFormLabel" for="">Select Market State</label>
          <b-form-select
            id="marketState"
            v-model="marketStateSelected"
            class="createFormInput form-control"
            :options="marketStateList"
          ></b-form-select>
        </div>
        <div v-if="marketStateSelected" class="">
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
          <b-btn class="btn primary-btn padded-btn">Add </b-btn>
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
      commoditiesArr: [],
      categoriesOptions: [],
      // unitsOfMeasurements: [],
      unitsOfMeasurements: [],
      globalUnitsofMeasurement: [],
      arrayIndexOfGlobalUnitsofMeasurement: 0,
      commoditiesLength: 0,

      // recreate round data
      // reCreatePayload: this.$store.state.round.reCreatePayload,

      // fetch stuff from vuex
      sharingRound: this.$store.state.round.data,
      accessToken: this.$store.state.auth.accessToken,
      USER: this.$store.state.auth.userData,

      spinner: false,

      marketStateSelected: false,
      marketStateList: [
        { value: null, text: 'Select L.G.A of market', disabled: true },
        { value: 'Obio-Akpor', text: 'Obio-Akpor' },
        { value: 'Port Harourt', text: 'Port Harourt' },
        { value: 'Lagos', text: 'Lagos' },
        { value: 'Owerri', text: 'Owerri' },
      ],

      topMarketOne: {
        name: [
          { value: null, text: 'Select Market', disabled: true },
          { value: 'Apapa Market', text: 'Apapa Market' },
          { value: 'Ojo Market', text: 'Ojo Market' },
          { value: 'Rumuokoro Market', text: 'Rumuokoro Market' },
          { value: 'Mile 1 Market', text: 'Mile 1 Market' },
        ],
        price: '',
        selected: false,
      },

      topMarketTwo: {
        name: [
          { value: null, text: 'Select Market', disabled: true },
          { value: 'Apapa Market', text: 'Apapa Market' },
          { value: 'Ojo Market', text: 'Ojo Market' },
          { value: 'Rumuokoro Market', text: 'Rumuokoro Market' },
          { value: 'Mile 1 Market', text: 'Mile 1 Market' },
        ],
        price: '',
        selected: false,
      },

      topMarketThree: {
        name: [
          { value: null, text: 'Select Market', disabled: true },
          { value: 'Apapa Market', text: 'Apapa Market' },
          { value: 'Ojo Market', text: 'Ojo Market' },
          { value: 'Rumuokoro Market', text: 'Rumuokoro Market' },
          { value: 'Mile 1 Market', text: 'Mile 1 Market' },
        ],
        price: '',
        selected: false,
      },
    }
  },

  async fetch() {
    const URI = `/services/commodities/categories`
    await this.$axios
      .$get(URI)
      .then((res) => {
        this.categoriesOptions = res.result.categories
      })
      .catch(() => {
        // Display  error toast notification
        this.SHOW_TOAST({
          text: 'Unable To Fetch Product Categories. Try Again!',
        })
      })
  },

  computed: {
    updateHashbang() {
      const hashbang = this.$route.hash.split('/')
      return hashbang[1] === 'update' // #!/update/{item-id}
    },
  },

  mounted() {
    // if (this.reCreatePayload) {
    //   this.sharingRound = this.reCreatePayload
    //   this.commoditiesLength = +this.sharingRound.commodities.length
    //   console.log(this.commoditiesLength)
    // }
    try {
      if (!this.sharingRound.commodities) {
        this.sharingRound.commodities = this.sharingRound.commoditiesDetails
      }

      this.commoditiesLength =
        this.sharingRound.commodities.filter((n) => n).length - 1
    } finally {
      this.commoditiesLength = 0
    }

    // If sharer is coming from the modify page
    if (this.updateHashbang) {
      this.sharingRound.commodities = []
      this.sharingRound.commodities.push({
        commodityName: null,
        costPrice: null,
        sharingPrice: null,
        numberOfSlots: null,
        marketPrice: null,
        sharingComment: null,
      })
    }
  },

  methods: {
    async selectedCategory(index) {
      this.sharingRound.commodities[index].commodityName = null
      this.commoditiesArr[index] = [
        {
          id: null,
          name: [],
          category: [],
          unitsOfMeasurement: [],
        },
      ]

      const URI = `/services/commodities/category/`
      await this.$axios
        .$get(URI, {
          params: {
            categoryName: this.sharingRound.commodities[index].category
              .categoryName,
          },
        })
        .then((res) => {
          this.commoditiesArr[
            index
          ].name = res.result.commodityCreatedResults.map((el) => el.name)
          this.globalUnitsofMeasurement = res.result.commodityCreatedResults.map(
            (el) => el.unitsOfMeasurement
          )
        })
        .catch(() => {
          // Display  error toast notification
          this.SHOW_TOAST({ text: 'Unable To Fetch Product Names. Try Again!' })
        })
        .finally(() => {
          this.$forceUpdate()
        })
    },

    selectedProductName(index) {
      const currentProductName = this.sharingRound.commodities[
        this.commoditiesLength
      ].commodityName

      for (
        let a = 0;
        a < this.commoditiesArr[this.commoditiesLength].name.length;
        a++
      ) {
        const element = this.commoditiesArr[this.commoditiesLength].name[a]
        if (element === currentProductName) {
          this.arrayIndexOfGlobalUnitsofMeasurement = a
          break
        }
      }
      this.unitsOfMeasurements = this.globalUnitsofMeasurement[
        this.arrayIndexOfGlobalUnitsofMeasurement
      ].map((el) => el)
    },

    validateFields(index) {
      if (
        this.sharingRound.commodities[this.commoditiesLength].costPrice >
        this.sharingRound.commodities[this.commoditiesLength].sharingPrice
      ) {
        // Display  error toast notification
        this.SHOW_TOAST({
          variant: 'warning',
          text: 'Sharing price should be greater than or equal to Cost price',
        })
      } else if (
        this.sharingRound.commodities[this.commoditiesLength].commodityName &&
        this.sharingRound.commodities[this.commoditiesLength].costPrice &&
        this.sharingRound.commodities[this.commoditiesLength].sharingPrice &&
        this.sharingRound.commodities[this.commoditiesLength].numberOfSlots
      ) {
        return true
      } else {
        // Display  error toast notification
        this.SHOW_TOAST({
          variant: 'warning',
          text: 'All Fields Are Required!',
        })
      }

      return false
    },

    addMore() {
      if (this.validateFields()) {
        this.sharingRound.commodities.push({
          commodityName: null,
          costPrice: null,
          sharingPrice: null,
          numberOfSlots: null,
          marketPrice: null,
          sharingComment: null,
        })
        this.commoditiesLength++
      }
    },

    submitForm() {
      if (this.validateFields()) {
        this.updateHashbang ? this.updateRound() : this.addRound()
      } else if (this.sharingRound.commodities.length > 1) {
        this.$bvModal
          .msgBoxConfirm(
            'Please confirm that you want to proceed without this commodity',
            {
              title: 'Please Confirm',
              size: 'sm',
              buttonSize: 'sm',
              okVariant: 'primary',
              okTitle: 'Continue',
              cancelTitle: 'Cancel',
              footerClass: 'p-2',
              hideHeaderClose: false,
              centered: true,
            }
          )
          .then((value) => {
            if (value) {
              // Remove the last commodity
              this.sharingRound.commodities.pop()
              // Submit the form
              this.updateHashbang ? this.updateRound() : this.addRound()
            }
          })
          .catch()
      }
    },

    async addRound() {
      this.spinner = true
      const URI = `/services/sharing-rounds/${this.USER.id}`
      await this.$axios
        .$post(URI, this.sharingRound)
        .then((res) => {
          // Display Sucess toast notification
          this.$bvToast.toast(`Round Successfully Added`, {
            title: 'Success!',
            variant: 'success',
            solid: true,
          })

          // Save round form data to a perstisted Vuex store
          this.$store.commit('round/SAVE_PAYLOAD_DATA', res.result)
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

    async updateRound() {
      // if (this.sharingRound.isPublished === true) {
      //   console.log('UUpdate a Published round:', this.sharingRound)
      //   this.updateExistingRound()
      // } else {
      this.spinner = true
      const hashbang = this.$route.hash.split('/')
      const URI = `/services/sharing-rounds/${this.USER.id}/${hashbang[2]}`
      await this.$axios
        .$put(URI, this.sharingRound)
        .then((res) => {
          // Display Sucess toast notification
          this.$bvToast.toast(`Round Successfully Updated`, {
            title: 'Success!',
            variant: 'success',
            solid: true,
          })

          // Save round form data to a perstisted Vuex store
          this.$store.commit('round/SAVE_PAYLOAD_DATA', res.result)
          // Redirect to the Preview page
          this.$router.replace(`/sharer/round/commodities/preview/`)
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
      // }
    },

    async updateExistingRound() {
      this.spinner = true
      const hashbang = this.$route.hash.split('/')
      const URI = `/services/sharing-rounds/${this.USER.id}/${hashbang[2]}/commodities`
      await this.$axios
        .$put(URI, this.sharingRound.commodities[0])
        .then((res) => {
          // Display Sucess toast notification
          this.$bvToast.toast(`Commodity Added Successfully`, {
            title: 'Success!',
            variant: 'success',
            solid: true,
          })

          // Save round form data to a perstisted Vuex store
          this.$store.commit('round/SAVE_PAYLOAD_DATA', res.result)
          // Redirect to the Preview page
          this.$router.replace(`/sharer/round/commodities/preview/`)
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
.scroll-overflow {
  background-color: transparent;
  padding-bottom: 55px;
}
.body-primary {
  padding-bottom: 30px;
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
  background-color: #ffffff;
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
