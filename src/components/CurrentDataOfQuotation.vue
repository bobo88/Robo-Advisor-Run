<!--
内容：实时行情 组件
作者：aleewr
日期： 20170808
-->
<template>
  <div class="current-data-of-quotation-component mb30">
    <header class="table-common-head clearfix">
        <span class="tit fl">行情 <br/> Curve Of Account Return</span>
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
      <tbody v-if="this.$store.state.marketstate.mAu">
        <tr v-for="item in this.$store.state.quoatation">
          <td>{{ item[19].instID }}</td>
          <td>{{ item[19].name }}</td>
          <td :class="plusOrReduceClass(item[19].upDownRate)">{{ item[19].last }}</td>
          <td :class="plusOrReduceClass(item[19].upDownRate)">{{item[19].bidLot1}}</td>
          <td :class="plusOrReduceClass(item[19].upDownRate)">{{item[19].upDown}}</td>
          <td :class="plusOrReduceClass(item[19].upDownRate)">{{item[19].upDownRate | persentNum}}</td>
          <td :class="plusOrReduceClass(item[19].upDownRate)">{{item[19].high}}</td>
          <td>{{ item[19].low }}</td>
          <td>{{ item[19].ask1 }}</td>
          <td>{{ item[19].askLot1 }}</td>
          <td>{{ item[19].bid1 }}</td>
          <td>{{ item[19].bidLot1 }}</td>
          <td>{{ item[19].lastSettle }}</td>
          <td>{{ item[19].lastClose }}</td>
        </tr>
      </tbody>
      <tbody v-if="!this.$store.state.marketstate.mAu">
          <tr>
              <td colspan="9">数据加载中</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import plusOrReduce from '@/components/common/plusOrReduce'
export default {
    name: 'current-data-of-quotation',
    components: {
      plusOrReduce
    },
    data () {
        return {
            tableData: {
                tHead: [
                  {
                      title: '代码',
                      lang: 'Prod Code'
                  },
                  {
                      title: '名称',
                      lang: 'Code Name'
                  },
                  {
                      title: '最新价',
                      lang: 'Lastest Price'
                  },
                  {
                      title: '现量',
                      lang: 'Entr Stat'
                  },
                  {
                      title: '涨跌',
                      lang: 'Order Price'
                  },
                  {
                      title: '涨幅',
                      lang: 'Order Amount'
                  },
                  {
                      title: '最高价',
                      lang: 'Highest Price'
                  },
                  {
                      title: '最低价',
                      lang: 'Lowest Price'
                  },
                  {
                      title: '买1价',
                      lang: 'Order Number'
                  },
                  {
                      title: '买1量',
                      lang: 'Bid'
                  },
                  {
                      title: '卖1价',
                      lang: 'Ask'
                  },
                  {
                      title: '卖1量',
                      lang: 'Remark'
                  },
                  {
                      title: '昨结价',
                      lang: 'LastSettel'
                  },
                  {
                      title: '昨收盘',
                      lang: 'LastClose'
                  }
                ],
                tDataList:[
                    {
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
                    }
                ]                
            },
            quotationloaded: {
                Au: false,
                Ag: false,
                mAu: false
            }
        }
    },
    /*beforeCreate () {
        var that = this
        var socket = io.connect(process.env.SOCKET_URL)
          console.log(that.$store.state.marketstate.Au)
            socket.on('marketAu', function (data) {
                that.$store.state.quoatation.Au = data
                that.quotationloaded.Au = true
                if (!that.$store.state.marketstate.Au) {
                  that.$store.state.marketstate.Au = true
                }
            })
            socket.on('marketAg', function (data) {
                that.$store.state.quoatation.Ag = data
                that.quotationloaded.Ag = true
                if (!that.$store.state.marketstate.Ag) {
                  that.$store.state.marketstate.Ag = true
                }
            })
            socket.on('marketmAu', function (data) {
                that.$store.state.quoatation.mAu = data
                that.quotationloaded.mAu = true
                 if (!that.$store.state.marketstate.mAu) {
                  that.$store.state.marketstate.mAu = true
                }
            })
    },*/
    mounted (){
        console.log('mounted')
    },
    methods: {
      plusOrReduceClass (Rate) {
        if (Rate > 0) {
          return 'f-red'
        } else {
          return 'f-green'
        }
      }
    },
    filters: {
      persentNum: function(str) {
        return (str * 100).toFixed(2) + '%'
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .curve-of-refum-component-summary{ padding: 14px 15px; height: 60px;}
    .chart-wrap{ padding: 30px; background: #252F48;}
</style>
