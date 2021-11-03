<template>
  <section>
    <div
      v-for="item in sharingRounds"
      :key="item.id"
      class="sharingRoundListBox"
    >
      <div class="sharingRoundBox text-left" @click="listClicked(item)">
        <div class="row roundNameHost mx-0">
          <span class="col-9 px-0">
            <span class="round-name" v-text="item.name"></span>
          </span>
          <span class="col-3 text-right px-0 color-orange roundShareEditIcons">
            <span
              v-if="editable"
              class="color-orange"
              @click.stop="editSharingRound(item)"
            >
              <i class="fas fa-pencil-alt"></i>
            </span>
            <span v-if="sharable" class="ml-2">
              <b-dropdown
                id="dropdownBox"
                size="md"
                variant="link color-orange"
                class="share-dropdown"
                toggle-class="text-decoration-none"
                no-caret
                right
              >
                <template #button-content>
                  <i class="fas fa-share-alt"></i>
                </template>
                <b-dropdown-item>
                  <span class="text-right d-block mb-0 text-danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      class="bi bi-x border border-danger rounded"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  </span>
                </b-dropdown-item>
                <b-dropdown-item @click.stop="copyRoundStatus(item)">
                  Copy Round Status
                </b-dropdown-item>
                <b-dropdown-item @click.stop="showShareModal(item)">
                  Round Link
                </b-dropdown-item>
              </b-dropdown>
            </span>
          </span>
        </div>
        <div class="d-flex justify-content-between">
          <span>
            <img class="" src="/assets/icons/shopping-box.svg" />
            <span class="ml-1 mini-title">
              <span
                >{{ item.commoditiesDetails.length }}
                {{
                  item.commoditiesDetails.length > 1 ? 'Products' : 'Product'
                }}</span
              >
            </span>
          </span>
          <span>
            <img class="" src="/assets/icons/group-orange.svg" />
            <span class="ml-1 mini-title">
              {{ item.participants.length }}
              {{ item.participants.length > 1 ? 'Members' : 'Member' }}
            </span>
          </span>
        </div>
        <div
          v-if="item.isClosed === true"
          class="d-flex justify-content-between"
        >
          <span>
            <span class="ml-1 mini-title">
              <span>Sharing Day</span>
              <span>{{ item.endTimeWithDay }} </span>
            </span>
          </span>
          <span>
            <span>Total transactions</span>
            <span class="ml-1 mini-title">
              {{ item.sharingRoundFinancials.totalCost }}
            </span>
          </span>
        </div>
        <div v-if="item.isClosed === true" class="d-none text-center">
          <b-btn
            :disabled="verifClicked === true"
            class="btn fs-12 mt-3 primary-btn"
            @click.stop="reCreateRound(item)"
            >Recreate round

            <b-spinner
              v-if="spinner"
              variant="white"
              label="Spinning"
              class="ml-1"
              small
            />
          </b-btn>
        </div>
      </div>
    </div>

    <b-modal
      id="roundStatusModal"
      v-model="roundStatusModal"
      modal-class="roundDetailsModal"
      hide-footer
      hide-header
      centered
      size="md"
    >
      <span class="text-right d-block mb-2" @click="roundStatusModal = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
      <div>
        <p class="mb-16 text_medium" v-text="sharingRoundToCopy.name"></p>
        <div class="d-flex justify-content-between text_medium border_bottom_1">
          <div class="">
            <p class="mb-8px color-orange">Order deadline</p>
            <p class="mb-0 px-1">
              <span>
                <!-- {{
                new Date(sharingRoundToCopy.cutOffTime).toLocaleString()
              }} -->

                {{ sharingRoundToCopy.cutOffTimeWithDay }}
              </span>
            </p>
          </div>
          <div class="text-right">
            <p class="mb-8px color-orange">Sharing day</p>
            <p class="mb-0 px-1">
              <span>
                <!-- {{
                new Date(sharingRoundToCopy.endTime).toLocaleString()
              }} -->
                {{ sharingRoundToCopy.endTimeWithDay }}
              </span>
            </p>
          </div>
        </div>
        <div
          v-for="product in sharingRoundToCopy.commoditiesDetails"
          :key="product.id"
          class="row mb-20"
        >
          <div class="col-5">
            <p class="mb-5px text_medium">
              <span v-text="product.commodityName"></span>
            </p>
            <p class="mb-0">
              <span v-text="product.sharingUnits"></span>
              <span v-text="product.unitOfMeasurement"></span>
            </p>
          </div>
          <div class="col-4 align-self-center">
            <p class="mb-0">
              <span
                >NGN
                {{ Intl.NumberFormat().format(product.sharingPrice) }}</span
              >
            </p>
          </div>
          <div class="col-3 align-self-center">
            <p class="mb-0">
              <span v-if="product.remainingSlots >= 1">
                <span v-text="product.remainingSlots"></span>
                <span>
                  {{ product.remainingSlots > 1 ? 'slots' : 'slot' }}
                </span>
              </span>
              <span v-else class="color-orange">sold out</span>
            </p>
          </div>
        </div>
        <div class="text-center">
          <b-btn
            class="btn primary-btn padded-btn"
            @click="COPY_CLIPBOARD(sharingRoundStatus)"
          >
            Copy Round Status
          </b-btn>
        </div>
      </div>
    </b-modal>

    <b-modal
      v-model="shareRoundModal"
      centered
      size="md"
      hide-footer
      hide-header
    >
      <span class="text-right d-block mb-2" @click="shareRoundModal = false">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          class="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </span>
      <div class="text-center round-linkBox">
        <span
          class="round_shareLink"
          @click="COPY_CLIPBOARD(publishLink)"
          v-text="publishLink"
        />
      </div>

      <div class="color-green copy_or_share text-center">
        <a @click="COPY_CLIPBOARD(publishLink)">Copy link</a>
        <span>&nbsp;or&nbsp;</span>
        <a class="">Share to</a>
      </div>

      <div class="share_round_socialShare text-center">
        <a
          class="socialShare_icon"
          :href="`https://wa.me/?text=${publishLink}`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-whatsapp"
            viewBox="0 0 16 16"
          >
            <path
              d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
            />
          </svg>
        </a>
        <!--  Replace with your URL. For best results, make sure you page has the proper FB Open Graph tags in header: https://developers.facebook.com/docs/opengraph/howtos/maximizing-distribution-media-content/ -->
        <a
          class="socialShare_icon"
          :href="`https://www.facebook.com/sharer/sharer.php?u=${publishLink}`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-facebook"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            />
          </svg>
        </a>

        <!-- Replace href with your Meta and URL sharingRoundStatusrmation  -->
        <!-- <a
          class="socialShare_icon"
          :href="`https://twitter.com/intent/tweet?text=${USER.id}`"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-twitter"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
          </svg>
        </a> -->

        <span class="text-primary" @click="COPY_CLIPBOARD(publishLink)">
          <svg
            width="24"
            height="24"
            version="1.1"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path
              d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
            />
          </svg>
        </span>
      </div>
    </b-modal>
  </section>
