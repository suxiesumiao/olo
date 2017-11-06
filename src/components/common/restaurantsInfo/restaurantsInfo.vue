<template>
  <div class="restaurantsInfo" :class="{appear: isappear}">
    <header @click="disappear()">
      <h3>商家详情</h3>
    </header>
    <main>
      <div class="item actiandpro">
        <h5 class="title">活动与属性</h5>
        <div class="container" ref="style">
          <p v-for="act in restaurantdetails.activities">
            <span class="c-spec" :class="computeStyleClass(act.icon_color)">
            {{ act.icon_name }}</span>
            <span>{{ act.name }}</span>
          </p>
        </div>
      </div>
      <div class="item shopinfo">
        <h5 class="title">商家信息</h5>
        <p>{{ restaurantdetails.description }}</p>
        <p>
          <span>地址: </span>
          {{ restaurantdetails.address }}</p>
        <p>
          <span>营业时间: </span>
          {{ restaurantdetails.opening_hours }}</p>
        <p class="licence" @click="licenceDisappear('营业执照', restaurantdetails.license.business_license_image)">
          <span>营业执照 </span>
        </p>
        <p class="licence" @click="licenceDisappear('餐饮服务许可证', restaurantdetails.license.catering_service_license_image)">
          <span>餐饮服务许可证</span>
        </p>
      </div>
      <div class="item other">
        <h5 class="title"></h5>
      </div>
    </main>
    <licence
             :isappear="detailsAppear"
             :src="tempSrc"
             :licencename="tempName"
             @disappear="licenceDisappear">
    </licence>
  </div>
</template>
<script>
import licence from '../licences/licence'
export default {
  data: function () {
    return {
      // 检测右侧是否拉出
      detailsAppear: false,
      // 临时存储许可证name
      tempName: '',
      // 临时图片地址
      tempSrc: ''
    }
  },
  components: {
    licence
  },
  props: {
    restaurantdetails: {
      default: function () {
        return {}
      }
    },
    isappear: {
      default: function () {
        return false
      }
    }
  },
  mounted: function () {
  },
  methods: {
    // 证件出现与否
    licenceDisappear: function (str, licence) {
      this.tempName = str
      this.tempSrc = this.computedResImage(licence)
      this.detailsAppear = !this.detailsAppear
    },
    onImage: function () {
      this.on = true
    },
    computeStyleClass: function (str) {
      return 'c-' + str
    },
    disappear: function () {
      this.$emit('disappear')
    },
    computedResImage: function (string) {
      if (!string) { return }
      let length = String(string).length
      let temp = ''
      let last = string[length - 2]
      if (last === 'n') {
        temp = '.png'
      } else if (last === 'e') {
        temp = '.jpeg'
      }
      let before = '/themepic/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp
      return before + '?imageMogr/format/webp/'
    }
  }
}
</script>
<style scoped>
@import '../css/common.css';
.restaurantsInfo{
  position: absolute;
  top: 0;
  right: -100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 736px;
  height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f4f4f4;
  transition: all .3s;
}
.appear{
  right: 0;
}
header{
  background-color: #2196f3;
  background-position: left;
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-image: url('../../shop/images/arrow.svg');
}
header>h3{
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: #fff;
  padding: .5rem 0;
}
main{
  display: flex;
  flex: 1;
  flex-direction: column;
}
.item{
  flex: 1;
  margin: .5rem 0;
  background-color: #fff;
}

.title{
  color: #666;
  font-size: 1rem;
  margin: 1rem .5rem;
}
.container{
  width: 100%;
}
.container > p{
  color: #222;
  font-size: .6rem;
  padding: .5rem 0;
  margin: 0 .3rem;
}
.shopinfo > p{
  width: 100%;
  overflow: hidden;
  color: #444;
  font-size: .6rem;
  padding: 1rem 0;
  margin: 0 .5rem;
  border-top: 1px solid #eee;
}
.licence{
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: right;
  background-image: url('../../../../static/arrow-right-black.svg');
}

</style>
