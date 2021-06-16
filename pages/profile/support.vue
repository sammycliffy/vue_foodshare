<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between">
          <div class="d-flex justify-content-around">
            <partials-back-nav-button />
            <span class="mt_5px">Need Some Help? </span>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <div class="mt-3">
          <b-container>
            <b-row align-h="between">
              <b-col xs="6" class="input-l-seperator input-col">
                <b-form-input
                  :value="USER.firstName"
                  class="formInputGroup"
                  placeholder="First Name"
                  type="text"
                  required
                  readonly
                />
              </b-col>
              <b-col xs="6" class="input-r-seperator input-col">
                <b-form-input
                  :value="USER.lastName"
                  class="formInputGroup"
                  placeholder="Last Name"
                  type="text"
                  required
                  readonly
                />
              </b-col>
            </b-row>
          </b-container>

          <b-form-input
            :value="USER.phone"
            class="formInputGroup"
            type="tel"
            placeholder="Phone Number"
            required
            readonly
          />
          <b-form-input
            :value="USER.user"
            class="formInputGroup"
            type="email"
            placeholder="Email Address"
            readonly
          />
          <b-form-textarea
            v-model="FORM.message"
            class="input-textarea"
            placeholder="Description"
            required
            rows="8"
          ></b-form-textarea>
        </div>
        <div class="text-center mt-4 mb-3">
          <b-btn class="btn primary-btn" @click="sendMessage()"
            >Send
            <b-spinner
              v-if="btnSpinner"
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
      FORM: {},
      btnSpinner: false,
      USER: this.$store.state.auth.userData,
    }
  },

  methods: {
    async sendMessage() {
      // Activate button spinner
      this.btnSpinner = false
      // Populate Payload
      this.FORM.userId = this.USER.id
      // Make login request to the API
      const URI = `/services/support`
      await this.$axios
        .$post(URI, this.FORM)
        .then((response) => {
          // Show success toast
          this.SHOW_TOAST({
            text: 'Message Sent To Support Successfully!',
            title: 'Message Sent',
            variant: 'success',
          })
          // Redirect after 3 seconds
          setTimeout(() => {
            this.$router.push('/profile')
          }, 3000)
        })
        .catch((error) => {
          this.ERROR_HANDLER(error)
        })
        .finally(() => {
          // Close the loader
          this.btnSpinner = false
        })
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
}
.top-bar {
  color: #000000;
  z-index: 20;
  position: relative;
}

.primary-btn {
  padding: 15px 31px;
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
.mt_5px {
  font-size: 18px;
  line-height: 36px;
  font-weight: bolder;
}

.formInputGroup {
  font-size: 15px;
  line-height: 22px;
  border: 1px solid #ffffff;
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
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -webkit-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  -moz-box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
}
.input {
  font-size: 15px;
  line-height: 22px;
  color: #000000;
  background-color: #ffffff;
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
  border-radius: unset;
}

b-form-input::-webkit-input-placeholder {
  /* Edge */
  font-size: 15px;
  line-height: 22px;
  color: #000000 !important;
  opacity: 30%;
}

b-form-input:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  font-size: 15px;
  line-height: 22px;
  color: #000000 !important;
  opacity: 30%;
}

b-form-input::placeholder {
  font-size: 15px;
  line-height: 22px;
  color: #000000 !important;
  opacity: 30%;
}
</style>
