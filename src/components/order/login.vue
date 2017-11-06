<template>
    <div class="wrapper">
        <header>
            <i @click="goBack" class="material-icons">&#xE314;</i>
            <h2>{{msg.title}}</h2>
            <span @click="switchover">{{msg.manner}}</span>
        </header>
        <main>
            <div class="msg">
                <form class="wrap" action="" onclick="return false">
                    <input :maxlength="len" autocomplete="on" v-model.number="val" class="number phone" type="text" :placeholder="msg.phoneNumber">
                    <button @click="acquire" :style = "bgc" v-if="toggle" class="btn_num">{{msg.txt}}</button>
                </form>
                <form class="wrap">
                    <input class="number" :value="msg.value" :type="msg.type" :placeholder="msg.code">
                    <el-switch v-if="!toggle" v-model="password" on-color="#ff4949" off-color="#13ce66" on-text="abc" off-text="···"></el-switch>
                </form>
            </div>
            <p v-if="toggle" class="prompt">温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意<span>《用户服务协议》</span></p>
            <button @click="tips" class="login">登录</button>
            <div v-show="login" class="tip">登录信息为空！请输入登录信息再进行登录</div>
        </main>
        <footer>
            <span class="about">关于我们</span>
        </footer>
    </div>
</template>
<script>
/*eslint-disable */
export default {
    data() {
            return {
                val:'',
                len:11,
                bgc:{
                    backgroundColor:'#ccc'
                },
                clicked:false,
                toggle: false,
                password:false,
                value:'',
                msg: {},
                timer: 30,
                phoneNumber: {
                    title: '登录',
                    manner: '密码登录',
                    phoneNumber: '手机号',
                    code: '验证码',
                    txt: '获取验证码',
                    type: 'text',
                    value:''
                },
                userName: {
                    title: '密码登录',
                    manner: '短信登录',
                    phoneNumber: '手机/邮箱/用户名',
                    code: '密码',
                    type: 'password',
                    value:''
                },
                login:false
            }
        },
        created() {
            this.switchover()
        },
        watch: {
            val:function(newVal){
                // 验证输入类型、长度，符合规则-->按钮背景变色，可点击
                // if (typeof this.val  === 'number' && this.val.toString().length === 11) {
                //     console.log('OK')
                //     this.bgc.backgroundColor = '#0097ff'
                //     this.clicked = false
                // }else{
                //     this.bgc.backgroundColor = '#ccc'
                //     this.clicked = true
                // }

                //正则验证手机号
                let pattern = /^1[34578]\d{9}$/
                if(pattern.test(this.val)){
                    this.bgc.backgroundColor = '#0097ff'
                    this.clicked = false
                }else{
                    this.bgc.backgroundColor = '#ccc'
                    this.clicked = true
                }
            },
            password(newState){
                //切换密码 隐藏 || 可见
                if(newState){
                    this.msg.type = 'text'
                }else{
                    this.msg.type = 'password'
                }
            }
        },
        methods: {
            switchover() {
                //切换 登录方式
                //限制长度更改，值清空
                this.toggle = !this.toggle
                if (this.toggle) {
                    this.msg = this.phoneNumber
                    this.val = ''
                    this.len = 11
                } else {
                    this.msg = this.userName
                    this.val = ''
                    this.len = 58
                }
            },
            acquire(){
                // 发送验证码按钮。 定时器 30s
                let that = this
                if(that.clicked === false && that.val !== ''){
                    let fader = setInterval(function(){
                        that.bgc.backgroundColor = '#ccc'
                        that.clicked = true
                        that.timer --
                        that.msg.txt = '已发送('+that.timer+'s)'
                        if(that.timer <= 0){
                            clearInterval(fader)
                            that.bgc.backgroundColor = '#0097ff'
                            that.msg.txt = '重新获取'
                            that.clicked = false
                            that.timer = 30
                        }
                    },1000)
                }
            },
            tips(){
                if(!this.val){
                    this.login = true
                    let that = this
                    setTimeout(function(){
                        that.login = false
                    },2000)
                }
            },
            goBack(){
                this.$router.go(-1)
            }
        }
}
</script>
<style scoped>
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
    transform: translate3d(-50%, -50%, 0);;
  }
}



.wrapper {
    height: 100vh;
    display: flex;
    flex-direction: column;
}

header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0, 151, 255);
    height: 3rem;
    position: relative;
    color: #fff;
    font-weight: 700;
    font-size: 1.2rem;
}

header>i {
    position: absolute;
    left: 0;
}

header>span {
    font-size: 1rem;
    padding-right: 1rem;
    font-weight: normal;
    position: absolute;
    right: 0;
}

header .material-icons {
    font-size: 2rem;
}

header>h2 {
    font-weight: bold;
    font-size: 1.2rem;
}

main {
    flex: 1;
    margin-top: 1rem;
}

.wrap {
    padding: 0 1rem;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.number {
    width: 100%;
    height: 3rem;
    padding: 1rem;
    font-size: 1.1rem;
    outline: none;
    border: none;
}

.phone {
    flex: 7;
}

.btn_num {
    flex: 4;
    height: 2rem;
    outline: none;
    border: none;
    background-color: #ccc;
    padding: 0 0.2rem;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 1rem;
}

.prompt {
    margin: 1rem 1rem 0 1rem;
    color: #999;
    font-size: 0.8rem;
}

.prompt>span {
    color: #3b95e9;
}

.login {
    /*width: 100%;*/
    display: block;
    margin: 1rem auto;
    height: 3rem;
    width: 94%;
    outline: none;
    border: none;
    border-radius: 0.2rem;
    color: #fff;
    font-size: 1.2rem;
    background: #4cd964;
}

footer {
    text-align: center;
    margin-bottom: 1rem;
    color: #999;
}
</style>
