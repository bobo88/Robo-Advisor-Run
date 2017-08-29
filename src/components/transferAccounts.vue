<!--
内容： 转账 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="transfer-accounts">
    <div class="tit">
      <router-link  to="/Quotation-and-trade/transfer-accounts/accounts">转账</router-link>
      <router-link  to="/Quotation-and-trade/transfer-accounts/accounts-Record">查询转账记录</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'transfer-accounts',
    data () {
        return {
            tableData: {
                tHead: ['合约', '多空类型', '数量/可用', '现价', '开仓均价', '浮动盈亏'],
                tDataList: [
                ]
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .transfer-accounts{
      .tit{
        margin-top: 10px;
        a{
          font-size:16px;
          font-weight:bold;
          color:#fff;
          display: inline-block;
          border-bottom: 2px solid transparent;
          padding: 6px 12px;
          &.router-link-active{
            border-bottom: 2px solid #fff
          }
        }
      }
    }
</style>
