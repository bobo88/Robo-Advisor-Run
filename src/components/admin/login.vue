  <template>
    <form>
      <input type="" name="" placeholder="用户名" v-model="userName">
      <input type="" name="" placeholder="密 码" v-model="pw">
      <button type="" @click="submit($event)">登录</button>
    </form>
  </template>
  <script>
    export default {
      name: 'login',
      data () {
        return {
          userName: '',
          pw: ''
        }
      },
      methods: {
        submit (event) {
          console.log(111)
          event.stopPropagation()
          var params = {
            userName: this.userName,
            pw: this.pw
          }
          this.$axios('roboAdvisor/login', 'post', params).then(obj => {
            // console.log(obj)
            if (obj.data.code === 100) {
               this.$store.commit('SETTOKEN', obj.data.data.trading_token)
              sessionStorage.setItem('trading_token', obj.data.data.trading_token)
            }
          })
        }
      }
    }
  </script>
  <style>

  </style>
