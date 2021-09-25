<template>
  <div>
    <div class="bg-general-color scroll-overflow">
      <div class="half-width">
        <div class="d-flex">
          <partials-back-nav-button />
          <h4 class="backicon-margin">Forgot Password</h4>
        </div>

        <div class="successMessage">
          <h6>Password Reset</h6>
          <p>Please enter your new password.</p>
        </div>

        <div class="">
          <b-input-group class="formInputGroup poppins mb-3">
            <b-input-group-prepend class="border-right-0">
              <b-input-group-text class="input-addon border-right-0">
                <img src="/assets/icons/password.svg" />
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              v-model="OTP"
              class="input bg-white border-right-0 border-left-0"
              placeholder="TOKEN (Six Digit)"
              maxlength="6"
              required
            />
          </b-input-group>

          <b-input-group class="formInputGroup poppins">
            <b-input-group-prepend class="border-right-0">
              <b-input-group-text class="input-addon border-right-0">
                <img src="/assets/icons/password.svg" />
              </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input
              v-model="password"
              class="input bg-white border-right-0 border-left-0"
              :type="passwordToggle ? 'password' : 'text'"
              placeholder="New Password"
              required
            />
            <b-input-group-append>
              <b-input-group-text
                class="input-addon border-left-0"
                @click="passwordToggle = !passwordToggle"
              >
                <i
                  class="fas text-muted"
                  :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
                />
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
          <b-input-group class="formInputGroup poppins mt-3">
            <b-input-group-prepend class="border-right-0">
              <b-input-group-text class="input-addon border-right-0">
                <img src="/assets/icons/password.svg" />
              </b-input-group-text>
            </b-input-group-prepend>

            <b-form-input
              v-model="matchingPassword"
              class="input bg-white border-right-0 border-left-0"
              :type="passwordToggle ? 'password' : 'text'"
              placeholder="Confirm Password"
              required
            />
            <b-input-group-append>
              <b-input-group-text
                class="input-addon bg-white"
                @click="passwordToggle = !passwordToggle"
              >
                <i
                  class="fas text-muted"
                  :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
                />
              </b-input-group-text>
            </b-input-group-append>
          </b-input-group>
        </div>
        <div class="text-center">
          <b-btn
            class="btn-block btn poppins mx-auto btnSharer"
            @click="changePassword()"
            >Reset Password

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
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkActive: false,
      OTP: null,
      password: null,
      matchingPassword: null,

      spinner: false,
      passwordToggle: true,
    }
  },
  // Adding a fix
  // async fetch() {
  //   const URL = `/account/registration-verification/?token=${this.$route.params.verificationToken}&type=${this.$route.query.type}`

  //   await this.$axios
  //     .$get(URL)
  //     .then(() => {
  //       this.linkActive = true
  //       this.OTP = this.$route.params.verificationToken
  //     })
  //     .catch(() => {
  //       this.$bvToast.toast(
  //         'The link you clicked has expired, request again.',
  //         {
  //           title: 'Link has expired!',
  //           variant: 'warning',
  //           solid: true,
  //         }
  //       )
  //       this.$router.replace('/account/password/')
  //     })
  // },
  // mounted() {
  //   this.OTP = this.$route.params.verificationToken
  // },
  methods: {
    validateInputs() {
      let msg
      if (!this.password) {
        msg = 'Please enter a password'
      } else if (this.password !== this.matchingPassword) {
        msg = "Your Passwords dosen't match"
      }

      if (msg) {
        this.SHOW_TOAST({
          text: msg,
          title: 'Required',
          variant: 'warning',
        })
      }

      return !msg
    },
    // validateInputs() {
    //   let msg
    //   if (!this.OTP) {
    //     msg = 'Enter the TOKEN sent to your E-mail'
    //   } else if (!this.password) {
    //     msg = 'Please enter a password'
    //   } else if (this.password !== this.matchingPassword) {
    //     msg = "Your Passwords dosen't match"
    //   }

    //   if (msg) {
    //     this.SHOW_TOAST({
    //       text: msg,
    //       title: 'Required',
    //       variant: 'warning',
    //     })
    //   }

    //   return !msg
    // },

    async changePassword() {
      if (this.validateInputs()) {
        this.spinner = true
        const hashbang = this.$route.hash.split('#!')[1] || null

        // populate the API URI
        const URL = `account/create-password/${this.OTP}`
        // Setup the Request Payload
        const payload = {
          credentials: {
            password: this.password,
            matchingPassword: this.matchingPassword,
          },
        }
        // Make request to the API
        await this.$axios
          .$post(URL, payload)
          .then((res) => {
            // Redirect to dashboard on successful password change
            if (hashbang) {
              // Redirect user to the specified URL in the #!HashBang
              this.$router.replace(hashbang)
            } else {
              // If user if SHARER redirect to /sharer
              this.$router.replace('/account/password/success')
            }
          })
          .catch((e) => {
            this.ERROR_HANDLER(e)
          })
          .finally(() => {
            this.spinner = false
          })
      }
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

.successMessage > h6 {
  font-size: 20px;
  line-height: 36px;
  color: #000000;
  margin: 38px 16px 0;
  font-weight: bold;
}

.successMessage > p {
  font-size: 14px;
  color: #000000;
  line-height: 36px;
  margin: 13px 16px 30px;
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
