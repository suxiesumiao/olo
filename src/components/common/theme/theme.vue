<template>
  <div class="finaltheme">
    <div
    :class="{downed: controller['sort']}"
    class="container sort">
      <div class="sort-foods">
        <h3
        :class="{sortfoodslight: item.id === foodsId}"
        @click="calculateFood(item.id, index)"
        v-for="(item, index) in itemSort">
              <img
              v-if="index !== 0"
              :src="computeImage(index, 'sort')" />
              <span>{{ item.name }}</span>
              <div class="wrapper">
                <span class="count">{{ item.count }}</span>
              </div>
              <img
              v-if="index !== 0"
              :src="computeImage(index, 'right')">
            </h3>
      </div>
      <div class="sort-food">
        <h3 v-for="food in calculatedFood.sub_categories">
              <span>{{ food.name }}</span>
              <span class="count">{{ food.count }}</span>
            </h3>
      </div>
    </div>
    <div
    :class="{downed: controller['order']}"
    class="container order">
      <h3
      @click="orderClicked(index)"
      :class="{itemlight: index === currentOrderIndex}"
      v-for="(order, index) in Sort.order">
            <img :src="computeImage(index, 'order')" />
            <span>
              {{ order.name }}
            </span>
          </h3>
    </div>
    <div
    :class="{downed: controller['filter']}"
    class="container filter">
      <h4>配送方式</h4>
      <div class="choose">
        <div
        @click="switchsendway(way, index)"
        v-for="(way, index) in Sort.sendWay"
        :class="{filterlight: way.selected}"
        class="block">
          <img v-if="way.selected"
          :src="computeImage(index, 'filter')" />
          <img v-if="!way.selected"
          class="fengniao"
          :src="computeImage(index, 'sendway')" />
          <span class="heightholder">{{ way.name }}</span>
        </div>
      </div>
      <h4>商家属性(可多选)</h4>
      <div
      class="choose">
        <div
        @click="filterClicked(block)"
        v-for="(block, index) in Sort.filter"
        :class="{filterlight: block.selected}"
        class="block">
          <img v-if="block.selected"
          :src="computeImage(index, 'filter')" />
          <span :class="computeClass(block.color)"
          class="placeholder"
          v-if="!block.selected">{{ block.head }}</span>
          <span class="heightholder">{{ block.name }}</span>
        </div>
      </div>
      <div class="buttons">
        <button @click="cancelAll()"
        class="clear">
          <span>清空</span>
        </button>
        <button class="ok">
          <span>确定</span>
          <span v-if="Sort.filterTrueLength">
            ( {{ Sort.filterTrueLength }} )</span>
        </button>
      </div>
    </div>
    <div class="theme-title">
      <router-link to="/" tag="h3">{{ title }}</router-link>
    </div>
    <div class="sortAbout">
      <div
      @click="switcher('sort')"
      class="item">
        <h3
        :class="{itemlight: controller.sort}">
              {{ calculatedFood.name || '分类'}}
        </h3>
      </div>
      <div
      @click="switcher('order')"
      class="item">
        <h3
        :class="{itemlight: controller.order}">排序</h3>
      </div>
      <div
      @click="switcher('filter')"
      class="item">
        <h3
        :class="{itemlight: controller.filter}">筛选</h3>
      </div>
    </div>
    <restaurants :restaurants="restaurants">
    </restaurants>
    <div v-if="!restaurants">
      <loading></loading>
    </div>
    <div class="mask"></div>
  </div>
</template>
<script>
import axios from 'axios'
import restaurants from '../restaurants/restaurants'
import loading from '../loading/loading'
import Sort from '../../common/js/Sort.js'
export default {
  data: function () {
    return {
      restaurants: '',
      title: '',
      itemSort: '',
      // 现在的状态
      controller: {
        'sort': false,
        'order': false,
        'filter': false
      },
      // 右侧计算出的食物系表
      calculatedFood: {},
      foodsId: 207,
      Sort: Sort,
      currentOrderIndex: 0,
      currentFilterIndex: 0,
      // 记录该次点击之前是否选择了
      sendwaybefore: false,
      // 记录是否选择了
      sendwaychoosen: false
    }
  },
  components: {
    restaurants,
    loading,
    Sort
  },
  mounted: function () {
    this.getTitle()
    this.init()
  },
  props: {
  },
  methods: {
    computeClass: function (str) {
      return 'C' + str
    },
    cancelAll: function () {
      Sort.filterTrueLength = 0
      let lengthF = Sort.filter.length
      for (let i = 0; i < lengthF; i++) {
        Sort.filter[i].selected = false
      }
      let lengthS = Sort.sendWay.length
      for (let j = 0; j < lengthS; j++) {
        Sort.sendWay[j].selected = false
      }
      this.sendwaybefore = false
      this.sendwaychoosen = false
    },
    filterClicked: function (item) {
      if (item.selected) {
        Sort.filterTrueLength--
      } else {
        Sort.filterTrueLength++
      }
      item.selected = !item.selected
    },
    orderClicked: function (index) {
      this.currentOrderIndex = index
    },
    computeImage: function (index, str) {
      switch (str) {
        case 'sort':
          return '/static/sortpic/sort-' + index + '.png'
        case 'order':
          return '/static/orderpic/order-' + index + '.svg'
        case 'right':
          return '/static/sortpic/right.svg'
        case 'filter':
          return '/static/filterpic/ok.svg'
        case 'sendway':
          return '/static/filterpic/' + this.Sort.sendWay[index].name + '.svg'
        default:
          return
      }
    },
    calculateFood: function (id, index) {
      let length = this.itemSort.length
      this.foodsId = id
      for (let i = 0; i < length; i++) {
        if (id === this.itemSort[i].id) {
          this.calculatedFood = this.itemSort[i]
        }
      }
      if (index === 0) { this.controller.sort = false }
    },
    switchsendway: function (way, index) {
      this.sendwaybefore = this.sendwaychoosen
      for (let w = 0; w < Sort.sendWay.length; w++) {
        if (w === index) {
          this.sendwaychoosen = !way.selected
          Sort.sendWay[w].selected = !Sort.sendWay[w].selected
        } else {
          Sort.sendWay[w].selected = false
        }
      }
      Sort.filterTrueLength += (this.sendwaychoosen - this.sendwaybefore)
    },
    switcher: function (props) {
      if (props === 'sort') {
        this.calculateFood(this.foodsId)
      }
      let p
      for (p in this.controller) {
        if (p === props) {
          this.controller[p] = !this.controller[p]
        } else {
          this.controller[p] = false
        }
      }
    },
    getTitle: function () {
      let titleOri = window.location.hash.match(/\[.+\]/gi)[0]
      this.title = titleOri.replace(/(\[|\])/gi, '')
    },
    init: function () {
      let that = this
      let resUrl = `/shopping/restaurants?latitude=31.23037&longitude=121.473701&keyword=&offset=0&limit=20&extras[]=activities&restaurant_category_ids[]=207`
      axios.get(resUrl).then(function (res) {
        that.restaurants = res.data
      })
      let themeSortUrl = `/shopping/v2/restaurant/category?latitude=31.23037&longitude=121.473701`
      axios.get(themeSortUrl).then(function (res) {
        that.itemSort = res.data
      })
    }
  }
}
</script>
<style lang="css" scoped>
/*.mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .8);
}*/

