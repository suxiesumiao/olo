<!-- // 个人页面 -->
<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>我的</h2>
        </header>
        <main>
            <router-link to="/login" tag="section" class="main_top">
                <img src="../../assets/images/icon.png" alt="头像">
                <div class="logIn">
                    <span>登录/注册</span>
                    <span>
  						<img src="../../assets/images/phone.png" alt="phone">
  						<span>登录后享受更多特权</span>
                    </span>
                </div>
                <i class="material-icons">&#xE315;</i>
            </router-link>
            <div class="message">
                <router-link to="/balance" tag="div" class="icon">
                    <img src="../../assets/images/balance.png" alt="余额">
                    <span>余额</span>
                </router-link>
                <router-link to="/favorable" tag="div" class="icon">
                    <img src="../../assets/images/favorable.png" alt="优惠">
                    <span>优惠</span>
                </router-link>
                <router-link to="/integral" tag="div" class="icon">
                    <img src="../../assets/images/number.png" alt="积分">
                    <span>积分</span>
                </router-link>
            </div>
            <section class="items">
                <router-link to="/order" tag="div" class="list">
                    <img src="../../assets/images/1.png" alt="订单">
                    <span>
  						<span>我的订单</span>
                        <i class="material-icons">&#xE315;</i>
                    </span>
                </router-link>
                <router-link to="/integral_shop" tag="div" class="list">
                    <img src="../../assets/images/2.png" alt="积分">
                    <span>
  						<span>积分商城</span>
                        <i class="material-icons">&#xE315;</i>
                    </span>
                </router-link>
                <router-link to="/vip" tag="div" class="list">
                    <img src="../../assets/images/3.png" alt="会员卡">
                    <span>
  						<span>饿了么会员卡</span>
                        <i class="material-icons">&#xE315;</i>
                    </span>
                </router-link>
            </section>
            <section class="items">
                <router-link to="/help" tag="div" class="list">
                    <img src="../../assets/images/4.png" alt="服务">
                    <span>
  						<span>服务中心</span>
                        <i class="material-icons">&#xE315;</i>
                    </span>
                </router-link>
                <div class="list">
                    <img src="../../assets/images/5.png" alt="下载">
                    <span :plain="true" @click="open" class="download">
  						<span>下载饿了么APP</span>
                        <i class="material-icons">&#xE315;</i>
                    </span>
                </div>
            </section>
        </main>
        <mainfooter></mainfooter>
    </div>
</template>
<script>
/*eslint-disable */
import mainfooter from '../common/mainfooter/mainfooter'
export default {
  components: {
    mainfooter
  },
  methods:{
    open() {
        this.$message({
          showClose: true,
          message: '恭喜你，已加入下载队列！',
          type: 'success',
          duration: 2000
        });
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
    color: #fff;
    font-weight: bold;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
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
    margin-bottom: 5rem;
    font-size: 1.15rem;
}
section .material-icons {
    font-size: 1.5rem;
}

.main_top {
    display: flex;
    align-items: center;
    background-color: #0097ff;
    color: #fff;
    padding: 1.5rem 1rem;
}

.main_top>img {
    width: 4rem;
}

.logIn {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding-left: 1rem;
}

.logIn>span:first-child {
    font-size: 1.5rem;
    padding-bottom: 0.4rem;
}

.logIn>span:last-child {
    display: flex;
    align-items: center;
}

.logIn>span:last-child>span {
    padding-left: 0.4rem;
    font-size: 0.9rem;
}
.logIn img{
    width: 0.8rem;
}

/*message*/

.message {
    display: flex;
    background-color: #fff;
    margin-bottom: 1rem;
}

.icon {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem 0;
    border-left: 1px solid #ddd;
    font-size: 0.8rem;
}

.icon:first-child {
    border: none;
}

.icon>img {
    width: 2rem;
    margin-bottom: 0.5rem;
}


/*list*/

.list {
    display: flex;
    align-items: center;
    padding-left: 1rem;
    background-color: #fff;
}

.list>img {
    width: 1rem;
}

.list>span {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    margin-left: 1rem;
    padding: 0.6rem 0.6rem 0.6rem 0;
    border-top: 1px solid #aaa;
}
.list:first-child>span {
    border: none;
}

.items {
    margin-bottom: 1rem;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
}

</style>
