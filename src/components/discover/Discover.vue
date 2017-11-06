<!-- // 发现页面 -->
<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>发现</h2>
        </header>
        <main v-if="$route.path==='/discover'">
            <!-- 主体顶部 -->
            <router-link to="/integral_shop" tag="section">
                <div class="parts">
                    <div class="item" v-for="(item,index) in discover[1]">
                        <div class="content">
                            <h4 v-bind:style="{color:item.title_color}">{{item.title}}</h4>
                            <span>{{item.subtitle}}</span>
                        </div>
                        <img v-bind:src="item.main_pic_hash | pic_url">
                    </div>
                </div>
                <div class="entry" v-for="item in discover[2]">
                    <img v-bind:src="item.sub_pic_hash | pic_url">
                </div>
            </router-link>
            <!-- 美食热推 -->
            <router-link to="/discover/hotfood" tag="section" class="module" v-if="hotfood.length">
                <div class="title">
                    <div class="title_top">
                        <span class="line_left"></span>
                        <img src="../../assets/images/icon_1.png">
                        <h3>美食热推</h3>
                        <span class="line_right"></span>
                    </div>
                    <span>你的口味，我都懂得</span>
                </div>
                <div class="lists">
                    <div class="list" v-for="item in hotfood">
                        <img v-bind:src="item.foods[0].image_hash | pic_url">
                        <p class="dishes">{{item.foods[0].name}}</p>
                        <p class="price">{{item.foods[0].price | rmb}}</p>
                    </div>
                </div>
                <div class="footer">
                    <span>查看更多</span>
                    <span class="material-icons">&#xE315;</span>
                </div>
            </router-link>
            <!-- 天天特价 -->
            <router-link to="/discover/discount" tag="section" class="module">
                <div class="title">
                    <div class="title_top">
                        <span class="line_left"></span>
                        <img src="../../assets/images/icon_2.png">
                        <h3>天天特价</h3>
                        <span class="line_right"></span>
                    </div>
                    <span>特价商品，一网打尽</span>
                </div>
                <div class="lists">
                    <div class="list" v-for="item in discount">
                        <div class="img">
                            <img v-bind:src="item.image_hash | pic_url">
                            <span class="left_top">{{item.discount_rate | discount_n}}</span>
                        </div>
                        <span class="dishes">{{item.food_name}}</span>
                        <span class="price">
                            <span>{{item.price | rmb}}</span>
                        <span class="original_price">{{item.original_price | rmb}}</span>
                        </span>
                    </div>
                </div>
                <div class="footer">
                    <!-- <span>查看更多</span> -->
                    <span>查看更多</span>
                    <span class="material-icons">&#xE315;</span>
                </div>
            </router-link>
            <!-- 大家都在吃 -->
            <router-link to="/discover/nearby" tag="section" class="module">
                <div class="title">
                    <div class="title_top">
                        <span class="line_left"></span>
                        <img src="../../assets/images/icon_3.png">
                        <h3>大家都在吃</h3>
                        <span class="line_right"></span>
                    </div>
                    <span>总有美味在身边</span>
                </div>
                <div class="lists">
                    <div class="icon">
                        <img src="https://static11.elemecdn.com/eleme/fe.h5/dist/static/default_avatar.6095908.png" alt="">
                    </div>
                    <div class="message">
                        <span>{{orders.nickname}}</span>
                        <span>{{orders.ordered_day | when}}</span>
                        <span>{{orders.rating_text}}</span>
                        <div class="detailedness">
                            <div class="place">
                                <span>
                                <img src="../../assets/images/food_icon.png">{{orders.restaurant_name}}</span>
                                <span>
                                    <span>{{orders.restaurant_rating_score | rating}}</span>/
                                <span>{{orders.restaurant_month_sale | sale}}</span>
                                </span>
                            </div>
                            <div class="foods">
                                <div class="pic" v-for="item in orders.foods">
                                    <img v-bind:src="item.image_hash | pic_url">
                                    <span>{{item.amount | amount}}</span>
                                    <span>{{item.food_name}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="price paid">
                            <span>
                                <span>实付</span>
                            <span>{{orders.total_fee | rmb}}</span>
                            </span>
                            <span class="documentary">跟一单</span>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <!-- <span>查看更多</span> -->
                    <span>查看更多</span>
                    <span class="material-icons">&#xE315;</span>
                </div>
            </router-link>
            <!-- 限时好礼 -->
            <router-link to="/integral_shop" tag="section" class="module">
                <div class="title">
                    <div class="title_top">
                        <span class="line_left"></span>
                        <img src="../../assets/images/icon_4.png">
                        <h3>限时好礼</h3>
                        <span class="line_right"></span>
                    </div>
                    <span>小积分换豪礼</span>
                </div>
                <div class="lists">
                    <div class="list" v-for="item in gifts">
                        <div class="img">
                            <img v-bind:src="item.image_hash | pic_url">
                            <span class="left_top">{{item.corner_marker}}</span>
                        </div>
                        <span class="dishes">{{item.title}}</span>
                        <span class="price">
                            <span>{{item.points_required | integral}}</span>
                        <span class="original_price">{{item.original_price | rmb}}</span>
                        </span>
                    </div>
                </div>
                <div class="footer">
                    <span>查看更多</span>
                    <span class="material-icons">&#xE315;</span>
                </div>
            </router-link>
            <mainfooter></mainfooter>
        </main>
        <div>
            <keep-alive>
        	   <router-view></router-view>
            </keep-alive>
        </div>
    </div>
</template>
<script>
/*eslint-disable */
// 文件中关闭eslint验证
import axios from 'axios'
import mainfooter from '../common/mainfooter/mainfooter'
export default {
    data() {
            return {
                discover: {},
                hotfood: [],
                discount: [],
                orders: {},
                gifts: [],
                show: true
            }
        },
        components: {
            mainfooter
        },
        created: function() {
            this.getData()
            // console.log(this.$route.path)
            // console.log(this.$route.params)
            // console.log(this.$route.query)
            // console.log(this.$route.hash)
            // console.log(this.$route.fullPath)
            // console.log(this.$route.matched)
            // console.log(this.$route.name)
        },
        computed: {},
        filters: {
            pic_url: function(str) {
                return 'https://fuss10.elemecdn.com/' + str.slice(0, 1) + '/' + str.slice(1, 3) + '/' + str.slice(3) + '.' + str.slice(32) + '?imageMogr/format/webp/'
            },
            rmb: function(price) {
                return '¥' + price
            },
            when: function(day) {
                return day + '天前吃过'
            },
            rating: function(n) {
                return '评价' + n + '分'
            },
            sale: function(n) {
                return '月售' + n + '单'
            },
            amount: function(n) {
                return n + '份'
            },
            integral: function(n) {
                return n + '积分'
            },
            discount_n: function(n) {
                return (n * 10).toFixed(1) + '折'
            }
        },
        watch: {
            //
        },
        methods: {
            getData(){
                let that = this
                let discover_url = '/member/v1/discover?platform=1&block_index=0'
                let hotfood_url = '/hotfood/v1/guess/likes?latitude=40.0877364&longitude=116.3370682&offset=0&limit=3&request_id=eacf7721-af0a-463d-b1ea-f13cbf614fff&tag_id=-1&columns=1'
                let discount_url = '/shopping/v1/discount/food?latitude=40.0877364&longitude=116.3370682&offset=0&limit=3'
                let orders_url = '/marketing/v1/nearby_orders?latitude=40.087492&longitude=116.337139&offset=0&limit=1'
                let gifts_url = '/member/gifts/suggest'
                axios.get(discover_url).then(function(response) {
                    that.discover = response.data
                })
                axios.get(hotfood_url).then(function(response) {
                    that.hotfood = response.data
                        // console.log(that.hotfood)
                })
                axios.get(discount_url).then(function(response) {
                    that.discount = response.data
                    // console.log(that.discount)
                })
                axios.get(orders_url).then(function(response) {
                    that.orders = response.data[0]
                        // console.log(that.orders)
                })
                axios.get(gifts_url).then(function(response) {
                    that.gifts = response.data
                        // console.log(that.gifts)
                })
            },
            goBack(){
                this.$router.go(-1)
            }
        }
}
// let app = new Vue({

// })
</script>
<style scoped>
/*@import '../../css/faxian.css'*/


/*html{
	font-size: 40px;
	background-color: #f4f4f4;
	box-sizing: border-box;
}
body{
	font-family: Helvetica Neue,Tahoma,Arial,PingFangSC-Regular,Hiragino Sans GB,Microsoft Yahei,sans-serif;
}*/

header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    color: #fff;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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


/*主体部分样式*/

main {
    margin-bottom: 5rem;
    margin-top: 3rem;
}


/*主体顶部*/

.parts {
    position: relative;
    background-color: #fff;
}

.item {
    display: flex;
    align-items: center;
}

.item:first-child {
    width: 50%;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem;
}

.item:first-child>.content {
    align-self: flex-start;
}

.item:nth-child(2) {
    border-bottom: 1px solid #aaa;
}

.item:nth-child(2),
.item:nth-child(3) {
    margin-left: 50%;
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    border-left: 1px solid #aaa;
}
.item:nth-child(1)>img{
	width: 6rem;
}
.item:nth-child(2)>img,
.item:nth-child(3)>img {
    width: 3rem;
}

.content>h4 {
    font-size: 1.2rem;
}

.content>span {
    font-size: 0.8rem;
}

.entry>img {
    width: 100%;
    margin: 1rem 0;
}


/*美食热推*/


/*天天特价*/


/*限时好礼*/

.title_top>img {
    vertical-align: text-top;
    width: 1.2rem;
}

.title {
    text-align: center;
}

.line_left,
.line_right {
    display: inline-block;
    border: 1px solid black;
    width: 1.5rem;
    margin: 0.2rem 0.2rem 0.4rem;
    position: relative;
}

.line_left:after,
.line_right:before {
    position: absolute;
    content: '';
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 50%;
    background-color: #000;
}

.line_left:after {
    top: -0.2rem;
    left: 1.2rem;
}

.line_right:before {
    top: -0.2rem;
    left: -0.1rem;
}

.title h3 {
    font-size: 1.1rem;
    font-weight: bold;
    display: inline-block;
}

.title>span {
    font-size: 0.7rem;
    color: #999;
}

.lists {
    display: flex;
    padding: 1rem;
    flex-wrap: wrap;
}

.lists>.list {
    flex: 1;
    margin: 0 0.2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
}
.list>img{
    flex-grow: 1;
}

.img {
    position: relative;
    flex-grow: 1;
}

.img>img {
    width: 100%;
    height: 100%;
}

.left_top {
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #413d3c;
    color: #fff;
    font-size: 0.8rem;
    padding: 0.15rem;
}
.dishes {
    display: inline-block;
    font-size: 0.9rem;
    padding: 0.6rem 0;
    overflow: hidden;
    /*white-space: nowrap;*/
    text-overflow: ellipsis;
    width: 100%;
    font-weight: 700;
}

.price {
    font-size: 0.8rem;
    color: #ff6000;
    display: flex;
    align-items: flex-end;
}

.original_price {
    color: #aaa;
    text-decoration: line-through;
    margin-left: 0.4rem;
}

.footer {
    text-align: center;
    color: #999;
}

.footer>span {
    font-size: 0.8rem;
    vertical-align: middle;
}

.module {
    background-color: #fff;
    padding: 1rem 0;
    margin-bottom: 1rem;
}


/*大家都在吃*/

.lists {
    display: flex;
    justify-content: space-between;
}

.icon {
    flex: 1;
}

.icon>img {
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
}

.message {
    flex: 10;
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
}

.message>span {
    margin-bottom: 0.4rem;
    padding: 0 0.8rem;
}

.message>span:nth-child(1) {
    font-weight: bold;
}

.message>span:nth-child(2) {
    color: #999;
}

.detailedness {
    background-color: #f9f9f9;
    padding: 0.8rem;
}

.place {
    display: flex;
    justify-content: space-between;
    font-size: 0.7rem;
}

.place>span:first-child {
    font-weight: bold;
}

.place>span:first-child>img {
    margin-right: 0.2rem;
    width: 0.5rem;
    vertical-align: middle;
}
.foods{
    display: flex;
}
.pic {
    margin-top: 0.8rem;
    margin-right: 0.25rem;
    position: relative;
    display: inline-block;
    max-width: 32%;
}
.pic{
    width: 100%;
}
.pic>img {
    width: 100%;
    height: 100%;
}

.pic>span:nth-child(2) {
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    font-weight: bold;
    background-color: rgba(0, 0, 0, .5);
}

.pic>span:nth-child(3) {
    position: absolute;
    bottom: 0;
    color: #fff;
    font-weight: bold;
    width: 100%;
    text-align: center;
    background-color: rgba(0, 0, 0, .4);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.paid {
    background-color: #fcfcfc;
    display: flex;
    justify-content: space-between;
    padding: 0.6rem;
    border-top: 1px solid #bbb;
    color: #000;
    font-weight: bold;
}

.price>span:first-child>span:last-child {
    color: #ff6000;
    font-size: 1rem;
}

.documentary {
    display: inline-block;
    padding: 0.4rem 1.4rem;
    border: 1px solid #3190e8;
    border-radius: 0.2rem;
    color: #3190e8;
}
</style>
