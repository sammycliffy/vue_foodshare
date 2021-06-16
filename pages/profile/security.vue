<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <div class="d-flex justify-content-around">
              <partials-back-nav-button />

              <span class="mt_5px">My Security </span>
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <label class="profileLabelTitle">Change Password</label>
        <div class="input-group">
          <div class="input-group-prepend bg-white appendTextRadiusLeft">
            <img src="/assets/icons/password.svg" />
          </div>
          <input
            v-model="FORM.oldPassword"
            :type="oldpasswordToggle ? 'password' : 'text'"
            class="form-control profileFormInputs"
            placeholder="Enter old password/Otp"
            required
          />
          <div class="input-group-append appendTextRadiusRight">
            <span
              class="input-group-text bg-white border-0"
              @click="oldpasswordToggle = !oldpasswordToggle"
            >
              <i
                class="fas text-muted"
                :class="oldpasswordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </span>
          </div>
        </div>
        <div class="input-group mt-3">
          <div class="input-group-prepend bg-white appendTextRadiusLeft">
            <img src="/assets/icons/password.svg" />
          </div>
          <input
            v-model="FORM.password"
            :type="passwordToggle ? 'password' : 'text'"
            class="form-control profileFormInputs"
            placeholder="Enter new password"
            required
          />
          <div class="input-group-append appendTextRadiusRight">
            <span
              class="input-group-text bg-white border-0"
              @click="passwordToggle = !passwordToggle"
            >
              <i
                class="fas text-muted"
                :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </span>
          </div>
        </div>
        <div class="input-group mt-3">
          <div
            class="input-group-prepend bg-white transparentAppendText appendTextRadiusLeft"
          >
            <img src="/assets/icons/password.svg" />
          </div>
          <input
            v-model="FORM.matchingPassword"
            :type="passwordToggle ? 'password' : 'text'"
            class="form-control profileFormInputs"
            placeholder="Confirm new password"
            required
          />
          <div class="input-group-append appendTextRadiusRight">
            <span
              class="input-group-text bg-white border-0"
              @click="passwordToggle = !passwordToggle"
            >
              <i
                class="fas text-muted"
                :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </span>
          </div>
        </div>
        <div class="text-center mt-4">
          <b-btn class="btn primary-btn" @click="updatePassword()">
            Change password

            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
            />
          </b-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      spinner: false,

      oldpasswordToggle: true,
      passwordToggle: true,

      FORM: {
        credentials: {
          oldPassword: null,
          password: null,
          matchingPassword: null,
        },
      },

      USER: this.$store.state.auth.userData,
    }
  },

  methods: {
    validateFields() {
      if (
        this.FORM.password &&
        this.FORM.oldPassword &&
        this.FORM.matchingPassword
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

    async updatePassword() {
      if (this.validateFields()) {
        // Trigger the loader
        this.spinner = true
        // populate the API URI
        const payload = {
          credentials: {
            matchingPassword: this.FORM.matchingPassword,
            password: this.FORM.password,
            oldPassword: this.FORM.oldPassword,
          },
        }
        const URL = `/services/users/${this.USER.id}/password`
        // Make request to the API
        await this.$axios
          .$put(URL, payload)
          .then((res) => {
            // Show success Toast notification
            this.SHOW_TOAST({
              text: 'Your password has been updated',
              variant: 'success',
              title: 'Success',
            })
            // Redirect to profile page
            this.$router.push('/profile/')
          })
          .catch((error) => {
            this.ERROR_HANDLER(error)
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
.body-primary {
  background-color: #eef5ee;
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
.mt_5px {
  margin-top: 5px;
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
