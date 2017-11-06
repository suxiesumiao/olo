<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>我的优惠</h2>
            <span>兑换红包</span>
        </header>
        <section>
            <nav>
                <div @click="envelope" class="title">
                    <span :style="styleObject.on">红包</span>
                </div>
                <div @click="chit" class="title">
                    <span :style="styleObject.off">商家代金券</span>
                </div>
            </nav>
            <div v-show="isActive" class="content">
                <div class="item">
                    <div class="text">
                        <h3>推荐有奖</h3>
                        <span>5元现金拿不停</span>
                    </div>
                    <div class="img">
                        <img src="http://static11.elemecdn.com/eleme/fe.h5/dist/static/commend.ca533b7.png" alt="commend">
                    </div>
                </div>
                <div class="item">
                    <div class="text">
                        <h3>免费霸王餐</h3>
                        <span>领20元红包</span>
                    </div>
                    <div class="img">
                        <img src="http://static11.elemecdn.com/eleme/fe.h5/dist/static/commend.ca533b7.png" alt="commend">
                    </div>
                </div>
            </div>
        </section>
        <main>
            <img src="https://github.elemecdn.com/eleme/fe-static/master/media/empty/no-log.png" alt="查看订单">
            <span class="prompt">登录后查看优惠信息</span>
            <router-link to="/login" tag="button">登录</router-link>
        </main>
    </div>
</template>
<script>
/*eslint-disable */
export default {
    data() {
        return {
            isActive: true,
            styleObject:{
                on:{borderBottom:'0.2rem solid #fff'},
                off:{borderBottom:'none',opacity:'0.7'}
            }
        }
    },
    methods:{
        envelope(){
            this.isActive = true
            this.styleObject.on.borderBottom = '0.2rem solid #fff'
            this.styleObject.on.opacity = '1'
            this.styleObject.off.borderBottom = 'none'
            this.styleObject.off.opacity = '0.7'
        },
        chit(){
            this.isActive = false
            this.styleObject.off.borderBottom = '0.2rem solid #fff'
            this.styleObject.off.opacity = '1'
            this.styleObject.on.borderBottom = 'none'
            this.styleObject.on.opacity = '0.7'
        },
        goBack(){
            this.$router.go(-1)
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
header>span{
    position: absolute;
    right: 0;
    padding-right: 1rem;
    font-weight: normal;
}
header .material-icons {
    font-size: 2rem;
}

header>h2 {
    font-weight: bold;
    font-size: 1.2rem;
}
section{
    height: 12rem;
}
nav{
    display: flex;
    background-color: #0097ff;
}
.title{
    flex:1;
    padding: 1rem 0;
    text-align: center;
}
.title>span{
    padding-bottom: 0.5rem;
    color: #fff;
}
.content{
    display: flex;
    margin:1rem;
}
.item{
    flex:1;
    display: flex;
    padding: 1rem;
    background-color: #fff;
}
.item:first-child{
    margin-right: 1rem;
}
.text{
    flex:4;
}
.text>h3{
    font-weight: 700;
    font-size: 1rem;
}
.text>span{
    font-size: 0.5rem;
    color: #999;
}
.img{
    flex:3;
}

main {
    display: flex;
    flex-direction: column;
    align-items: center;
}
main>img {
    width: 10rem;
    margin-bottom: 0.8rem;
}

.prompt {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
    color: #6a6a6a;
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
</style>
