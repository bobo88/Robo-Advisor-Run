<template>
  <div id="main">
    <left></left>
    <top></top>
    
    <div class="main-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Left from '@/components/common/Left'
import Top from '@/components/common/Top'
import '@/fonts/iconfont.css'    // 使用 iconfont图标库
import io from 'socket.io-client'

export default {
  components: {
    Left,
    Top
  },
  name: 'main',
  beforeCreate () {
        // console.log('aa')
        var that = this
        var socket = io.connect(process.env.SOCKET_URL)
          console.log(that.$store.state.marketstate.Au)
            socket.on('marketAu', function (data) {
                // console.log(that.$store.state.quoatation.Au)
                that.$store.state.quoatation.Au = data
                // that.quotationloaded.Au = true
                if (!that.$store.state.marketstate.Au) {
                  that.$store.state.marketstate.Au = true
                }
            })
            socket.on('marketAg', function (data) {
                that.$store.state.quoatation.Ag = data
                // that.quotationloaded.Ag = true
                if (!that.$store.state.marketstate.Ag) {
                  that.$store.state.marketstate.Ag = true
                }
            })
            socket.on('marketmAu', function (data) {
                that.$store.state.quoatation.mAu = data
                // that.quotationloaded.mAu = true
                 if (!that.$store.state.marketstate.mAu) {
                  that.$store.state.marketstate.mAu = true
                }
            })
    }
}
</script>

<style lang="less">
.main-content{ padding: 110px 50px 20px 310px; min-width: 100%; min-height: 100%;}
</style>
