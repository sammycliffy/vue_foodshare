<template>
  <div class="scroll-overflow">
    <div class="half-width">
      <div class="header-overlay">
        <div class="overlay-img"></div>
        <div class="overlay-bg"></div>
        <div class="top-bar">
          <div class="top-row d-flex justify-content-between">
            <div class="">
              <span class="text-bold">{{ sharingRoundPayload.name }} </span>
            </div>
          </div>
        </div>
      </div>

      <div class="body-primary">
        <p class="title text-center color-orange">Sharing Round Link</p>
        <p class="text-center color-black">
          Congratulations your sharing round has been published Successfully
        </p>
        <div class="text-center round-linkBox">
          <span
            class="round_shareLink"
            @click="COPY_CLIPBOARD(publishLink)"
            v-text="publishLink"
          />
        </div>

        <div class="color-black copy_or_share text-center">
          <a @click="COPY_CLIPBOARD(publishLink)">Copy link</a>
          <span>&nbsp;or&nbsp;</span>
          <a class="">Share to</a>
        </div>

        <div class="share_round_socialShare text-center">
          <a
            class="socialShare_icon"
            :href="`https://wa.me/?text=${publishLink}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-whatsapp"
              viewBox="0 0 16 16"
            >
              <path
                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
              />
            </svg>
          </a>
          <!--  Replace with your URL. For best results, make sure you page has the proper FB Open Graph tags in header: https://developers.facebook.com/docs/opengraph/howtos/maximizing-distribution-media-content/ -->
          <a
            class="socialShare_icon"
            :href="`https://www.facebook.com/sharer/sharer.php?u=${publishLink}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-facebook"
              viewBox="0 0 16 16"
            >
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
              />
            </svg>
          </a>

          <!-- Replace href with your Meta and URL information  -->
          <a
            class="socialShare_icon"
            :href="`https://twitter.com/intent/tweet?text=${publishLink}`"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-twitter"
              viewBox="0 0 16 16"
            >
              <path
                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
              />
            </svg>
          </a>

          <span class="text-primary" @click="COPY_CLIPBOARD(publishLink)">
            <svg
              width="24"
              height="24"
              version="1.1"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <path
                d="M17,9H7V7H17M17,13H7V11H17M14,17H7V15H14M12,3A1,1 0 0,1 13,4A1,1 0 0,1 12,5A1,1 0 0,1 11,4A1,1 0 0,1 12,3M19,3H14.82C14.4,1.84 13.3,1 12,1C10.7,1 9.6,1.84 9.18,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3Z"
              />
            </svg>
          </span>
        </div>

        <div class="text-center">
          <b-btn class="btn primary-btn" to="/sharer/dashboard/"
            >Go to Home</b-btn
          >
        </div>
      </div>
    </div>
    <partials-sharer-footer-bar />
  </div>
</template>

<script>
export default {
  data() {
    return {
      publishLink: null,
      // fetch stuff from vuex
      sharingRoundPayload: this.$store.state.round.payload,
    }
  },

  mounted() {
    const baseURL = 'https://app-qa.foodshare.ng'
    this.publishLink = `${baseURL}/r/${this.sharingRoundPayload.sharerId}/${this.sharingRoundPayload.id}/`
  },
}
</script>

<style scoped>
.body-primary {
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 135px;
  z-index: 20;
}

.top-bar {
  color: #ffffff;
  z-index: 20;
  position: relative;
}

.round-linkBox {
  padding: 10px 40px;
  background-color: rgba(79, 158, 85, 0.1);
  border-radius: 5px;
}

.share_round_socialShare {
  margin-bottom: 30px;
}

.primary-btn {
  padding: 15px 31px;
}

.text-bold {
  font-weight: bold;
}

.insidebackGreenTitle {
  font-weight: 600;
}
</style>
