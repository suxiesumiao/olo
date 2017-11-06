<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>积分商城</h2>
        </header>
        <main>
            <div class="lunbo">
                <el-carousel trigger="click" height="180px" arrow="never">
                    <el-carousel-item v-for="item in src" :key="item.id">
                        <img :src="item" alt="shop">
                    </el-carousel-item>
                </el-carousel>
            </div>
            <section class="title fadeIn">
                <div class="item">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAMAAAB+ITwmAAAAb1BMVEUAAAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7tw2nRgAAAAJHRSTlMAMNFvNgIP+u7IZPTmqCsX3L64lVlSR0IGhQqwmnIiIeCNiHWMmKFFAAAA90lEQVQ4y7WSx3bDIBAAsURRtdWb7dT5/29MHPGICBxy8VzYJ0bsLov4N+c6w6dsJ88YDBHW4xmGZDj5TB0MzlAtjQ5yqyuVdmlgFiGXkt6GuqIWMVKQe9STXaKKysnVI5BQiDgS0sfaWVXoInWMLsHyvRjsHb1z4LRXDPKozHniuOr9YPOjtCRaxFH1nkga2i2u9NhORuiWmLHChw0LqFVo3OHmPn9C72+HP67e5KPp1Q3unjEb8u1Pe/4YZBlexdLB+PvGMppwtFuOmW38WlG9iBCdUMp9Mg3ZORTcjnND3Pk2Y4ircmpd3VFkCX73ITLnbRDP4AvgBhnxd27pJAAAAABJRU5ErkJggg==" alt="">
                    <span>积分</span>
                </div>
                <div class="item">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAeCAMAAAB+ITwmAAAASFBMVEUAAAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7suq4vdAAAAF3RSTlMAECCBQOGg8MBg61E79y4b5tjSakMwBJYmHaQAAACJSURBVDjLzdHdDsIgDIbhAmoVGOzX7/7vVEMiKbMzGg+25/iFpin9ZIQwqgkahlrzwMxAsi8AMw+zSPr1SxR9MyMuC3CugGgTIJLyAUPgO5n3JJ+ETEqysnMyXappI+mAaiMJrgp7bxRvRZSJvlH3IXHXwh3hRv8n1kjZPqUm8VB5kQSvFoG+9ADpOxYXD3z/zwAAAABJRU5ErkJggg==" alt="">
                    <span>兑换记录</span>
                </div>
            </section>
            <section class="menu fadeIn delay-1">
                <div class="menu_item" v-for="item in icon">
                    <img :src="item.src" alt="icon">
                    <span>{{item.title}}</span>
                </div>
            </section>
            <section class="img fadeIn delay-2">
                <div class="left">
                    <img src="https://yun.duiba.com.cn/images/201704/4e1hq0hygr.jpg" alt="img">
                </div>
                <div class="right">
                    <img src="https://yun.duiba.com.cn/images/201704/8uoox9vt55.png" alt="img">
                    <img src="https://yun.duiba.com.cn/images/201704/j43j5kug1k.png" alt="img">
                </div>
            </section>
            <section class="lists fadeIn delay-3">
                <h4>大家都在兑</h4>
                <ul>
                    <li class="list" v-for="item in data">
                        <h4>{{item.title}}</h4>
                        <div class="tips">
                            <span>{{item.credits}}</span>
                            <span>积分</span>
                            <span class="tag" :style="{backgroundColor:item.tagColor}">{{item.tagText}}</span>
                        </div>
                        <div class="wrap">
                            <img :src="item.image" alt="image">
                        </div>
                    </li>
                </ul>
            </section>
            <footer>
                <p>*兑换项和活动皆与设备生产商Apple Inc.无关</p>
                <p>合作请联系：ejifen@ele.me</p>
            </footer>
        </main>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
export default {
    data() {
        return {
            data: [],
            src:[
                'https://yun.duiba.com.cn/images/201704/g82yh0iq1i.jpg?x-oss-process=image/format,webp',
                'https://yun.duiba.com.cn/images/201704/3s92kekob6.jpg?x-oss-process=image/format,webp',
                'https://yun.duiba.com.cn/images/201704/igsx6gnlxw.jpg?x-oss-process=image/format,webp'
            ],
            icon:[
                {
                    src:'https://yun.duiba.com.cn/images/201611/q7c9ghhwxh.png',
                    title:'会员专享'
                },
                {
                    src:'https://yun.duiba.com.cn/developer/img/custom_default_icon.png',
                    title:'0元兑换'
                },
                {
                    src:'https://yun.duiba.com.cn/images/201611/by82zpc962.png',
                    title:'优惠礼券'
                },
                {
                    src:'https://yun.duiba.com.cn/images/201611/yrvj0axxff.png',
                    title:'食品饮料'
                },
                {
                    src:'https://yun.duiba.com.cn/images/201611/e2gpweapqd.png',
                    title:'数码家电'
                },
                {
                    src:'https://yun.duiba.com.cn/images/201611/q4eion0i4l.png',
                    title:'日常家居'
                },
                {
                    src:'https://yun.duiba.com.cn/images/201611/5glf4cj3io.png',
                    title:'个户美妆'
                },
                {
                    src:'https://yun.duiba.com.cn/img/icon_all.png',
                    title:'所有商品'
                }
            ]
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            let that = this
            axios.get('/api/list')
            .then(function(response){
                that.data = response.data.data
                // console.log(that.data)
            })
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.fadeIn{
    animation: fadeIn 0.5s ease-out backwards;
}
.delay-1{
    animation-delay: 0.2s;
}
.delay-2{
    animation-delay: 0.4s;
}
.delay-3{
    animation-delay: 0.6s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }

  100% {
    opacity: 1;
  }
}

header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3;
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
    margin-top: 3rem;
}

.el-carousel__item img {
    height: 100%;
    width: 100%;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.title{
    display: flex;
    background-color: #fff;
    padding: 1rem 0;
}
.title>.item{
    flex:1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item:first-child{
    border-right: 1px solid #e5e5e5;
}
.item>img{
    width: 1.4rem;
}
.menu{
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 1rem;
    background-color: #fff;
}
.menu_item{
    /*flex-grow: 1;*/
    width: 20%;
    margin: 0 0.5rem 1rem 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #666;
    font-size: 0.8rem;
}
.menu_item>img{
    width: 3.6rem;
    border-radius: 50%;
    margin-bottom: 0.5rem;
}
.img{
    display: flex;
    background-color: #fff;
    margin-top: 1rem;
}
.left,.right{
    flex:1;
}
.lists{
    margin-top: 1rem;
    background-color: #fff;
}
.lists>h4{
    padding: 1rem;
    padding-bottom: 1px solid #f5f5f5;
    border-bottom: 1px solid #999;
}
.lists>ul{
    display: flex;
    flex-wrap: wrap;
}
.list{
    max-width: 50%;
    padding: 1rem;
    border-bottom: 1px solid #999;
}
.list:nth-child(odd){
    border-right: 1px solid #999;
}
.list>h4,.tips{
    padding-bottom: 0.5rem;
}
.tips>span:first-child{
    color: #ff6000;
}
.tips>span:nth-child(2){
    color: #999;
    font-size: 0.6rem;
}
.tag{
    color: #fff;
    font-size: 0.6rem;
    padding: 0.1rem 0.4rem;
    border-radius: 0.1rem;
}
footer{
    padding: 1rem 0;
    text-align: center;
    color: rgb(143, 132, 132);
    font-size: 0.8rem;
}
</style>
