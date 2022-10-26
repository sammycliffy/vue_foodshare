<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex justify-content-between mb-20">
        <h5 class="title">Group Members</h5>
      </div>

      <nav v-if="$fetchState.pending" class="sharingRoundListBox">
        <partials-skeleton-loader />
      </nav>

      <div v-else-if="$fetchState.error" class="bg-white text-center py-3">
        Something Occured. Please, Try Again
      </div>

      <section v-else>
        <div v-if="groupMembers && groupMembers.length < 1" class="groupCard">
          <div v-if="!displayInfo[i]" class="bg-white text-center py-3">
            No Member Found
          </div>
        </div>

        <div v-for="(item, i) in groupMembers" v-else :key="`${item.id}-${i}`">
          <div class="groupCard">
            <div v-if="!displayInfo[i]" class="row mx-0 memberDetails">
              <div class="col px-0 align-self-center">
                <div class="item__image">
                  <img
                    :src="item.imageUrl || '/assets/empty-photo.svg'"
                    class="rounded-circle border border-primary"
                  />
                </div>
              </div>
              <div class="col-9 pl-3">
                <p
                  class="text_medium"
                  v-text="`${item.firstName} ${item.lastName}`"
                ></p>
                <p class="date">
                  <span>Joined</span>
                  <span v-text="item.joinedDate"></span>
                </p>
                <span class="link text_semiBold" @click="toggleInfoDisplay(i)"
                  >View Contact Info</span
                >
              </div>
            </div>
            <div v-else class="hiddenDetails">
              <div class="back-icon color-black mb-1">
                <span @click="toggleInfoDisplay(i)">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21.8"
                    height="25"
                    fill="currentColor"
                    class="bi bi-arrow-left"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                    />
                  </svg>
                </span>
              </div>
              <!-- <p class="address" v-text="item.deliveryAddress"></p> -->
              <p><strong>Phone:</strong> <span v-text="item.phone"></span></p>
              <p>
                <strong>E-mail:</strong>
                <span v-text="item.email"></span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      displayInfo: [],
      groupMembers: null,

      USER: this.$store.state.auth.userData,
    }
  },

  async fetch() {
    // Fetch Sharer's group member
    const URL = `/services/sharing-groups/${this.USER.id}/members`
    await this.$axios
      .$get(URL, {})
      .then((res) => {
        this.groupMembers = res.result.members
      })
      .catch((error) => {
        this.ERROR_HANDLER(error)
        throw error
      })
  },

  methods: {
    toggleInfoDisplay(i) {
      this.displayInfo[i] = !this.displayInfo[i]
      this.$forceUpdate()
    },
  },
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
  padding: 20px 18px 40px;
  overflow-y: scroll;
}

.memberDetails img {
  height: 67px;
  width: 67px;
}

.groupCard {
  padding: 14px 18px;
  background-color: #ffffff;
  margin-bottom: 30px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16);
  -webkit-box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16);
  -moz-box-shadow: 0px 2px 4px 0 rgba(0, 0, 0, 0.16);
}

.memberDetails p {
  margin-bottom: 8px;
  margin-top: 13px;
}
.memberDetails .date {
  margin-bottom: 7px;
  margin-top: 0;
  font-size: 14px;
  line-height: 22px;
}
.memberDetails .link {
  font-size: 12px;
  line-height: 22px;
}
.hiddenDetails p {
  font-size: 14px;
  line-height: 22px;
}
.hiddenDetails .address {
  margin-bottom: 11px;
}
</style>
