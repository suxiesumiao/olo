// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off,
    proxyTable: {
        '/member/v1/discover': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/hotfood/v1/guess/likes': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/shopping/v1/discount/food': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/marketing/v1/nearby_orders': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/member/gifts/suggest': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/hotfood/v1/guess/banner': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 随机热搜
      '/shopping/v3/hot_search_words': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 主题推荐
      '/v2/index_entry': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 主题推荐图片
      '/themepic/': {
        target: 'https://fuss10.elemecdn.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/themepic/': ''
        }
      },
      // 对于某一个店面获取数据,可能包含其他链接
      '/shopping': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 对于某一个店面的食物评价
      '/ugc': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 地址输入搜索
      '/bgs/poi/search_poi_nearby': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/geocoder/v2': {
        target: 'http://api.map.baidu.com/',
        changeOrigin: true
      },
      // 当前位置
      '/v2/pois': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      }
    },
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/member/v1/discover': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/hotfood/v1/guess/likes': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/shopping/v1/discount/food': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/marketing/v1/nearby_orders': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/member/gifts/suggest': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/hotfood/v1/guess/banner': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 随机热搜
      '/shopping/v3/hot_search_words': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 主题推荐
      '/v2/index_entry': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 主题推荐图片
      '/themepic/': {
        target: 'https://fuss10.elemecdn.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/themepic/': ''
        }
      },
      // 对于某一个店面获取数据,可能包含其他链接
      '/shopping': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 对于某一个店面的食物评价
      '/ugc': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      // 地址输入搜索
      '/bgs/poi/search_poi_nearby': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      },
      '/geocoder/v2': {
        target: 'http://api.map.baidu.com/',
        changeOrigin: true
      },
      // 当前位置
      '/v2/pois': {
        target: 'https://mainsite-restapi.ele.me/',
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
