<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex justify-content-between generalHomeHost">
        <div class="generalHome">
          <h5 class="text_semiBold mb-8px">
            Good to see you&comma;
            <span v-text="USER.firstName"></span>
            😊
          </h5>
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
            :margin="5"
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
            @click="$router.push(`/r/${item.sharerId}/${item.id}/`)"
          >
            <div
              class="sRoundBox h-100 d-flex flex-column justify-content-between"
            >
              <p class="mb-0 text_semiBold" v-text="item.name"></p>

              <div class="d-flex justify-content-start mt-16">
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
                <span class="">
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
                </span>
              </div>
              <div class="d-flex justify-content-between mt-1">
                <span class="text_medium color-green mini-title">
                  <span class="d-block color-black text_normal">
                    {{ item.sharingDayWithoutTime }}
                  </span>
                </span>
                <span class="text_medium mini-title">
                  <span class="d-block color-orange text_normal">
                    <span>{{ item.sharingAddress.lineTwo }},</span>
                  </span>
                  <span class="d-block color-black text_normal">
                    <span>{{ item.sharingAddress.state }}</span>
                  </span>
                </span>
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

      <!-- <div class="text-center mt-24">
        <b-btn
          class="btn primary-btn padded-btn"
          @click="sharerRegisterModal = !sharerRegisterModal"
          >Become a sharer</b-btn
        >
      </div> -->
    </div>

    <b-modal
      v-model="sharerRegisterModal"
      size="lg"
      hide-footer
      no-fade
      hide-header-close
      hide-header
      modal-class="SharerRegisterModal"
    >
      <div class="modal-scroll">
        <h4 class="poppins text-center">Create your sharing group</h4>
        <p class="poppins text-center">
          We just need to get few details from you to serve you better
        </p>

        <div class="createSharerformBox">
          <b-form-input
            v-model="sharingGroupDetails.groupName"
            class="formInputGroup"
            placeholder="Name of sharing group"
            required
          />
          <b-form-input
            v-model="sharingGroupDetails.contactAddress.lineOne"
            class="formInputGroup"
            placeholder="Contact address"
            required
          />
          <b-form-input
            v-model="sharingGroupDetails.contactAddress.lineTwo"
            class="formInputGroup"
            placeholder="Address line 2"
          />
          <b-container>
            <b-row align-h="between">
              <b-col xs="6" class="input-l-seperator input-col">
                <b-form-input
                  v-model="sharingGroupDetails.contactAddress.town"
                  class="formInputGroup"
                  placeholder="Town"
                  required
                />
              </b-col>
              <b-col xs="6" class="input-r-seperator input-col">
                <b-form-select
                  v-model="sharingGroupDetails.contactAddress.state"
                  class="formInputGroup"
                  :options="stateOptions"
                  placeholder="State"
                  required
                ></b-form-select>
              </b-col>
            </b-row>
          </b-container>

          <b-form-textarea
            v-model="sharingGroupDetails.description"
            class="input-textarea"
            placeholder="Description"
            required
            rows="4"
            maxlengh="250"
          ></b-form-textarea>
          <div class="text-right px-1 mb-20 sub-desc-text">
            <span>
              <span v-text="sharingGroupDetails.description.length"></span
              ><span> &#47; 250</span>
            </span>
          </div>
          <p class="label">Bank Details</p>
          <v-select
            v-model="selectedBank"
            :options="bankNames"
            placeholder="Bank Name"
            :clearable="false"
            class="input pb-3 regVselect"
            label="name"
            @input="fetchAccountName()"
          ></v-select>
          <b-form-input
            v-model.trim="sharingGroupDetails.bankDetails.accountNumber"
            placeholder="Account number"
            class="formInputGroup"
            type="number"
            maxlength="10"
            required
            @blur="fetchAccountName()"
          />
          <b-form-input
            v-model="sharingGroupDetails.bankDetails.accountName"
            class="formInputGroup"
            :placeholder="accountNamePlaceholder"
            readonly
            required
            @click="fetchAccountName()"
          />
          <b-btn
            class="btn-block btn poppins mx-auto btnSharer mt-5"
            :disabled="!sharingGroupDetails.bankDetails.accountName"
            @click="submitSharerForm"
            >Create an Account
            <b-spinner
              v-if="btnSpinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
            ></b-spinner>
          </b-btn>
        </div>
      </div>
    </b-modal>

    <b-modal
      v-model="reviewOrderModal"
      centered
      size="md"
      modal-class="reviewOrder"
      hide-footer
      hide-header-close
      hide-header
    >
      <b-img
        :src="USER.image || '/assets/empty-photo.svg'"
        center
        class="userPic mx-auto"
        rounded="circle"
      />
      <p class="text-center">
        How well did you enjoy
        <span class="text_semiBold"> Muna 11-11-2021</span> Sharing Round
      </p>
      <span class="">
        <b-form-rating
          v-model="reviewFORM.rating"
          no-border
          color="#E8E7E7"
          size="lg"
          class="reviewOrderRatingDiv"
        ></b-form-rating>
      </span>
      <div class="form-group">
        <input
          v-model="reviewFORM.comment"
          type="text"
          class="form-control createFormInput"
          placeholder="write a review"
        />
      </div>

      <div class="d-flex justify-content-between">
        <b-btn class="btn primary-btn px-4" @click="submitReview()"
          >Rate
          <b-spinner
            v-if="btnSpinner"
            variant="white"
            label="Spinning"
            class="ml-3"
            small
        /></b-btn>
        <b-btn class="primary-btn-link" @click="shareRoundModal = false">
          Not Now
        </b-btn>
      </div>
    </b-modal>

    <b-modal
      v-model="changePassowrdModal"
      centered
      size="md"
      modal-class="changePassowrdModal"
      hide-footer
      hide-header-close
      hide-header
    >
      <span
        class="text-right d-block mb-2"
        @click="changePassowrdModal = false"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
      <p>
        Hey Dear<br />
        You’re logging in with OTP Kindly Click on the button below to set a
        password
      </p>
      <div class="text-center">
        <nuxt-link to="/profile/security/" class="btn primary-btn">
          Create Password
        </nuxt-link>
      </div>
    </b-modal>

    <partials-user-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      btnSpinner: null,
      sharerRegisterModal: null,
      reviewOrderModal: false,
      changePassowrdModal: false,
      // fetchedImages: this.$store.state.round.imagePayload,
      numberOfPages: 1,

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

      bankNames: [],
      accountName: null,
      selectedBank: null,
      accountNamePlaceholder: 'Account name',
      searchInput: null,
      sharingRounds: [],
      sharingRoundsDefault: [],

      USER: this.$store.state.auth.userData,

      // request payload data & form template
      sharingGroupDetails: {
        groupName: '',
        contactAddress: {
          country: 'Nigeria',
          state: null,
          town: '',
          lineOne: '',
          lineTwo: '',
        },
        description: '',
        bankDetails: {
          accountName: '',
          accountNumber: '',
          bankName: '',
        },
      },

      // rating last sharing round a user participated in
      reviewFORM: {
        comment: null,
        rating: 0,
        reviewContext: {
          reviewContextId: 0,
          reviewType: 'platform',
          userId: null,
        },
      },
    }
  },

  async fetch() {
    // Warn User to create a password
    this.changePassowrdModal = this.USER.isOTP

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
    let URL = `/unauth/sharing-rounds/status?name=ACTIVE&size=10&page=${
      this.currentPageNumber - 1
    }`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.sharingRounds = res.result.sharingRounds
        this.sharingRoundsDefault = res.result.sharingRounds
        this.numberOfPages = res.result.numberOfPages

        // Save round form data to a perstisted Vuex store
        this.$store.commit('cart/SAVE_ROUND_DATA', this.sharingRounds)
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
      .finally(() => {
        this.$forceUpdate()
      })

    // Fetch Banks Names
    URL = `https://app.nuban.com.ng/bank_codes.json`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.bankNames = response[2].data
      })
      .catch(() => {
        // Do nothing
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

    async fetchAccountName() {
      this.sharingGroupDetails.bankDetails.accountName = null
      const accountNumber = this.sharingGroupDetails.bankDetails.accountNumber

      if (accountNumber && this.selectedBank) {
        const bankName = this.selectedBank.name
        const bankCode = this.selectedBank.code

        this.sharingGroupDetails.bankDetails.bankName = bankName

        const accountNumber = this.sharingGroupDetails.bankDetails.accountNumber

        // Fetch Banks Names
        const URI = `https://app.nuban.com.ng/api/NUBAN-WEHRLFJZ448?bank_code=${bankCode}&acc_no=${accountNumber}`
        await this.$axios
          .$get(URI)
          .then((response) => {
            if (response.error) {
              this.sharingGroupDetails.bankDetails.accountName = null

              this.SHOW_TOAST({ text: response.message, variant: 'warning' })
            } else {
              this.sharingGroupDetails.bankDetails.accountName =
                response[0].account_name
            }
          })
          .catch(() => {
            // Do nothing
          })
          .finally(() => {
            this.$forceUpdate()
          })
      }
    },

    submitSharerForm() {
      if (
        !this.sharingGroupDetails.groupName ||
        !this.sharingGroupDetails.contactAddress.lineOne
      ) {
        this.SHOW_TOAST({
          variant: 'warning',
          title: 'Required Fields',
          text: 'All Fields are required!',
        })
      } else {
        this.updateUserRole()
      }
    },

    async updateUserRole() {
      this.btnSpinner = true

      const URI = `/services/users/${this.USER.id}/roles`
      await this.$axios
        .$put(URI, {
          roleName: 'ROLE_SHARER',
        })
        .then(() => {
          this.addSharingGroupDetails()
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          // Close the loader
          this.btnSpinner = false
        })
    },

    async addSharingGroupDetails() {
      this.btnSpinner = true

      const URI = `/services/sharing-groups/${this.USER.id}`
      await this.$axios
        .$post(URI, this.sharingGroupDetails)
        .then(async () => {
          const URI = `/services/users/${this.USER.id}`
          await this.$axios.$get(URI).then((response) => {
            // Display Success toast notification
            this.SHOW_TOAST({
              text: 'You Are Now a Sharer',
              title: 'Success',
              variant: 'success',
            })
            // Redirect to welcome page
            this.$router.replace('/sharer/')
          })
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          // Close the loader
          this.btnSpinner = false
        })
    },

    searchItem() {
      this.sharingRounds = this.sharingRoundsDefault.filter((element) =>
        element.name.toLowerCase().includes(this.searchInput.toLowerCase())
      )
    },

    async submitReview() {
      this.btnSpinner = true
      this.reviewFORM.reviewContext.userId = this.USER.id

      // Fetch sharer's review
      const URL = `/services/reviews`
      await this.$axios
        .$post(URL, this.reviewFORM)
        .then((res) => {
          this.reviewOrderModal = false
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
        .finally(() => {
          this.btnSpinner = false
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

.sharerCheckbox {
  font-weight: 500;
  font-size: 15px;
}

.formInputGroup {
  font-size: 15px;
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

.input-textarea {
  font-size: 15px;
  line-height: 22px;
  border: 1px solid #ffffff;
  color: #000000;
  border-radius: 10px;
  margin-bottom: 0;
  height: 110px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
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

b-form-input::-webkit-input-placeholder {
  /* Edge */
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-input::placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}

b-form-select::placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}
b-form-select::-webkit-input-placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
}
b-form-select:-ms-input-placeholder {
  font-size: 15px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.3) !important;
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
.SharerRegisterModal p {
  color: #000000;
}
.label {
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  color: #000000;
  margin-bottom: 18px;
  margin-left: 9px;
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

::v-deep .SharerRegisterModal .modal-dialog {
  margin: 0;
}

::v-deep .SharerRegisterModal .modal-body {
  padding: unset;
  overflow-y: scroll;
}

::v-deep .SharerRegisterModal .modal-content {
  border: none;
  border-radius: 20px 20px 0 0;
  position: fixed;
  bottom: 0;
  top: 113px;
  padding: 41px 16px 30px;
  background-color: #eef5ee;
}

::v-deep .regVselect .vs__dropdown-toggle,
::v-deep .regVselect .vs__dropdown-menu {
  border-radius: 10px;
  padding: 7px 3px;
  min-height: 50px;
  border: 1px solid #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  background-color: #ffffff;
}

::v-deep .regVselect .vs__search::placeholder {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.7);
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

::v-deep .regVselect .vs__clear,
::v-deep .regVselect .vs__open-indicator {
  fill: #9fa2b1;
}

::v-deep .regVselect .vs__dropdown-option--highlight {
  background: #4f9e55;
}

.formInputGroupFileUpload {
  height: 70px;
  width: 157px;
  border: 1px solid #ffffff;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 14px;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
}

.formInputImg {
  height: 40px;
  width: 45px;
}
::v-deep .sharerLogoUpload label {
  border: unset;
  color: rgba(0, 0, 0, 0.7);
  font-size: 14px;
  line-height: 22px;
  height: inherit;
  box-shadow: unset;
  border-radius: unset;
}
::v-deep .sharerLogoUpload label::after {
  display: none;
}

::v-deep .reviewOrder .modal-body {
  padding: 33px 18px 25px;
}

::v-deep .reviewOrder .modal-content {
  margin: 15px 21px;
}

::v-deep .reviewOrder .modal-body > p {
  letter-spacing: 0.8px;
  font-size: 16px;
  line-height: 25px;
  color: #000000;
  font-weight: 500;
  margin: 8px 0;
}

.userPic {
  height: 73px;
  width: 73px;
  background-repeat: no-repeat;
  background-size: cover;
}

.createFormInput {
  border: 1px solid rgba(0, 0, 0, 0.7);
  margin: 17px 0 13px;
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

.reviewOrderRatingDiv {
  border-radius: unset;
  box-shadow: unset;
}

::v-deep .changePassowrdModal .modal-body {
  padding: 19px 20px 100px;
}

::v-deep .changePassowrdModal .modal-content {
  margin: 10px;
}

::v-deep .changePassowrdModal .modal-body > p {
  letter-spacing: 0.8px;
  font-size: 15px;
  text-align: center;
  line-height: 28px;
  color: #000000;
  font-weight: 500;
  margin: 52px 0 32px;
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
