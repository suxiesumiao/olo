<template>
    <div class="wrapper">
        <header class="header_style">
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>其它问题</h2>
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
        bus.$on('other', function(data){
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
<style>

.markdown{
    padding: 1rem;
}
.markdown h3{
    color: #333;
    font-weight: 600;
    font-size: 1.1rem;
    margin:1rem 0 0.5rem 0;
}
.markdown p{
    color: #666;
    margin:0.5rem;
}
.markdown ul{
    list-style: disc;
    margin-left: 2rem;
}
.markdown ol{
    list-style: decimal;
    margin-left: 2em;
}
.markdown blockquote{
    color: #777;
    padding: 0 1rem;
    border-left: 0.25rem solid #ddd;
}
.header_style {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    position: relative;
    color: #fff;
    font-weight: bold;
}

.header_style>i {
    position: absolute;
    left: 0;
}

.header_style .material-icons {
    font-size: 2rem;
}

.header_style>h2 {
    font-weight: bold;
    font-size: 1.2rem;
}
</style>
