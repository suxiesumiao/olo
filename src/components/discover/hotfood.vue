<template>
	<!--.wrapper 添加v-if 解决报错信息TypeError: Cannot read property '0' of undefined -->
    <main class="wrapper" v-if="list.tags">
    	<ul @click="" class="header">
    		<li v-for="(item,index) in list.tags" @click='option(index)' v-bind:class="{active:item.isActive}">{{item.name}}</li>
    	</ul>
    	<!-- 专属推荐 -->
    	<router-link :to="routerTo(item.restaurant.id)" tag="ul" v-if="list.tags[0].isActive" class="lists" v-for="item in hotfood" :key="item.id">
    		<div class="title">
    			<div class="name">
    				<img v-bind:src="item.restaurant.image_path | img" alt="店铺">
    				<h4>{{item.restaurant.name}}</h4>
    			</div>
    			<span class="distribution">{{item.restaurant.float_minimum_order_amount | distribution}} / {{item.restaurant.float_delivery_fee | distribution_price}}</span>
    		</div>
    		<div class="items">
    			<div class="item" v-for="food in item.foods">
    				<img v-bind:src="food.image_hash | food_img" alt="食物">
    				<h5>{{food.name}}</h5>
    				<span class="price_bottom">{{food.price | rmb}}</span>
    				<span class="look">去看看</span>
    			</div>
    		</div>
    	</router-link>
    	<!-- 专属推荐结束 -->
    	<!-- 其他tags页面 -->
    	<ul v-if="!list.tags[0].isActive && data" class="wrap" v-for="items in data">
    		<div class="foods" v-if="items.foods">
    			<div class="food" v-for="item in items.foods">
    				<img v-bind:src="item.image_hash | image" alt="food">
    				<h5>{{item.name}}</h5>
    				<span class="shop">{{item.restaurant_name}}</span>
    				<div class="price_bottom">
    					<div>
    						<span>￥</span>
    						<span class="price">{{item.price}}</span>
    					</div>
    					<div>
    						<span class="icon_name" v-for="tag in item.rec_reasons">{{tag}}</span>
    					</div>
    				</div>
    			</div>
    		</div>
    		
    		<div class="restaurant" v-else="items.restaurant">
    			<div class="image">
    				<img v-bind:src="items.restaurant.image_path | restaurant_img" alt="restaurant">
    			</div>
    			<div class="details">
    				<div class="shop_title shop_item">
						<h2 class="left">
							<span class="is_premium" v-if="items.restaurant.is_premium">品牌</span>
							<span>{{items.restaurant.name}}</span>
						</h2>
						<div class="right">
							<span v-for="support in items.restaurant.supports">{{support.icon_name}}</span>
							<!-- <span>准</span> -->
						</div>
    				</div>
    				<div class="stars shop_item">
    					<div class="left">
    						<el-rate
  								v-model="items.restaurant.rating"
  								disabled
  								show-text
  								text-color="#ff9900"
  								text-template="{value}">
							</el-rate>
    						<!-- <div>{{}}</div> -->
    						<div class="sales">月售{{items.restaurant.recent_order_num}}单</div>
    					</div>
    					<div class="right">
    						<span v-if="items.restaurant.supports[items.restaurant.supports.length - 1] && items.restaurant.supports[items.restaurant.supports.length - 1].id == 9">{{items.restaurant.supports[items.restaurant.supports.length - 1].name}}</span>
    						<span>{{items.restaurant.delivery_mode.text}}</span>
    					</div>
    				</div>
    				<div class="time shop_item">
    					<div class="left">
    						<span>￥{{items.restaurant.piecewise_agent_fee.rules[0].price}}起送 |</span>
    						<span>{{items.restaurant.piecewise_agent_fee.description}}</span>
    					</div>
    					<div class="right">
    						<span>{{items.restaurant.distance}} m |</span>
    						<span>{{items.restaurant.order_lead_time}}分钟</span>
    					</div>
    				</div>
    				<div class="activity shop_item">
    					<div>
    						<div class="left" v-for="active in items.restaurant.activities">
    							<span v-bind:style="{backgroundColor:'#'+active.icon_color}">{{active.icon_name}}</span>
    							<span>{{active.description}}</span>
    						</div>
    					</div>
    					<div class="right">
    						<span>{{items.restaurant.activities.length}}个</span>
    					</div>
    				</div>
    			</div>
    		</div>
    	</ul>
    </main>
