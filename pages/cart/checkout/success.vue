<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="paymentSuccessBg">
        <div class="d-flex justify-content-center">
          <span class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="131.16"
              height="132.44"
              fill="currentColor"
              class="bi bi-cart4"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
              />
            </svg>
          </span>
        </div>
      </div>
      <div class="text-center successMessage">
        <span class="d-block">
          <img src="/assets/icons/check-mark.svg" class="checkIcon" />
        </span>
        <h6>Thank you for Participating</h6>
        <p
          v-if="
            cartPayload.paymentMethod === 'OFFLINE' &&
            cartPayload.paymentComplete === true
          "
        >
          Your order is pending you will be notify when sharers approves payment
        </p>
        <p
          v-if="
            cartPayload.paymentMethod === 'PAYSTACK' &&
            cartPayload.paymentComplete === true
          "
        >
          Your order has been placed successfully.
        </p>
      </div>
      <div class="text-center mt-4">
        <b-btn v-if="AUTH" class="btn primary-btn padded-btn" to="/user/order/"
          >Go to Orders</b-btn
        >
      </div>

      <b-modal
        v-model="reviewModal"
        centered
        size="md"
        modal-class="reviewPurchase"
        hide-footer
        no-close-on-backdrop
      >
        <nuxt-link
          v-if="AUTH"
          slot="modal-title"
          nuxt-link
          class="primary-btn-link m-0"
          to="/user/"
        >
          <img class="" src="/assets/icons/home.svg" />
        </nuxt-link>
        <nuxt-link
          v-if="!AUTH"
          slot="modal-title"
          nuxt-link
          class="primary-btn-link m-0"
          to="/home/"
        >
          <img class="" src="/assets/icons/home.svg" />
        </nuxt-link>
        <b-img
          v-if="AUTH"
          :src="USER.image || '/assets/empty-photo.svg'"
          center
          class="userPic mx-auto"
          rounded="circle"
        />
        <p class="text-center">How was your experience?</p>
        <span class="">
          <b-form-rating
            v-model="FORM.rating"
            no-border
            color="#ffc107"
            size="lg"
            class="no-box"
          ></b-form-rating>
        </span>
        <div class="form-group">
          <input
            v-model="FORM.comment"
            type="text"
            class="form-control createFormInput text-center"
            placeholder="Write a review"
          />
        </div>

        <div class="d-flex justify-content-between">
          <b-btn class="btn primary-btn btn-block" @click="submitReview()"
            >Submit
            <b-spinner
              v-if="btnSpinner"
              variant="white"
              label="Spinning"
              class="ml-3"
              small
          /></b-btn>
        </div>
        {{ cartPayload }}
      </b-modal>
    </div>
    <partials-footer v-if="AUTH" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      btnSpinner: false,
      AUTH: this.$store.state.auth.loggedIn,
      USER: this.$store.state.auth.userData,
      cartPayload: this.$store.state.cart.payload,

      reviewModal: true,

      FORM: {
        comment: null,
        rating: 5,
        reviewContext: {
          reviewContextId: 0,
          reviewType: 'platform',
          userId: null,
        },
      },
    }
  },

  methods: {
    async submitReview() {
      this.btnSpinner = true

      this.FORM.reviewContext.userId = this.cartPayload.userId

      // Fetch sharer's review
      const URL = `/unauth/reviews`
      await this.$axios
        .$post(URL, this.FORM)
        .then((res) => {
          this.reviewModal = false
        })
        .catch((e) => {
          this.ERROR_HANDLER(e)
        })
        .finally(() => {
          this.btnSpinner = false
          if (!this.AUTH) {
            this.$router.replace('/home/')
          }
        })
    },
  },
}
</script>
<style scoped>
.scroll-overflow {
  background-color: #ffffff;
  padding-bottom: 100px;
  overflow-y: scroll;
}

.icon {
  margin-top: 61px;
  color: rgba(255, 255, 255, 0.95);
}

.checkIcon {
  widows: 75.68px;
  height: 59.65px;
  margin: 60px 0 35px;
}

.successMessage > h6 {
  font-size: 18px;
  letter-spacing: 0.05px;
  line-height: 27px;
  color: #000000;
  font-weight: bold;
}

.successMessage > p {
  font-size: 16px;
  letter-spacing: 0.05px;
  color: #000000;
  font-weight: 400;
  line-height: 25px;
}

::v-deep .reviewPurchase .modal-body {
  padding: 18px 18px 25px;
}

::v-deep .reviewPurchase .modal-content {
  margin: 15px 38px;
}

::v-deep .reviewPurchase .modal-body > p {
  letter-spacing: 0.8px;
  font-size: 16px;
  line-height: 25px;
  color: #000000;
  font-weight: 500;
  margin: 8px 0;
}
::v-deep .reviewPurchase .modal-header {
  margin: unset !important;
  border: unset !important;
  padding-bottom: unset !important;
}

::v-deep .reviewPurchase .modal-header .close {
  color: #111111;
  opacity: 1;
  font-size: 30px;
  margin-bottom: unset;
  padding-bottom: unset !important;
}

.userPic {
  height: 73px;
  width: 73px;
  background-repeat: no-repeat;
  background-size: cover;
}

.createFormInput {
  border: 1px solid rgba(0, 0, 0, 0.7);
  margin: 17px 0 13px;
}

.primary-btn-link {
  background-color: #ffffff;
  background: unset;
  box-shadow: unset;
  color: #4f9e55;
  font-weight: bold;
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.8px;
  cursor: pointer;
  padding-top: 10px;
  border: unset;
  border-radius: unset;
}

.primary-btn {
  border-radius: 10px !important;
}

.no-box {
  box-shadow: unset !important;
}
</style>
