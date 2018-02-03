import Vue from 'vue'
import Options from './Options.vue'

Vue.config.productionTip = false

new Vue({
  el: '#options',
  template: '<Options/>',
  components: { Options },
  render: c => c(Options)
})