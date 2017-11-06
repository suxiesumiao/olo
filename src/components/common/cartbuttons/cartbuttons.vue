<template>
  <div class="cartbuttons">
    <a v-if="subappear"
       @click="Sub()"
       href="javascript:;"
       class="cartbutton sub">
    </a>
    <span class="single-count"
          v-if="subappear">{{ clickcount }}</span>
    <a href="javascript:;"
       @click="Plus($event)"
       class="cartbutton plus">
    </a>
    <div class="virtual"></div>
  </div>
</template>
<script>
export default {
  props: {
    subappear: {
      default: false
    },
    clickcount: {
      default: 0
    }
  },
  methods: {
    Sub: function () {
      // 食物主表减法
      this.$emit('toSub')
      // 购物车食物表减法
      this.$emit('listSub')
    },
    Plus: function (e) {
      this.$emit('markTheBall', e)
      // 食物主表加法
      this.$emit('toPlus')
      // 购物车食物表加法
      this.$emit('listPlus')
    }
  }
}
</script>
<style lang="css" scoped>
.virtual{
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-color: transparent;
}
.cartbuttons {
  margin-left: 2rem;
  display: flex;
}

.cartbutton {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  background-repeat: no-repeat;
  background-position: center;
}

.sub {
  background-color: #fff;
  background-size: 1.2rem;
  background-image: url('/static/cartbuttonspic/sub.svg');
}

.plus {
  background-color: #3190e8;
  background-size: .9rem;
  background-position: center;
  background-image: url('/static/cartbuttonspic/plus.svg');
}

.single-count {
  text-align: center;
  width: 2rem;
  display: inline-block;
}
</style>
