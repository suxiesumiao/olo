<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>红包问题</h2>
        </header>
        <main class="markdown" v-html="text"></main>
    </div>
</template>
<script>
/*eslint-disable */
import marked from 'marked'
import bus from '../../../EventBus.js'
export default {
    data() {
        return {
            text: ''
        }
    },
    mounted() {
        let that = this
        bus.$on('hongbao', function(data){
            that.text = marked(data.text)
            // console.log(that.text)
        })
    },
    methods:{
        goBack(){
            this.$router.go(-1)
        }

    }
}
</script>
<style scoped>



.wrapper{
    height: 100vh;
    background-color: #fff;
}
main{
    background-color: #fff;
}
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

</style>
