<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex">
        <partials-back-nav-button />
        <h4 class="backicon-margin">Back</h4>
      </div>
      <div class="text-center">
        <img src="/assets/ussd.svg" class="verifyImg" />
      </div>
      <div class="text-center successMessage">
        <h6>Verify Account</h6>
        <p>
          Please save the <span class="text_semiBold">Code</span> below as your
          referrence password.
        </p>
        <!-- <p>Verification code sent to your phone &amp; email.</p> -->
      </div>
      <div class="vefiryCodeBox d-flex justify-content-center mb-0">
        <b-form-input
          v-model="OTP"
          class="codeBoxItem text_semiBold color-orange"
          maxlength="6"
          type="text"
          required
        />
      </div>
      <p class="text-center mb-0 fs-14">
        The above <span class="text_semiBold">Code</span> has been sent to your
        email and phone number for your referrence.
      </p>

      <div v-if="invalidCode" class="errorCode text-center">
        <span>Verification code invalid</span>
      </div>
      <div class="text-center">
        <b-btn
          :disabled="verifClicked === true"
          class="btn-block btn poppins mx-auto btnSharer"
          @click="verifyCode"
          >Click to Verify</b-btn
        >
      </div>
      <div class="countdownBox text-center">
        <!-- <div class="py-3">
          <time class="count-down px-3 py-2 rounded-pill">
            <i class="far fa-clock mr-2" />
            {{ COUNTDOWN }}</time
          >
        </div> -->
        <!-- <span>
          <a @click="resendCode"
            >Resend verification Code
            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
            />
          </a>
        </span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // check button clicked
      verifClicked: false,

      invalidCode: false,
      // OTP: null,
      // OTP: this.$store.state.cart.receivedOtp,

      spinner: false,

      cartPayload: this.$store.state.cart.payload,
      // countDownTime: 30 * 60, // I.e, i10 minutes
      // COUNTDOWN: '00:00',
    }
  },

  // watch: {
  //   countDownTime: {
  //     handler(value) {
  //       if (value > 0) {
  //         setTimeout(() => {
  //           this.countDownTime--

  //           const minute = Math.floor(this.countDownTime / 60 || 0)
  //           const second = Math.floor(this.countDownTime % 60 || 0)

  //           this.COUNTDOWN = `${minute} : ${second}`
  //         }, 1000)
  //       } else {
  //         this.COUNTDOWN = ''
  //       }
  //     },
  //     immediate: true, // This ensures the watcher is triggered upon creation
  //   },
  // },
  computed: {
    OTP() {
      return this.$store.state.cart.receivedOtp
    },
  },
  methods: {
    async verifyCode() {
      // populate the API URI
      const URL = `/account/registration-verification`
      // Setup the Request Payload
      const payload = {
        params: {
          token: this.OTP,
        },
      }

      this.verifClicked = true

      // Make request to the API
      await this.$axios
        .$get(URL, payload)
        .then((res) => {
          this.logUserIn(res.result.emailAddress)
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
          this.verifClicked = false
        })
    },

    async logUserIn(username) {
      // populate the API URI
      const URL = `/auth/login`
      // Setup the Request Payload
      const payload = {
        username,
        password: this.OTP,
      }

      // Make login request to the API
      await this.$axios
        .$post(URL, payload)
        .then((response) => {
          // Show 'success' Toast
          this.SHOW_TOAST({
            text: 'OTP Verified! Please Wait.',
            title: 'Success!',
            variant: 'success',
          })

          // Get the accessToken from login
          const accessToken = response.result.accessToken
          // Decode the Token
          const userData = JSON.parse(atob(accessToken.split('.')[1]))
          // Save token to a perstisted Vuex store
          this.$store.commit('auth/SAVE_TOKEN', accessToken)
          // Save User Data to a perstisted Vuex store
          this.$store.commit('auth/LOG_USER_IN', userData)
          // Adds header: `Authorization: Bearer {accessToken}` to requests
          this.$axios.setToken(accessToken, 'Bearer')
          // Redirect User To CART page

          this.$router.replace('/cart/payment/')
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
    },

    async resendCode() {
      // Trigger the loader
      this.spinner = true

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
          const OTPResult = res.result
          const saveOTP = OTPResult.token
          this.$store.commit('cart/SAVE_OTP', saveOTP)
          this.SHOW_TOAST({
            text: OTPResult.message,
            title: 'OTP Resent success!',
            variant: 'success',
          })
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
.scroll-overflow {
  background-color: #ffffff;
  padding: 25px 18px;
  overflow-y: scroll;
}

.codeBoxItem {
  margin: 20px 3.5px;
  border: 1px solid #707070;
  border-radius: 2px;
  text-align: center;
}

.verifyImg {
  width: 190px;
  margin: 45px auto 15px;
}

.successMessage > h6 {
  font-size: 18px;
  line-height: 36px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 12px;
}

.successMessage > p {
  font-size: 14px;
  letter-spacing: 0.22px;
  color: #000000;
  line-height: 28px;
  margin-bottom: 0;
}

.btnSharer {
  background: #4f9e55;
  color: #ffffff;
  margin-top: 30px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -moz-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
}
.btnSharer:active {
  background: #313131;
}

.countdownBox > span {
  font-size: 14px;
  line-height: 28px;
  margin-top: 15px;
}
.countdownBox {
  margin-top: 15px;
}
.countdownBox > a {
  color: #4f9e55;
  cursor: pointer;
}
.count-down {
  font-weight: 600;
  color: #4f9e55;
  background-color: #bdf5c1;
  border: 0.1em solid #4f9e55;
  letter-spacing: 0.2em;
}

.errorCode > span {
  font-size: 14px;
  line-height: 28px;
  margin-top: 15px;
  color: #ff0000;
}
.backicon-margin {
  margin-top: 5px;
  font-size: 18px;
  line-height: 20px;
}
</style>