</template>
<script>
/*eslint-disable */
import Vue from 'vue'
import axios from 'axios'
export default {
    data() {
        return {
            list: {},  //tags
            hotfood:[],//专属推荐
            data:[]    //专属推荐之外，其他类
        }
    },
    created(){
    	this.getData()
    },
    beforeCreate(){
    	// this.list.tags[0].isActive = true
    },
    filters:{
    	img:function(val){
    		//https://fuss10.elemecdn.com/7/3a/44c83ec3b71aef2a9fbadf5b8d6e7png.png?imageMogr/format/webp/thumbnail/!42x42r/gravity/Center/crop/42x42/
    		return 'https://fuss10.elemecdn.com/' + val.slice(0, 1) + '/' + val.slice(1, 3) + '/' + val.slice(3) + '.' + val.slice(32) + '?imageMogr/format/webp/thumbnail/!42x42r/gravity/Center/crop/42x42/'
    	},
    	food_img:function(val){
    		return 'https://fuss10.elemecdn.com/' + val.slice(0, 1) + '/' + val.slice(1, 3) + '/' + val.slice(3) + '.' + val.slice(32) + '?imageMogr/format/webp/thumbnail/!220x220r/gravity/Center/crop/220x220/'
    	},
    	image:function(val){
    		return 'https://fuss10.elemecdn.com/' + val.slice(0, 1) + '/' + val.slice(1, 3) + '/' + val.slice(3) + '.' + val.slice(32) + '?imageMogr/format/webp/thumbnail/!335x230r/gravity/Center/crop/335x230/'
    	},
    	restaurant_img:function(val){
    		return 'https://fuss10.elemecdn.com/' + val.slice(0, 1) + '/' + val.slice(1, 3) + '/' + val.slice(3) + '.' + val.slice(32) + '?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/'
    	},
    	rmb: function(price) {
                return '¥' + price
            },
    	distribution:function(val){
    		return '¥'+val+'起送'
    	},
    	distribution_price:function(val){
    		return '配送费¥'+val
    	}
    },
    methods:{
    	getData(){
    		//https://mainsite-restapi.ele.me/hotfood/v1/guess/likes?latitude=31.23037&longitude=121.473701&offset=0&limit=10&columns=2&request_id=22a37d5e-b98d-46fc-af13-0ffa205095c9&tag_id=-1&extras=%5B%22activities%22%5D
    		let that = this
    		let tags_url = '/hotfood/v1/guess/banner?latitude=40.0877021&longitude=116.3369128&request_id=null'
    		let hotfood_url = '/hotfood/v1/guess/likes?latitude=40.0877021&longitude=116.3369128&offset=0&limit=10&columns=2&request_id='+that.list.request_id+'&tag_id=-1&extras=%5B%22activities%22%5D'
    		axios.get(tags_url).then(function(response){
    			that.list = response.data
    			that.list.tags[0].isActive = true
    			// console.log(that.list)
    		})
    		axios.get(hotfood_url).then(function(response){
    			that.hotfood = response.data
    			// console.log(that.hotfood)
    		})
    	},
    	option(index){
    		//给每一项添加属性isActive，由此切换class
    		//参考：Vue.set( object, key, value )方法，设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
    		this.list.tags.map(function(item,i){
    			index === i ? Vue.set(item,'isActive',true) : Vue.set(item,'isActive',false)
    		})
    		//this.data 切换数据
    		if (index!==0) {
    			let that = this
    			let url = '/hotfood/v1/guess/likes?latitude=40.0876309&longitude=116.3371242&offset=0&limit=10&columns=2&request_id='+that.list.request_id+'&tag_id='+that.list.tags[index].id+'&extras=%5B"activities"%5D'
    			axios.get(url).then(function(response){
    				that.data = response.data
    				// console.log(that.data)
    		})
    	}
    	},
    	routerTo(id){
    		return '/shop/' + '#id=' + id
    	}
    }
}
</script>
<style scoped>
	main{
		margin-bottom: 1rem;
	}
