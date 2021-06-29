<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
      </div>
      <div class="body-primary">
        <div class="text-center">
          <label>
            <div class="item__image">
              <b-skeleton
                v-if="$fetchState.pending"
                type="avatar"
                width="120px"
                height="120px"
              />
              <img
                v-else
                :src="FILE_BLOB || USER.image || '/assets/empty-photo.svg'"
                class="img-thumbnail profile-img mx-auto d-block"
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

          <h6 class="profile-name">
            <span v-text="USER.firstName" />
            <span v-text="USER.lastName" />
          </h6>
          <p class="profile-email m-0">
            <span v-text="USER.user" />
          </p>
        </div>

        <b-tabs v-if="USER.roles.includes('ROLE_SHARER')" class="profile_tabs">
          <b-tab title="Profile" active>
            <div class="link_list">
              <nuxt-link
                class="d-flex justify-content-between link"
                to="/profile/information/"
              >
                <span>Personal Information</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
              <nuxt-link
                class="d-flex justify-content-between link"
                to="/notification/"
              >
                <span>Notification</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
              <nuxt-link
                class="d-flex justify-content-between link"
                to="/profile/security/"
              >
                <span>My Security</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
              <nuxt-link
                class="d-flex justify-content-between link"
                to="/sharer/dashboard/group/reviews/"
              >
                <span>Reviews</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
              <nuxt-link
                class="d-flex justify-content-between no-b-border link"
                to="/profile/support/"
              >
                <span>Help &amp; Support</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
            </div>
          </b-tab>
          <b-tab title="Group">
            <div class="link_list">
              <nuxt-link
                class="d-flex justify-content-between link"
                to="/profile/group/"
              >
                <span>Group Information</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
              <nuxt-link
                class="d-flex justify-content-between no-b-border link"
                to="/profile/bank/"
              >
                <span>Bank Details</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    fill="currentColor"
                    class="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                </span>
              </nuxt-link>
            </div>
          </b-tab>
        </b-tabs>
        <div v-else class="profile_tabs mt-20">
          <div class="link_list">
            <nuxt-link
              class="d-flex justify-content-between link"
              to="/profile/information/"
            >
              <span>Personal Information</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </nuxt-link>
            <nuxt-link
              class="d-flex justify-content-between link"
              to="/profile/notification/"
            >
              <span>Notification</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </nuxt-link>
            <nuxt-link
              class="d-flex justify-content-between link"
              to="/profile/security/"
            >
              <span>My Security</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </nuxt-link>
            <nuxt-link
              class="d-flex justify-content-between no-b-border link"
              to="/profile/support/"
            >
              <span>Help &amp; Support</span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="currentColor"
                  class="bi bi-chevron-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                  />
                </svg>
              </span>
            </nuxt-link>
          </div>
        </div>

        <div class="">
          <div
            class="card_btn d-flex justify-content-between icon-cusor"
            @click="logUserOut"
          >
            <span>Sign Out</span>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-box-arrow-right"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                />
                <path
                  fill-rule="evenodd"
                  d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                />
              </svg>
            </span>
          </div>
          <b-overlay v-if="confirmationLogOutDialog" show no-wrap>
            <template #overlay>
              <!-- <div v-if="spinner" class="text-center">
              <b-spinner variant="primary" label="deleting"></b-spinner>
              <div class="pt-3">Logging Out. Please wait.</div>
            </div> -->

              <div
                ref="dialog"
                tabindex="-1"
                role="dialog"
                aria-modal="false"
                aria-labelledby="form-confirm-label"
                class="text-center p-3"
              >
                <p>
                  <strong id="form-confirm-label"
                    >Are you sure, you want to log out?</strong
                  >
                </p>
                <div class="d-flex">
                  <b-button
                    variant="outline-danger"
                    class="mr-3"
                    @click="confirmationLogOutDialog = false"
                  >
                    Cancel
                  </b-button>
                  <b-button variant="outline-success" to="/account/logout"
                    >OK</b-button
                  >
                </div>
              </div>
            </template>
          </b-overlay>
        </div>
      </div>
    </div>

    <partials-footer />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      FILE: null,
      FILE_BLOB: null,
      labelText: 'Tap to change picture',

      USER: this.$store.state.auth.userData,
      confirmationLogOutDialog: false,
    }
  },

  async fetch() {
    // fetch sharer's sharing group details
    const URL = `/services/users/${this.USER.id}/image/link`
    await this.$axios
      .$get(URL)
      .then((res) => {
        this.USER.image = res.result.url
        this.$forceUpdate()
      })
      .catch(() => {
        //
      })
  },

  methods: {
    validate() {
      if (this.FILE && this.FILE.size < 1048576) {
        return true
      } else {
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
        formData.append('userId', this.USER.id)
        this.FILE_BLOB = URL.createObjectURL(this.FILE)

        // Make upload request to the API
        await this.$axios
          .$put(`/services/users/${this.USER.id}/image`, formData)
          .then(() => {
            this.labelText = 'Photo changed successfully!'
            this.SHOW_TOAST({
              title: 'success',
              variant: 'success',
              text: 'Photo changed!',
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

    logUserOut() {
      this.confirmationLogOutDialog = true
    },
  },
}
</script>

<style scoped>
.body-primary {
  position: absolute;
  background-color: transparent;
  padding: 0 18px 80px;
  top: 155px;
  left: 0;
  right: 0;
  z-index: 150;
  border-top-left-radius: unset;
  border-top-right-radius: unset;
  margin-top: -60px;
}
.scroll-overflow {
  position: relative;
}
.header-overlay {
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  height: 155px;
  z-index: 1;
}

.header-overlay > .overlay-img {
  width: 100%;
  background-repeat: no-repeat;
  background-position: top;
  background-size: contain;
  background-clip: content-box;
  background-image: url('/assets/fruits.png');
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 155px;
}
.header-overlay > .overlay-bg {
  height: 155px;
  background-color: rgba(79, 158, 85, 0.9);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.card_btn {
  padding: 17px 25px;
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  background-color: #ffffff;
}

.card_btn > span {
  font-size: 15px;
  line-height: 23px;
  letter-spacing: 0.04px;
  color: #070606;
  font-weight: 600;
}

.link_list {
  box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
  border-radius: 5px;
  background-color: #ffffff;
}

.link_list > .link {
  padding: 17px 25px;
  border-bottom: 0.2px solid rgba(183, 185, 197, 1);
  text-decoration: none;
}

.link_list > .link > span {
  font-size: 15px;
  line-height: 23px;
  letter-spacing: 0.04px;
  color: #070606;
  font-weight: 600;
}

.no-b-border {
  border-bottom: unset !important;
}

.profile-img {
  border-radius: 5rem !important;
  height: 120px;
  width: 120px;
  border: 5px solid #ffffff !important;
  box-shadow: unset;
}

.profile-name {
  font-weight: bold;
  line-height: 32px;
  font-size: 18px;
  letter-spacing: 0.9px;
  margin: 0 0 6px !important;
}

.profile-email {
  line-height: 25px;
  font-size: 16px;
  letter-spacing: 0.8px;
}

::v-deep .profile_tabs .nav-tabs {
  margin: 20px 46px 30px;
  border-bottom: 2px solid rgba(254, 143, 10, 0.4);
}

.profile_tabs {
  margin-bottom: 30px;
}

::v-deep .profile_tabs .nav-tabs .nav-link {
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.8px;
  padding: 0 30px 0 16px;
  color: rgba(0, 0, 0, 0.5);
  background-color: transparent;
}

::v-deep .profile_tabs .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-bottom: 2px solid #fe8f0a !important;
  color: #000000;
}

::v-deep .profile_tabs .nav-tabs .nav-link:hover,
.nav-tabs .nav-link:focus {
  border-color: transparent;
}

::v-deep .profile_tabs .nav-tabs .nav-link.active,
.nav-tabs .nav-item.show .nav-link {
  border-color: transparent;
}

@media (max-width: 400px) {
  ::v-deep .profile_tabs .nav-tabs .nav-link {
    padding: 0 15px;
  }
  ::v-deep .profile_tabs .nav-tabs {
    margin: 20px;
  }
}

@media (max-width: 250px) {
  ::v-deep .profile_tabs .nav-tabs {
    margin: 20px 10px;
  }
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
