// 小球跳下的动画
// 函数接收一个 元素参数
export default {
  jump: function (page, self, ballMarking) {
    // 求出小球的下落高度
    let height = page.clientHeight - ballMarking.clientY
    // 求出小球的水平移动距离
    let width = (page.clientWidth)
    let limitX = 0
    let limitY = 0
    // 中间点
    let center = width / 2
    // 横向运动的速度
    let speed = width / 30
    self.style.backgroundColor = '#3b95e9'
    function move () {
      if (limitY < height) {
        self.style.transform = `translateX(${limitX}px) translateY(${limitY}px)`
        limitX -= speed
        limitY = limitX * (limitX + center) / 400
      } else {
        window.cancelAnimationFrame(move)
        self.style.backgroundColor = '#ffffff'
        return
      }
      window.requestAnimationFrame(move)
    }
    move()
  }
}
