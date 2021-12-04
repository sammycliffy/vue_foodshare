import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'
import {
  required,
  email,
  alpha,
  alpha_dash,
  alpha_spaces,
  digits,
  min,
  max,
} from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

const dictionary = {
  en: {
    messages: {
      required: () => '* Required',
    },
  },
}

// Install required rule.
extend('required', required)
extend('email', email)
extend('alpha', alpha)
extend('alphaDash', alpha_dash)
extend('alphaSpaces', alpha_spaces)
extend('digits', digits)
extend('max', max)
extend('min', min)

localize(dictionary)
