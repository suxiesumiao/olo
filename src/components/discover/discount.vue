<!-- // 订单页面 -->
<template>
    <div class="wrapper" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <section class="module">
            <div class="title">
                <div class="title_top">
                    <span class="line_left"></span>
                    <img src="../../assets/images/icon-price.png">
                    <h3>天天特价</h3>
                    <span class="line_right"></span>
                </div>
                <span>特价商品，一网打尽</span>
            </div>
            <div class="lists">
                <div class="discount" v-for="item in discount">
                    <div class="img img_wrap">
                        <img v-bind:src="item.image_hash | pic_url">
                        <span class="left_top">{{item.discount_rate | discount_n}}</span>
                        <div class="name">
                            <img src="../../assets/images/food_icon.png">
                            <span>{{item.restaurant_name}}</span>
                        </div>
                    </div>
                    <span class="dishes food_name">{{item.food_name}}</span>
                    <div class="discount_price">
                        <span class="price">
                            <span class="going_price">{{item.price | rmb}}</span>
                        <span class="original_price">{{item.original_price | rmb}}</span>
                        </span>
                        <span class="tag">抢</span>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
    data() {
            return {
                discount: [],
                data: [],
                busy: false,
                num: 0
            }
        },
        created: function() {
            this.getData()
        },
        computed: {
            clear: function() {
                console.log('ji')
            }
        },
        filters: {
            pic_url: function(str) {
                return 'https://fuss10.elemecdn.com/' + str.slice(0, 1) + '/' + str.slice(1, 3) + '/' + str.slice(3) + '.' + str.slice(32) + '?imageMogr/format/webp/'
            },
            rmb: function(price) {
                return '¥' + price
            },
            discount_n: function(n) {
                return (n * 10).toFixed(1) + '折'
            }
        },
        watch: {
            //
        },
        methods: {
            getData: function() {
                let that = this
                let discount_url = '/shopping/v1/discount/food?latitude=40.0875207&longitude=116.3370181&limit=10&offset=' + that.num
                axios.get(discount_url).then(function(response) {
                    that.discount = response.data
                        // console.log(that.discount)
                })
            },
            new: function() {
                let that = this
                that.num += 10
                axios.get('/shopping/v1/discount/food?latitude=40.0875207&longitude=116.3370181&offset=' + that.num + '&limit=10')
                    .then(function(response) {
                        that.data = response.data
                    })
            },
            loadMore: function() {
                this.busy = true
                    // setTimeout(() => {
                this.new()
                this.discount = [...this.discount, ...this.data]
                this.busy = false
                // console.log(this.data, this.busy)
                    // }, 1000)
            }
        }
}
</script>
<style scoped>
.wrapper{
    margin-bottom: 5rem;
    margin-top: 3rem;
}
.title_top>img {
    vertical-align: text-bottom;
    width: 1.5rem;
}

.title {
    color: #fff;
    padding: 1rem 0;
    text-align: center;
    background-image: url(https://fuss10.elemecdn.com/4/58/1208d4a5bc0cc0764371d44254af3jpeg.jpeg?imageMogr/format/webp/thumbnail/!750x194r/gravity/Center/crop/750x194/);
    background-size: 100% 100%; 
}

.line_left,
.line_right {
    display: inline-block;
    border: 1px solid #fff;
    width: 2rem;
    margin: 0.2rem 0.2rem 0.4rem;
    position: relative;
}

.title h3 {
    font-size: 1.6rem;
    font-weight: bold;
    display: inline-block;
}

.title>span {
    font-size: 1rem;
    color: #fff;
}

.lists {
    padding: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.lists>.list {
    flex: 1;
    margin: 0 0.2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.discount {
    width: 48%;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}

.name {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3rem;
    background-image: linear-gradient(-180deg, transparent, rgba(0, 0, 0, .8));
    display: flex;
    align-items: center;
    padding: .6rem;
    color: #fff;
}

.name>img {
    width: .7rem;
}

.name>span {
    vertical-align: middle;
    padding-left: .4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.discount_price {
    display: flex;
    justify-content: space-between;
}

.tag {
    background-color: #f94843;
    color: #fff;
    padding: 0 .6rem;
    border-radius: 8px;
}

.food_name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.going_price {
    font-size: 1.1rem;
}
.list>img {
    height: 7rem;
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
.module {
    background-color: #fff;
    margin-bottom: 1rem;
}
</style>
