<template>
  <div id="restaurantdetails"
       ref="page">
    <header ref="paintHeader">
      <router-link class="to-resdetails" to="/">
      </router-link>
      <div class="food-container"
           @click="appearornot()">
        <img :src="computedResImage(restaurantdetails.image_path)"
             alt="">
        <div class="food-about">
          <h6 class="food-title">{{ restaurantdetails.name }}</h6>
          <p class="note">
            <span v-if="restaurantdetails.delivery_mode">
                  {{ restaurantdetails.delivery_mode.text }}/</span>
            <span>{{ restaurantdetails.order_lead_time }}分钟送达/</span>
            <span v-if="restaurantdetails.piecewise_agent_fee">
                  {{ restaurantdetails.piecewise_agent_fee.description }}</span>
          </p>
          <p class="comment">{{restaurantdetails.promotion_info}}</p>
          <span class="toright"></span>
        </div>
      </div>
      <p v-if="restaurantdetails.activities"
         @click="maskOrnot()"
         class="is-new">
        <span class="new" 
              v-if="restaurantdetails.activities[0]">
              {{ restaurantdetails.activities[0].icon_name }}</span>
        <span class="newdeal">新用户下单</span>
        <span class="acti">{{ restaurantdetails.activities.length }}个活动</span>
      </p> 
    </header>
    <main>
      <div class="main-header">
        <h5 @click="isOnshop(true)"
            :class="{goodsjudgelight:onshop}"
            class="goods"><span>商品</span></h5>
        <h5 @click="isOnshop(false)"
            :class="{goodsjudgelight:!onshop}"
            class="judge"><span>评价</span></h5>
      </div>
      <div v-if="onshop"
           class="main-body-if">
        <div class="main-side"
             ref="mainSide">
          <div @click="selectMenu(foods, index, $event)"
               v-for="(foods,index) in fooddetails"
               :key="index"
               :class="{maintitlelight:active === index}"
               class="main-title">
            <dot v-if="foods.click_count"
                 :count="foods.click_count">
            </dot>
            <img v-show="foods.icon_url"
              :src="Tool.computedResImage(foods.icon_url, 'foods')"></img>
            <h4>{{ foods.name }}</h4>
          </div>
        </div>
        <div class="main-food"
             ref="mainFood">
          <div ref="foodList"
               v-for="(foods, parentIndex) in fooddetails"
               :key="parentIndex"
               class="main-food-template">
            <h4 class="main-food-band">{{ foods.name }}</h4>
            <div v-for="(food, childIndex) in foods.foods"
                 :key="childIndex"
                 class="main-food-container">
              <img :src="computedResImage(food.image_path,'tumbnails')"
                   alt="">
              <div class="innerfood">
                <h4 class="main-food-title ellipsis">{{food.name}}</h4>
                <span class="main-describe ellipsis" :title="food.description">{{ food.description }}</span>
                <br>
                <span class="main-judges ellipsis">{{ food.tips }}</span>
                <!--结账部分-->
                <div class="money-about">
                  <span class="single-price">
                    <span class="rmb">￥</span>{{ food.specfoods[0].price }}</span>
                  <cartbuttons
                      ref="targetBall"
                      :subappear="food.click_count"
                      :clickcount="food.click_count"
                      @toSub="getTotalMoneySub(food.specfoods[0].price,childIndex,parentIndex)"
                      @markTheBall="markTheBall($event)"
                      @toPlus="getTotalMoneyAdd(food.specfoods[0].price,childIndex,parentIndex)">
                  </cartbuttons>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else
           class="main-body-else">
        <div class="judge-numb">
          <div class="numb-left">
            <h3 class="overall_score">{{ Tool.toFixed(scores.overall_score) }}</h3>
            <p>综合评价</p>
            <p class="compare_rating"><span>高于周边商家</span>{{ Tool.toPercent(scores.compare_rating) }}</p>
          </div>
          <div class="numb-right">
            <p>
              <span>服务态度</span>
              <el-rate
              disabled
              text-color="#ff6600"
              text-template="{value}"
              v-model="scores.service_score">
              </el-rate>
              <!--<span>{{ Tool.toFixed(scores.service_score) }}</span>-->
            </p>
            <p>
              <span>菜品评价</span>
              <el-rate
              disabled
              text-color="#ff6600"
              text-template="{value}"
              v-model="scores.service_score">
              </el-rate>
              <!--<span>{{ Tool.toFixed(scores.food_score) }}</span>-->
            </p>
            <p>
              <span>送达时间</span>
              <time>{{ scores.deliver_time }}分钟</time>
            </p>
          </div>
        </div>
        <div class="judge-details">
          <div class="tags">
            <div @click="chooseTag(tag.name)"
                 :key="index"
                 v-for="(tag, index) in tags"
                 :class="{tagclicked:tag.name === currenttag && tag.name !== '不满意',untag:tag.name == '不满意'}"
                 class="tag">
              <span>{{ tag.name }}</span>
              <span>({{ tag.count }})</span>
            </div>
          </div>
        </div>
        <div class="ratings">
          <div v-for="(rating, index) in ratings"
               :key="index"
               class="rating">
            <div class="avatar">
              <img src="./images/anonymous.svg">
            </div>
            <div class="anonymous">
              <p>{{ rating.username }}</p>
              <el-rate
              disabled
              text-color="#ff6600"
              text-template="{value}"
              v-model="rating.rating_star">
              </el-rate>
              <p>
                {{ rating.rating_text }}
              </p>
            </div>
            <time class="ratingtime">{{ rating.rated_at }}</time>
          </div>
        </div>
      </div>
    </main>
    <div
        @click="shoppingmaskappearFn()"
        :class="{shoppingmask: shoppingmaskappear}"></div>
    <div
        class="shoppinglist"
        :class="{shoppinglistappear: shoppingmaskappear}">
      <shoppinglist
          @listSub="listSub"
          @listPlus="listAdd"
          @clearShoopingList="clearShoopingList()"
          :lists="shoppingcartlist"></shoppinglist>
    </div>
    <footer v-if="onshop">
      <shoppingcart
          :count="fooddetails.click_count"
          @shoppingmask="shoppingmaskappearFn()"
          :shoppingcartmove="shoppingcartmove"></shoppingcart>
      <div class="totalMoney">
        <span>￥{{ totalMoney }}</span>
      </div>
      <router-link :class="{caculatelight: totalMoney !== '0.00'}"
           tag="div"
           to="/login"
           class="caculate">
        <p>去结算</p>
      </router-link>
    </footer>
    <restaurantInfo
        :restaurantdetails="restaurantdetails"
        @disappear="appearornot"
        :isappear="detailsAppear">
    </restaurantInfo>
    <imask
        :restaurant="restaurantdetails"
        @off="maskOrnot"
        :on="maskOn"></imask>
  </div>
