<!--
内容：账户持仓页面
作者：BOBO
日期： 20170802
-->
<template>
  <div class="account-paremeters mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">账户参数 <br/> Account Index</span>
  	</header>

    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData.tHead">
            <strong>{{ item.title }}</strong>
            {{ item.lang }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ tData.totalAsset | currencyFormatter }}</td>
          <td>{{ tData.cumulativeReturn | currencyFormatter }}</td>
          <td>{{ tData.ROA }}%</td>
          <td>{{ tData.netWorthRate }}</td>
          <td><plus-or-reduce :obj="tData.maxDrawdown" :percentage="true"></plus-or-reduce></td>
          <td>{{ tData.sharpeRatio }}</td>
          <td>{{ tData.successRatio }}%</td>
          <td>{{ tData.positionRatio }}%</td>
        </tr>
      </tbody>
    </table>

    <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
      <thead>
        <tr>
          <th v-for="item in tableData2.tHead">
            <strong>{{ item.title }}</strong>
            {{ item.lang }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><plus-or-reduce :obj="tData.lastSurplus || '0'"></plus-or-reduce></td>
          <td>{{ tData.positionMargin | currencyFormatter }}</td>
          <td>{{ tData.availableFund | currencyFormatter }}</td>
          <td>{{ tData.frozenFund | currencyFormatter }}</td>
          <td>{{ tData.fundEfficiency }}%</td>
          <td>{{ tData.longPosition }}%</td>
          <td>{{ tData.shortPosition }}%</td>
          <td><plus-or-reduce :obj="tData.floatingReturn"></plus-or-reduce></td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'
import { trading_token } from './../global'

export default {
  components: {
    currencyFormatter,
    plusOrReduce
  },
  name: 'account-paremeters',
  data () {
    return {
      tableData: {
        tHead: [
          {
              title: '账户总权益',
              lang: 'Total Asset'
          },
          {
              title: '总盈亏',
              lang: 'Cumulative Return'
          },
          {
              title: '总收益率',
              lang: 'ROA'
          },
          {
              title: '净值',
              lang: 'Networth Rate'
          },
          {
              title: '最大回撤',
              lang: 'Max Drawdown'
          },
          {
              title: '夏普比率',
              lang: 'Sharpe Ratio'
          },
          {
              title: '成功率',
              lang: 'Success Ratio'
          },
          {
              title: '总仓位',
              lang: 'Position Ratio'
          }
        ]
      },
      tableData2: {
        tHead: [
          {
              title: '上日盈亏',
              lang: 'Last Surplus'
          },
          {
              title: '持仓占用资金',
              lang: 'Position Margin'
          },
          {
              title: '可用资金',
              lang: 'Available Fund'
          },
          {
              title: '冻结资金',
              lang: 'Frozen Fund'
          },
          {
              title: '资金使用率',
              lang: 'Fund Efficiency'
          },
          {
              title: '多头仓位',
              lang: 'Long Position'
          },
          {
              title: '空头仓位',
              lang: 'Short Position'
          },
          {
              title: '总浮动盈亏',
              lang: 'Floating Return'
          }
        ]
      },
      tData: {}
    }
  },
  beforeCreate () {
    var url = 'marketSimulated/accountIndex'
    var params = { trading_token: this.$store.state.trading_token}
    this.$axios(url, 'post', params).then(obj => {
      // console.log(obj)
      if (obj.data.code === 100) {
        this.tData = obj.data.data
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.account-position-table{
		.ivu-table-header{}
	}
</style>
