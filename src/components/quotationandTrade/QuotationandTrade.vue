<template>
  <div class="Quotation-and-Trade">
    <!-- 合约行情数据 -->
    <current-data-of-quotation></current-data-of-quotation>
    <!-- 交易组件 -->
    <trade-in-quo></trade-in-quo>
  </div>
</template>

<script>
import CurrentDataOfQuotation from '@/components/CurrentDataOfQuotation'
import tradeInQuo from '@/components/tradeInQuo'
export default {
    components: {
        CurrentDataOfQuotation,
        tradeInQuo
    },
    name: 'QuotationandTrade',
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>