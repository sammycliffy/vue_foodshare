<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex">
        <partials-back-nav-button />
        <h4>Payment Details</h4>
      </div>

      <div class="text-center my-4 d-none">
        <span class="maker"
          ><i class="fas fa-map-marker-alt color-orange"></i
        ></span>
        <div class="seperator"></div>
        <span class="color-orange">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="16"
            fill="currentColor"
            class="bi bi-credit-card"
            viewBox="0 0 16 16"
          >
            <path
              d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"
            />
            <path
              d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"
            />
          </svg>
        </span>
        <div class="seperator seperator-overlay"></div>
        <span>
          <img src="/assets/icons/check-mark.svg" />
        </span>
      </div>
      <h4 class="mt-2">Account Details</h4>
      <div v-if="sharerDetails.financialDetails" class="mb-4 poppins">
        <p>
          Name:
          <span class="ml-3" @click="COPY_CLIPBOARD(copyAccName)">{{
            sharerDetails.financialDetails.accountName
          }}</span>
        </p>
        <p>
          Number:
          <span class="ml-3" @click="COPY_CLIPBOARD(copyAccNum)">{{
            sharerDetails.financialDetails.accountNumber
          }}</span
          ><span
            class="ml-2 fs-12 btn btn-primary p-1"
            @click="COPY_CLIPBOARD(copyAccNum)"
            >copy</span
          >
        </p>
        <p>
          Bank Name:
          <span class="ml-3" @click="COPY_CLIPBOARD(copyBankName)">{{
            sharerDetails.financialDetails.bankName
          }}</span>
        </p>
      </div>

      <div v-else-if="fetchError">Can't Load Account Details. . .</div>
      <h4 class="mb-0">Total Cost</h4>
      <h4
        class="text_semiBold color-orange"
        @click="COPY_CLIPBOARD(copyTotalBal)"
      >
        &#8358;
        {{
          Intl.NumberFormat().format(
            cartPayload.subTotalPlusServiceChargePlusShippingPlusPaystackfees
          )
        }}
        <span class="ml-2 fs-12 btn btn-primary p-1">copy</span>
      </h4>

      <div
        class="uploadProof text-center my-5"
        :style="
          FILE_BLOB
            ? `background: center / contain no-repeat url('${
                FILE_BLOB ? FILE_BLOB : ''
              }');`
            : ''
        "
      >
        <label>
          <div :class="FILE_BLOB ? 'invisible' : 'visible'">
            <div class="text-primary display-2">
              <i class="fas fa-paperclip"></i>
            </div>
            <span class="d-block description">
              {{ FILE ? FILE.name : 'Upload Proof of payment' }}</span
            >
          </div>
          <b-form-file
            v-model="FILE"
            accept="image/jpeg, image/png, image/gif"
            class="d-none"
            @input="filePicked"
          ></b-form-file>
        </label>
      </div>

      <div class="text-center">
        <b-btn
          v-if="countDownTime > 0 && FILE_BLOB"
          :disabled="verifClicked === true"
          class="btn primary-btn"
          @click="uploadProof()"
          >Confirm Payment</b-btn
        >
        <b-btn
          v-if="countDownTime <= 0"
          class="btn primary-btn"
          @click="
            $router.push(
              `/r/${sharerDetails.sharerId}/${cartPayload.sharingRoundId}/`
            )
          "
          >Go To Checkout</b-btn
        >
      </div>
      <p class="mt-3 text-center">Make payment within</p>
      <div class="text-center countDownBox">
        <div class="py-3">
          <time class="count-down px-3 py-2 rounded-pill">
            <i class="far fa-clock mr-2" />
            {{ COUNTDOWN }}</time
          >
        </div>
      </div>
      <p class="mt-1 text-center fs-12">
        Order will be cancelled if proof of payment is not uploaded within the
        above countdown.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // check button clicked
      verifClicked: false,
      // fetch stuff from vuex
      sharingRound: this.$store.state.cart.round,
      cartPayload: this.$store.state.cart.payload,
      accessToken: this.$store.state.auth.accessToken,
      USER: this.$store.state.auth.userData,

      fetchError: false,

      sharerDetails: {},
      FILE: null,
      FILE_BLOB: null,

      countDownTime: null, // I.e, 1 hour

      // countDownTime: 1 * 3600, // I.e, 1 hour
      COUNTDOWN: '00:00',

      copyAccName: null,
      copyAccNum: null,
      copyBankName: null,
      copyTotalBal: null,
    }
  },

  async fetch() {
    const URL = `/unauth/orders/sharing-rounds/orders/order/${this.cartPayload.orderId}/waitTime`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.countDownTime = response.result.waitingTimeLeft
      })
      .catch((error) => {
        this.fetchError = true
        this.ERROR_HANDLER(error)
      })

    const URI = `/unauth/sharing-groups/${this.sharingRound.sharerId}`
    await this.$axios
      .$get(URI)
      .then((response) => {
        this.sharerDetails = response.result
        this.$store.commit('cart/SAVE_SHARER_BANK', this.sharerDetails)
        this.copyAccNum = this.sharerDetails.financialDetails.accountNumber
        this.copyTotalBal = Intl.NumberFormat().format(
          this.cartPayload.subTotalPlusServiceChargePlusShippingPlusPaystackfees
        )
      })
      .catch((error) => {
        this.fetchError = true
        this.ERROR_HANDLER(error)
      })
  },

  // mounted() {

  // },
  computed: {
    // sharerDetails: {
    //   get() {
    //     return this.$store.state.cart.sharerBankDetails
    //     // this.$store.commit('cart/SAVE_OTP', saveOTP)
    //   },
    //   set(newValue) {
    //     this.$store.state.cart.sharerBankDetails = newValue
    //   },
    // },
  },

  watch: {
    countDownTime: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.countDownTime--

            // const hour = Math.floor(this.countDownTime / 3600 || 0)
            // const minute = Math.floor((this.countDownTime % 3600) / 60 || 0)
            // const second = Math.floor((this.countDownTime % 3600) % 60 || 0)
            const minute = Math.floor(this.countDownTime / 60 || 0)
            const second = Math.floor((this.countDownTime % 60) % 60 || 0)

            this.COUNTDOWN = `${minute} : ${second}`

            // this.COUNTDOWN = `${hour} : ${minute} : ${second}`
          }, 1000)
        } else if (value === null) {
          this.COUNTDOWN = 'Loading Countdown Timer'
        } else {
          this.COUNTDOWN = 'Countdown elapsed'
          this.SHOW_TOAST({
            text: 'Order is awaiting payment due to no payment proof upload!',
            variant: 'warning',
            title: 'Order pending',
          })

          // this.$router.replace(
          //   `/r/${this.sharerDetails.sharerId}/${this.cartPayload.sharingRoundId}/`
          // )
          // this.cancelOrder()
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },

  // async created() {
  //   // Set the countdown time
  //   const URI = `/unauth/sharing-groups/${this.sharingRound.sharerId}`
  //   await this.$axios
  //     .$get(URI)
  //     .then((response) => {
  //       this.sharerDetails = response.result
  //       this.$store.commit('cart/SAVE_SHARER_BANK', this.sharerDetails)
  //       this.copyAccNum = this.sharerDetails.financialDetails.accountNumber
  //       this.copyTotalBal = Intl.NumberFormat().format(
  //         this.cartPayload.subTotalPlusServiceChargePlusShippingPlusPaystackfees
  //       )
  //     })
  //     .catch((error) => {
  //       this.fetchError = true
  //       this.ERROR_HANDLER(error)
  //     })
  // },
  methods: {
    filePicked() {
      // Convert photo to base64 format (i.e data url)
      this.FILE_BLOB = URL.createObjectURL(this.FILE)
    },

    validate() {
      if (this.FILE && this.FILE.size < 1048576) {
        return true
      } else if (!this.FILE) {
        this.SHOW_TOAST({
          text: 'Please upload a valid file!',
          variant: 'warning',
          title: 'Required',
        })
      } else if (this.FILE.size > 1048576) {
        this.labelText = 'Maximum file size allowed is 1MB'
        this.SHOW_TOAST({
          title: 'Error',
          variant: 'warning',
          text: this.labelText,
        })
      }

      return false
    },

    async uploadProof() {
      if (this.validate()) {
        // Populate Payload
        const formData = new FormData()
        formData.append('file', this.FILE)

        this.verifClicked = true

        const URI = `/unauth/orders/${this.cartPayload.orderId}/proof`
        await this.$axios
          .$put(URI, formData)
          .then((response) => {
            this.$router.replace('/cart/checkout/success/')
          })
          .catch((error) => {
            this.fetchError = true
            this.ERROR_HANDLER(error)
            this.verifClicked = false
          })
      }
    },

    // async cancelOrder() {
    //   const orderId = this.cartPayload.orderId
    //   // Fetch user's rounds
    //   const URL = `/services/orders/sharing-rounds/${this.sharingRound.sharerId}/order/${orderId}`
    //   await this.$axios.$delete(URL, {}).catch((e) => {
    //     this.ERROR_HANDLER(e)
    //   })
    // },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding: 40px 18px;
  background-color: #ffffff;
}
h4 {
  font-size: 18px;
  line-height: 42px;
  letter-spacing: 0.05px;
  font-weight: bold;
}

