<template>
  <div class="bg-general-color">
    <div v-if="hashbang" class="py-3 px-14">
      <span class="d-flex">
        <partials-back-nav-button />
        <span class="backIconTitle color-black"> Back </span>
      </span>
    </div>
    <div class="bodyBox half-width">
      <div v-if="!hashbang" class="text-center header">
        <img src="/assets/logo.svg" alt="logo" class="logo" />
        <h2 class="poppins text-center">Welcome</h2>
      </div>
      <div v-if="hashbang" class="text-center header">
        <h5 class="">User already Exists</h5>
        <p>The email address or phone number is linked to an account.</p>
      </div>

      <div class="formBox">
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/email.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model.trim="FORM.username"
            class="input"
            type="email"
            placeholder="Email Address/Phone Number"
            required
          />
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-0">
            <b-input-group-text class="input-addon border-0">
              <img src="/assets/icons/password.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model="FORM.password"
            class="input"
            :type="passwordToggle ? 'password' : 'text'"
            placeholder="Password/Access Code"
            required
          />
          <b-input-group-append>
            <b-input-group-text
              class="input-addon border-0 bg-white"
              @click="passwordToggle = !passwordToggle"
            >
              <i
                class="fas text-muted"
                :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
        <b-container>
          <b-row align-h="between">
            <b-col xs="6" class="input-l-seperator input-col">
              <b-form-checkbox
                id="remember"
                v-model="FORM.remember"
                name="remember"
              >
                Remember Me
              </b-form-checkbox>
            </b-col>
            <b-col xs="6" class="input-l-seperator input-col text-right">
              <nuxt-link to="/account/password/" class="link"
                >Forgot Password?</nuxt-link
              >
            </b-col>
          </b-row>
        </b-container>

        <b-button
          class="btn-block btn poppins mx-auto btnSharer mt-5"
          :disabled="verifClicked === true"
          @click="submitLogin"
          >Login
          <b-spinner
            v-if="loginSpinner"
            variant="white"
            label="Spinning"
            class="ml-3"
            small
          ></b-spinner
        ></b-button>
        <p v-if="!hashbang" class="poppins text-center link-p">
          New user?
          <span>
            <nuxt-link class="primary-link" to="/account/register/"
              >Register</nuxt-link
            >
          </span>
        </p>
      </div>
      <div v-if="hashbang" class="text-center">
        <span class="primary-link" @click="$router.push('/cart/payment')"
          >Continue as Guest</span
        >
        <!-- <div>{{ calculateSlot.length }}</div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'public',

  data() {
    return {
      passwordToggle: true,
      loginSpinner: false,
      verifClicked: false,

      FORM: {
        username: null,
        password: null,
        remember: true,
      },

      accessToken: null,

      hashbang: this.$route.hash.split('#!')[1] || null,
    }
  },

  methods: {
    async submitLogin() {
      if (!this.FORM.username || !this.FORM.password) {
        this.SHOW_TOAST({
          variant: 'warning',
          text: !this.FORM.username
            ? 'Please, enter a valid email or phone number'
            : 'Enter your password',
        })
      } else {
        if (
          this.FORM.username.charAt(0) === '0' &&
          this.FORM.username.length === 11
        ) {
          const updateNumber = this.FORM.username.substring(1)
          this.FORM.username = updateNumber
          this.FORM.username = '+234' + this.FORM.username
        }
        // Display spinning spinner icon
        this.loginSpinner = true
        this.verifClicked = true

        // Make login request to the API
        const URI = `/auth/login`
        await this.$axios
          .$post(URI, this.FORM)
          .then((response) => {
            // Get the accessToken from login
            const accessToken = response.result.accessToken
            // Decode the Token
            const userData = JSON.parse(atob(accessToken.split('.')[1]))
            if (userData.isActivated) {
              // Save token to a perstisted Vuex store
              this.$store.commit('auth/SAVE_TOKEN', accessToken)
              // Save User Data to a perstisted Vuex store
              this.$store.commit('auth/LOG_USER_IN', userData)
              // Adds header: `Authorization: Bearer {accessToken}` to requests
              this.$axios.setToken(accessToken, 'Bearer')
              // Redirect to dashboard on successful login
              this.redirectToDashboard(userData)
            } else {
              this.$router.replace('/account/verify/')
            }
          })
          .catch((error) => {
            // Display error toast as needed
            this.ERROR_HANDLER(error)
            // Remove User Data from a perstisted Vuex store
            if (error.response.status === 422) {
              this.$router.push('/account/#!reverify')
            }
            this.$store.commit('auth/LOG_USER_OUT')
          })
          .finally(() => {
            // Close the loader
            this.verifClicked = false
            this.loginSpinner = false
          })
      }
    },

    async redirectToDashboard(userData) {
      if (this.hashbang) {
        // Redirect user to the specified URL in the #!HashBang
        this.$router.replace(this.hashbang)
      } else if (userData.roles.some((el) => el === 'ROLE_SHARER')) {
        if (userData.isSharerGroupActivated === false) {
          this.$router.replace('/account/inactive/')
        } else {
          console.log('Running Activated  sharing group')
          // If user if SHARER redirect to sharer
          const URL = `/services/sharing-rounds/${userData.id}`
          await this.$axios.$get(URL, {}).then((res) => {
            const rounds = res.result.sharingRounds
            // decide if user has at least one round
            this.$router.replace(
              rounds.length > 0 ? '/sharer/dashboard/' : '/sharer/'
            )
          })
        }
      } else {
        this.$router.replace('/user/')
      }
    },
  },
}
</script>

<style scoped lang="css">
.bodyBox {
  padding-top: 130px;
  min-height: 100vh;
}

.header > h2 {
  margin-top: 20.23px;
  font-size: 25px;
  font-weight: bold;
  line-height: 30px;
  color: #313131;
  letter-spacing: 1.25px;
}

.formBox {
  padding: 40px 16px 20px;
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
  margin-bottom: 20px;
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
.input-col {
  padding-left: unset;
  padding-right: unset;
  font-size: 15px;
  line-height: 18px;
  color: rgba(7, 6, 6, 1);
}

.link {
  color: rgba(7, 6, 6, 1);
}

::v-deep .custom-checkbox .custom-control-label::before {
  border-radius: unset;
  border: rgba(7, 6, 6, 1) solid 2px;
  top: 0;
  left: -1.4rem;
}

::v-deep .custom-checkbox .custom-control-label::after {
  top: 0;
  left: -1.4rem;
}

::v-deep .custom-control-input:checked ~ .custom-control-label::before {
  border-color: #4f9e55;
  background-color: #4f9e55;
}

.link-p {
  color: #646464;
  margin-top: 30px;
  font-size: 15px;
  line-height: 18px;
}

.primary-link {
  color: #4f9e55;
  font-weight: 500;
}

.must-border {
  border: 1px solid #4f9e55;
}
.must-hash {
  color: #646464;
  margin-bottom: 15px;
}
</style>