</template>

<script>
export default {
  props: {
    clickable: { type: Boolean, default: false },
    editable: { type: Boolean, default: false },
    sharable: { type: Boolean, default: false },
    sharingRounds: {
      type: Array,
      default: null,
    },
  },

  data() {
    return {
      spinner: false,
      verifClicked: false,
      shareRoundModal: false,
      roundStatusModal: false,

      sharingRoundToCopy: {},
      sharingRoundStatus: null,

      publishLink: '#',
      USER: this.$store.state.auth.userData,

      reCreateData: {
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
        waitingTimeUnit: null,
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
    }
  },

  methods: {
    editSharingRound(item) {
      // Save round form data to a perstisted Vuex store
      this.$store.commit('round/SAVE_PAYLOAD_DATA', item)

      // Redirect to the preview page
      this.$router.push(`/sharer/round/commodities/preview/`)
    },

    showShareModal(item) {
      const baseURL = location.protocol + '//' + location.host
      this.publishLink = `${baseURL}/r/${this.USER.id}/${item.id}`
      // Pop the modal up
      this.shareRoundModal = true
    },

    reCreateRound(item) {
      this.spinner = true
      this.verifClicked = true
      // Save round form data to a perstisted Vuex store
      // this.reCreateData.name = item.name + '_new'
      this.reCreateData.commodities = item.commoditiesDetails
      this.reCreateData.serviceCharge.serviceChargeAmount =
        item.serviceChargeAmount
      this.reCreateData.serviceCharge.serviceChargeType = item.serviceChargeType
      this.reCreateData.sharingAddress = item.sharingAddress
      this.reCreateData.waitingTime = item.waitingTime
      this.reCreateData.waitingTimeUnit = item.waitingTimeType
      this.reCreateData.sharingComment = item.sharingComment
      // this.reCreateData.effectivity.cutOffTime = item.cutOffTime
      // this.reCreateData.effectivity.endTime = item.endTime

      this.reCreateData.commodities.forEach((el) => {
        if (!el.costPrice) {
          el.costPrice = el.commodityFinancials.costPrice
        }
        if (!el.marketPrice) {
          el.marketPrice = null
        }
        if (!el.category) {
          el.category = {
            id: el.categories[0].id,
            categoryName: el.categories[0].name,
            shortCode: el.categories[0].shortCode,
          }
        }

        delete el.commodityFinancials
        delete el.id
        delete el.imageUrl
        delete el.participants
        delete el.purchasedSlots
        delete el.remainingSlots
        delete el.categories
        delete el.sharingComment
      })

      // this.$store.commit('round/SAVE_RECREATE_PAYLOAD_DATA', item)
      this.$store.commit('round/SAVE_RECREATE_PAYLOAD_DATA', this.reCreateData)
      // // Redirect to the preview page
      this.$router.push(`/sharer/round/create/#!recreate`)
    },

    listClicked(item) {
      if (this.clickable) {
        // Save cart data to a perstisted Vuex store
        this.$store.commit('round/SAVE_ROUND_DATA', item)
        this.$router.replace(`/sharer/dashboard/rounds/commodities/`)
      }
    },

    copyRoundStatus(item) {
      this.sharingRoundToCopy = item
      this.roundStatusModal = true

      let sharingRoundStatus = `${item.name}\n\n`
      sharingRoundStatus += `Order deadline:\n${new Date(
        item.cutOffTimeWithDay
      ).toLocaleString()}\n\n`
      sharingRoundStatus += `Sharing day:\n${new Date(
        item.endTimeWithDay
      ).toLocaleString()}\n\n`
      sharingRoundStatus += `Commodities:\n`
      item.commoditiesDetails.forEach((el) => {
        sharingRoundStatus += `\n${el.commodityName}\n${el.sharingUnits} ${
          el.unitOfMeasurement
        }\n₦${Intl.NumberFormat().format(el.sharingPrice)}\n${
          el.remainingSlots
        } slots\n\n`
      })

      const baseURL = location.protocol + '//' + location.host
      const publishLink = `${baseURL}/r/${this.USER.id}/${item.id}`
      sharingRoundStatus += publishLink

      this.sharingRoundStatus = sharingRoundStatus
    },
  },
}
</script>

<style scoped>
::v-deep .share-dropdown > button {
  padding: 0;
}

::v-deep .share-dropdown .dropdown-menu {
  border: unset;
  border-radius: unset;
  box-shadow: unset;
  color: #171f23;
  font-size: 14px;
  padding: 7.5px 14px 2px;
}
::v-deep .share-dropdown .dropdown-menu .dropdown-item {
  color: #171f23;
  font-size: 14px;
  background: unset;
  padding: 0 0 11px;
}

::v-deep .share-dropdown .dropdown-menu .dropdown-item:active {
  color: #ffffff;
}

.border_bottom_1 {
  padding-bottom: 8px;
  margin-bottom: 10px;
  border-bottom: 1px solid #e9ecef;
}
</style>
