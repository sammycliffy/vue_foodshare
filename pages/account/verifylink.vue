<template>
  <div class="scroll-overflow bg-general-color">
    <div class="half-width">
      <div class="text-center">
        <img src="/assets/verify.svg" class="verifyImg" />
      </div>
      <div class="text-center successMessage">
        <h6>Verification Link was resent successfully</h6>
        <p>Kindly check your Email to verify your account.</p>
      </div>
      <div class="text-center">
        <nuxt-link
          class="btn-block btn poppins mx-auto btnSharer"
          to="/account/login/"
          >Continue</nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'public',

  data() {
    return {
      //  no data
    }
  },
  methods: {
    // nothing
  },
}
</script>

<style scoped>
.scroll-overflow {
  padding: 40px 18px;
  overflow-y: scroll;
}

.paymentSuccessBg {
  height: 200px;
}

.icon {
  margin-top: 61px;
  color: rgba(255, 255, 255, 0.95);
}

.verifyImg {
  width: 205px;
  margin: 45px auto 50px;
}

.successMessage > h6 {
  font-size: 20px;
  line-height: 19px;
  color: #000000;
  font-weight: bold;
  margin-bottom: 14px;
}

.successMessage > p {
  font-size: 14px;
  letter-spacing: 0.22px;
  color: #000000;
  line-height: 24px;
  margin-bottom: 30px;
}

.btnSharer {
  background: #4f9e55;
  color: #ffffff;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -webkit-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
  -moz-box-shadow: 0px 3px 6px 0px rgba(79, 158, 85, 0.3);
}
.btnSharer:active {
  background: #313131;
}
</style>
