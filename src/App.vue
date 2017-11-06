<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'app',
  data: function () {
    return {
      notification: ''
    }
  },
  mounted: function () {
    // 检测是否是出于手机或是平板模式，约摸768px
    if (window.innerWidth > 768) {
      this.note()
    }
  },
  methods: {
    note: function () {
      let that = this
      if (!('Notification' in window)) {
        alert('您的浏览器不支持Notification。')
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(function (permission) {
          if (permission === 'granted' && !that.notification) {
            that.notification = new Notification('饿了哟提示您：', {
              body: '在手机模式下体验更佳！按F12开启。',
              color: 'red',
              icon: '/static/favicon.ico',
              sound: true
            })
            that.notification.addEventListener('click', function () {
              that.notification.close()
            })
          }
        })
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
}

html,
body {
  width: 100%;
  user-select: none;
  background-color: #f4f4f4;
}

#app {
  width: 100%;
  overflow: hidden;
  font-family: 'Helvetica Neue', Tahoma, Arial, PingFangSC-Regular, 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  touch-action: manipulation;
}

::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, .1);
}
</style>
