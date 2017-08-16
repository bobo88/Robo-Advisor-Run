// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'

import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS

Vue.use(iView)
Vue.use(Vuex)
Vue.config.productionTip = false

/* eslint-disable no-new */
const vuexStore = new Vuex.Store({
    state: {
        quoatation: {
          Au: [],
          Ag: [],
          mAu: []
        },
        marketstate: {
            Au: 0,
            Ag: 0,
            mAu: 0
        }
    },
    mutations: {
      ModifiedStateAu: function (state) {
        state.marketstate.Au = 1
      }
    }
})
 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: vuexStore,
  template: '<App/>',
  components: { App }
})
