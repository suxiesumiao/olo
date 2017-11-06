// 使用该组件要求父级元素必须定位
<template>
  <div class="dot"
       :class="{bigsize:listenSize(count)}">
    <span>{{ count }}</span>
  </div>
</template>
<script>
export default {
  props: {
    count: {
      default: 0
    }
  },
  methods: {
    listenSize: function () {
      return Number(this.count) > 9
    }
  }
}
</script>
<style lang="css" scoped>
.dot {
  position: absolute;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: .5rem;
  top: 0;
  right: 0;
  color: #fff;
  background: #ff461d;
}

.dot>span {
  display: block;
  height: inherit;
  line-height: inherit;
  transform: scale(.8);
  font-weight: 600;
}

.bigsize {
  width: 1.5rem;
}
</style>
