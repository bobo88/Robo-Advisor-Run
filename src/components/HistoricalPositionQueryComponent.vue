<!--
内容：历史持仓 组件
作者：BOBO
日期： 20170803
-->
<template>
  <div class="historical-position-query-component">
  	<header class="table-common-head clearfix">
  		<span class="tit fl">历史持仓<br/> Historical Position Query</span>
	    <div class="hpqc-summary fr">
        <Tooltip placement="bottom">
            <i class="iconfont icon-tips mr10"></i>

            <div slot="content" style="width: 350px;">
                <p>提示：最多同时查询连续五个交易日的持仓情况</p>
                <p>Alert: five days' position can be showed at the same time at most</p>
            </div>
        </Tooltip>

        <Date-picker type="date" placeholder="选择日期" v-model="start_date" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <span class="mr10">至</span>
        <Date-picker type="date" placeholder="选择日期" v-model="end_date" style="width: 140px" placement="bottom-end" class="mr10"></Date-picker>
        <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="searchData">查询</Button>
      </div>
  	</header>

    <div class="historicalPositionQueryData-wrap" v-if="historicalPositionQueryData && historicalPositionQueryData.length > 0">
      <template v-for="item in historicalPositionQueryData">
        <h5 class="date-tit">{{ item.date }}日持仓情况</h5>

        <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
          <thead>
            <tr>
              <th v-for="i in item.tHead">
                <strong>{{ i.title }}</strong>
                {{ i.lang }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in item.tDataList">
              <td>{{ i.spotName }}</td>
              <td>{{ i.positionType }}</td>
              <td>{{ i.positionAmount }}</td>
              <td>{{ i.averageCost | currencyFormatter }}</td>
              <td>{{ i.closePrice | currencyFormatter }}</td>
              <td><plus-or-reduce :obj="i.floatingReturn"></plus-or-reduce></td>
              <td>{{ i.positionMargin | currencyFormatter }}</td>
              <td>{{ i.positionRatio / 100 }}%</td>
            </tr>
          </tbody>
        </table>
      </template>
    </div>

    <div v-else>
      <template>
        <table cellpadding="0" cellspacing="0" class="table-common-main-lang">
          <tr>
            <td colspan="8">暂无数据</td>
          </tr>
        </table>
      </template>
    </div>

  </div>
</template>

<script>
//引入全局过滤器
import currencyFormatter from '@/filter/currencyFormatter'
import plusOrReduce from '@/components/common/plusOrReduce'

function formatTime(s) {
    if(!s){
        return;
    }
    var _str = [];

    //年yyyy
    _str[0] = s.getFullYear();
    //月MM
    s.getMonth() >= 9 ? _str[1] = s.getMonth()+1 : _str[1] = '0' + (s.getMonth()+1);
    //日dd
    s.getDate() > 9 ? _str[2] = s.getDate() : _str[2] = '0' + s.getDate();
    //小时HH
    s.getHours() > 9 ? _str[3] = s.getHours() : _str[3] = '0' + s.getHours();
    //分钟mm
    s.getMinutes() > 9 ? _str[4] = s.getMinutes() : _str[4] = '0' + s.getMinutes();
    //秒钟ss
    s.getSeconds() > 9 ? _str[5] = s.getSeconds() : _str[5] = '0' + s.getSeconds();
    
    return _str.join('');
}

export default {
  components: {
    currencyFormatter,
    plusOrReduce
  },
  name: 'account-position-lang',
  props: ['headSummary'], // 父组件传headSummary属性过来，如果为false，则不显示账户持仓组件头部右边内容
  data () {
    return {
      end_date: '', //结束日期
      h_query_num: 5, //每页记录数
      h_start_num: 1, //当前第几页
      start_date: '', //开始日期
      trading_token: 'xx', //交易token

       historicalPositionQueryData: [],
      tHead: [
        {
            title: '合约',
            lang: 'Spot Name'
        },
        {
            title: '多空类型',
            lang: 'Position Type'
        },
        {
            title: '持仓数量',
            lang: 'Position Amount'
        },
        {
            title: '开仓均价',
            lang: 'Average Cost'
        },
        {
            title: '收盘价',
            lang: 'Close Price'
        },
        {
            title: '浮动盈亏',
            lang: 'Floating Return'
        },
        {
            title: '占用资金',
            lang: 'Position Margin'
        },
        {
            title: '仓位',
            lang: 'Position Ratio'
        }
      ],
      start_date: '',
      end_date: ''
    }
  },
  computed: {
    startDateFarmatter() {
      var s = this.start_date;
      return formatTime(s);
    },
    endDateFarmatter() {
      var s = this.end_date;
      return formatTime(s);
    }
  },
  methods: {
    searchData () {
      var vm = this;
      const url = 'marketSimulated/historyDeferPosition'
      let params = {
        end_date: this.endDateFarmatter, //结束日期
        h_query_num: this.h_query_num, //每页记录数
        h_start_num: this.h_start_num, //当前第几页
        start_date: this.startDateFarmatter, //开始日期
        trading_token: vm.$store.state.trading_token, //交易token
      }
      this.$axios(url, 'post', params).then(obj => {
        console.log(obj.data.data.list)
        if (obj.data.code === 100) {
          let data = obj.data.data.list
          for (let key in data) {
            let obj = {}
            obj.date = key
            obj.tDataList = data[key]
            obj.tHead = this.tHead
            this.historicalPositionQueryData.push( obj )
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hpqc-summary{ padding: 14px 15px; height: 60px;
    .icon-tips{ font-size: 24px; vertical-align: middle;}
  }
  .historicalPositionQueryData-wrap{ height: 700px; overflow: auto;
    .date-tit{ padding-left: 20px; height: 30px; line-height: 30px; background: #3B4B76;}
  }
</style>
