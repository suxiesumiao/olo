<template>
  <div id="mainfooter">
    <router-link class="item"
                 to="/">
      <img :src="lightPic('msite')">
      <p>外卖</p>
    </router-link>
    <router-link class="item"
                 to="/discover">
      <img :src="lightPic('discover')">
      <p>发现</p>
    </router-link>
    <router-link class="item"
                 to="/order">
      <img :src="lightPic('order')">
      <p>订单</p>
    </router-link>
    <router-link class="item"
                 to="/profile">
      <img :src="lightPic('profile')">
      <p>我的</p>
    </router-link>
  </div>
</template>
<script>
/*eslint-disable */
export default {
  data: function () {
    return {
      currentRoute: ''
    }
  },
  mounted: function () {
    this.getRoute()
  },
  methods: {
    lightPic: function (str) {
      let temp = str === this.currentRoute?'':'un'
      return `/static/mainfooterpic/${str}-${temp}clicked.svg`
    },
    getRoute: function () {
      this.currentRoute = this.$route.name
    }
  }
}
</script>
<style scoped>
#mainfooter {
  position: fixed;
  display: flex;
  width: 100%;
  bottom: 0;
  justify-content: space-around;
  align-content: center;
  height: 3.6rem;
  background-color: #fff;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  flex: 1;
}

.item>p {
  color: #666;
  font-size: .5rem;
}
</style>
