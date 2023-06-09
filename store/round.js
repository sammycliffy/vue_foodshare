// store/round.js
export const strict = false

export const state = () => ({
  temp: [],
  tempCommodities: [],

  data: {
    name: null,
    serviceCharge: {
      serviceChargeAmount: null,
      serviceChargeType: null,
    },
    effectivity: {
      cutOffTime: null,
      endTime: null,
    },
    waitingTime: null,
    waitingTimeUnit: 'MINUTES',
    commodities: [
      {
        commodityName: null,
        costPrice: null,
        sharingPrice: null,
        numberOfSlots: null,
        marketPrice: null,
      },
    ],
    sharingAddress: {
      country: null,
      currentAddressId: null,
      lineOne: null,
      lineTwo: null,
      state: null,
      town: null,
    },
    sharingComment: null,
  },

  payload: {
    id: null,
    sharerId: null,
    name: null,
    startTime: null,
    cutOffTime: null,
    endTime: null,
    publishedDateTime: null,
    closedDateTime: null,
    status: null,
    commoditiesDetails: [
      {
        id: 45,
        commodityName: null,
        imageUrl: null,
        commodityPrice: null,
        profit: null,
        sharingPrice: null,
        costPrice: null,
        numberOfSlots: null,
        remainingSlots: null,
        participants: [],
        commodityFinancials: {},
      },
    ],
    sharingRoundFinancials: {
      profit: null,
      totalPrice: null,
      totalCost: null,
      costPrice: null,
    },
    sharingRoundSummary: {
      sharingRoundName: null,
      numberOfParticipants: null,
      numberOfCommodities: null,
      numberOfDaysLeft: null,
    },
    sharingComment: null,
  },

  reCreatePayload: null,

  imagePayload: [],
})

export const mutations = {
  SAVE_ROUND_DATA(state, payload) {
    state.data = payload
  },

  SAVE_PAYLOAD_DATA(state, payload) {
    state.payload = payload
  },

  SAVE_IMAGEPAYLOAD_DATA(state, imagePayload) {
    state.imagePayload = imagePayload
  },

  SAVE_RECREATE_PAYLOAD_DATA(state, reCreatePayload) {
    state.reCreatePayload = reCreatePayload
  },

  RESET_ROUND_DATA(state) {
    state.data = {
      name: null,
      serviceCharge: {
        serviceChargeAmount: null,
        serviceChargeType: null,
      },
      effectivity: {
        cutOffTime: null,
        endTime: null,
      },
      waitingTime: null,
      waitingTimeUnit: 'MINUTES',
      commodities: [
        {
          commodityName: null,
          costPrice: null,
          sharingPrice: null,
          numberOfSlots: null,
          marketPrice: null,
        },
      ],
      sharingAddress: {
        country: null,
        currentAddressId: null,
        lineOne: null,
        lineTwo: null,
        state: null,
        town: null,
      },
      sharingComment: null,
    }
  },

  RESET_ROUND_PAYLOAD(state) {
    state.payload = {
      id: null,
      sharerId: null,
      name: null,
      startTime: null,
      cutOffTime: null,
      endTime: null,
      profit: null,
      totalPrice: null,
      totalCost: null,
      publishedDateTime: null,
      closedDateTime: null,
      status: null,
      commoditiesDetails: [
        {
          id: 45,
          imageUrl: null,
          commodityName: null,
          commodityPrice: null,
          profit: null,
          sharingPrice: null,
          costPrice: null,
          numberOfSlots: null,
          remainingSlots: null,
          participants: [],
        },
      ],
      sharingRoundFinancials: {
        profit: null,
        totalPrice: null,
        totalCost: null,
        costPrice: null,
      },
      sharingRoundSummary: {
        sharingRoundName: null,
        numberOfParticipants: null,
        numberOfCommodities: null,
        numberOfDaysLeft: null,
      },
      sharingComment: null,
    }
  },

  RESET_RECREATE_DATA(state) {
    state.reCreatePayload = {
      name: null,
      serviceCharge: {
        serviceChargeAmount: null,
        serviceChargeType: null,
      },
      effectivity: {
        cutOffTime: null,
        endTime: null,
      },
      waitingTime: null,
      waitingTimeUnit: 'MINUTES',
      commodities: [
        {
          commodityName: null,
          costPrice: null,
          sharingPrice: null,
          numberOfSlots: null,
          marketPrice: null,
        },
      ],
      sharingAddress: {
        country: null,
        currentAddressId: null,
        lineOne: null,
        lineTwo: null,
        state: null,
        town: null,
      },
      sharingComment: null,
    }
  },
}
