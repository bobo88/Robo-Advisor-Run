// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import util from './util'
import axios from 'axios'
import iView from 'iview'
import 'iview/dist/styles/iview.css'    // 使用 CSS

Vue.use(iView);
Vue.use(Vuex);
Vue.use(util);
Vue.prototype.$http = axios;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;';
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
    },
    trading_token: sessionStorage.getItem('trading_token'),
    nickname: sessionStorage.getItem('nickname')
  },
  mutations: {
    ModifiedStateAu: function (state) {
      state.marketstate.Au = 1
    },
    SETTOKEN: function (state, trading_token) {
      state.trading_token = trading_token
    },
    SETNICKNAME: function (state, nickname) {
      state.nickname = nickname
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: vuexStore,
  template: '<App/>',
  components: { App },
  //监听路由检查登录
  watch:{
  "$route" : 'checkLogin'
  },
  created: function(){
    this.checkLogin();
  },
  methods: {
    checkLogin(){
      //检查是否存在trading_token
      if(!sessionStorage.getItem('trading_token')){
        //如果没有登录状态则跳转到登录页
        this.$router.push('/login');
      }
      // else{
      //   //否则跳转到登录后的页面
      //   this.$router.push('/main');
      // }
    }
  }
})
