<template>
  <div class="bg-general-color scroll-overflow">
    <div class="half-width">
      <div class="d-flex">
        <partials-back-nav-button />
        <h4 class="backicon-margin">Forgot Password</h4>
      </div>
      <div class="text-center">
        <img src="/assets/fg-password-big.svg" class="verifyImg" />
      </div>
      <div class="text-center successMessage">
        <h6>Your Password reset was successful</h6>
      </div>
      <div class="text-center my-3">
        <nuxt-link class="textDecoNone" to="/account/login/">
          <b-btn class="btn-block btn poppins mx-auto btnSharer">Login</b-btn>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  methods: {},
}
</script>

<style scoped>
.scroll-overflow {
  background-color: #eef5ee;
  padding: 25px 18px;
  overflow-y: scroll;
}

.verifyImg {
  width: 259px;
  margin: 85px auto 30px;
}

.successMessage > h6 {
  font-size: 18px;
  line-height: 36px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 12px;
}

.successMessage > p {
  font-size: 14px;
  letter-spacing: 0.22px;
  color: #000000;
  line-height: 28px;
  margin-bottom: 0;
}

.btnSharer {
  background: #4f9e55;
  color: #ffffff;
  margin-top: 30px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -moz-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
}
.btnSharer:active {
  background: #313131;
}

.backicon-margin {
  margin-top: 5px;
  font-size: 18px;
  line-height: 20px;
}
</style>
