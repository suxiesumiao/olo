<!-- // 订单页面 -->
<template>
    <div class="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <section class="module" v-for="list in lists">
            <div class="lists">
                <div class="icon">
                    <img v-if="list.avatar" v-bind:src="list.avatar | photo">
                    <img v-else src="https://static11.elemecdn.com/eleme/fe.h5/dist/static/default_avatar.6095908.png" alt="">
                </div>
                <div class="message">
                    <span>{{list.nickname}}</span>
                    <span>{{list.ordered_day | when}}</span>
                    <span>{{list.rating_text}}</span>
                    <div class="detailedness">
                        <div class="place">
                            <span>
                                <img src="../../assets/images/food_icon.png">
                                {{list.restaurant_name}}
                            </span>
                            <span>
                                <span>{{list.restaurant_rating_score | rating}}</span>/
                            <span>{{list.restaurant_month_sale | sale}}</span>
                            </span>
                        </div>
                        <div class="foods">
                            <div class="pic" v-for="item in list.foods">
                                <img v-bind:src="item.image_hash | pic_url">
                                <span>{{item.amount | amount}}</span>
                                <span>{{item.food_name}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="price paid">
                        <span>
                            <span>实付</span>
                        <span>{{list.total_fee | rmb}}</span>
                        </span>
                        <span class="documentary">跟一单</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
/*eslint-disable */
// import mainfooter from '../common/mainfooter/mainfooter'
import axios from 'axios'

let count = 0
export default {
    data() {
            return {
                lists: [],
                data: [],
                busy: false,
                num: 0
            }
        },
        created: function() {
            this.getData()
        },
        computed: {},
        filters: {
            //4b9041a2acec95df4ccf96035cb4cb51jpeg
            //ecd11feb9696cec2a4d28feb6525545epng
            //图片路径、格式处理
            pic_url: function(str) {
                return 'http://fuss10.elemecdn.com/' + str.slice(0, 1) + '/' + str.slice(1, 3) + '/' + str.slice(3) + '.' + str.slice(32) + '?imageMogr/format/webp/'
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
            photo: function(str) {
                return 'http://fuss10.elemecdn.com/' + str.slice(0, 1) + '/' + str.slice(1, 3) + '/' + str.slice(3) + '.' + str.slice(32) + '?imageMogr/quality/75/format/webp/'
            }
        },
        watch: {
            //ad81c4ad5e2ecc1704eb5d26a244d342jpeg
            //fuss10.elemecdn.com/a/d8/1c4ad5e2ecc1704eb5d26a244d342jpeg.jpeg?imageMogr/quality/75/format/webp/
        },
        methods: {
            getData: function() {
                let that = this
                let orders_url = '/marketing/v1/nearby_orders?latitude=40.087492&longitude=116.337139&offset=' + that.num + '&limit=10'
                axios.get(orders_url).then(function(response) {
                    that.lists = response.data
                    // console.log(that.lists)
                })
            },
            new: function() {
                let that = this
                that.num += 10
                axios.get('/marketing/v1/nearby_orders?latitude=40.087492&longitude=116.337139&offset=' + that.num + '&limit=10')
                    .then(function(response) {
                        that.data = response.data
                    })
            },
            loadMore: function() {
                this.busy = true
                    // setTimeout(() => {
                this.new()
                this.lists = [...this.lists, ...this.data]
                this.busy = false
                // console.log(this.data, this.busy)
                    // }, 1000)
            }
        }
}
</script>
<style scoped>
/*eslint-disable */
.wrapper{
    margin-bottom: 5rem;
    margin-top: 3rem;
}

.price {
    font-size: 0.8rem;
    color: #ff6000;
    display: flex;
    align-items: flex-end;
}

.module {
    background-color: #fff;
    padding: 1rem 0;
    margin-bottom: 1rem;
}
.lists {
    display: flex;
    padding: 1rem;
    flex-wrap: wrap;
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
    /*justify-content: space-between;*/
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
