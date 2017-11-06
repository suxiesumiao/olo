<template>
  <div v-if="appear" @click="toTop()" class="backfront"></div>  
</template>
<script>
export default {
  props: {
    appear: {
      default: false
    }
  },
  methods: {
    toTop: function () {
      this.$emit('toTop')
    }
  }
}
</script>
<style>
.backfront{
  right: 1rem;
  bottom: 5rem;
  position: fixed;
  width: 3rem;
  height: 3rem;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  border: 1px solid #fff;
  border-radius: 50%;
  background-size: 3rem;
  background-color: #999;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('/static/up.svg');
  transition: all 1s;
}
</style>

