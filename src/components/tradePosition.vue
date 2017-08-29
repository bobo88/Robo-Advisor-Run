<!--
内容：持仓 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="trade-position">
    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData.tHead">
            <strong>{{ item }}</strong>
          </th>
        </tr>
      </thead>
      <tbody v-if="tableData.tDataList.length">
        <tr v-for="item in tableData.tDataList">
          <td>{{ item.spotName }}</td>
          <td>{{ item.positionType }}</td>
          <td>{{ item.positionAmount }}</td>
          <td>{{ item.availableAmount }}</td>
          <td>{{ item.currentPrice }}</td>
          <td>{{ item.averageCost}}</td>
        </tr>
      </tbody>
      <tbody v-if="!tableData.tDataList.length">
          <tr>
              <td colspan="9">该数据为空</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'trade-position',
    data () {
        return {
            tableData: {
                tHead: ['合约', '多空类型', '数量/可用', '现价', '开仓均价', '浮动盈亏'],
                tDataList: []
            }
        }
    },
    created () {
      var url = 'marketAccount/currentPosition'
      var params = {
        trading_token: this.$store.state.trading_token
      }
      this.$axios(url, 'post', params).then(obj => {
        if (obj.data.code === 100) {
          this.tableData.tDataList = obj.data.data.list_defer_posi_info
        }
      })
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .trade-position{

    }
</style>