</template>
<script>
import axios from 'axios'
import dot from '../common/dot/dot'
import cartbuttons from '../common/cartbuttons/cartbuttons'
import Tool from '../common/js/Tool'
import Jump from '../common/js/Jump'
import shoppingcart from '../common/shoppingcart/shopping-cart'
import restaurantInfo from '../common/restaurantsInfo/restaurantsInfo'
import imask from '../common/imask/imask'
import shoppinglist from '../common/shoppinglist/shoppinglist'
export default {
  data: function () {
    return {
      restaurantdetails: {},
      fooddetails: {},
      // 记录当前点击的加或是减所对应的食物的价格
      currentPrice: 0,
      // 购物车里的食物总价格
      totalMoney: '0.00',
      // 是否位于商店页面
      onshop: true,
      // 评分
      ratings: [],
      // 每个店面下的评价
      // 包括综合评价 服务态度星级等等
      scores: {},
      // 每个店面下的标签
      tags: [],
      // 菜单详细列表的累加高度表
      initHeight: [],
      // 引入工具包
      Tool: Tool,
      // 选项卡片
      active: 0,
      shoppingcartmove: false,
      // 存放小球的坐标
      ballMarking: {},
      // 选项卡
      currenttag: '全部',
      temp: '',
      // 默认id
      defaultId: 610592,
      // 右侧是否拉出
      detailsAppear: false,
      // 是否出现遮盖
      maskOn: false,
      // 购物车遮盖
      shoppingmaskappear: false,
      // 已经选中的存放在购物车里面的食物清单
      shoppingcartlist: [],
      // 当前点击的购物车中的某个事物
      currentFood: {
        'price': '',
        'cIndex': '',
        'pIndex': ''
      },
      currentbackground: ''
    }
  },
  components: {
    dot,
    cartbuttons,
    Tool,
    Jump,
    shoppingcart,
    restaurantInfo,
    imask,
    shoppinglist
  },
  watch: {
  },
  mounted: function () {
    this.getId(window.location.hash)
    this.init()
    this.getTitle()
  },
  methods: {
    paint: function () {
      this.$refs.paintHeader.style.backgroundImage = `url("${this.currentbackground}")`
    },
    listAdd: function (data) {
      this.getTotalMoneyAdd(data[0], data[1], data[2])
    },
    listSub: function (data) {
      this.getTotalMoneySub(data[0], data[1], data[2])
      if (!this.shoppingcartlist.length) {
        this.shoppingmaskappear = false
      }
    },
    clearShoopingList: function () {
      // 购物车食物列表清空
      this.shoppingcartlist = []
      // 总价归零
      this.totalMoney = '0.00'
      // 购物车右上方小红点归零
      this.fooddetails.click_count = ''
      // shoppingcart的mask遮盖见下
      // 购物车的高亮消失一同进行
      this.shoppingmaskappearFn()
      // 对某个食物系列以及食物归零
      this.fooddetails.forEach(function (foods, index, self) {
        if (foods.click_count) {
          foods.click_count = ''
          foods.foods.forEach(function (food, index, self) {
            if (food.intoCart) {
              food.intoCart = false
              food.click_count = ''
            }
          })
        }
      })
    },
    // shoppingcart的mask
    shoppingmaskappearFn: function () {
      this.shoppingmaskappear = !this.shoppingmaskappear
    },
    // 商店详细信息的mask
    maskOrnot: function () {
      this.maskOn = !this.maskOn
    },
    appearornot: function () {
      this.detailsAppear = !this.detailsAppear
    },
    getTitle: function () {
      let that = this
      setTimeout(function () {
        document.title = that.restaurantdetails.name || '饿了哟网上订餐'
      }, 1000)
    },
    getId: function (hash) {
      this.defaultId = hash.match(/\d/gi).join('')
    },
    chooseTag: function (tag) {
      let that = this
      that.currenttag = tag
      let ratingUrl = '/ugc/v2/restaurants/' + this.defaultId + '/ratings?has_content=true&tag_name=' + tag + '&offset=0&limit=100'
      axios.get(ratingUrl).then(function (response) {
        that.ratings = response.data
      })
    },
    markTheBall: function (e) {
      this.ballMarking = e
    },
    // 该函数记录初始滚动事件时所需要的参数
    // 对菜单详细列表里面的每一个系列求出高度 等待左侧滚动时触发
    _initScroll: function () {
      let foodList = this.$refs.foodList
      let length = this.fooddetails.length
      let tempHeight = 0
      this.initHeight.push(0)
      for (let i = 1; i < length; i++) {
        tempHeight += foodList[i - 1].clientHeight
        this.initHeight.push(tempHeight)
      }
      this.initHeight.push(foodList)
    },
    // 对于每个商家的商品左侧列表点击之后右侧会跳转到当前所点击的title
    selectMenu: function (foods, index, event) {
      this.active = index
      // 防止重复执行 _initScroll
      if (!this.initHeight.length) {
        this._initScroll()
      }
      let mainFood = this.$refs.mainFood
      let that = this
      mainFood.scrollTop = that.initHeight[index]
    },
    // 在商品和评价之间切换
    isOnshop: function (bool) {
      this.onshop = bool
    },
    // 该函数用于执行加号按钮点击之后的一系列操作
    // num是某种食物的具体价格
    // 因为用到了两层循环
    // childIndex是单个食物在系列表中的序号
    // parentIndex是该系列表在总食物表中的序号
    getTotalMoneyAdd: function (num, childIndex, parentIndex) {
      // 购物车动画
      this.shoppingcartmove = true
      let that = this
      setTimeout(function () {
        that.shoppingcartmove = false
      }, 500)
      // 购物车总价格增加
      this.totalMoney = (Number(this.totalMoney) + Number(num.toFixed(2))).toFixed(2)
      // 点击之后当前单个食物需要被计算一个count,count表征该食物被点击的次数该值应该被存放到原始数据的一个变量中
      // 如果该值存在说明之前点击过如果不存在说明是第一次点击 赋值1就好了
      // 下面是该死的购物车外面那个小红点购物数量存储
      let tempObjT = this.fooddetails
      if (tempObjT.click_count) {
        tempObjT.click_count++
      } else {
        tempObjT.click_count = 1
      }
      // 下面是该食物所在的某种系列的点击存储
      let tempObjP = tempObjT[parentIndex]
      if (tempObjP.click_count) {
        tempObjP.click_count++
      } else {
        tempObjP.click_count = 1
      }

      // 下面是某种食物的点击存储
      let tempObjC = tempObjP.foods[childIndex]
      if (tempObjC.click_count) {
        tempObjC.click_count++
      } else {
        tempObjC.click_count = 1
      }
      // 对所有进入购物车的重新计算
      // 有对应的outCart函数
      function intoCart () {
        // 如果之前没有点击过 就将此加入购物车
        if (!tempObjC.intoCart) {
          that.shoppingcartlist.push({
            'parent_index': parentIndex,
            'child_index': childIndex,
            'click_count': tempObjC.click_count,
            'single_price': tempObjC.specfoods[0].price,
            'total_price': tempObjC.specfoods[0].price,
            'id': tempObjC.item_id,
            'name': tempObjC.name
          })
          tempObjC.intoCart = true
        } else {
          that.shoppingcartlist.forEach(function (item, index, self) {
            if (tempObjC.item_id === item.id) {
              item.click_count++
              item.total_price = (Number(item.total_price) + Number(item.single_price.toFixed(2))).toFixed(2)
            }
          })
        }
      }
      intoCart()
      let anstor = this.$refs.mainFood
      let parent = anstor.children[parentIndex].children[childIndex + 1]
      let virtualself = parent.getElementsByClassName('virtual')[0]
      Jump.jump(this.$refs.page, virtualself, this.ballMarking)
    },
    getTotalMoneySub: function (num, childIndex, parentIndex) {
      let that = this
      // 购物车总价格减少
      this.totalMoney = (Number(this.totalMoney) - Number(num.toFixed(2))).toFixed(2)

      let tempObjT = this.fooddetails
      tempObjT.click_count--

      let tempObjP = tempObjT[parentIndex]
      tempObjP.click_count--

      let tempObjC = tempObjP.foods[childIndex]
      tempObjC.click_count--
      // 添加只需要push
      // 删除却不一定删除哪一个 为此需要序数 index
      function outCart () {
        that.shoppingcartlist.forEach(function (item, index, self) {
          if (tempObjC.item_id === item.id) {
            item.click_count--
            if (!item.click_count) {
              self.splice(index, 1)
              tempObjC.intoCart = false
            }
            item.total_price = (Number(item.total_price) - Number(item.single_price.toFixed(2))).toFixed(2)
          }
        })
      }
      outCart()
    },
    // 小球跳下的动画
    jump: function (childIndex, parentIndex) {
    },
    // 计算图片路径
    computedResImage: function (string, thumbnail) {
      if (!string) { return }
      let length = String(string).length
      let temp = ''
      let last = string[length - 2]
      if (last === 'n') {
        temp = '.png'
      } else if (last === 'e') {
        temp = '.jpeg'
      }
      let before = '/themepic/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp
      if (thumbnail) {
        return before + '?imageMogr/thumbnail/140x140/format/webp/quality/85'
      }
      this.currentbackground = '//fuss10.elemecdn.com/' + string[0] + '/' + string.slice(1, 3) + '/' + string.slice(3) + temp + '?imageMogr/format/webp/thumbnail/!40p/blur/50x40/'
      this.paint()
      return before + '?imageMogr/format/webp/'
    },
    init: function () {
      let that = this
      // 店面头部以及右侧拉的数据
      let headUrl = '/shopping/restaurant/' + this.defaultId + '?extras[]=activities&extras[]=album&extras[]=license&extras[]=identification&extras[]=statistics&latitude=40.0876854&longitude=116.3369247'
      axios.get(headUrl).then(function (response) {
        that.restaurantdetails = response.data
      })
      // 该店面下的具体食物品类
      let foodUrl = '/shopping/v2/menu?restaurant_id=' + this.defaultId
      axios.get(foodUrl).then(function (response) {
        that.fooddetails = response.data
      })
      // 对该店面的食物评价
      let ratingUrl = '/ugc/v2/restaurants/' + this.defaultId + '/ratings?has_content=true&tag_name=满意&offset=0&limit=10'
      axios.get(ratingUrl).then(function (response) {
        that.ratings = response.data
      })
      // 每个店面下的评价
      // 包括综合评价 服务态度星级等等
      let scoresUrl = '/ugc/v2/restaurants/' + this.defaultId + '/ratings/scores'
      axios.get(scoresUrl).then(function (response) {
        that.scores = response.data
      })
      // 每个店面下的标签
      let tagsUrl = '/ugc/v2/restaurants/' + this.defaultId + '/ratings/tags'
      axios.get(tagsUrl).then(function (response) {
        that.tags = response.data
      })
    }
  }
}
</script>
<style lang="css" scoped>
@media all and (max-width: 768px) {
  html {
    font-size: 12px;
  }
}

