<template>
  <div>
    <partials-skeleton-loader v-if="$fetchState.pending" />

    <div v-else class="scroll-overflow bg-general-color">
      <div class="half-width">
        <template v-if="hashbang === '#!reverify'">
          <div class="text-center">
            <img src="/assets/verify.svg" class="svgImg" />
          </div>
          <div class="text-center">
            <h5 class="text_medium">Resend account verification link.</h5>
          </div>

          <div class="mt-20">
            <b-input-group class="formInputGroup poppins">
              <b-input-group-prepend class="input-addon border-0">
                <b-input-group-text class="input-addon border-right-0">
                  <img src="/assets/icons/email.svg" />
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                v-model.trim="verifyForm.emailAddress"
                class="input"
                type="email"
                placeholder="Your account email Address"
                required
              />
            </b-input-group>
          </div>
          <div class="text-center mt-24">
            <b-btn
              class="btn primary-btn padded-btn"
              @click="resendVerificationLink"
            >
              Resend Link
              <b-spinner
                v-if="resendLinkSpinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              ></b-spinner>
            </b-btn>
          </div>
        </template>
        <template v-if="accountActivated">
          <div class="text-center">
            <img src="/assets/email-verified.svg" class="svgImg" />
          </div>
          <div class="text-center">
            <h4 class="text_medium mb_16">Awesome!</h4>
            <p class="mb-0">
              Your Email Address has been verified successfully
            </p>
          </div>
          <div class="text-center mt-24">
            <b-btn class="btn primary-btn padded-btn" to="/"
              >Back to Login
            </b-btn>
          </div>
        </template>
        <template v-if="!accountActivated">
          <div class="text-center">
            <img src="/assets/verify.svg" class="svgImg" />
          </div>
          <div class="text-center">
            <h5 class="text_medium">Sorry, This Link Has Expired.</h5>
          </div>

          <div class="mt-20">
            <b-input-group class="formInputGroup poppins">
              <b-input-group-prepend class="input-addon border-0">
                <b-input-group-text class="input-addon border-right-0">
                  <img src="/assets/icons/email.svg" />
                </b-input-group-text>
              </b-input-group-prepend>
              <b-form-input
                v-model.trim="verifyForm.emailAddress"
                class="input"
                type="email"
                placeholder="Your account email Address"
                required
              />
            </b-input-group>
          </div>
          <div class="text-center mt-24">
            <b-btn
              class="btn primary-btn padded-btn"
              @click="resendVerificationLink"
            >
              Resend Confirmation Link
              <b-spinner
                v-if="resendLinkSpinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              ></b-spinner>
            </b-btn>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountActivated: false,
      resendLinkSpinner: false,

      hashbang: this.$route.hash,

      verifyForm: {
        emailAddress: null,
      },
    }
  },

  async fetch() {
    // const URL = `/account/registration-verification/?token=${this.$route.params.verificationToken}&type=${this.$route.params.type}`
    const URL = `/account/registration-verification/?token=${this.$route.params.verificationToken}&type=${this.$route.query.type}`

    await this.$axios
      .$get(URL)
      .then(() => {
        this.accountActivated = true
      })
      .catch(() => {
        this.accountActivated = false
      })
  },
  methods: {
    async resendVerificationLink() {
      if (!this.verifyForm.emailAddress) {
        this.SHOW_TOAST({
          variant: 'warning',
          text: 'Email is required!',
        })
      } else {
        this.resendLinkSpinner = true

        // Make registration request to the API
        const URI = `unauth/verification-token`
        await this.$axios
          .$post(URI, this.verifyForm)
          .then(() => {
            // Redirect to verify user page
            this.$router.replace('/account/verifylink/')
          })
          .catch((error) => {
            // Display error toast as needed
            this.ERROR_HANDLER(error)
          })
          .finally(() => {
            // Close the loader
            this.resendLinkSpinner = false
          })
      }
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding: 40px 18px;
  overflow-y: scroll;
}

.svgImg {
  width: 255px;
  margin: 88px auto 40px;
}

h4 {
  font-size: 25px;
  line-height: 21px;
  color: #070606;
}

p {
  color: #070606;
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
</style>
