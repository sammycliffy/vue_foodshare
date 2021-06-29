<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row">
            <div class="text-right"></div>
            <h5 class="title mb-0 mt-0 color-white">
              <span>Hey</span>
              <span v-text="USER.firstName"></span>
            </h5>
            <p class="mb-0">
              You are subscribed to
              <span v-text="groups.length"></span>
              {{ groups.length > 1 ? 'sharing groups' : 'sharing group' }}
            </p>
          </div>
        </div>
      </div>

      <div class="body-primary half-width">
        <section v-if="$fetchState.pending" class="text-center p-5">
          <partials-skeleton-loader />
        </section>

        <section v-else-if="$fetchState.error" class="text-center p-5">
          Something Occured. Please, Try Again
        </section>

        <section v-else-if="groups.length < 1">
          <div class="bg-white p-3 rounded text-center">No Sharing Groups</div>
        </section>

        <section v-else>
          <article
            v-for="item in groups"
            :key="item.id"
            class="plain-link color-black"
            @click="goNextPage(item)"
          >
            <div class="groupCard mb-20">
              <p class="mb-0 text_medium" v-text="item.groupName"></p>
              <div class="py-14">
                <span>
                  <img
                    class=""
                    src="/assets/icons/group-orange.svg"
                    alt="participant image"
                  />
                </span>
                <span class="ml-2">
                  <span v-text="item.members.length"></span>
                  <span v-if="item.members.length > 1">Members</span>
                  <span v-else>Member</span>
                </span>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>

    <partials-user-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      groups: [],

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // Fetch sharer's rounds
    const URL = `/services/sharing-groups/users/user/${this.USER.id}`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.groups = res.result.groups
      })
      .catch((e) => {
        this.ERROR_HANDLER(e)
      })
  },

  methods: {
    goNextPage(item) {
      // redirect to next page
      this.$router.push(`/user/groups/${item.groupId}/`)
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
  top: 155px;
  z-index: 20;
  overflow-y: auto;
  padding: 30px 18px 60px;
}

.header-overlay > .overlay-bg {
  height: 170px;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  margin-top: 20px;
  position: relative;
}

.groupCard {
  border-radius: 7px;
  border: 1px solid #f5f5f5;
  background-color: #ffffff;
  padding: 18px 20px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.05);
}

@media (min-width: 1024px) {
  .body-primary {
    left: 25%;
    right: 25%;
  }
}
</style>