@media all and (min-width: 769px) {
  html {
    font-size: 16px;
  }
}

#restaurantdetails {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  min-height: 600px;
}

header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: .2rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #a6a0a4;
}

.to-resdetails {
  display: block;
  height: 1.5rem;
  background-repeat: no-repeat;
  background-position: left;
  background-size: 1.5rem;
  background-image: url('./images/arrow.svg');
}

.food-container {
  display: flex;
  padding: .5rem;
  justify-content: space-between;
}

.food-container>img {
  width: 4rem;
  height: 4rem;
  border-radius: .2rem;
}

.food-about {
  flex: 1;
  position: relative;
  padding-left: .5rem;
  color: #fff;
}

.food-title {
  font-size: 1.2rem;
  font-weight: 600;
}

.note,
.comment {
  width: 15rem;
  font-size: .6rem;
  padding: .2rem 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.toright {
  display: block;
  right: 0;
  top: 50%;
  position: absolute;
  width: 2rem;
  height: 2rem;
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: right;
  background-image: url('./images/arrow-right.svg');
}

.is-new {
  display: flex;
  justify-content: space-between;
  padding-left: .5rem;
  color: #fff;
  font-size: 1rem;
}

.newdeal {
  font-size: .4rem;
  flex: 1;
}

.acti {
  font-size: .4rem;
  padding-right: .5rem;
}

.new {
  padding: 0 .1rem;
  font-size: .4rem;
  background-color: #70BC46;
}

main {
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.main-header {
  background-color: #fff;
  display: flex;
}

.goods,
.judge {
  flex: 1;
  text-align: center;
  color: #999;
  font-size: 1rem;
  font-weight: 500;
  padding: .5rem 0;
}
.goodsjudgelight{
  color: #3190e8;
}
.goodsjudgelight>span{
  border-bottom: 1px solid #3190e8;
}

.main-body-if {
  position: relative;
  display: flex;
  width: inherit;
  flex: 1;
}

.main-side {
  position: relative;
  flex: 2;
  max-width: 10rem;
  overflow-y: scroll;
  border-left: 1px solid #ede9e9;
  border-bottom: 1px solid #f0e7e7;
}

.main-title {
  position: relative;
  border-left: 3px solid transparent;
  background-color: #f8f8f8;
}
.main-title > img{
  margin-left: .2rem;
  width: .8rem;
  height: .8rem;
  display: inline-block;
}
.main-title > h4 {
  display: inline-block;
  text-align: left;
  color: #333;
  padding: 1rem 0 1rem .2rem;
  font-weight: 300;
  font-size: .6rem;
}

.maintitlelight {
  border-left: 3px solid #3190e8;
  background-color: #fff;
  transition: all 1s;
}

.maintitlelight>h4 {
  font-weight: 700;
}


.main-food {
  flex: 7;
  overflow-y: scroll;
  background-color: #f1f1f1;
}

.main-food-template {
  transition: all 1s;
}

.main-food-band {
  color: #777;
  font-weight: 800;
  font-size: .9rem;
  padding: .3rem;
}

.main-food-container {
  display: flex;
  padding: .2rem;
  padding-bottom: 1rem;
  margin-bottom: 1px;
  background-color: #fff;
}

.main-food-container>img {
  width: 3rem;
  height: 3rem;
  border-radius: .2rem;
}

.innerfood {
  width: 80%;
  padding-left: 1rem;
}

.ellipsis {
  display: block;
  width: 70%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.main-food-title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 800;
  color: #333;
  font-size: 1rem;
}
.main-describe{
  color: #999;
  font-size: .5rem;
}
.main-judges{
  color: #666;
  font-size: .6rem;
}
.money-about {
  display: flex;
  position: relative;
  justify-content: space-between;
}

.single-price {
  color: #f60;
  font-weight: 600;
  font-size: 1rem;
}
.rmb{
  font-size: .5rem;
}
footer {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  background-color: #464648;
}

.totalMoney {
  width: 40%;
  font-size: 1rem;
  color: #fff;
}

.caculate {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  width: 8rem;
  color: #fff;
  background: #666;
}

.caculatelight {
  background: #55da6b;
}

.main-body-else {
  position: relative;
  width: 100%;
  flex: 1;
  overflow-y: scroll;
}

.judge-numb {
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  background-color: #fff;
}

.numb-left {
  display: flex;
  padding: 1rem .5rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex: 4;
}

.overall_score {
  font-size: 1.5rem;
  color: #f60;
}
.numb-right {
  flex: 7;
  color: #666;
  font-size: .8rem;
  padding: 1.2rem .5rem;
}

time,
.compare_rating {
  color: #888;
  font-size: .5rem;
}

.judge-details {
  width: 100%;
  background-color: #fff;
}

.tags {
  width: 90%;
  padding-bottom: .5rem;
  margin-bottom: 1rem;
}

.tag {
  margin-top: .5rem;
  margin-left: .5rem;
  padding: .3rem;
  font-size: .8rem;
  color: #666;
  display: inline-block;
  background-color: #ebf5ff;
  border-radius: .5rem;
}
.tagclicked{
  background-color: #3190e8;
  color: #fff;
}
.untag{
  background-color: #f5f5f5;
}

.ratings {
  width: 100%;
}

.rating {
  display: flex;
  margin-bottom: 1px;
  padding: .5rem;
  width: 100%;
  background-color: #fff;
}

.avatar {
  display: flex;
}

.anonymous {
  flex: 4;
  padding-left: .5rem;
}

.anonymous>p {
  color: #666;
  font-size: .8rem;
}

.ratingtime {
  color: #666;
  font-size: .5rem;
  text-align: right;
  flex: 2;
}
/*点击购物车出现的mask*/
.shoppingmask{
  position: absolute;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #333;
  opacity: .5;
  transition: all .3s ease;
}
.shoppinglist{
  position: absolute;
  background-color: #fff;
  left: 0;
  bottom: -20rem;
  width: 100%;
  max-height: 20rem;
  transition: all .6s ease;
}
.shoppinglistappear{
  bottom: 3rem;
  transition: all .2s ease;
}
</style>
