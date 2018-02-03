import Vue from 'vue'
import Popup from './Popup.vue'

Vue.config.productionTip = false

new Vue({
  el: '#popup',
  template: '<Popup/>',
  components: { Popup },
  render: c => c(Popup)
})
