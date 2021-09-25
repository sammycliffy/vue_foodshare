<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="welcomeBanner">
        <h2 class="poppins">
          Hello, <span v-text="userData ? userData.firstName : ''" />
        </h2>

        <div class="text-center welcomebannerImg">
          <img src="/assets/fruits.png" class="img-fluid" />
        </div>
      </div>

      <div class="welcomeBox text-center">
        <h1 class="poppins">Welcome</h1>
        <div v-if="!sharer.active">
          <p class="poppins">You have not created any sharing round</p>

          <nuxt-link class="btn primary-btn" to="/sharer/round/create/">
            Create sharing round
          </nuxt-link>
        </div>
        <div v-else class="">
          <p class="poppins">Below are your active sharing rounds</p>
          <div
            v-for="item in sharer.sharingRound"
            :key="item.id"
            class="sharingRoundListBox"
          >
            <div class="sharingRoundBox text-left">
              <div class="d-flex justify-content-between">
                <span>
                  <span class="" v-text="item.name"></span>
                  <span class="d-block" v-text="item.id"></span>
                </span>
                <span>
                  <i class="fas fa-pencil-alt"></i>
                  <i class="fas fa-share-alt"></i>
                </span>
              </div>
              <div class="d-flex justify-content-around">
                <span>
                  <i class="fas fa-users"></i>
                  <span v-if="item.products > 1"
                    >{{ item.products }} Products</span
                  >
                  <span v-else>{{ item.products }} Product</span>
                </span>
                <span>
                  <i class="fas fa-users"></i>
                  <span v-if="item.members > 1">
                    {{ item.members }} Members</span
                  >
                  <span v-else>{{ item.members }} Member</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',

  data() {
    return {
      member: {
        firstName: 'Muna',
      },

      sharer: {
        active: false,
        sharingRound: [
          {
            name: 'Dello',
            id: 1,
            products: 5,
            members: 2,
          },
          {
            name: 'Mark',
            id: 2,
            products: 3,
            members: 10,
          },
          {
            name: 'Beans',
            id: 3,
            products: 2,
            members: 4,
          },
        ],
      },

      userData: this.$store.state.auth.userData,
    }
  },

  methods: {},
}
</script>

<style scoped>
.welcomeBanner {
  height: 46vh;
  background-color: #4f9e55;
  border-radius: 0px 0px 20px 20px;
  padding: 35px 20px 35px;
}

h2 {
  font-size: 20px;
  line-height: 36px;
  color: #ffffff;
  margin: 0;
  z-index: 20;
  font-weight: bold;
}

.welcomebannerImg > img {
  margin-top: -10px;
}

h1 {
  color: #000000;
  font-size: 30px;
  line-height: 36px;
  font-weight: bold;
  margin-top: 66px;
}

p {
  font-size: 16px;
  line-height: 25px;
  margin-bottom: 14px;
  font-weight: 00;
}

@media (max-height: 640px) {
  .welcomebannerImg > img {
    height: 180px;
  }
}
@media (max-height: 500px) {
  .welcomebannerImg > img {
    height: 150px;
  }
}
@media (max-height: 400px) {
  .welcomebannerImg > img {
    height: 100px;
    margin-top: -20px;
  }
}
@media (min-height: 1000px) {
  .welcomebannerImg > img {
    height: 300px;
  }
}
</style>
