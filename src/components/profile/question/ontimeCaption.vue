<template>
    <transition name="slide-left">
    <div class="wrapper slide">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>准时达问题</h2>
        </header>
        <main class="markdown" v-html="text"></main>
    </div>
    </transition>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import marked from 'marked'
import bus from '../../../EventBus.js'
export default {
    data() {
        return {
            text:''
        }
    },
    mounted() {
        let that = this
        bus.$on('ontime', function(data){
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




/*过渡*/
.slide-left-enter-active, .slide-left-leave-active {
  transition: all 1.2s ease-out;
  /*transform: translateX(0%);*/
}
.slide-left-enter, .slide-left-leave {
  opacity: 0;
  /*transform: translateX(100%);*/
}
/*.slide{
    animation: slide 1s;
}
@keyframes slide {
  0% {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(0%, 0, 0);;
  }
}*/


/*主体样式*/
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
