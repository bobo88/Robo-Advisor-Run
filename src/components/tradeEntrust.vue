<!--
内容： 委托 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="trade-entrust">
    <div class="tit">
        <span class="fl">历史委托/申报查询</span>
        <div class="entrust-query-summary fr">
            <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="end_date"></Date-picker>
            <span class="mr10">至</span>
            <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="start_date"></Date-picker>
            <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="entrustQuery(1)">查询</Button>
        </div>
    </div>
    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData.tHead">
            <strong>{{ item.title }}</strong>
            {{ item.lang }}
          </th>
        </tr>
      </thead>
      <tbody v-if="tableData.tDataList.length">
        <tr v-for="item in tableData.tDataList">
          <td>{{ item.eExchTime }}</td>
          <td>{{ item.prodCode }}</td>
          <td>{{ item.orderType }}</td>
          <td>{{ item.orderPrice | currencyFormatter }}</td>
          <td>{{ item.orderAmount }}</td>
          <td>{{ item.matchAmount }}</td>
          <td>{{ item.entrStat }}
          <td style="color: #24B1F7;">{{item.order}}</td>
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
export default {
    name: 'trade-entrust',
    data () {
        return {
            tableData: {
                tHead: [
                  {
                      title: '委托时间',
                      lang: 'E_exch Time'
                  },
                  {
                      title: '合约',
                      lang: 'Prod Code'
                  },
                  {
                      title: '委托类型',
                      lang: 'Order Type'
                  },
                  {
                      title: '委托价格',
                      lang: 'Order Price'
                  },
                  {
                      title: '委托数量',
                      lang: 'Order Amount'
                  },
                  {
                      title: '成交数量',
                      lang: 'Match Amount'
                  },
                  {
                      title: '委托状态',
                      lang: 'Entr Stat'
                  },
                  {
                      title: '对应指令编号',
                      lang: 'Order Number'
                  }
                ],
                tDataList:[]
              },
              start_date: '',
              end_date: ''
        }
    },
    /* created () {
    }, */
    methods: {
      entrustQuery (num) {
        var url = 'marketAccount/historyEntrust'
        var params = {
          trading_token: this.$store.state.trading_token,
          end_date: this.formatTime(this.end_date),
          start_date: this.formatTime(this.start_date),
          h_query_num: 5,
          h_start_num: num
        }
        this.$axios(url, 'post', params).then(obj => {
        // console.log(obj.data.data.list)
        if (obj.data.code === 100) {
          this.tableData.tDataList = obj.data.data.list
          // console.log(this.tableData.tDataList.length)
        }
      })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .trade-entrust{
        /* background: #252F48; */
        height: 340px;
        .tit{
            overflow: hidden;
            /* height: 30px;
            line-height: 30px; */
            font-weight: bold;
            font-size: 16px;
            padding: 10px;
        }
    }
</style>
