<template>
	<view class="content scroll pt0" v-show="isFinish">
	  <view class="report_title">
	    <view class="border-bottom title flex align-center justify-between" style="color: #333">{{city}}俱乐部人数统计 <view class="number">{{count}}人</view></view>
	  </view>
	  <view class="report_search flex align-center">
	    <view class="text flex align-center">
	      <img src="https://web.detion.com/static/img/search_icon1.png" alt="" class="icon">
	      <view style="flex: 1">
	        <input type="text" placeholder="请输入要搜索的俱乐部名称" v-model="search_key">
	      </view>
	    </view>
	    <view class="btn" @click="search">搜索</view>
	  </view>
	  <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 84px);top:84px">
	    <view class="report_list">
	      <view class="item flex align-center justify-between" v-for="(item, index) in default_list" :key="index">
	        <view class="text">{{item.name}}</view>
	        <view class="text">{{item.usercount}}</view>
	      </view>
	    </view>
	  </view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				city:'',
				type:'',
				list: [],
				all_list: [],
				default_list: [],
				name: '',
				count: 0,
				free: 0,
				search_key: '', // 搜索关键词
				page: 1,
				isFinish: false,
				allLoaded: false // 分页加载
			}
		},
		onLoad(e) {
			this.city = e.city
			this.type = e.type
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.getData()
		},
		methods: {
			getData () {
			  this.$api.club_report({
			    type: this.type,
			    city_name: this.city
			  }).then(res => {
			    uni.hideLoading();
			    if (res.data.code === '200') {
			      this.list = res.data.data.list
			      this.name = res.data.data.name
			      this.count = res.data.data.count
			      this.free = res.data.data.freedom
			      this.all_list = this.list.concat({
			        name: this.city + '自由港',
			        usercount: this.free
			      })
			      this.default_list = this.all_list
			      this.isFinish = true
			    }
			  })
			},
			search () {
			  if (this.search_key.length) {
			    var keyword = this.search_key
			    this.default_list = this.all_list.filter(function (list) {
			        return Object.keys(list).some(function (key) {
			        return String(list[key]).toLowerCase().indexOf(keyword) > -1
			      })
			    })
			  } else {
				uni.showToast({
				    title: '请输入要搜索的内容,不输入内容显示所有',
				    mask: "true",
					icon:'none'
				});
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.getData()
			  }
			}
			
		}
	}
</script>

<style>
	@import url("../Report/Report.css");
</style>
