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
  min_value,
  max_value,
  numeric,
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
extend('alpha_dash', alpha_dash)
extend('alpha_spaces', alpha_spaces)
extend('digits', digits)
extend('max', max)
extend('min', min)
extend('min_value', min_value)
extend('max_value', max_value)
extend('numeric', numeric)

localize(dictionary)
