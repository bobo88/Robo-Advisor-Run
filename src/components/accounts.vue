<!--
内容： 转账 组件
作者： aleewr
日期： 20170808
-->
<template>
  <div class="accounts">
    <table cellpadding="0" cellspacing="0" class="table-item table-common-main-lang">
      <tbody>

        <tr>
          <td class="left-tit">转账银行</td>
          <td class="tl">
             <div>{{transferbank}}</div>
          </td>
        </tr>

        <tr>
          <td class="left-tit">银行卡号</td>
          <td class="tl">
             <div>{{account_no}}</div>
          </td>
        </tr>

       <!--  <tr>
         <td class="left-tit">转入转出</td>
         <td class="tl">
           <Select v-model="access_way" style="width:140px">
                 <Option v-for="item in accessWay" :value="item.value" :key="item.value" >{{ item.label }}</Option>
             </Select>
         </td>
       </tr> -->

        <tr>
          <td class="left-tit">资金密码</td>
          <td class="tl">
             <Input type="password" v-model="fund_pwd" placeholder="请输入..." style="width: 300px"></Input>
          </td>
        </tr>
        <!-- <tr>
          <td class="left-tit">银行密码</td>
          <td class="tl">
            <Input type="password" v-model="transferbankPwd" placeholder="请输入..." style="width: 300px"></Input>
          </td>
        </tr> -->

        <tr>
          <td class="left-tit">转账金额</td>
          <td class="tl">
            <Input  placeholder="请输入..." style="width: 300px" v-model="exch_bal"></Input>
          </td>
        </tr>
        <tr>
            <td></td>
            <td class="tl">
                <Button type="primary" shape="circle" class="buy-btn transferIn" @click="accounts(1)">转入</Button>
                <Button type="primary" shape="circle" class="buy-btn" @click="accounts(2)">转出</Button>
            </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
    name: 'accounts',
    data () {
        return {
            transferbank: '',
            account_no: '',
            fund_pwd: '',
            exch_bal: '',
        }
    },
    created () {
      this.getBank()
    },
    methods: {
      getBank () {
        var url = 'goServer/client_query'
        var params = { trading_token: this.$store.state.trading_token }
        this.$axios(url, 'post', params).then(obj => {
          if (obj.data.code === 100) {
            this.transferbank = obj.data.data.bankName
            this.account_no = obj.data.data.account_no
          }
        })
      },
      accounts (key) {
        var url = 'goServer/client_apply'
        var params = {
          access_way: key,
          exch_bal: this.exch_bal,
          fund_pwd: this.fund_pwd,
          trading_token: this.$store.state.trading_token
        }
        this.$axios(url, 'post', params).then(obj => {
          // console.log(obj)
          if (obj.data.code === 100)  this.$Message.success('转账成功！')
          else if (obj.data.code === 101) this.$Message.error('对方不想说话，并且向你抛出了一个异常')
          else this.$Message.warning('这是一条警告的提示')
        })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .accounts{
        .tl{
            text-align: left;
        }
        .buy-btn{
            width: 86px;
            &.transferIn{
                background:#fc0000;
                border-color:#fc0000
            }
        }
    }
</style>
