<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>我的余额</h2>
        </header>
        <main>
            <img src="https://github.elemecdn.com/eleme/fe-static/master/media/empty/no-log.png" alt="查看订单">
            <span class="prompt">您还没有登录</span>
            <span class="tips">快去登录吧</span>
            <router-link to="/login" tag="button">登录</router-link>
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
    margin: 8rem 0;
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
.tips{
    font-size: 0.5rem;
    margin-bottom: 0.8rem;
    color: #999;
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
