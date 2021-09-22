<template>
  <div class="scroll-overflow bg-general-color">
    <div class="half-width">
      <div class="d-flex">
        <partials-back-nav-button />
        <h4 class="backicon-margin">Forgot Password</h4>
      </div>
      <div class="text-center">
        <img src="/assets/fg-password.svg" class="verifyImg" />
      </div>
      <div class="text-center successMessage">
        <h6>Forget password?</h6>
        <p>
          Please enter your email to receive a mail, if the provided email
          address exist on our platform.
        </p>
      </div>
      <div class="vefiryCodeBox d-flex justify-content-center">
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/email.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model.trim="resetForm.emailAddress"
            class="input border-left-0"
            type="email"
            placeholder="Email"
            required
          />
        </b-input-group>
      </div>

      <div class="text-center">
        <b-btn
          :disabled="verifClicked === true"
          class="btn-block btn poppins mx-auto btnSharer"
          @click="sendOTP()"
          >Confirm Email

          <b-spinner
            v-if="spinner"
            variant="white"
            label="Spinning"
            class="ml-3"
            small
          ></b-spinner
        ></b-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      verifClicked: false,
      spinner: false,
      resetForm: {
        emailAddress: '',
      },
    }
  },

  methods: {
    async sendOTP() {
      // Trigger the loader
      this.spinner = true
      this.verifClicked = true

      if (!this.resetForm.emailAddress) {
        this.SHOW_TOAST({
          variant: 'warning',
          text: 'Email is required!',
        })
      }
      // populate the API URI
      // const URL = `/account/reset-password?email=${this.email}`

      // Make request to the API
      const URI = `/unauth/reset-password`
      await this.$axios
        .$post(URI, this.resetForm)
        .then(() => {
          this.SHOW_TOAST({
            title: 'Password reset link sent',
            variant: 'success',
            text: 'A password reset link has being sent to your email.',
          })
          // this.$router.replace('/account/password/reset/')
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          // Close the loader
          this.spinner = false
          this.verifClicked = false
        })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
  padding: 25px 18px;
  overflow-y: scroll;
}

.verifyImg {
  width: 179px;
  margin: 45px auto 30px;
}

.successMessage > h6 {
  font-size: 18px;
  line-height: 36px;
  color: #000000;
  margin: 30px 5px 15px;
  font-weight: bold;
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
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
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
