import Vue from 'vue'
import ErrorHandler from '~/mixins/ErrorHandler'

// Make sure to pick a unique name for the flag
// so it won't conflict with any other mixin.
if (!Vue.__my_mixin__) {
  Vue.__my_mixin__ = true
  Vue.mixin(ErrorHandler) // Set up your mixin then
}
