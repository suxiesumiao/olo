<template>
	<div class="wrapper">
    <header>
        <i @click="goBack" class="material-icons">&#xE314;</i>
        <h2 @click="getLocation">订单</h2>
    </header>
    <main>
        <img src="https://github.elemecdn.com/eleme/fe-static/master/media/empty/error-load.png" alt="查看订单">
        <h3>登录后查看外卖订单</h3>
        <!-- <button>立即登录</button> -->
        <router-link to="/login" tag="button">立即登录</router-link>
    </main>
    <mainfooter></mainfooter>
    </div>
</template>
<script>
/*eslint-disable */
import mainfooter from '../common/mainfooter/mainfooter'
import Geohash from 'latlon-geohash'
import axios from 'axios'
export default {
  components: {
    mainfooter
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getLocation(){
        console.log(this.$route.query)
        console.log(this.$route.path)
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.success,this.error)
        }else{
            console.log("Geolocation is not supported by this browser.")
        }
    },
    success(position){
        let lat = position.coords.latitude
        let lng = position.coords.longitude

        let geohash = Geohash.encode(lat,lng)
        console.log(geohash)
        let url = '/v2/pois/'+geohash
        axios.get(url).then(function(response){
            console.log(response.data)
        })
    },
    error(){
        console.log('error')
    }
  }
}
</script>
<style scoped>

header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    position: relative;
    color: #fff;
    font-weight: bold;
}

header>i {
    position: absolute;
    left: 0;
}

header .material-icons {
    font-size: 2rem;
}

header>h2 {
    font-weight: bold;
    font-size: 1.2rem;
}

main {
    text-align: center;
    margin: 6rem 0;
}

main>img {
    width: 10rem;
}

main>h3 {
    font-size: 1.2rem;
    margin-bottom: 0.8rem;
}

main>button {
    width: 8rem;
    padding: 0.8rem 0;
    border-radius: 0.2rem;
    background-color: #56d176;
    outline: none;
    border: none;
    color: #fff;
    font-size: 0.8rem;
}
/*
footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 0.5rem 0;
    border-top: 1px solid rgba(0, 0, 0, .1)
}

.tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.tab>img {
    width: 1.5rem;
}

.tab>span {
    font-size: 0.8rem;
}*/
</style>
