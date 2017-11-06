<template>
    <transition name="slide-right">
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>服务中心</h2>
        </header>
        <main>
            <div class="tips">
                <div v-show='show_notCustomerText' class="tip">{{msg.notSeviceLineText}}</div>
                <div v-show='show_notSeviceLineText' class="tip">{{msg.notCustomerText}}</div>
            </div>
            <section class="top">
                <div class="service" @click="notSeviceLineText_showTime">
                    <img src="../../assets/images/service_1.png" alt="service">
                    <span>在线客服</span>
                </div>
                <div class="service" @click="notCustomerText_showTime">
                    <img src="../../assets/images/service_2.png" alt="service">
                    <span>客服热线</span>
                </div>
            </section>
            <ul class="question">
                <li>热门问题</li>
                <router-link to="/help/ontimeCaption" tag="li" class="list" @click.native="ontime">
                    <span>{{data.ontimeCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/paymentCaption" tag="li" class="list" @click.native="payment">
                    <span>{{data.paymentCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/balanceCaption" tag="li" class="list" @click.native="balance">
                    <span>{{data.balanceCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/hongbaoCaption" tag="li" class="list" @click.native="hongbao">
                    <span>{{data.hongbaoCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/pointtextCaption" tag="li" class="list" @click.native="pointtext">
                    <span>{{data.pointtextCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/memberCaption" tag="li" class="list" @click.native="member">
                    <span>{{data.memberCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/activityCaption" tag="li" class="list" @click.native="activity">
                    <span>{{data.activityCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
                <router-link to="/help/otherCaption" tag="li" class="list" @click.native="other">
                    <span>{{data.otherCaption}}</span>
                    <i class="material-icons">&#xE315;</i>
                </router-link>
            </ul>
        </main>
    </div>
    </transition>
</template>
<script>
/*eslint-disable */
import axios from 'axios'
import bus from '../../EventBus.js'

export default {
    data() {
        return {
            data: '',
            msg:{},
            show_notCustomerText:false,
            show_notSeviceLineText:false
        }
    },
    created(){
        this.getData()
    },
    methods:{
        getData(){
            let that = this
            axios.get('https://crayfish.elemecdn.com/m.ele.me@json/profile/explain')
            .then(function(response){
                that.data = response.data
            })
            axios.get('https://crayfish.elemecdn.com/m.ele.me@json/profile/service')
            .then(function(response){
                that.msg = response.data
            })
        },
        notCustomerText_showTime(){
            this.show_notCustomerText = true
            let that = this
            setTimeout(function(){
                that.show_notCustomerText = false
            },2500)
        },
        notSeviceLineText_showTime(){
            this.show_notSeviceLineText = true
            let that = this
            setTimeout(function(){
                that.show_notSeviceLineText = false
            },2500)
        },
        ontime(){
            bus.$emit('ontime', {text: this.data.ontimeContent})
        },
        payment(){
            bus.$emit('payment', {text: this.data.paymentContent})
        },
        balance(){
            bus.$emit('balance', {text: this.data.balanceContent})
        },
        hongbao(){
            bus.$emit('hongbao', {text: this.data.hongbaoContent})
        },
        pointtext(){
            bus.$emit('pointtext', {text: this.data.pointtextContent})
        },
        member(){
            bus.$emit('member', {text: this.data.memberTimesContent})
        },
        activity(){
            bus.$emit('activity', {text: this.data.activityContent})
        },
        other(){
            bus.$emit('other', {text: this.data.otherContent})
        },
        goBack(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
/*动画状态*/
.slide-right-enter-active {
  transition: all 1.2s ease-out;
  /*transform: translateX(0%);*/
}
.slide-right-enter, .slide-right-leave {
  opacity: 0;
  /*transform: translateX(-100%);*/
}



.tip{
    color: #fff;
    background-color: rgba(0,0,0,0.5);
    padding: 2rem;
    width: 20rem;
    text-align: center;
    border-radius: 0.5rem;
    position: absolute;
    top: 50%;
    left: 50%;
    animation: fadeInDown 1s both;
}
@keyframes fadeInDown {
  0% {
    opacity: 0;
    transform: translate3d(-50%, 20%, 0);
  }

  100% {
    opacity: 1;
    transform: translate3d(-50%, -50%, 0);
  }
}



.wrapper{
    position: relative;
    height: 100vh;
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
.top{
    display: flex;
}
.service{
    flex:1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding:1rem 0;
    border-bottom: 1px solid #ddd;
}
.service:first-child{
    border-right: 1px solid #ddd;
}
.service>img{
    width: 3rem;
    padding-bottom: 1rem;
}
.question>li{
    
}
.question>li:first-child{
    padding:1rem 1rem 0.5rem 1rem;
    font-size: 1.2rem;
    font-weight: 700;
}
.list{
    padding:0.8rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
}
</style>
