<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="d-flex">
        <h5 class="title mb-0">Notifications</h5>
      </div>
      <p class="notifyDateTitle">Today</p>
      <div v-for="item in notifications" :key="item.id" class="">
        <div class="notifyCard">
          <p v-text="item.details"></p>
          <div class="cardBottom">
            <span v-text="item.date"></span>
          </div>
        </div>
      </div>
    </div>
    <div>
      <partials-sharer-footer-bar v-if="USER.roles.includes('ROLE_SHARER')" />
      <partials-user-footer-bar v-else />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.userData,

      notifications: [
        {
          id: 1,
          date: '21-06-2021 06:06 PM',
          details:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        },
        {
          id: 2,
          date: '30-07-2021 07:06 PM',
          details:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        },
        {
          id: 3,
          date: '22-06-2021 10:06 PM',
          details:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        },
        {
          id: 4,
          date: '25-06-2021 06:06 PM',
          details:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam',
        },
      ],
    }
  },

  methods: {},
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
  padding: 30px 18px 80px;
  overflow-y: scroll;
}
.title {
  margin-top: 0;
}

.notifyCard {
  border-radius: 5px;
  background-color: rgba(79, 158, 85, 0.2);
  margin-bottom: 24px;
  box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.03);
  -webkit-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.03);
  -moz-box-shadow: 0px 3px 6px 0 rgba(0, 0, 0, 0.03);
}
.notifyCard p {
  padding: 20px 13px 16px 22px;
  margin-bottom: 0;
}
.cardBottom {
  border-top: 0.2px solid rgba(7, 6, 6, 0.05);
  padding: 8.48px 13px 16px 22px;
  font-size: 12px;
  line-height: 18px;
}

.notifyDateTitle {
  letter-spacing: 0.64px;
  margin: 15px 0 24px;
}
</style>