p {
  color: #000000;
  font-size: 16px;
  margin-bottom: 5px;
  letter-spacing: 0.05px;
  font-weight: 400;
  text-transform: capitalize;
}
.seperator {
  width: 88px;
  height: 2px;
  background-color: rgba(254, 143, 10, 1);
  display: inline-block;
  vertical-align: middle;
  border-radius: 3px;
  margin: 0 10px;
}

.seperator-overlay {
  background-color: rgba(254, 143, 10, 0.29) !important;
}

.uploadProof {
  min-width: 240px;
}

.uploadProof > label {
  padding: 30px 16px;
  background-color: rgba(79, 158, 85, 0.06);
  border-radius: 5px;
  display: block;
}

.uploadProof .description {
  color: #4f9e55;
  font-size: 14px;
  line-height: 42px;
  letter-spacing: 0.1em;
}

.countDownBox {
  color: #fe8f0a;
  font-weight: 600;
  margin-top: 20px;
}
.countDownBox > .icon {
  font-size: 20px;
  vertical-align: middle;
}
.count-down {
  font-weight: 600;
  color: #000000;
  background-color: rgba(254, 143, 10, 0.2902);
  letter-spacing: 0.2em;
}
.paymentCountdownTime {
  margin-left: 3px;
  font-size: 15px;
  line-height: 36px;
}

.fs-12 {
  line-height: 12px;
}
</style>
