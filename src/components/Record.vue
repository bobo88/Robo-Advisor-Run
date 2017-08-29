<!--
内容： 转账记录 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="accounts-Record">

    <table cellpadding="0" cellspacing="0" class="table-common-main-lang accounts-Record-head">
        <tr>
          <td class="tl">
             <div class="entrust-query-summary fr">
                <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="start_date"></Date-picker>
                <span class="mr10">至</span>
                <Date-picker type="date" placeholder="选择日期" style="width: 140px" placement="bottom-end" class="mr10" v-model="end_date"></Date-picker>
                <Button type="info" shape="circle" style="width: 70px" class="mr10" @click="accountsQuery(1)">查询</Button>
            </div>
          </td>
        </tr>
    </table>
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
          <td>{{ item.o_date }}</td>
          <td>{{ item.access_way === '1' ? '转入': '转出'}}</td>
          <td>{{ item.exch_bal | currencyFormatter }}</td>
          <td style="color: #24B1F7;">{{ item.in_account_flag === '1'? '成功' : '失败'}}</td>
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
    name: 'accounts-Record',
    data () {
        return {
            tableData: {
                tHead: ['日期', '操作类别', '金额', '处理状态'],
                tDataList: []
            },
            end_date: '',
            start_date: ''
        }
    },
    // created () {
    //   this.accountsQuery(1)
    // },
    methods: {
      accountsQuery (num) {
        var url = 'historyPagingQuery/historyJournal'
        var params = {
          h_start_num: num,
          h_query_num: 5,
          start_date: this.formatTime(this.start_date),
          end_date: this.formatTime(this.end_date),
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
    .accounts-Record{
        .accounts-Record-head{
        }
        .tl{
            text-align:left
        }
    }
</style>
