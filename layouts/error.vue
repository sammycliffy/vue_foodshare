<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="text-center">
        <img src="/assets/error.svg" class="svgImg" />
      </div>
      <div class="text-center">
        <h5 class="text_medium">Something’s gone wrong!</h5>
      </div>
      <div class="text-center mt-24">
        <b-btn class="btn primary-btn padded-btn" to="/"> Go to Home </b-btn>
      </div>
    </div>
  </div>
</template>

<style scoped>
.scroll-overflow {
  padding: 40px 18px;
  overflow-y: scroll;
}

.svgImg {
  width: 292px;
  margin: 30% auto 22px;
}
</style>
