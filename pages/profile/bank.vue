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
              <span class="mt_5px">Bank Details </span>
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <nav v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </nav>

        <nav v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </nav>

        <section v-else>
          <div class="form-group">
            <label class="profileFormLabel">Account Name</label>
            <div class="profileFormInput">
              <span v-text="financialDetails.accountName" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Account Number</label>
            <div class="profileFormInput">
              <span v-text="financialDetails.accountNumber" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Bank Name</label>
            <div class="profileFormInput">
              <span v-text="financialDetails.bankName" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      financialDetails: null,

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    let URL = `/services/sharing-groups/${this.USER.id}`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.financialDetails = response.result.financialDetails
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
      })

    // Fetch Banks Names
    URL = `https://app.nuban.com.ng/bank_codes.json`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.bankNames = response[2].data
      })
      .catch(() => {
        // Do nothing
      })
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
  color: #070606;
  font-family: 'Poppins', sans-serif;
  opacity: 52;
}

::v-deep .regVselect .vs__clear,
::v-deep .regVselect .vs__open-indicator {
  fill: #070606;
}

::v-deep .regVselect .vs__dropdown-option--highlight {
  background: #4f9e55;
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
