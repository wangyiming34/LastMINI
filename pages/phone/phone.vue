<template>
	<view class="flex body">
	  
	  <scroll-view :scroll-into-view="toIndex" class="left"  scroll-y="true" scroll-with-animation="true" show-scrollbar="true" @scroll="scroll">
			<!-- 热门 -->
			<view class="hot">
				<view class="hot-text" id="hot">
					热门
				</view>
				<view class="flex num" v-for="(item,index) in hotList" :key="index" @click="changeHot(item.code)">
					<view class="">
						{{item.name_zh}}
					</view>
					<view class="">
						+{{item.code}}
					</view>
				</view>
			</view>
			<!-- 常规 -->
			<view  v-for="(item,index) in phoneList" :key="index" >
				<view class="hot-text" :id="item.letter">
					{{item.letter}}
				</view>
				<view class="num flex" v-for="(item1,index1) in item.data" :key="index1" @click="changeCode(item1.code)">
					<view class="">
						{{item1.name_zh}}
					</view>
					<view class="">
						+{{item1.code}}
					</view>
				</view>
			</view>
	  </scroll-view>
	  
	  <!-- 索引 -->
	  <view class="right flexY">
	  	<view class="newHot flex" id="hot" @click="hot">
	  		热
	  	</view>
		<view class="newHot flex"  v-for="(item2,index2) in phoneList " :key="index2"  @click="phone(item2.letter)">
			{{item2.letter}}
		</view>
	  </view>
		
	</view>
</template>

<script>
	// import {uniIndexedList} from '@dcloudio/uni-ui'
	var app = getApp().globalData
	export default {
		// components: {uniIndexedList},
		data() {
			return {
				hotList:[],
				phoneList:[],
				toIndex:''
				
			}
		},
		
		onShow() {
			uni.showLoading({
			    title: '加载中'
			});
			this.$api.phone({}).then(res=>{
				this.hotList = res.data.data.hot
				this.phoneList = res.data.data.list
				uni.hideLoading();
			})
		},
		methods: {
		 hot(e){
			 // console.log(e.currentTarget.id)
			 this.toIndex = e.currentTarget.id
			 // console.log(typeof this.toIndex)
		 },
		 scroll(e){
			 this.toIndex = ''
		 },
		 phone(e){
			 // console.log(e)
			 this.toIndex = e
		 },
		 // 改变号码前缀存到 全局中
		  changeHot(code){
			 app.num = code
			 uni.setStorageSync('phoneCode',code)
			 // console.log(uni.getStorageSync('phoneCode'))
			 uni.navigateBack({
			 	delta: 1
			 })
		 },
		 changeCode(code){
			 app.num = code
			 uni.setStorageSync('phoneCode',code)
			 // console.log(uni.getStorageSync('phoneCode'))
			 uni.navigateBack({
				delta: 1
			 })
		 }
		
	},
	
	}
</script>

<style>
@import url("./phone.css");
</style>
