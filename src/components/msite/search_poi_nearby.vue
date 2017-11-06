<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE408;</i>
            <h2>选择地址</h2>
        </header>
        <section class="search">
            <input @keyup.enter="getData" v-model="val" type="text" placeholder="请输入地址" autofocus="autofocus">
            <i v-show="val" @click="clear" class="material-icons clear">&#xE14C;</i>
        </section>
        <ul>
            <router-link to="/" tag="li" class="list" v-for="(item,index) in data" @click.native="location(index)" :key="item.id">
                <p>{{item.name}}</p>
                <p>{{item.address}}</p>
            </router-link>
        </ul>
        <h4>收获地址</h4>
    </div>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import bus from '../../EventBus.js'
export default {
    data() {
        return {
            val: '',
            data: []
        }
    },
    created(){
        // this.getData()
    },
    methods: {
        getData(){
            let that = this
            let url = '/bgs/poi/search_poi_nearby?keyword='+this.val+'&offset=0&limit=20'
            if(this.val){
                axios.get(url).then(function(response){
                    that.data = response.data
                    console.log(response.data)
                })
            }else{
                this.data = []
            }
        },
        clear(){
            this.val = ''
        },
        goBack() {
            this.$router.go(-1)
        },
        location(index){
            bus.$emit('location', this.data[index])
        }
    }
}
</script>
<style scoped>
header {
    position: fixed;
    width: 100%;
    margin-top: -7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    color: #fff;
}

header>i {
    position: absolute;
    left: 0;
}

header .material-icons {
    font-size: 2rem;
}

header>h2 {
    font-size: 1.2rem;
}

.search {
    position: fixed;
    width: 100%;
    margin-top: -4rem;
    background-color: rgb(0, 151, 255);
    padding: 1rem 1.5rem;
}

.search>input {
    width: 100%;
    outline: none;
    border: none;
    height: 2rem;
    border-radius: 1rem;
    padding: 0 1rem;
    font-size: 1rem;
}

.clear {
    position: absolute;
    top: 50%;
    right: 2.5rem;
    transform: translateY(-50%);
    font-size: 1rem;
    font-weight: 700;
    color: #195c8b;
}

ul {
    margin-top: 7rem;
}

.list {
    padding: 1rem 1.5rem;
    border-top: 1px solid #ccc;
    background-color: #fff;
}

.list>p:first-child {
    font-weight: 700;
    color: #333;
}

.list>p:nth-child(2) {
    color: #999;
    font-size: 0.8rem;
}
h4{
    padding: 1rem 1.5rem;
}
</style>
