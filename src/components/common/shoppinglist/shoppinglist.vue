<template>
  <div class="shoppinglistinner">
    <header>
      <p class="cart"><span>购物车</span></p>
      <p class="clear" @click="clearShoopingList()">
        <span>清空</span>
      </p>
    </header>
    <main>
      <div
      v-for="list in lists"
      class="main-list">
        <p class="listname"><span>{{ list.name }}</span></p>
        <div class="moneyabout">
          <div class="align">
            <span class="currency">￥</span><span class="totalprice">{{ list.total_price }}</span>
          </div>
          <cartbuttons
          @listSub="listSub(list.single_price, list.child_index, list.parent_index)"
          @listPlus="listPlus(list.single_price, list.child_index, list.parent_index)"
          :subappear="list.click_count"
          :clickcount="list.click_count">
          </cartbuttons>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
import cartbuttons from '../cartbuttons/cartbuttons'
export default {
  props: {
    lists: {
      default: function () {
        return []
      }
    }
  },
  components: {
    cartbuttons
  },
  methods: {
    listSub: function (price, childIndex, parentIndex) {
      this.$emit('listSub', [price, childIndex, parentIndex])
    },
    listPlus: function (price, childIndex, parentIndex) {
      this.$emit('listPlus', [price, childIndex, parentIndex])
    },
    clearShoopingList: function () {
      this.$emit('clearShoopingList')
    }
  }
}
</script>
<style lang="css" scoped>
.shoppinglistinner{
  position: relative;
  width: 100%;
}
header{
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: #eceff1;
}
header > p{
  padding: .5rem 0;
  font-size: 1rem;
}
.cart > span{
  color: #666;
  margin-left: 1rem;
  padding-left: .2rem;
  border-left: 3px solid #3190e8;
}
.clear > span{
  display: block;
  width: 2.5rem;
  text-align: right;
  color: #777;
  margin-right: 1rem;
  font-size: .6rem;
  background-repeat: no-repeat;
  background-image: url('../../../../static/clear.svg');
}
main{
  max-height: 17rem;
  overflow-y: scroll;
  margin-bottom: 2rem;
}
.main-list{
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  padding: .5rem 0;
  margin-left:1rem;
}
.listname{
  width: 45%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.moneyabout{
  width: 55%;
  display: flex;
  justify-content: space-between;
}
.align{
  flex: 1;
  text-align: right
}
.moneyabout span{
  color: #f60;
}
.currency{
  font-size: .3rem;
}
.totalprice{
  font-weight: 600;
  font-size: 1.2rem;
}
</style>
