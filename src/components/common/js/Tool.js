// 函数包 存放细微的工具函数
export default {
  // 该函数检测Props是否是obj自身的属性
  check: function (obj, props) {
    // 此处不能检查undefined
    // 用getOwnProperty
    return obj.hasOwnProperty(props)
  },
  // 该函数用于mesite页面对距离单位进行切换
  getDistance: function (num) {
    return num < 1000 ? num + 'm' : (num / 1000).toFixed(2) + 'Km'
  },
  // 该函数用于mesite页面对主题图片地址转换
  getThemeImage: function (string) {
    return '/themepic/' + string + '?imageMogr/format/webp'
  },
  computedResImage: function (string, tail) {
    if (!string) { return }
    let length = string.length
    let char = string[length - 2]
    let temp
    switch (char) {
      case 'n':
        temp = '.png'
        break
      case 'e':
        temp = '.jpeg'
        break
      case 'i':
        temp = '.gif'
        break
      default:
        return
    }
    if (tail === 'foods') {
      return '/themepic/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp
    }
    return '/themepic/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp + '?imageMogr/format/webp/'
  },
  // 将一个数字转化成百分比的形式
  toPercent: function (num) {
    return (num * 100).toFixed(2) + '%'
  },
  // 将一个数字固定一位小数
  toFixed: function (num) {
    return num.toFixed(2)
  }
}
