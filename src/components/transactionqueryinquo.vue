<!--
内容： 成交查詢 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="transaction-query-inquo">
      <div class="tit">
          <span class="fl">历史成交查询</span>
          <div class="entrust-query-summary fr">
              <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="end_date"></Date-picker>
              <span class="mr10">至</span>
              <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="start_date"></Date-picker>
              <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="knockdownQuery(1)">查询</Button>
          </div>
      </div>
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
            <td>{{ item.tradeTime }}</td>
            <td>{{ item.spotName }}</td>
            <td>{{ item.tradeType }}</td>
            <td>{{ item.tradePrice | currencyFormatter }}</td>
            <td>{{ item.tradeCost }}</td>
            <!-- <td style="color: #24B1F7;">{{ item.Order }}</td>
            <td><plus-or-reduce :obj="item.ChangeFund"></plus-or-reduce></td>
            <td><plus-or-reduce :obj="item.TradeCost"></plus-or-reduce></td> -->
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
    name: 'transaction-query-inquo',
    data () {
        return {
            tableData: {
                tHead: ['成交时间', '合约', '成交类型', '成交均价', '成交数量'],
                tDataList:[
                   /* {
                        E_exchTime: '2017-05-25 9:23:35',
                        ProdCode: '黄金延期Au(T+D)',
                        OrderType: '多开(Buy Long)',
                        OrderPrice: 282.34,
                        TradeVolume: 10
                    },
                    {
                        E_exchTime: '2017-05-25 9:23:35',
                        ProdCode: '白银延期Au(T+D)',
                        OrderType: '多开(Buy Long)',
                        OrderPrice: 50,
                        TradeVolume: 390
                    },
                    {
                        E_exchTime: '2017-05-25 9:23:35',
                        ProdCode: '迷你黄金延期Au(T+D)',
                        OrderType: '空平(Close Short)',
                        OrderPrice: 282.34,
                        TradeVolume: 5
                    },
                    {
                        E_exchTime: '2017-05-25 9:23:35',
                        ProdCode: '黄金延期Au(T+D)',
                        OrderType: '多开(Buy Long)',
                        OrderPrice: 282.34,
                        TradeVolume: 10
                    },
                    {
                        E_exchTime: '2017-05-25 9:23:35',
                        ProdCode: '白银延期Au(T+D)',
                        OrderType: '多开(Buy Long)',
                        OrderPrice: 50,
                        TradeVolume: 390
                    } */
                ]
            },
            start_date: '',
            end_date: ''
        }
    },
    /* created () {
      this.knockdownQuery(1)
    }, */
    methods: {
      knockdownQuery (num) {
        var url = 'marketAccount/currentTurnoverJournal'
        var params = {
          end_date: this.formatTime(this.end_date),
          start_date: this.formatTime(this.start_date),
          h_query_num: 5,
          h_start_num: num,
          trading_token: this.$store.state.trading_token
        }
        this.$axios(url, 'post', params).then(obj => {
          // console.log(obj)
          if (obj.data.code === 100)
          this.tableData.tDataList = obj.data.data.list
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .transaction-query-inquo{
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
