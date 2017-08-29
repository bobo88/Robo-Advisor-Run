<!--
内容：交易 组件
作者：aleewr
日期： 20170808
-->
<template>
  <div class="trade-in-quo mb30">
     <header class="table-common-head clearfix">
        <span class="tit fl">交易 <br/> Trade</span>
        <p class="head-summary fr">
          <span>客戶/机构名称</span>
          <span>可用资金：5678010.75</span>
          <span>浮动盈亏：<em class="f-red">+23.45%</em></span>
          <span>账户权益：<em class="f-red">+6780.25</em></span>
        </p>
    </header>
    <div class="trade-in-quo-wrap">
      <div class="trade-in-quo-wrap-left">
          <div class="trade-operate">
            <div class="tradeitem">
              <span>合约</span>
              <Select v-model="tradingContract" style="width:140px" @on-change="changePrice">
                  <Option v-for="item in tradingContractList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
              </Select>
            </div>
            <div class="tradeitem" v-if="this.$store.state.marketstate.Au">
              <span>价格</span>
              <div class="operate-input-number">
                <span class="operate-decrease" @click="operateCurrentPrice()">-</span>
                <input type="text" name="" :value="this.currentCode.Price" class="operate-input-number-input" >
                <span class="operate-add" @click="operateCurrentPrice('add')">+</span>
              </div>
            </div>
            <div class="tradeitem" v-if="!this.$store.state.marketstate.Au">
              <span>价格</span>
              <div class="operate-input-number">
                <span class="operate-decrease">-</span>
                <input type="text" name="" value="0" class="operate-input-number-input" >
                <span class="operate-add">+</span>
              </div>
            </div>
            <div class="tradeitem">
              <span>手数</span>
              <div class="operate-input-number">
                <span class="operate-decrease" @click="operateNumberType">-</span>
                <input type="text" name="" class="operate-input-number-input" :value="this.currentCode.operateNumber">
                <span class="operate-add" @click="operateNumberType('add')">+</span>
              </div>
            </div>
            <div class="pd10 tc">最大可开仓手数{{currentCode.maxOpenNumber}}手</div>
            <div class="operate-btn">
              <div class="operate-bull" @click="changeModal(1)">
                <p class="price-text">{{this.currentCode.Price}}</p>
                <p>买多</p>
              </div>
              <div class="operate-oversold" @click="changeModal(2)">
                <p class="price-text">{{this.currentCode.Price}}</p>
                <p>卖空</p>
              </div>
              <div class="operate-close" @click="changeModal(3)">
                <p class="price-text">{{this.currentCode.Price}}</p>
                <p>平仓</p>
              </div>
            </div>
          </div>
          <div class="quoate-info">
            <div class="quoate-info-head" v-if="this.getCurrentCode().upDown">
              <p class="f18 f-red" :class="plusOrReduceClass(this.currentCode.data.upDownRate)">{{this.currentCode.Price}}</p>
              <p class="ovh"><span class="fl">{{this.getCurrentCode().upDown}}</span><span class="fr">{{this.getCurrentCode().upDownRate | percentage}}</span></p>
              <div class="ovh"><span class="fl">涨停</span><span class="fr">涨停</span></div>
              <p class=""><span class="fl">+0.03</span><span class="fr">+0.01%</span></p>
            </div>
            <div class="quoate-info-head" v-if="!this.getCurrentCode().upDown">
              <p class="f18 f-red">{{this.currentCode.Price}}</p>
              <p class="ovh"><span class="fl">{{this.getCurrentCode().upDown}}</span><span class="fr">{{this.getCurrentCode().upDownRate | percentage}}</span></p>
              <div class="ovh"><span class="fl">涨停</span><span class="fr">涨停</span></div>
              <p class=""><span class="fl">+0.03</span><span class="fr">+0.01%</span></p>
            </div>
            <div class="quoate-info-body" v-if="this.currentCode">
              <div class="quoate-info-body-item">
                <span class="fl">卖5</span>
                <span class="fr">{{this.currentCode.data.askLot1}}</span>
                <span class="tctext">{{this.currentCode.data.ask1}}</span>
              </div>
              <div class="quoate-info-body-item">
                <span class="fl">卖5</span>
                <span class="fr">{{this.currentCode.data.askLot2}}</span>
                <span class="tctext">{{this.currentCode.data.ask2}}</span>
              </div>
              <div class="quoate-info-body-item">
                <span class="fl">卖5</span>
                <span class="fr">{{this.currentCode.data.askLot3}}</span>
                <span class="tctext">{{this.currentCode.data.ask3}}</span>
              </div>
              <div class="quoate-info-body-item">
                <span class="fl">卖5</span>
                <span class="fr">{{this.currentCode.data.askLot4}}</span>
                <span class="tctext">{{this.currentCode.data.ask4}}</span>
              </div>
              <div class="quoate-info-body-item">
                <span class="fl">卖5</span>
                <span class="fr">15</span>
                <span class="tctext">{{this.currentCode.data.ask5}}</span>
              </div>
            </div>
          </div>
      </div>
      <div class="trade-in-quo-wrap-right">
          <div class="trade-in-quo-inwrap">
            <div class="trade-in-quo-tab">
              <router-link  to="/Quotation-and-trade/trade-position">持仓</router-link>
              <router-link to="/Quotation-and-trade/trade-entrust">委托</router-link>
              <router-link to="/Quotation-and-trade/transaction-query-inquo">成交</router-link>
              <router-link to="/Quotation-and-trade/transfer-accounts/accounts">转账</router-link>
            </div>
            <router-view></router-view>
          </div>
      </div>
    </div>
    <Modal
        v-model="modal"
        title="行情交易"
        @on-ok="ok"
        @on-cancel="cancel">
        <div style="font-size: 18px!important;">
          <h3 style="font-weight: bold; text-align: center">{{tradingContract}}</h3>
          <p><span style="padding:0 30px 0 160px">{{tradeState}}</span>{{currentCode.Price}}元</p>
          <p><span style="padding:0 30px 0 160px">委托数量</span>{{currentCode.operateNumber}}手</p>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'trade-in-quo',
  data () {
    return {
      tradingContract: 'Au(T+D)',
      tradingContractList: [
          {
              value: 'Au(T+D)',
              label: '黄金延期'
          },
          {
              value: 'Ag(T+D)',
              label: '白银延期'
          },
          {
              value: 'mAu(T+D)',
              label: '迷你黄金延期'
          }
      ],
      currentCode: {
        Name: '黄金延期',
        Price: this.$store.state.quoatation.Au[19].last,
        maxOpenNumber: '',
        operateNumber: 1,
        data: this.$store.state.quoatation.Au[19]
      },
      modal: false,
      tradeState: '',
      tradeNum: 1
    }
  },
  computed: {
    coputedPrice () {
      console.log(1)
    }
  },
  mounted () {
    this.currentPrice.price = this.$store.state.quoatation.Au[19].last
    this.currentPrice.data = this.$store.state.quoatation.Au[19]
  },
  methods: {
    changePrice (v) {
      var that = this
      console.log(this.tradingContract)
      switch (v) {
        case 'Au(T+D)':
          that.currentCode.Price = this.$store.state.quoatation.Au[19].last
          that.currentCode.data = this.$store.state.quoatation.Au[19]
          break
        case 'Ag(T+D)':
          that.currentCode.Price = this.$store.state.quoatation.Ag[19].last
          that.currentCode.data = this.$store.state.quoatation.Ag[19]
          break
        case 'mAu(T+D)':
          that.currentCode.Price = this.$store.state.quoatation.mAu[19].last
          that.currentCode.data = this.$store.state.quoatation.mAu[19]
          break
      }
      // console.log(this.currentPrice)
    },
    operateCurrentPrice (type) {
      if (type === 'add') {
        this.currentCode.currentPrice ++
      } else {
        this.currentCode.currentPrice > 0 ? this.currentPrice-- : 0
      }
    },
    operateNumberType (type) {
        if (type === 'add') {
            this.currentCode.operateNumber++
        } else {
            this.currentCode.operateNumber > 0 ? this.currentCode.operateNumber-- : 0
        }
    },
    getCurrentCode () {
      switch (this.currentCode.Name) {
        case '黄金延期':
          return this.$store.state.quoatation.Au[19]
          break
        case '白银延期':
          return this.$store.state.quoatation.Ag[19]
          break
        case '迷你黄金延期':
          return this.$store.state.quoatation.mAu[19]
          break
      }
    },
    plusOrReduceClass (Rate) {
      console.log(Rate)
      if (Rate > 0) {
        return 'f-red'
      } else {
        return 'f-green'
      }
    },
    changeModal (state) {
      this.modal = true
      this.tradeNum = state
      switch (state) {
        case 1: this.tradeState = '买多价格'
        break
        case 2: this.tradeState = '卖空价格'
        break
        case 3: this.tradeState = '平仓价格'
        break
      }
    },
    ok () {
      switch (this.tradeNum) {
        case 1: this.trading(1)
        break
        case 2: this.trading(2)
        break
        case 3: this.closeOutTrade()
      }
    },
    cancel () {
      this.$Message.info('已取消交易')
    },
    closeOutTrade () {  //平仓
      var url = 'goServer/flat'
      var params = {
        oper_flag: 1,
        prod_code: this.tradingContract,
        order_type: 0,
        price: this.currentCode.Price,
        volume: this.currentCode.operateNumber,
        cov_type: 1,
        src_order_no: 11111,
        trading_token: this.$store.state.trading_token
      }
      this.$axios(url, 'post', params).then(obj => {
        // console.log(obj)
        if (obj.data.code === 100)  this.$Message.success(obj.data.data.message)
        else this.$Message.error(obj.data.message)
      })
    },
    trading (num) { //买多 && 卖空
      var url1 = 'goServer/more'
      var url2 = 'goServer/empty'
      var params = {
        trading_token: this.$store.state.trading_token,
        oper_flag: 1,
        prod_code: this.tradingContract,
        price: this.currentCode.Price,
        order_type: 0,
        volume: 1
      }
      if (num === 1) this.$axios(url1, 'post', params).then(obj => {
        // console.log(obj)
        if (obj.data.code === 100)  this.$Message.success(obj.data.data.message)
        else this.$Message.error(obj.data.message)
      })
      else this.$axios(url2, 'post', params).then(obj => {
        // console.log(obj)
        if (obj.data.code === 100)  this.$Message.success(obj.data.data.message)
        else this.$Message.error(obj.data.message)
      })
    }
  },
  filters: {
    percentage ( str) {
      return (str * 100).toFixed(2) + '%'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
    .trade-in-quo-wrap{
      height: 450px;background: #1D2742;
      .trade-in-quo-wrap-left{ float:left; width: 380px; background: #252F48;overflow: hidden;
        .trade-operate{ width:220px; float:left;background: #1D2742;height: 450px;}
        .tradeitem{ margin: 20px;
          .operate-input-number{ display:inline-block; font-size: 0;vertical-align: middle;}
          .operate-decrease,.operate-add{cursor: pointer; vertical-align: middle;border-radius: 3px 0 0 3px;background: #fff;height: 30px;line-height: 30px;
          width: 30px;display: inline-block; color: #000;text-align: center;font-size: 18px; }
          .operate-decrease{border-right:1px solid #11172C;}
          .operate-add{ border-radius: 0 3px 3px 0;border-left: 1px solid #11172C }
          .operate-input-number-input{width: 80px; height: 30px; line-height: 30px; vertical-align: middle; border:none;font-size: 12px;text-align: center; }

        }
        .tc{ text-align: center; }
        .operate-btn{padding: 10px 0;text-align: center;}
        .operate-bull,.operate-oversold,.operate-close{ cursor: pointer; display: inline-block;width:56px; height: 64px;border-radius: 3px}
        .operate-bull{background: rgb(252,0,0);}
        .operate-oversold{background: rgb(1,196,15);}
        .operate-close{background: rgb(249,168,12);}
        .price-text{margin: 10px; padding-bottom:3px; border-bottom:1px solid #fff;}

        .quoate-info{
           margin-left: 220px;
          .quoate-info-head{ padding: 10px; overflow: hidden;
            .f18{font-size: 18px;}
            .ovh{overflow: hidden;}
          }
          .quoate-info-body{ overflow: hidden; padding: 10px;
            .quoate-info-body-item{
              padding: 6px 0;
              .fl{
                float: left;
                width: 50px;
              }
              .tctext{
                margin-left: 0px;
              }
              .fr{
                float: right;
              }

            }
          }
        }

      }
      .trade-in-quo-tab{
        display: flex;
        background: #11172C;
        border-radius: 3px 3px 0 0;
        overflow: hidden;
        a,span{
          flex: 1;
          text-align: center;
          height: 45px;
          line-height: 45px;
          &:hover{
            cursor:pointer;
            background:#252F48;
            color: #fff;
          }
        }
        a.router-link-active{
          background:#252F48;
          color: #fff;
        }
      }
    }
    .trade-in-quo-wrap-right{
      margin-left: 380px;
    }
    .trade-in-quo-inwrap{
      padding:15px;
      .table-common-head{
        height:45px;
      }
    }
</style>
