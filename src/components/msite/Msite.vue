<template>
  <div id="msite">
    <header ref="header">
      <div class="locationAndWeather">
        <router-link to="/search_poi_nearby" tag="div" class="location">
          <i class="material-icons">place</i>
          <span v-cloak v-show="namedGeo" class="locationName">{{ namedGeo.formatted_address }}</span>
        </router-link>
        <div class="weather"></div>
      </div>
      <div class="searchBox">
        <input type="search" name="searchBox" placeholder="搜索商家 商品">
      </div>
      <div class="hot">
        <ul>
          <li v-for="(singleHot, index) in hots" :key="index">
            <a v-cloak href="#">{{ singleHot.word }}</a>
          </li>
        </ul>
      </div>
    </header>
    <main>
      <themes :themes="themes" :Geo="GEO"></themes>
      <restaurants :restaurants="restaurants"></restaurants>
    </main>
    <div v-show="!success">
      <loading></loading>
    </div>
    <mainfooter></mainfooter>
    <backfront :appear="bodyScrolled > 400" @toTop="toTop()"></backfront>
  </div>
</template>
<script>

import axios from 'axios'
import themes from '../common/themes/themes'
import restaurants from '../common/restaurants/restaurants'
import star from '../common/star/star'
import mainfooter from '../common/mainfooter/mainfooter'
import Geohash from 'latlon-geohash'
import loading from '../common/loading/loading'
// import getrequest from '../common/js/Georequest'
import Tool from '../common/js/Tool'
// 引入bus 传递数据
import bus from '../../EventBus.js'
import backfront from '../common/backFront/backFront'
export default {
  data: function () {
    return {
      // 随机热搜索
      hots: [],
      // 主题推荐
      themes: [],
      // 店铺推荐
      restaurants: [],
      // 当前地理位置是 currentGeoObj.formatted_address
      GEO: {
        latitude: '',
        longitude: ''
      },
      namedGeo: {
        'formatted_address': ''
      },
      geohash: 'wtw3sjq6n6um',
      // 鼠标滚动事件
      scrolled: false,
      Tool: Tool,
      // 是否获取地理信息成功
      success: false,
      ak: '9eF10l9GpK8ZK0Pav6eTRTrCSZAjUZPK',
      // 手动选择位置的数据
      location: {},
      bodyScrolled: 0,
      body: {}
    }
  },
  components: {
    Tool,
    star,
    mainfooter,
    themes,
    restaurants,
    Geohash,
    loading,
    backfront
  },
  mounted: function () {
    this.init()
    let that = this
    document.title = '饿了哟网上订餐'
    function scrollInit () {
      that.scrollLoad()
      setTimeout(scrollInit, 1000)
    }
    scrollInit()
    // 接收位置数据信息
    // let that = this
    bus.$on('location', function (data) {
      that.location = data
      console.log(that.location)
    })
    // 监听滚动
    this.body = document.getElementsByTagName('body')[0]
    window.addEventListener('scroll', this.listenScroll)
  },
  methods: {
    listenScroll: function () {
      this.bodyScrolled = this.body.scrollTop
    },
    toTop: function () {
      this.bodyScrolled = 0
      this.body.scrollTop = 0
    },
    scrollLoad: function () {
      let differ = this.$el.offsetHeight - window.scrollY
      let that = this
      if (Math.abs(Math.floor(differ) - window.innerHeight) < 10) {
        let restaurantsUrl = `/shopping/restaurants?latitude=${that.GEO.latitude}&longitude=${that.GEO.longitude}&offset=100&limit=10&extras[]=activities&terminal=h5`
        axios.get(restaurantsUrl).then(function (response) {
          that.restaurants = that.restaurants.concat(response.data)
        })
      }
    },
    init: function () {
      if (!navigator.geolocation) {
        alert('你的浏览器不支持地理定位')
        return
      }
      let that = this
      function _init (obj) {
        // theme主题推荐
        let themeUrl = `/v2/index_entry?geohash=${obj.geohash}&group_type=1&flags[]=F`
        axios.get(themeUrl).then(function (response) {
          obj.themes = response.data
        })
        // 随机热搜索
        let hotUrl = `/shopping/v3/hot_search_words?latitude=${obj.GEO.latitude}&longitude=${obj.GEO.longitude}`
        axios.get(hotUrl).then(function (response) {
          obj.hots = response.data
        })
        // 店铺推荐
        let restaurantsUrl = `/shopping/restaurants?latitude=${obj.GEO.latitude}&longitude=${obj.GEO.longitude}&offset=10&limit=10&extras[]=activities&terminal=h5`
        axios.get(restaurantsUrl).then(function (response) {
          obj.restaurants = response.data
        })
        // 逆地理经纬转地名
        // axios.get(`/geocoder/v2/?location=${obj.GEO.latitude},${obj.GEO.longitude}&output=json&pois=1&ak=${that.ak}`).then(function (response) {
        //   that.namedGeo = response.data.result
        // })
      }
      let options = {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 0
      }
      function success (position) {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        that.geohash = Geohash.encode(latitude, longitude)
        that.GEO = {
          'latitude': latitude,
          'longitude': longitude
        }
        _init(that)
        that.success = true
        console.log('success')
      }
      function error () {
        // 默认地址
        that.GEO = {
          'latitude': 39.98537,
          'longitude': 116.316798
        }
        that.geohash = Geohash.encode(that.GEO.latitude, that.GEO.longitude)
        _init(that)
        that.success = true
        console.log('error')
      }
      navigator.geolocation.getCurrentPosition(success, error, options)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
#msite {
  width: 100%;
}

header {
  background-color: #0096ff;
}

.locationAndWeather {
  display: flex;
  padding: .8rem .5rem;
  justify-content: space-between;
}

.location {
  align-items: center;
  display: flex;
}

.location>.material-icons {
  font-size: 1.2rem;
  color: #fff;
}

.locationName {
  font-size: 1.2rem;
  color: #fff;
}

.searchBox {
  margin: 0 auto;
  width: 90%;
  height: 2.4rem;
}

.searchBox>input[type="search"] {
  color: #222;
  width: 100%;
  font-size: .8rem;
  height: inherit;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  text-align: center;
  background: #fafafa;
}

input::-webkit-search-cancel-button {
  display: none;
}

.hot {
  width: 100%;
  overflow-x: scroll;
}

.hot>ul {
  width: 150%;
  padding: .5rem 0;
  overflow-x: scroll;
  justify-content: space-around;
  display: flex;
}

.hot>ul>li {
  color: #fafafa;
  list-style-type: none;
  padding: .2rem;
}

.hot a {
  font-size: .8rem;
  text-decoration: none;
  color: #fafafa;
}

main {
  position: relative;
  width: 100%;
}
</style>