/*专属推荐*/
	.header{
		white-space: nowrap;
		overflow-x: auto;
		padding: 0.4rem;
		background-color: rgba(255,255,255,.9)
	}
	.header>li{
		display: inline-block;
		border:1px solid #ddd;
		color: #333;
		min-width: 23%;
		padding: 0 0.6rem;
		height: 1.8rem;
		line-height: 1.8rem;
		border-radius: 0.9rem;
		text-align: center;
		margin:0.3rem;
	}
	.header>.active{
		border-color: #f12c2c;
		color: #f12c2c;
    	font-weight: 700;
	}
	.wrap{
		padding-top: 0.6rem;
	}
	.lists{
		background-color: #fff;
		margin:0.5rem 0.5rem 0 0.5rem;
		padding: 0.8rem;
		border-radius: 0.5rem;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 1rem;
	}
	.name{
		display: flex;
		align-items: center;
	}
	.name>img{
		border-radius: 50%;
		width: 1.5rem;
	}
	.name>h4{
		padding-left: 0.4rem;
		font-weight: bold;
	}
	.distribution{
		font-size: 0.5rem;
		color: #999;
	}
	.items{
		display: flex;
		justify-content: space-between;
	}
	.item{
		margin-left: 0.8rem;
	}
	.item:first-child{
		margin-left: 0;
	}
	.item{
		flex:1;
		display: flex;
		flex-direction: column;
	}
	.item>h5{
		flex-grow: 1;					/*等高*/
		padding-top: 0.5rem;
		color: #333;
		display: -webkit-box;			/*折行显示，最多显示两行，超出部分隐藏，且显示为...*/
		overflow: hidden;
		word-break: break-all;
		-webkit-line-clamp:2;
		-webkit-box-orient: vertical;
	}
	.price_bottom{
		color: #ff6000;
		padding: 0.5rem 0;
		display: flex;
		justify-content: space-between;
	}
	.icon_name{
		border: 1px solid #ff5400;
		height: 1rem;
		line-height: 1rem;
		padding: 0 0.2rem;
		margin-left: 0.2rem;
		font-size: 0.6rem;
	}
	.item>.look{
		align-self: center;
		border:1px solid #f44e4b;
		color: #f44e4b;
		padding: 0.2rem 1rem;
		border-radius: 0.2rem;
	}
/*专属推荐结束*/
/*foods*/
	.wrap{
		margin-top: 0.5rem;
		background-color: #fff;
	}
	.foods{
		display: flex;
	}
	.food{
		flex:1;
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
	}
	.food>h5{
		padding-top: 0.5rem;
		font-size: 1.1rem;
		flex-grow: 1;
	}
	.food>.shop{
		font-size: 0.5rem;
		color: #999;
	}
	.price{
		font-size: 1.2rem;
		font-weight: bold;
	}
/*shop*/
	.restaurant{
		display: flex;
	}
	.image{
		padding: 0 0.5rem;
		width: 6rem;
	}
	.details{
		flex:1;
		padding: 0 0.5rem;
		display: flex;
		flex-direction: column;
	}
	.shop_item{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0.8rem;
	}
	.shop_title>.left{
		display: flex;
		align-items: center;
	}
	.is_premium{
		background-color: #ffd72a;
		color: #52250a;
		border-radius: 0.1rem;
		font-size: 0.4rem;
		margin-right: 0.5rem;
    	padding: 0.1rem 0.2rem;
    	white-space: nowrap;
	}
	.shop_title>.left>span:last-child{
		font-size: 1.2rem;
		font-weight: bold;
		width: 12rem;		/*溢出隐藏，显示...*/
		overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
	}
	.shop_title>.right>span{
		font-size: 0.5rem;
		border:1px solid #ddd;
		color: #999;
		border-radius: .053333rem;
		margin-left: 0.2rem;
	}
	.stars>.left{
		display: flex;
		align-items: center;
	}
	.sales{
		font-size: 0.6rem;
		margin-left: 0.4rem;
	}
	.stars>.right>span:first-child{
		border:1px solid #44a5ff;
    	/*background: #fff;*/
    	color: #2395ff;
    	font-size: 0.5rem;
    	padding: 0.1rem 0.2rem;
	}
	.stars>.right>span:last-child{
		margin-left: .106667rem;
    	border-color: #2395ff;
    	background: #2395ff;
    	color: #fff;
    	font-size: 0.5rem;
    	padding: 0.1rem 0.2rem;
	}
	.time{
		font-size: 0.5rem;
	}
	.time>.left{
		color: #666;
	}
	.time>.right>span:first-child{
		color: #999;
	}
	.time>.right>span:last-child{
		color: #2395ff;
	}
	.activity{
		font-size: 0.5rem;
	}
	.activity .left>span:first-child{
		color: #fff;
		padding: 0.1rem;
	}
	.activity .left{
		margin-bottom: 0.4rem;
	}
	.activity>.right{
		align-self: flex-start;
		width:2rem;
		text-align: right;
	}
</style>
