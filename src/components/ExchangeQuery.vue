<!--
内容：成交查询 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="exchange-query mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">成交查询 <br/> Exchange Query</span>
  		<div class="exchange-query-summary fr">
  			<Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="start_date"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="end_date"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="exchangeQuery(1)">查询</Button>
  		</div>
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
      <tbody v-if="tableData.tDataList && tableData.tDataList.length > 0">
        <tr v-for="item in tableData.tDataList">
          <td>{{ item.tradeTime }}</td>
          <td>{{ item.spotName }}</td>
          <td>{{ item.tradeType }}</td>
          <td>{{ item.tradePrice | currencyFormatter }}</td>
          <td>{{ item.tradeVolume }}</td>
          <!-- <td style="color: #24B1F7; cursor: pointer;" @click="showPopUp(item.Order)">{{ item.Order }}</td> -->
          <td>--</td>
          <td><plus-or-reduce :obj="item.changeFund"></plus-or-reduce></td>
          <td><plus-or-reduce :obj="item.tradeCost"></plus-or-reduce></td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="8">暂无数据</td>
        </tr>
      </tbody>
    </table>

    <pop-up v-if="showPopUpState" @close-tc="closePopUp">
      <div slot="content">
        <table cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <th v-for="item of itemOrderPopUpData">{{ item.state }}<br/> {{ item.lang }}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="item of itemOrderPopUpData">{{ item.content }}</td>
             <!--  <td>170525fl35343</td>
              <td>2017-05-25 9:33:35</td>
              <td>黄金延期Au(T+D)，价格p>=279.00，多开(buy long) 10手，279.60</td>
              <td>10:30触发，已发出委托</td> -->
            </tr>
          </tbody>
        </table>
      </div>
    </pop-up>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'
//引入弹窗组件
import PopUp from '@/components/common/PopUp'

export default {
  components: {
    currencyFormatter,
    plusOrReduce,
    PopUp
  },
  name: 'exchange-query',
  data () {
    return {

      tableData: {
        tHead: [
          {
              title: '成交时间',
              lang: 'Trade Time'
          },
          {
              title: '合约',
              lang: 'Spot Name'
          },
          {
              title: '成交类型',
              lang: 'Trade Type'
          },
          {
              title: '成交均价',
              lang: 'Trade Price'
          },
          {
              title: '成交数量',
              lang: 'Trade Volume'
          },
          {
              title: '对应指令编号',
              lang: 'Order'
          },
          {
              title: '变动资金',
              lang: 'Change Fund'
          },
          {
              title: '交易费用',
              lang: 'Trade Cost'
          }
        ],
        tDataList:[
            /* {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '黄金延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 10,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'reduce',
                  "num": 282340
                },
                TradeCost: {
                    "status": 'reduce',
                    "num": 230.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '白银延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 50,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 4353523
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 254.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '迷你黄金延期Au(T+D)',
                TradeType: '空平(Close Short)',
                TradePrice: 282.34,
                TradeVolume: 100,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 2823457
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 344646.56
                }
            },
            {
                TradeTime: '2017-05-25 9:23:35',
                SpotName: '黄金延期Au(T+D)',
                TradeType: '多开(Buy Long)',
                TradePrice: 282.34,
                TradeVolume: 60,
                Order: '170525dk0234',
                ChangeFund: {
                  "status": 'plus',
                  "num": 28255340
                },
                TradeCost: {
                    "status": 'plus',
                    "num": 33440.56
                }
            } */
        ]
      },

      showPopUpState: false,
      itemOrderPopUpData: {
        orderNum: {
          state: '指令编号',
          lang: 'Order Number',
          content: ''
        },
        orderTime: {
          state: '下达时间',
          lang: 'Order Time',
          content: ''
        },
        orderContent: {
          state: '指令内容',
          lang: 'Order Content',
          content: ''
        },
        runStatus: {
          state: '执行状态',
          lang: 'Run Status',
          content: ''
        }
      },
      start_date: '',
      end_date: ''

    }
  },
  /* created () {
    this.exchangeQuery(1)
  }, */
  methods: {
    showPopUp(order){
      this.showPopUpState = true;

      //这里需要用axios的post请求，把当前的order-number发给后台，让后台返回数据（下面代码仅仅是模拟）
      this.itemOrderPopUpData = {
        orderNum: {
          state: '指令编号',
          lang: 'Order Number',
          content: '170525fl35343'
        },
        orderTime: {
          state: '下达时间',
          lang: 'Order Time',
          content: '2017-05-25 9:33:35'
        },
        orderContent: {
          state: '指令内容',
          lang: 'Order Content',
          content: '黄金延期Au(T+D)，价格p>=279.00，多开(buy long) 10手，279.60'
        },
        runStatus: {
          state: '执行状态',
          lang: 'Run Status',
          content: '10:30触发，已发出委托'
        }
      };
    },
    closePopUp(){
      this.showPopUpState = false;
    },
    exchangeQuery (num) {
      var url = 'marketAccount/currentTurnoverJournal'
      var params = {
        end_date: this.formatTime(this.end_date),
        start_date: this.formatTime(this.start_date),
        h_query_num: 5,
        h_start_num: num,
        trading_token: this.$store.state.trading_token
      }
      this.$axios(url, 'post', params).then(obj => {
        console.log(obj)
        if (obj.data.code === 100)
        this.tableData.tDataList = obj.data.data.list
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.exchange-query-summary{ padding: 14px 15px; height: 60px;}
</style>
