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
              <span class="mt_5px">Group Information </span>
            </div>
          </div>
        </div>
      </div>

      <main class="body-primary">
        <section v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </section>

        <section v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </section>

        <section v-else>
          <div class="text-center">
            <label>
              <div class="item__image">
                <img
                  :src="
                    FILE_BLOB ||
                    sharingGroupDetails.groupImage ||
                    '/assets/empty-photo.svg'
                  "
                  class="rounded-circle mx-auto d-block"
                  width="75"
                  height="75"
                />
              </div>
              <div class="pt-1 font-weight-light text-muted">
                <small v-text="labelText" />
              </div>
              <b-form-file
                v-model="FILE"
                class="d-none"
                accept="image/jpeg, image/png"
                @input="uploadPhoto()"
              />
            </label>
          </div>

          <div class="form-group">
            <label class="profileFormLabel">Name of Sharing Group</label>
            <div class="profileFormInput">
              <span v-text="sharingGroupDetails.groupName" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Contact Address</label>
            <div class="profileFormInput remove-h">
              <div
                v-text="
                  `${sharingGroupDetails.address.lineOne} ${sharingGroupDetails.address.lineTwo},`
                "
              />
              <div v-text="`${sharingGroupDetails.address.town},`" />
              <div v-text="` ${sharingGroupDetails.address.state},`" />
              <div v-text="sharingGroupDetails.address.country" />
            </div>
          </div>
          <div class="form-group">
            <label class="profileFormLabel">Description</label>
            <div class="profileFormInput remove-h">
              <span v-text="sharingGroupDetails.description" />
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      FILE: null,
      FILE_BLOB: null,
      groupPhoto: null,
      labelText: 'Tap to upload group picture',

      sharingGroupDetails: null,

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    let URL = `/services/sharing-groups/${this.USER.id}`
    await this.$axios
      .$get(URL)
      .then((response) => {
        this.sharingGroupDetails = response.result
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

  methods: {
    validate() {
      if (this.FILE && this.FILE.size < 1048576) {
        return true
      } else if (!this.FILE) {
        this.SHOW_TOAST({
          text: 'Please upload a valid file!',
          variant: 'warning',
          title: 'Required',
        })
      } else if (this.FILE.size > 1048576) {
        this.labelText = 'Maximum file size allowed is 1MB'
        this.SHOW_TOAST({
          title: 'Error',
          variant: 'warning',
          text: this.labelText,
        })
      }

      return false
    },

    async uploadPhoto() {
      if (this.validate()) {
        this.labelText = 'Please wait...'
        // Convert photo to base64 format (i.e data url)
        const formData = new FormData()
        formData.append('file', this.FILE)
        formData.append('sharerId', this.USER.id)
        this.FILE_BLOB = URL.createObjectURL(this.FILE)

        // Make upload request to the API
        await this.$axios
          .$put(`/services/sharing-groups/${this.USER.id}`, formData)
          .then(() => {
            this.labelText = 'Photo changed successfully!'
            this.SHOW_TOAST({
              title: 'success',
              variant: 'success',
              text: 'Group photo changed successfully!',
            })
          })
          .catch((e) => {
            this.ERROR_HANDLER(e)
            this.labelText = 'Something occured'
          })
          .finally(() => {
            // Close the loader
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
  padding-bottom: 50px;
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

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
