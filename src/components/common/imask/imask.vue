<template>
  <div
  :class="{fadein: on}"
  class="mask">
    <h3>{{ restaurant.name }}</h3>
    <div class="wrapper">
      <el-rate
      disabled
      text-color="#ff6600"
      text-template="{value}"
      v-model="restaurant.rating">
      </el-rate>
    </div>
    <h5><span>优惠信息</span></h5>
    <p v-for="act in restaurant.activities">
      <span class="c-spec" :class="computeStyleClass(act.icon_color)">{{ act.icon_name }}</span>
      <span>{{ act.description }}</span>
    </p>
    <h5><span>商家公告</span></h5>
    <p>{{ restaurant.promotion_info }}</p>
    <div class="button" @click="disappear()"></div>
  </div>
</template>
<script>
export default {
  props: {
    on: {
      // 是否开启遮盖
      default: function () {
        return false
      }
    },
    restaurant: {
      default: function () {
        return {}
      }
    }
  },
  components: {
  },
  methods: {
    disappear: function () {
      this.$emit('off')
    },
    computeStyleClass: function (str) {
      return 'c-' + str
    }
  }
}
</script>
<style lang="css" scoped>
@import '../css/common.css';
.mask{
  position: absolute;
  width: 100%;
  height: 100vh;
  top: -1000px;
  left: 0;
  transition: all .3s;
}
.mask>h3{
  color: #fff;
  margin-top: 3rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
}
.wrapper{
  width: 100%;
  text-align: center;
}
.mask>h5{
  margin-top: 1rem;
  text-align: center;
}
h5>span{
  color: #fff;
  display: inline-block;
  padding: .2rem .5rem;
  border: 1px solid #666;
  border-radius: 1.2rem;
}
.mask>p{
  color: #fff;
  width: 90%;
  margin: 0 auto;
  font-size: .9rem;
}
.fadein{
  top: 0;
  display: block;
  background-color: rgba(28,28,28,.9);
  z-index: 2;
}
.button{
  position: absolute;
  bottom: 3rem;
  left: calc(50% - 1.5rem);
  width: 3rem;
  height: 3rem;
  border: 1px solid #fff;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('../../../../static/times.svg');
}
</style>
