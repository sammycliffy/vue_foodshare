<template>
  <div class="scroll-overflow">
    <div v-if="!sharingRound">Something Occured. Please, Try Again</div>

    <div class="half-width">
      <div v-if="userAlreadyExist" class="pad-options">
        <div>
          <span @click="userAlreadyExist = false">
            <partials-back-nav-button />
            <span class="backIconTitle color-black"> Back </span>
          </span>
        </div>
        <div class="body-primary-2">
          <section>
            <h5 class="mt-32">User already Exists</h5>
            <div class="text-center">
              <img src="/assets/options.svg" class="verifyImg" />
            </div>
            <div class="text-center mx-45">
              <p>The email address or phone number is linked to an account.</p>
            </div>
            <div class="text-center my-24">
              <b-btn
                class="btn primary-btn padded-btn px-2"
                :disabled="verifClicked === true"
                @click="gotoLogin()"
                >Login</b-btn
              >
              <br />
              <span class="text_semiBold">or</span>
              <br />
              <b-btn
                class="btn primary-btn padded-btn px-2"
                :disabled="verifClicked === true"
                @click="continueAsGuest()"
                >Continue as Guest
              </b-btn>
            </div>
          </section>
        </div>
      </div>

      <div v-else-if="cartPayload.deliveryDetails">
        <div class="header-overlay">
          <div class="overlay-img"></div>
          <div class="overlay-bg"></div>
          <div class="top-bar">
            <div class="top-row d-flex justify-content-between">
              <div class="d-flex justify-content-around">
                <partials-back-nav-button />
                <span class="">{{ sharingRound.name }} </span>
              </div>
            </div>
          </div>
        </div>
        <div class="body-primary half-width">
          <section>
            <p class="shipping_title mt-2">Delivery Details</p>
            <div class="shippingDetailsBox">
              <label
                for="deliveryMethod"
                class="custom-control custom-radio labelHost"
              >
                <input
                  id="byPickUp"
                  v-model="cartPayload.deliveryDetails.deliveryMethod"
                  value="pickup"
                  type="radio"
                  class="custom-control-input"
                  name="deliveryMethod"
                  @input="TOGGLE_DELIVERY_MODE('pickup')"
                />
                <label
                  class="custom-control-label location-type"
                  for="byPickUp"
                  :class="
                    cartPayload.deliveryDetails.deliveryMethod === 'pickup'
                      ? 'bg_selected'
                      : ''
                  "
                >
                  <div class="location-type_inner">Pick up</div>
                </label>
              </label>

              <label
                for="deliveryMethod"
                class="custom-control custom-radio labelHost"
                @click="cartPayload.deliveryDetails.deliveryMethod = 'delivery'"
              >
                <input
                  id="byDelivery"
                  v-model="cartPayload.deliveryDetails.deliveryMethod"
                  type="radio"
                  value="delivery"
                  class="custom-control-input"
                  name="deliveryMethod"
                  @input="TOGGLE_DELIVERY_MODE('delivery')"
                />
                <label
                  class="custom-control-label location-type"
                  for="byDelivery"
                  :class="
                    cartPayload.deliveryDetails.deliveryMethod === 'delivery'
                      ? 'bg_selected'
                      : ''
                  "
                >
                  <div class="location-type_inner">Delivery</div>
                </label>
              </label>
            </div>

            <div v-if="!AUTH">
              <b-container>
                <b-row align-h="between">
                  <b-col xs="6" class="input-l-seperator input-col">
                    <b-input-group class="formInputGroup poppins">
                      <b-input-group-prepend
                        class="input-radius border-right-0 bg-white"
                      >
                        <b-input-group-text
                          class="input-addon border-right-0 bg-white"
                        >
                          <img src="/assets/icons/user.svg" />
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="cartPayload.firstName"
                        class="input border-left-0"
                        placeholder="First Name"
                        type="text"
                        required
                        :readonly="AUTH"
                      />
                    </b-input-group>
                  </b-col>
                  <b-col xs="6" class="input-r-seperator input-col">
                    <b-input-group class="formInputGroup poppins">
                      <b-input-group-prepend
                        class="input-radius border-right-0 bg-white"
                      >
                        <b-input-group-text
                          class="input-addon border-right-0 bg-white"
                        >
                          <img src="/assets/icons/user.svg" />
                        </b-input-group-text>
                      </b-input-group-prepend>
                      <b-form-input
                        v-model="cartPayload.lastName"
                        class="input border-left-0"
                        placeholder="Last Name"
                        type="text"
                        required
                        :readonly="AUTH"
                      />
                    </b-input-group>
                  </b-col>
                </b-row>
              </b-container>
              <b-input-group class="formInputGroup poppins">
                <b-input-group-prepend
                  class="input-radius border-right-0 bg-white"
                >
                  <b-input-group-text
                    class="input-addon border-right-0 bg-white"
                  >
                    <img src="/assets/icons/phone.svg" />
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  v-model.trim="cartPayload.phoneNumber"
                  class="input border-left-0"
                  type="tel"
                  required
                  :readonly="AUTH"
                  placeholder="Phone Number"
                  max-length="11"
                  min-length="11"
                />
              </b-input-group>
              <b-input-group class="formInputGroup poppins">
                <b-input-group-prepend
                  class="input-radius border-right-0 bg-white"
                >
                  <b-input-group-text
                    class="input-addon border-right-0 bg-white"
                  >
                    <img src="/assets/icons/email.svg" />
                  </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                  v-model.trim="cartPayload.emailAddress"
                  class="input border-left-0"
                  type="email"
                  placeholder="Email Address"
                  required
                  :readonly="AUTH"
                />
                <!-- <b-input-group-append>
                  <b-input-group-text class="input-addon border-left-0">
                    <span class="input-sub-text">Optional</span>
                  </b-input-group-text>
                </b-input-group-append> -->
              </b-input-group>
            </div>
            <div
              v-if="cartPayload.deliveryDetails.deliveryMethod === 'delivery'"
              class="mb-2 mt-32"
            >
              <div v-if="AUTH" class="">
                <div v-if="recentAddresses.length" class="">
                  <div class="row mx-0">
                    <div class="col-8 pl-0">
                      <!-- <span
                        ><i
                          class="fas fa-map-marker-alt color-green address-pinter"
                        ></i
                      ></span> -->
                      <span class="locationQuestion text_medium ml-1"
                        >Use Recent Location?</span
                      >
                    </div>
                    <div class="col-4 px-0">
                      <b-form-group>
                        <b-form-radio-group
                          id="sharingLocation"
                          v-model="sameLocationQuery"
                          class="radioBtns d-flex justify-content-around"
                        >
                          <b-form-radio value="YES">Yes</b-form-radio>
                          <b-form-radio value="NO">No</b-form-radio>
                        </b-form-radio-group>
                      </b-form-group>
                    </div>
                  </div>
                  <div v-if="sameLocationQuery === 'YES'" class="mt-32 mb-20">
                    <b-form-group>
                      <b-form-radio-group
                        id="currentAddressId"
                        v-model="
                          cartPayload.deliveryDetails.deliveryAddress
                            .currentAddressId
                        "
                      >
                        <b-form-radio
                          v-for="address in recentAddresses"
                          :key="address.currentAddressId"
                          :value="address.currentAddressId"
                          class="text-break p-3 pl-4"
                          stacked
                        >
                          {{
                            `${address.lineOne}, ${
                              address.lineTwo ? address.lineTwo + ',' : ''
                            } ${address.town}, ${address.state}`
                          }}
                        </b-form-radio>
                      </b-form-radio-group>
                    </b-form-group>
                  </div>
                  <div v-else class="mt-32 mb-20">
                    <p class="mb-20">Enter Address</p>
                    <b-form-input
                      v-model.trim="
                        cartPayload.deliveryDetails.deliveryAddress.lineOne
                      "
                      class="formInputGroup"
                      placeholder="Example; 123 School Road"
                      required
                    />
                    <b-form-input
                      v-model.trim="
                        cartPayload.deliveryDetails.deliveryAddress.lineTwo
                      "
                      class="formInputGroup"
                      placeholder="Example; Abuloma"
                    />
                    <b-container>
                      <b-row align-h="between">
                        <b-col xs="6" class="input-l-seperator input-col">
                          <b-form-input
                            v-model.trim="
                              cartPayload.deliveryDetails.deliveryAddress.town
                            "
                            class="formInputGroup"
                            placeholder="Port Harourt"
                            required
                          />
                        </b-col>
                        <b-col xs="6" class="input-r-seperator input-col">
                          <b-form-select
                            v-model.trim="
                              cartPayload.deliveryDetails.deliveryAddress.state
                            "
                            class="formInputGroup"
                            :options="stateOptions"
                            placeholder="State"
                            required
                            label="x"
                          ></b-form-select>
                        </b-col>
                      </b-row>
                    </b-container>
                  </div>
                </div>
                <div v-else class="">
                  <div class="mt-32 mb-20">
                    <p class="mb-20">Enter Address</p>
                    <b-form-input
                      v-model.trim="
                        cartPayload.deliveryDetails.deliveryAddress.lineOne
                      "
                      class="formInputGroup"
                      placeholder="Example; 123 School Road"
                      required
                    />
                    <b-form-input
                      v-model.trim="
                        cartPayload.deliveryDetails.deliveryAddress.lineTwo
                      "
                      class="formInputGroup"
                      placeholder="Example; Abuloma"
                    />
                    <b-container>
                      <b-row align-h="between">
                        <b-col xs="6" class="input-l-seperator input-col">
                          <b-form-input
                            v-model.trim="
                              cartPayload.deliveryDetails.deliveryAddress.town
                            "
                            class="formInputGroup"
                            placeholder="Port Harourt"
                            required
                          />
                        </b-col>
                        <b-col xs="6" class="input-r-seperator input-col">
                          <b-form-select
                            v-model.trim="
                              cartPayload.deliveryDetails.deliveryAddress.state
                            "
                            class="formInputGroup"
                            :options="stateOptions"
                            placeholder="State"
                            required
                            label="x"
                          ></b-form-select>
                        </b-col>
                      </b-row>
                    </b-container>
                  </div>
                </div>
              </div>
              <div v-else class="mt-32 mb-20">
                <p class="mb-20">Enter Address</p>
                <b-form-input
                  v-model.trim="
                    cartPayload.deliveryDetails.deliveryAddress.lineOne
                  "
                  class="formInputGroup"
                  placeholder="Example; 123 School Road"
                  required
                />
                <b-form-input
                  v-model.trim="
                    cartPayload.deliveryDetails.deliveryAddress.lineTwo
                  "
                  class="formInputGroup"
                  placeholder="Example; Abuloma"
                />
                <b-container>
                  <b-row align-h="between">
                    <b-col xs="6" class="input-l-seperator input-col">
                      <b-form-input
                        v-model.trim="
                          cartPayload.deliveryDetails.deliveryAddress.town
                        "
                        class="formInputGroup"
                        placeholder="Port Harourt"
                        required
                      />
                    </b-col>
                    <b-col xs="6" class="input-r-seperator input-col">
                      <b-form-select
                        v-model.trim="
                          cartPayload.deliveryDetails.deliveryAddress.state
                        "
                        class="formInputGroup"
                        :options="stateOptions"
                        placeholder="State"
                        required
                        label="x"
                      ></b-form-select>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
            </div>
            <!-- <div
              v-if="
                !AUTH ||
                cartPayload.deliveryDetails.deliveryMethod != 'delivery'
              "
              class="text-center mt-3"
            >
              <b-btn class="btn primary-btn padded-btn" @click="submitAddress"
                >Next
                <b-spinner
                  v-if="spinner"
                  variant="white"
                  label="Spinning"
                  class="ml-3"
                  small
                />
              </b-btn>
            </div> -->
            <div class="text-center mt-3">
              <b-btn
                :disabled="verifClicked === true"
                class="btn primary-btn padded-btn btn-block"
                @click="submitAddress"
                >Next
                <b-spinner
                  v-if="spinner"
                  variant="white"
                  label="Spinning"
                  class="ml-3"
                  small
                />
              </b-btn>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      spinner: false,
      userAlreadyExist: null,
      sameLocationQuery: 'YES',

      defaultAddress: {},
      recentAddresses: [],

      cartPayload: this.$store.state.cart.payload,
      sharingRound: this.$store.state.cart.round,
      USER: this.$store.state.auth.userData,
      AUTH: this.$store.state.auth.loggedIn,

      member: {
        name: 'Albert',
      },

      stateOptions: [
        { value: null, text: 'Select state', disabled: true },
        'Rivers',
        // 'FCT - Abuja',
        // 'Abia',
        // 'Adamawa',
        // 'Akwa Ibom',
        // 'Anambra',
        // 'Bauchi',
        // 'Bayelsa',
        // 'Benue',
        // 'Borno',
        // 'Cross River',
        // 'Delta',
        // 'Ebonyi',
        // 'Edo',
        // 'Ekiti',
        // 'Enugu',
        // 'Gombe',
        // 'Imo',
        // 'Jigawa',
        // 'Kaduna',
        // 'Kano',
        // 'Katsina',
        // 'Kebbi',
        // 'Kogi',
        // 'Kwara',
        // 'Lagos',
        // 'Nasarawa',
        // 'Niger',
        // 'Ogun',
        // 'Ondo',
        // 'Osun',
        // 'Oyo',
        // 'Plateau',
        // 'Rivers',
        // 'Sokoto',
        // 'Taraba',
        // 'Yobe',
        // 'Zamfara',
      ],

      // disable button on-click
      verifClicked: false,
    }
  },

  async fetch() {
    if (this.AUTH) {
      // populate the API URI
      const URL = `/services/orders/sharing-rounds/addresses/user/${this.USER.id}`
      // Make request to the API
      await this.$axios
        .$get(URL)
        .then((res) => {
          this.recentAddresses = res.result.addresses.reverse()

          if (this.recentAddresses.length > 1)
            this.cartPayload.deliveryDetails.deliveryAddress.currentAddressId = this.recentAddresses[0].currentAddressId
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
    }
  },

  // computed: {
  //   OTP() {
  //     return this.$store.state.cart.receivedOtp
  //   },
  // },

  mounted() {
    // Set Default Delivery Method
    this.cartPayload.deliveryDetails = {
      deliveryMethod: 'pickup',
      deliveryAddress: {
        country: 'Nigeria',
        state: null,
      },
    }

    // Force a refresh
    this.$forceUpdate()

    // If user is logged in already
    if (this.AUTH) {
      this.cartPayload.firstName = this.USER.firstName
      this.cartPayload.lastName = this.USER.lastName
      this.cartPayload.phoneNumber = this.USER.phone
      this.cartPayload.emailAddress = this.USER.user
    }

    // User Prozy details,  don't know the usecase yet
    // this.cartPayload.proxyUserDetails.firstName = this.cartPayload.firstName
    // this.cartPayload.proxyUserDetails.lastName = this.cartPayload.lastName
    // this.cartPayload.proxyUserDetails.phone = this.cartPayload.phoneNumber
    // this.cartPayload.proxyUserDetails.email = this.cartPayload.emailAddress
  },
  methods: {
    TOGGLE_DELIVERY_MODE(deliveryMethod) {
      this.cartPayload.deliveryDetails.deliveryMethod = deliveryMethod
      this.$forceUpdate()
    },

    validateFields() {
      if (
        this.cartPayload.deliveryDetails.deliveryAddress.currentAddressId ||
        (this.cartPayload.phoneNumber &&
          this.cartPayload.emailAddress &&
          (this.cartPayload.deliveryDetails.deliveryMethod === 'pickup' ||
            (this.cartPayload.deliveryDetails.deliveryAddress.lineOne &&
              this.cartPayload.deliveryDetails.deliveryAddress.state)))
      ) {
        return true
      } else {
        // Display  error toast notification
        this.SHOW_TOAST({
          text: 'Please, enter all required fields',
          title: 'Warning!',
          variant: 'warning',
        })

        return false
      }
    },

    async submitAddress() {
      if (this.validateFields() && !this.spinner) {
        if (
          this.cartPayload.phoneNumber.length < 11 ||
          this.cartPayload.phoneNumber.length === 12 ||
          this.cartPayload.phoneNumber.length === 13 ||
          this.cartPayload.phoneNumber.length > 14
        ) {
          this.SHOW_TOAST({
            text:
              'Phone number must be 11 digits or complete 13 digits number with + at the beginning.',
            title: 'Wrong phone number!',
            variant: 'warning',
          })
          return
        }
        if (this.cartPayload.phoneNumber.length === 11) {
          const updateNumber = this.cartPayload.phoneNumber.substring(1)
          this.cartPayload.phoneNumber = updateNumber
        }
        if (this.cartPayload.phoneNumber.length === 10) {
          this.cartPayload.phoneNumber = '+234' + this.cartPayload.phoneNumber
        }

        // Disable button
        this.verifClicked = true

        // Trigger the loader
        this.spinner = true

        // populate the API URI
        const URL = `/unauth/users/user?email=${this.cartPayload.emailAddress}&phone=${this.cartPayload.phoneNumber}`

        // Make request to the API
        await this.$axios
          .$get(URL, {})
          .then((response) => {
            if (this.AUTH) {
              this.$router.push('/cart/payment/')
            } else {
              this.userAlreadyExist = true
              this.verifClicked = false
              this.spinner = false
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              this.sendOTP()
            } else if (error.response.status === 409) {
              // this.sendOTP()
              this.userAlreadyExist = true
              this.verifClicked = false
              this.spinner = false
            } else {
              this.ERROR_HANDLER(error)
              this.verifClicked = false
              this.spinner = false
            }
            // this.ERROR_HANDLER(error)
            // this.sendOTP()
          })
          .finally(() => {
            // Close the loader
          })
      }
    },

    async sendOTP() {
      // // Disable button
      // this.verifClicked = true

      // // Trigger the loader
      // this.spinner = true

      // populate the API URI
      const URL = `/account/account-verification`
      // Setup the Request Payload
      const payload = {
        firstName: this.cartPayload.firstName,
        lastName: this.cartPayload.lastName,
        emailAddress: this.cartPayload.emailAddress,
        phone: this.cartPayload.phoneNumber,
      }
      // Make request to the API
      await this.$axios
        .$post(URL, payload)
        .then((res) => {
          const saveOTP = res.result.token
          this.$store.commit('cart/SAVE_OTP', saveOTP)
          this.$router.push('/cart/payment/')
          // this.$router.push('/cart/verification/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {})
    },
    // async verifyCode() {
    //   console.log('I verified here')

    //   // populate the API URI
    //   const URL = `/account/registration-verification`
    //   // Setup the Request Payload
    //   const payload = {
    //     params: {
    //       token: this.OTP,
    //     },
    //   }

    //   // Make request to the API
    //   await this.$axios
    //     .$get(URL, payload)
    //     .then((res) => {
    //       this.logUserIn(res.result.emailAddress)
    //     })
    //     .catch((e) => {
    //       this.ERROR_HANDLER(e)
    //       this.spinner = false
    //       this.verifClicked = false
    //     })
    // },

    // async logUserIn(username) {
    //   console.log('I Logged in')

    //   // populate the API URI
    //   const URL = `/auth/login`
    //   // Setup the Request Payload
    //   const payload = {
    //     username,
    //     password: this.OTP,
    //   }

    //   // Make login request to the API
    //   await this.$axios
    //     .$post(URL, payload)
    //     .then((response) => {
    //       // Show 'success' Toast
    //       this.SHOW_TOAST({
    //         text: 'Access Code Sent! Please Wait.',
    //         title: 'Success!',
    //         variant: 'success',
    //       })

    //       // Get the accessToken from login
    //       const accessToken = response.result.accessToken
    //       // Decode the Token
    //       const userData = JSON.parse(atob(accessToken.split('.')[1]))
    //       // Save token to a perstisted Vuex store
    //       this.$store.commit('auth/SAVE_TOKEN', accessToken)
    //       // Save User Data to a perstisted Vuex store
    //       this.$store.commit('auth/LOG_USER_IN', userData)
    //       // Adds header: `Authorization: Bearer {accessToken}` to requests
    //       this.$axios.setToken(accessToken, 'Bearer')
    //       // Redirect User To CART page

    //       this.$router.push('/cart/payment/')
    //     })
    //     .catch((e) => {
    //       this.ERROR_HANDLER(e)

    //       this.spinner = false
    //       this.verifClicked = false
    //     })
    // },

    gotoLogin() {
      this.$router.push('/account/login/#!/cart/payment/')
    },

    continueAsGuest() {
      this.$router.push('/cart/payment/')
    },

    async createPassword() {
      // Trigger the loader
      this.spinner = true

      // populate the API URI
      const URL = `/account/reset-password?email=${this.cartPayload.emailAddress}`
      // Setup the Request Payload
      // Make request to the API
      await this.$axios
        .$post(URL, {})
        .then(() => {
          this.$router.push('/account/password/reset/#!/cart/checkout/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
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
.body-primary {
  /* background-color: #ffffff; */
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 125px;
  z-index: 20;
  overflow-y: auto;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}

.primary-btn {
  height: 50px;
}

.shipping_title {
  font-size: 15px;
  line-height: 42px;
  font-weight: bold;
  color: #000000;
  letter-spacing: 0.04px;
  margin-bottom: 24px;
}

.location-type {
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  width: 100%;
  background-color: #ffffff;
}

.location-type_inner {
  text-align: center;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.05px;
  padding: 16px;
}

.labelHost {
  margin-bottom: 30px;
}

.shippingDetailsBox {
  position: relative;
}

.maker {
  height: 21px;
  width: 14px;
  margin-right: 21px;
  vertical-align: sub;
}
.map_link {
  height: 50px;
  border: dashed 2px rgba(254, 143, 10, 1);
  position: absolute;
  left: 3px;
  top: 30px;
}

label {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
}

.formInputGroup {
  font-size: 15px;
  line-height: 22px;
  background-color: rgba(255, 255, 255, 0.96);
  color: #000000;
  border-radius: 8px;
  margin-bottom: 20px;
  height: 50px;
}
.formInputGroup .input {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
  background-color: #ffffff;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  height: inherit !important;
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
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.form-control {
  border: unset;
}
.custom-select {
  border: unset;
}
.input-radius {
  border-radius: 8px;
}

.input-sub-text {
  font-size: 10px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.2);
}

.locationQuestion {
  font-size: 18px;
  line-height: 22px;
}

.radioBtns .custom-control-inline {
  margin-right: 5px;
  font-size: 15px;
  line-height: 22px;
}

.address-pinter {
  font-size: 20px;
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

.custom-control-input:not(:disabled):active ~ .custom-control-label::before {
  border-color: #4f9e55 !important;
  background-color: #4f9e55 !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  border-color: #4f9e55 !important;
  background-color: #4f9e55 !important;
}

.custom-control-label::before {
  top: 1rem;
  border: 1px solid rgba(79, 158, 85, 1);
  right: 1rem;
  left: unset;
  width: 1.5rem;
  height: 1.5rem;
}

.custom-control-label::after {
  top: 1rem;
  right: 1rem;
  left: unset;
  width: 1.5rem;
  height: 1.5rem;
}

.custom-control {
  padding-left: unset;
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

.verifyImg {
  width: 215.73px;
  margin: 40px auto 24px;
}

.pad-options {
  padding: 25px 16px 30px;
}
</style>
