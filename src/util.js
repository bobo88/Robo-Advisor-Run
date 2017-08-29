import axios from 'axios'

export default {
  install (Vue, option) {
    Vue.prototype.$axios = function (url, method, params) {
      return (
        axios({
          url: 'http://119.23.35.234:8088/' + url,
          method: method,
          params: params,
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
      )
    },
    Vue.prototype.formatTime = function (value) {
      var value = new Date(value)
      var year = value.getFullYear().toString()
      var month = (value.getMonth() + 1).toString()
      if (month.length === 1) month = 0 + month
      var day = value.getDate().toString()
     if (day.length === 1) day = 0 + day
      return year + month + day
    },
    Vue.prototype.formatTime1 = function (value) {
      var value = new Date(value)
      var year = value.getFullYear().toString()
      var month = (value.getMonth() + 1).toString()
      if (month.length === 1) month = 0 + month
      var day = value.getDate().toString()
     if (day.length === 1) day = 0 + day
      return year + '-' + month + '-' + day
    }
  }
}