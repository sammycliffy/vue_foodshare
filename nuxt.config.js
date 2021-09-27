export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'FoodSHARE',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" ',
      },
      { hid: 'description', name: 'description', content: 'Collabo Shopping' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Open+Sans&family=Poppins&display=swap',
      },
      {
        rel: 'stylesheet',
        crossorigin: 'anonymous',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css',
        integrity:
          'sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==',
      },
    ],
    script: [
      {
        src: 'https://script.crazyegg.com/pages/scripts/0108/0597.js',
        async: true,
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/custom.scss'],

  loadingIndicator: {
    name: 'cube-grid',
    color: '#fff',
    background: '#4f9e55',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/mixins' },
    { src: '~/plugins/axios' },
    { src: '~/plugins/v-calendar' },
    { src: '~/plugins/vue-select' },
    { src: '~/plugins/v-owl-carousel', ssr: false },
    { src: '~/plugins/vee-validate.js', ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    '@nuxtjs/google-analytics',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['auth', 'cart', 'round', 'localStorage'],
      },
    ],
  ],

  bootstrapVue: {
    icons: false,
  },

  //  Google Analytics
  googleAnalytics: {
    id: 'UA-202704667-1',
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {
      fileName: 'logo.png',
    },
    manifest: {
      lang: 'en',
      name: 'FoodSHARE',
      short_name: 'FoodSHARE',
      description: 'Collabo Shopping',
      'theme-color': '#4f9e55',
    },
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],
  },

  publicRuntimeConfig: {
    // baseAPI: 'https://foodshare-service-prod.eu-gb.mybluemix.net/api/v1',
    baseAPI:
      process.env.BASE_API ||
      'https://foodshare-service-qa.eu-gb.mybluemix.net/api/v1',
  },

  server: {
    port: 8080, // default: 3000
  },

  generate: {
    fallback: true,
  },

  extend(config, ctx) {},
  babel: { compact: true },
}
