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
              <span class="mt_5px">Personal Information </span>
            </div>

            <span class="ml-2">
              <b-dropdown class="iconBtnDropdown" right no-caret>
                <template #button-content>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-three-dots-vertical"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                      />
                    </svg>
                  </span>
                  <span class="sr-only">Edit</span>
                </template>
                <b-dropdown-item v-if="!editForm" @click="toggleForm(true)"
                  >Edit Profile</b-dropdown-item
                >
                <b-dropdown-item v-else @click="toggleForm(false)"
                  >Cancel Edit Profile</b-dropdown-item
                >
              </b-dropdown>
            </span>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <div v-if="!editForm">
          <div class="form-group">
            <label class="profileFormLabel">Full name</label>
            <div class="profileFormInput">
              <span v-text="USER ? USER.firstName : ''" />
              <span v-text="USER ? USER.lastName : ''" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Phone number</label>
            <div class="profileFormInput">
              <span v-text="USER ? USER.phone : ''" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Email Address</label>
            <div class="profileFormInput">
              <span v-text="USER ? USER.user : ''" />
            </div>
          </div>
        </div>
        <div v-else>
          <div class="form-row">
            <div class="col-6 input-l-seperator input-col">
              <div class="form-group">
                <label class="profileFormLabel">First Name</label>
                <div class="input-group">
                  <div
                    class="input-group-prepend appendTextRadiusLeft bg-white"
                  >
                    <img src="/assets/icons/user.svg" />
                  </div>
                  <input
                    v-model="FORM.firstName"
                    class="form-control profileFormInputs"
                    placeholder="First Name"
                    required
                  />
                </div>
              </div>
            </div>
            <div class="col-6 input-r-seperator input-col">
              <div class="form-group">
                <label class="profileFormLabel">Last Name</label>
                <div class="input-group">
                  <div
                    class="input-group-prepend appendTextRadiusLeft bg-white"
                  >
                    <img src="/assets/icons/user.svg" />
                  </div>
                  <input
                    v-model="FORM.lastName"
                    class="form-control profileFormInputs"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Phone Number</label>
            <div class="input-group">
              <div class="input-group-prepend appendTextRadiusLeft bg-white">
                <img src="/assets/icons/phone.svg" />
              </div>
              <input
                v-model="FORM.phone"
                class="form-control profileFormInputs"
                type="tel"
                readonly
                placeholder="Phone Number"
                required
              />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Email Address</label>
            <div class="input-group">
              <div class="input-group-prepend appendTextRadiusLeft bg-white">
                <img src="/assets/icons/email.svg" />
              </div>
              <input
                v-model="FORM.emailAddress"
                class="form-control profileFormInputs"
                type="email"
                placeholder="Email Address"
                required
              />
            </div>
          </div>

          <div class="text-center mt-5">
            <div class="d-flex justify-content-around">
              <b-btn
                class="btn btn-danger color-white light-btn"
                @click="toggleForm(false)"
              >
                Cancel</b-btn
              >
              <b-btn class="btn primary-btn" @click="saveUserData">
                Save Profile

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
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      spinner: false,

      editForm: false,
      USER: this.$store.state.auth.userData,
    }
  },

  computed: {
    FORM() {
      return {
        firstName: this.USER.firstName,
        lastName: this.USER.lastName,
        emailAddress: this.USER.user,
        phone: this.USER.phone,
      }
    },
  },

  methods: {
    toggleForm(value) {
      this.editForm = value
    },

    validateFields() {
      if (
        this.FORM.firstName &&
        this.FORM.lastName &&
        this.FORM.emailAddress &&
        this.FORM.phone
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

    async saveUserData() {
      if (this.validateFields()) {
        // Trigger the loader
        this.spinner = true

        // populate the API URI
        const URL = `/services/users/${this.USER.id}`
        // Make request to the API
        await this.$axios
          .$put(URL, this.FORM)
          .then((res) => {
            this.toggleForm(false)
            // Save User Data to a perstisted Vuex store
            this.$store.commit('auth/UPDATE_USER_DATA', res.result)
            // Show success Toast notification
            this.SHOW_TOAST({
              text: 'Your profile has been updated',
              variant: 'success',
              title: 'Success',
            })
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

::v-deep .iconBtnDropdown .dropdown-toggle {
  background: transparent;
  color: #ffffff;
  border: unset;
  box-shadow: unset;
  padding: unset;
}

::v-deep .iconBtnDropdown .dropdown-menu {
  font-size: 15px;
  letter-spacing: 0.3px;
  padding: 10px;
  color: #080707;
  font-weight: lighter;
  border: unset;
  border-radius: unset;
  z-index: 4000;
}

.appendTextRadiusLeft {
  padding-left: 10px;
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