.finaltheme {
  height: 100vh;
  overflow-y: scroll;
  position: relative;
}

.finaloverflow {
  overflow: hidden;
}

.theme-title {
  background-position: left;
  background-repeat: no-repeat;
  background-size: 1.5rem;
  background-image: url('../../shop/images/arrow.svg');
  background-color: #0096ff;
}

.theme-title>h3 {
  color: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 1.4rem;
  padding: .5rem 0;
}

.sortAbout {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}

.item {
  flex: 1;
}

.item>h3 {
  text-align: center;
  padding: .6rem 0;
  font-size: .8rem;
}

.container {
  position: absolute;
  top: 5.2rem;
  width: 100%;
  left: -100%;
  min-height: 16rem;
  max-height: 25rem;
  z-index: 2;
  transition: all .3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
}

.downed {
  left: 0;
}

.sort {
  display: flex;
}

.sort-foods {
  flex: 4;
  height: inherit;
  overflow-y: scroll;
  background-color: #f2f2f2;
}

.sort-foods img {
  width: 1rem;
  height: 1rem;
  margin-right: .5rem;
}

.sort-food {
  flex: 5;
  height: inherit;
  overflow-y: scroll;
  background-color: #fff;
}

.sort-foods>h3 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #333;
  font-size: .8rem;
  padding: 1rem .5rem;
}

.sortfoodslight {
  background-color: #fff;
}

.sort-food>h3 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
  color: #333;
  font-size: .8rem;
  padding: 1rem .5rem;
}

.sort-foods .wrapper {
  text-align: right;
  flex: 1;
}

.sort-foods .count {
  color: #fff;
  flex: 1;
  padding: 0 .5rem;
  border-radius: 1rem;
  display: inline-block;
  background-color: #999;
}

.sort-food .count {
  color: #333;
  display: inline-block;
}

.order {
  background-color: #fff;
}

.order h3 {
  color: #333;
  font-size: .8rem;
  padding: .7rem .5rem;
}

.filter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}
.filter > h4{
  font-size: .5rem;
  color: #666;
  padding-left: .5rem;
  padding-top: .8rem;
}
.choose {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}

.block {
  width: 30%;
  display: flex;
  font-size: .6rem;
  margin: 3px 0;
  padding: .5rem;
  color: #666;
  border-radius: 5px;
  border: 1px solid #eadcdc;
}

.buttons {
  display: flex;
  margin-bottom: 10px;
  padding: .5rem 0;
  justify-content: space-around;
  align-items: center;
  background-color: #fafafa;
}

.buttons>button {
  width: 45%;
  padding: .7rem 0;
  font-size: 1rem;
  outline: none;
  border: 1px solid #ddd;
  border-radius: 3px;
}

.clear {
  background-color: #fff;
}

.ok {
  color: #fff;
  background-color: #56d176;
}
.placeholder{
  padding: 0 2px;
  text-align: center;
  border-radius: 3px;
}
.heightholder{
  margin-left: .5rem;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
}
.itemlight,
.filterlight {
  color: #2395ff;
  transition: all .3s;
  background-color: #edf5ff;
}
.filterlight{
  border: 1px solid #a2d2ff;
}

.C3fbde6{
  color: #3fbde6;
  border: 1px solid #3fbde6;
}
.C999{
  color: #999;
  border: 1px solid #999;
}
.Ce8842d{
  color: #e8842d;
  border: 1px solid #e8842d;
}
.Cff4e00{
  color: #ff4e00;
  border: 1px solid #ff4e00;
}
.C57a9ff{
  color: #57a9ff;
  border: 1px solid #57a9ff;
}
.fengniao{
  width: 18px;
  height: 18px;
}
</style>
