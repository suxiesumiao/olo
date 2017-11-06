<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>我的积分</h2>
        </header>
        <main>
            <span>最近30天积分记录</span>
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
main{
    padding: 1rem;
}
</style>
