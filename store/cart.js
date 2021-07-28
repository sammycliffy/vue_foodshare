// store/round.js
export const strict = false

export const state = () => ({
  payload: {
    comments: null,
    deliveryDetails: {
      deliveryAddress: {
        country: 'Nigeria',
        lineOne: null,
        lineTwo: null,
        state: null,
        town: null,
      },
      deliveryMethod: 'pickup',
    },
    // new data
    isOrderByProxy: null,
    proxyUserDetails: {
      email: null,
      firstName: null,
      lastName: null,
      phone: null,
    },
    // data end
    firstName: null,
    lastName: null,
    emailAddress: null,
    phoneNumber: null,
    sharedCommodities: [],

    paymentDetails: {
      paymentType: null,
    },
  },
  payment: {
    orderId: null,
    paymentDetails: {
      paymentType: null,
      paystackVerificationCode: null,
    },
  },
  round: {
    sharingRounds: [],
  },
  receivedOtp: null,
})

export const mutations = {
  SAVE_ROUND_DATA(state, payload) {
    state.round = payload
  },
  SAVE_CART_DATA(state, payload) {
    state.payload = payload
  },
  SAVE_OFFLINE_CART_DATA(state, payload) {
    state.payload = payload
  },
  SAVE_OTP(state, payload) {
    state.receivedOtp = payload
  },
  RESET_CART_DATA(state) {
    state.payload = {
      comments: null,
      deliveryDetails: {
        deliveryAddress: {
          country: null,
          lineFive: null,
          lineFour: null,
          lineOne: null,
          lineThree: null,
          lineTwo: null,
          region: null,
          state: null,
          town: null,
        },
        deliveryMethod: null,
      },
      emailAddress: null,
      // new data
      isOrderByProxy: false,
      proxyUserDetails: {
        email: null,
        firstName: null,
        lastName: null,
        phone: null,
      },
      paymentDetails: {
        paymentType: null,
      },
      phoneNumber: null,
      sharedCommodities: [],
    }

    state.round = {
      sharingRounds: [],
    }
  },
}
