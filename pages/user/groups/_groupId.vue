<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="top-bar">
        <div class="top-row d-flex justify-content-between align-items-center">
          <div class="d-flex justify-content-around">
            <partials-back-nav-button />
            <div class="d-flex justify-content-around">
              <span class="ml-1">
                <img
                  class="sharerGroupLogo rounded-circle"
                  :src="group.groupImage || '/assets/empty-photo.svg'"
                  :alt="group.groupName"
                />
              </span>
              <span class="ml-3">
                <h5 class="mb-0 title" v-text="group.groupName"></h5>
              </span>
            </div>
          </div>
          <div class="text-right"></div>
        </div>
      </div>

      <div class="body-primary">
        <div class="body-primary">
          <section v-if="$fetchState.pending" class="text-center p-5">
            <partials-skeleton-loader />
          </section>

          <section v-else-if="$fetchState.error" class="text-center p-5">
            Something Occured. Please, Try Again
          </section>

          <section v-else>
            <div class="contentCard">
              <p class="mb-8px text_medium">Description</p>
              <p class="mb-0 contentText" v-text="group.description"></p>
            </div>
            <div class="contentCard">
              <p class="mb-8px text_medium">Contact Address</p>
              <div class="mb-0 contentText">
                <div
                  v-text="`${group.address.lineOne} ${group.address.lineTwo},`"
                />
                <div v-text="`${group.address.town},`" />
                <div v-text="` ${group.address.state},`" />
                <div v-text="group.address.country" />
              </div>
            </div>
            <div class="contentCard mb-24">
              <p class="mb-8px text_medium">Phone Number</p>
              <p class="mb-0 contentText" v-text="group.phoneNumber"></p>
            </div>
            <h5 class="color-orange text_medium my-3">Group Members</h5>
            <div v-for="item in group.members" :key="item.email" class="">
              <div class="d-flex flex-row align-items-center mb-20">
                <img
                  class="userImage rounded-circle"
                  :src="item.imageUrl || '/assets/empty-photo.svg'"
                />
                <span
                  class="ml-2 mb-0 primary-p"
                  v-text="item.firstName"
                ></span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
    <partials-user-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      group: {},
      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // Fetch sharer's rounds
    const URL = `/services/sharing-groups/users/user/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        const groupId = this.$route.params.groupId
        // eslint-disable-next-line eqeqeq
        this.group = res.result.groups.find((el) => el.groupId == groupId)
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
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
  margin-top: 30px;
}

.contentCard {
  border-radius: 2px;
  background-color: #ffffff;
  padding: 15px 14px;
  margin-bottom: 18px;
}

.contentText {
  color: #070606;
  font-size: 14px;
  line-height: 22px;
}

.userImage {
  width: 45px;
  height: 45px;
}
</style>
