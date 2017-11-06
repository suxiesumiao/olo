<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>饿了么会员卡</h2>
        </header>
        <main>
            <div class="msg">
                <div class="myMsg">
                    <span>我的会员信息</span>
                    <span>登录后可查看</span>
                </div>
                <router-link to="/login" tag="span">立即登录</router-link>
            </div>
            <div class="buy">
                <div class="title">
                    <span>开通会员</span>
                </div>
                <div class="content">
                    <div class="price">
                        <span>1个月</span>
                        <span>￥20</span>
                    </div>
                    <span>购买</span>
                </div>
            </div>
            <div class="exchange">
                <span>兑换会员</span>
                <span>使用卡号卡密 <i class="material-icons">&#xE315;</i></span>
            </div>
        </main>
    </div>
</template>
<script>
/*eslint-disable */
export default {
    data() {
        return {
            data: ''
        }
    },
    methods:{
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

header .material-icons {
    font-size: 2rem;
}

header>h2 {
    font-weight: bold;
    font-size: 1.2rem;
}

main {
    display: flex;
    flex-direction: column;
}
main>div{
    margin-bottom: 1rem;
    background-color: #fff;
}
.msg{
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    align-items: center;
}
.msg>span{
    color: #666;
    border:1px solid #ddd;
    border-radius: 0.1rem;
    padding: 0.2rem 0.6rem;
}
.myMsg{
    display: flex;
    flex-direction: column;
}
.myMsg>span:first-child{
    font-size: 1.1rem;
}
.myMsg>span:last-child{
    font-size: 0.8rem;
    color: #999;
}

.buy{
    padding: 1rem;
    display: flex;
    flex-direction: column;
}
.title{
    padding-bottom: 1rem;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
}
.content{
    display: flex;
    justify-content: space-between;
    padding-top: 1rem;
    font-size: 1.1rem;
}
.content>span{
    color: #ff6000;
    border:1px solid #ff6000;
    padding:0 1rem;
    border-radius: 0.1rem;
}
.price>span:last-child{
    font-weight: 700;
    color: #ff6000;
}

.exchange{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}
.exchange>span:first-child{
    font-size: 1.1rem;
}
.exchange>span:last-child{
    display: flex;
    align-items: center;
    color: #999;
}
</style>
