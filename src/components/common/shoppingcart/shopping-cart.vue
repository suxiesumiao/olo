<template>
  <div
  @click="shoppingcalculate()"
  class="shoppingcart"
  :class="{shoppingcartloaded:count,shoppingcartmove:shoppingcartmove}">
    <dot
    v-if="count"
    :count='count'></dot>
  </div>
</template>
<script>
import dot from '../dot/dot'
export default {
  props: {
    count: {
      default: 0
    },
    shoppingcartmove: {
      default: 0
    },
    // 默认不出现在点击之后被触发
    shoppingmask: {
      default: false
    }
  },
  components: {
    dot
  },
  methods: {
    shoppingcalculate: function () {
      if (!this.count) { return }
      this.$emit('shoppingmask')
    }
  }
}
</script>
<style lang="css" scoped>
.shoppingcart {
  position: relative;
  width: 3.5rem;
  height: 3.5rem;
  left: 1rem;
  bottom: 1rem;
  border-radius: 50%;
  border: .3rem solid #4d4d4d;
  background-size: 2rem;
  background-color: #464646;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/static/shoppingcartpic/shopping.svg');
}

.shoppingcartloaded {
  background-color: #3b95e9;
  background-image: url('/static/shoppingcartpic/shoppinglight.svg');
}

.shoppingcartmove {
  animation: shoppingcartmove 1s;
}

@keyframes shoppingcartmove {
  0% {
    transform: scale(1);
  }
  14% {
    transform: scale(1.3);
  }
  28% {
    transform: scale(1);
  }
  42% {
    transform: scale(1.3);
  }
  70% {
    transform: scale(1);
  }
}
</style>
