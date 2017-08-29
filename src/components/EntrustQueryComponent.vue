<!--
内容：委托查询 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="entrust-query mb30">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">委托查询 <br/> Entrust Query</span>
  		<div class="entrust-query-summary fr">
  			<Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="start_date"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="end_date"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="entrustQuery(1)">查询</Button>
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
          <td>{{ item.eExchTime }}</td>
          <td>{{ item.prodCode }}</td>
          <td>{{ item.orderType }}</td>
          <td>{{ item.orderPrice | currencyFormatter }}</td>
          <td>{{ item.orderAmount }}</td>
          <td>{{ item.matchAmount }}</td>
          <td>{{ item.entrStat }}</td>
          <!-- <td style="color: #24B1F7; cursor: pointer;" @click="showPopUp(item.OrderNumber)">{{ item.OrderNumber }}</td> -->
          <td>{{ item.order }}</td>
          <td>--</td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr>
          <td colspan="9">暂无数据</td>
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
  name: 'entrust-query',
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
          },
          {
              title: '来源备注',
              lang: 'Remark'
          }
        ],
        tDataList:[
           /* {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 10,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '白银延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 50,
                OrderAmount: 390,
                MatchAmount: 280,
                EntrStat: {
                  "default": '部分剩撤',
                  "lang": 'Partly Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '迷你黄金延期Au(T+D)',
                OrderType: '空平(Close Short)',
                OrderPrice: 282.34,
                OrderAmount: 5,
                MatchAmount: 10,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
            },
            {
                E_exchTime: '2017-05-25 9:23:35',
                ProdCode: '黄金延期Au(T+D)',
                OrderType: '多开(Buy Long)',
                OrderPrice: 282.34,
                OrderAmount: 88,
                MatchAmount: 12,
                EntrStat: {
                  "default": '全部成交',
                  "lang": 'All Succeeded'
                },
                OrderNumber: '170525dk0234',
                Remark: 'auto_order'
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
	.entrust-query-summary{ padding: 14px 15px; height: 60px;}
</style>
