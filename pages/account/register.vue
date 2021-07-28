<template>
  <div class="bg-general-color">
    <div class="bodyBox half-width">
      <div class="text-center header">
        <img src="/assets/logo.svg" alt="logo" class="logo" />
      </div>
      <p class="poppins text-center">Create an account to get started</p>

      <b-form class="formBox">
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/user.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model.trim="FORM.firstName"
            class="input"
            placeholder="First Name"
            required
          />
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/user.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model.trim="FORM.lastName"
            class="input"
            placeholder="Last Name"
            required
          />
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/phone.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            id="registerPhone"
            v-model.trim="FORM.phone"
            class="input"
            type="tel"
            placeholder="Phone Number"
            max="10"
            max-length="11"
            min-length="11"
            required
          />
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/email.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model.trim="FORM.emailAddress"
            class="input"
            type="email"
            placeholder="e.mail@example.com"
            required
          />
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/password.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model="FORM.credentials.password"
            class="input border-0 bg-white"
            :type="passwordToggle ? 'password' : 'text'"
            placeholder="Password"
            required
          />
          <b-input-group-append>
            <b-input-group-text
              class="input-addon border-0 bg-white border-left-0"
              @click="passwordToggle = !passwordToggle"
            >
              <i
                class="fas text-muted"
                :class="passwordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>
        <b-input-group class="formInputGroup poppins">
          <b-input-group-prepend class="input-addon border-right-0">
            <b-input-group-text class="input-addon border-right-0">
              <img src="/assets/icons/password.svg" />
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input
            v-model="FORM.credentials.matchingPassword"
            class="input border-0 bg-white"
            :type="confirmPasswordToggle ? 'password' : 'text'"
            placeholder="Confirm Password"
            required
          />
          <b-input-group-append>
            <b-input-group-text
              class="input-addon border-0 bg-white border-left-0"
              @click="confirmPasswordToggle = !confirmPasswordToggle"
            >
              <i
                class="fas text-muted"
                :class="confirmPasswordToggle ? 'fa-eye-slash ' : 'fa-eye'"
              />
            </b-input-group-text>
          </b-input-group-append>
        </b-input-group>

        <div>
          <b-form-checkbox
            v-model="sharerCheck"
            class="sharerCheckbox"
            name="check-button"
            size="lg"
            switch
          >
            Become a Sharer
          </b-form-checkbox>
        </div>
        <b-btn
          v-if="sharerCheck"
          class="btn-block btn poppins mx-auto btnSharer mt-5"
          @click="$bvModal.show('createSharingGroupFromRegister')"
          >Continue</b-btn
        >

        <b-btn
          v-else
          class="btn-block btn poppins mx-auto btnSharer mt-3"
          @click="submitForm"
          >Register
          <b-spinner
            v-if="registerSpinner"
            variant="white"
            label="Spinning"
            class="ml-3"
            small
          ></b-spinner>
        </b-btn>
        <p class="poppins text-center link-p">
          Have an account already?
          <span>
            <nuxt-link class="bold-link" to="/account/login/">Login</nuxt-link>
          </span>
        </p>
        <p class="mt-2 fs-12">
          By clicking Register or Continue, you are confirming that you have
          read and agreed to FoodSHARE's
          <span
            ><nuxt-link class="color-green" to=""
              >Terms and condition</nuxt-link
            >
            and
            <nuxt-link class="color-green" to=""
              >Privacy Policy</nuxt-link
            ></span
          >
        </p>
      </b-form>

      <b-modal
        id="createSharingGroupFromRegister"
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
              v-model="FORM.sharingGroupDetails.groupName"
              class="formInputGroup"
              placeholder="Name of sharing group"
              required
            />
            <b-form-input
              v-model="FORM.sharingGroupDetails.contactAddress.lineOne"
              class="formInputGroup"
              placeholder="Contact address"
              required
            />
            <b-form-input
              v-model="FORM.sharingGroupDetails.contactAddress.lineTwo"
              class="formInputGroup"
              placeholder="Area"
              maxlength="10"
            />
            <b-container>
              <b-row align-h="between">
                <b-col xs="6" class="input-l-seperator input-col">
                  <b-form-input
                    v-model="FORM.sharingGroupDetails.contactAddress.town"
                    class="formInputGroup"
                    placeholder="City"
                    maxlength="20"
                    required
                  />
                </b-col>
                <b-col xs="6" class="input-r-seperator input-col">
                  <b-form-select
                    v-model="FORM.sharingGroupDetails.contactAddress.state"
                    class="formInputGroup"
                    :options="stateOptions"
                    placeholder="State"
                    required
                  ></b-form-select>
                </b-col>
              </b-row>
            </b-container>

            <b-form-textarea
              v-model="FORM.sharingGroupDetails.description"
              class="input-textarea"
              placeholder="Description"
              required
              rows="4"
              maxlength="250"
            >
            </b-form-textarea>
            <div class="text-right px-1 mb-20 sub-desc-text">
              <span>
                <span
                  v-text="FORM.sharingGroupDetails.description.length"
                ></span
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
              v-model.trim="FORM.sharingGroupDetails.bankDetails.accountNumber"
              placeholder="Account number"
              class="formInputGroup"
              type="number"
              maxlength="10"
              required
              @blur="fetchAccountName()"
            />
            <b-form-input
              v-model="FORM.sharingGroupDetails.bankDetails.accountName"
              class="formInputGroup"
              :placeholder="accountNamePlaceholder"
              readonly
              required
              @click="fetchAccountName()"
            />
            <b-btn
              class="btn-block btn poppins mx-auto btnSharer mt-5"
              :disabled="!FORM.sharingGroupDetails.bankDetails.accountName"
              @click="submitSharerForm"
              >Create an Account
              <b-spinner
                v-if="registerSpinner"
                variant="white"
                label="Spinning"
                class="ml-3"
                small
              ></b-spinner>
            </b-btn>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'public',

  data() {
    return {
      passwordToggle: true,
      confirmPasswordToggle: true,

      bankNames: [],
      accountName: null,
      selectedBank: null,
      accountNamePlaceholder: 'Account name',

      registerSpinner: false,
      createAccountSpinner: false,

      sharerCheck: false,

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

      // request payload data & form template
      FORM: {
        firstName: null,
        lastName: null,
        phone: null,
        emailAddress: null,
        role: 'USER',
        credentials: {
          password: '',
          matchingPassword: '',
        },

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
      },
    }
  },

  async mounted() {
    // Fetch Banks Names
    const URI = `https://app.nuban.com.ng/bank_codes.json`
    await this.$axios
      .$get(URI)
      .then((response) => {
        this.bankNames = response[2].data
      })
      .catch(() => {
        // Do nothing
      })
  },

  methods: {
    async fetchAccountName() {
      this.FORM.sharingGroupDetails.bankDetails.accountName = null
      const accountNumber = this.FORM.sharingGroupDetails.bankDetails
        .accountNumber

      if (accountNumber && this.selectedBank) {
        const bankName = this.selectedBank.name
        const bankCode = this.selectedBank.code

        this.FORM.sharingGroupDetails.bankDetails.bankName = bankName

        const accountNumber = this.FORM.sharingGroupDetails.bankDetails
          .accountNumber

        // Fetch Banks Names
        const URI = `https://app.nuban.com.ng/api/NUBAN-WEHRLFJZ448?bank_code=${bankCode}&acc_no=${accountNumber}`
        await this.$axios
          .$get(URI)
          .then((response) => {
            if (response.error) {
              this.FORM.sharingGroupDetails.bankDetails.accountName = null

              this.SHOW_TOAST({ text: response.message, variant: 'warning' })
            } else {
              this.FORM.sharingGroupDetails.bankDetails.accountName =
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

    async submitForm() {
      if (
        !this.FORM.firstName ||
        !this.FORM.lastName ||
        !this.FORM.phone ||
        !this.FORM.emailAddress ||
        !this.FORM.credentials.password ||
        !this.FORM.credentials.matchingPassword
      ) {
        if (!this.FORM.email || !this.FORM.password) {
          this.SHOW_TOAST({
            variant: 'warning',
            text: 'All Fields are required!',
          })
        }
      } else {
        if (
          this.FORM.phone.length < 11 ||
          this.FORM.phone.length === 12 ||
          this.FORM.phone.length === 13 ||
          this.FORM.phone.length > 14
        ) {
          this.SHOW_TOAST({
            text:
              'Phone number must be 11 digits or complete 13 digits number with + at the beginning.',
            title: 'Wrong phone number!',
            variant: 'warning',
          })
          return
        }
        if (this.FORM.phone.length === 11) {
          const updateNumber = this.FORM.phone.substring(1)
          this.FORM.phone = updateNumber
        }
        if (this.FORM.phone.length === 10) {
          this.FORM.phone = '+234' + this.FORM.phone
        }

        this.registerSpinner = true

        this.FORM.role = 'USER'

        // Make registration request to the API
        const URI = `/account/registration`
        await this.$axios
          .$post(URI, this.FORM)
          .then(() => {
            // Redirect to verify user page
            this.$router.replace('/account/verify/')
          })
          .catch((error) => {
            // Display error toast as needed
            this.ERROR_HANDLER(error)
          })
          .finally(() => {
            // Close the loader
            this.registerSpinner = false
          })
      }
    },

    async submitSharerForm() {
      if (
        !this.FORM.firstName ||
        !this.FORM.lastName ||
        !this.FORM.phone ||
        !this.FORM.emailAddress ||
        !this.FORM.credentials.password ||
        !this.FORM.credentials.matchingPassword
      ) {
        this.SHOW_TOAST({
          variant: 'warning',
          text: 'All Fields are required!',
        })
      } else {
        if (this.FORM.phone.length === 11) {
          const updateNumber = this.FORM.phone.substring(1)
          this.FORM.phone = updateNumber
        }
        if (this.FORM.phone.length === 10) {
          this.FORM.phone = '+234' + this.FORM.phone
        }

        this.registerSpinner = true

        const payload = {
          accountDetails: {
            credentials: { ...this.FORM.credentials },
            emailAddress: this.FORM.emailAddress,
            firstName: this.FORM.firstName,
            lastName: this.FORM.lastName,
            phone: this.FORM.phone,
            role: 'SHARER',
          },
          sharingGroupDetails: { ...this.FORM.sharingGroupDetails },
        }

        // Make request to the API
        const URI = `/account/registration/sharers`
        await this.$axios
          .$post(URI, payload)
          .then((response) => {
            // Redirect to welcome page
            this.$router.replace('/account/verify/')
          })
          .catch((error) => {
            // Hide dialog/modal on error
            this.$bvModal.hide('createSharingGroupFromRegister')

            // Display error toast as needed
            this.ERROR_HANDLER(error)
          })
          .finally(() => {
            // Close the loader
            this.registerSpinner = false
          })
      }
    },
  },
}
</script>

<style scoped lang="css">
.bodyBox {
  padding-top: 85px;
  min-height: 100vh;
}
.header {
  font-size: 25px;
  font-weight: bold;
  line-height: 30px;
  letter-spacing: 1.25px;
  margin: 0 0 2px;
  color: #313131;
}

p {
  font-size: 16px;
  line-height: 18px;
  margin-bottom: 30px;
  color: #313131;
}

.formBox {
  padding: 30px 16px;
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
</style>
