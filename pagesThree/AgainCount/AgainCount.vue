<template>
	<view class="wrap1" style="padding-top: 44px;background: #fafafa;">
	  <view class="" style="position: fixed;left: 0; top: 0;z-index: 100;width: 100%;">
				
				<!-- 搜索 -->
	  			<view class="report_search flex align-center border-bottom" style="background-color: white;width: 100%;">
	  			  <view class="text flex align-center">
	  			    <img src="https://web.detion.com/static/img/search_icon1.png" alt="" class="icon">
	  			    <view style="flex: 1">
	  			      <input type="text" placeholder="请输入要搜索的用户姓名" v-model="search_key">
	  			    </view>
	  			  </view>
	  			  <view class="btn" @click="search">搜索</view>
	  			</view>
	  </view>
	  <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 88px);top:88px" v-show="isFinish">
	    
	      <view class="new_user_list">
	        <view class="bnew2 flex justify-start lii" v-for="(item,index) in list" :key="index">
	          <view class="user flex align-center justify-center">
	            <!-- <img :src="item.avatar?item.avatar:'https://web.detion.com/static/img/user_icon.png'" alt=""> -->
				  <image :src="item.avatar?item.avatar:'https://web.detion.com/static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
	          </view>
	          <view class="con" style="display: block">
	            <view class="flex align-center justify-between">
	              <view class="info flex align-center" @click="my_info(item)">
	                <view class="name">{{item.nickname}}</view>
	                <vip :no="item.no" :type="item.type" class="vip"></vip>
	              </view>
	              <view style="flex align-center justify-end">
	                <!-- <a class="tel flex align-center justify-end" :href="'tel:' + item.username">{{item.username}}</a> -->
					  <view class="tel flex align-center justify-end" @click="tel(item.username)">
							<view class="">
								{{item.username}}
							</view>
							<van-icon name="arrow" />
					  </view>
	              </view>
	            </view>
	            <view class="company flex align-center">
	              <view style="flex: 1;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">推荐人：{{item.parentname}}</view>
	            </view>
	            <view class="detail">
				  <view>地址：{{item.address}}</view>
				  <view>身份证号：{{item.idcard}}</view>
				  <view>续费时间：{{item.xufei_time}}</view>
				  <view>到期时间：{{item.vip_ended_at}}</view>
	            </view>
	          </view>
	
	        </view>
	      </view>
		  <view class="LuDingJi-no" v-if="list.length === 0" style="overflow: hidden;">
		  	<view class="LuDingJi-icon1">
		  		<image src="https://web.detion.com/static/img/empty_information.png" lazy-load="true" class="imga" mode="aspectFill"></image>
		  	</view>
		  	<view class="LuDingJi-no-con">
		  		暂无数据
		  	</view>
		  </view>
	  </view>
	  <view style="height: 88upx;display: flex;  width: 100%;" v-if="loading">
	       <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				search_key: '',
				list: [],
				isFinish: false,
				page: 1,				
				type:'',
				loading:false,
				city:'',
				tabList:["缴费",'续费'],
				count:0,
				count1:0,
				n:0,
				start:'',
				end:''
			}
		},
		onLoad(e) {
			this.type = e.type
			console.log(e)
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});			
			this.getData()
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.list.length>19){
				uni.showLoading({
					title: '加载中',
					mask:"true"
				});
				this.loading = true
				this.page++
				this.getData()
			}
		},
		onPullDownRefresh() {
			  uni.showLoading({
			      title: '加载中',
			  	mask:"true"
			  });
			this.page = 1
			this.getData()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 2000);
		
		},
		methods: {
			getData () {
			    this.$api.renewed_list({
			      search_key: this.search_key,
			      time: this.type,
			      page: this.page
			    }).then(res => {
			      uni.hideLoading();
				  if (res.data.code === '200') {
					 
				  	if (this.page === 1) {
				  		  this.list = res.data.data
				  		  // console.log(this.chinaList)
				  		  this.loading = false
				  		  this.isFinish = true
				  	} else {
				  	  if(res.data.data.length){
				  		  setTimeout(()=>{
				  			  this.list = this.list.concat(res.data.data)
				  			  this.loading = false
				  			  uni.showToast({
				  				title:'加载成功',
				  				icon:"none"
				  			  })
				  		  },1500)
				  	  }else{
				  		  this.loading = false
				  		  uni.showToast({
				  			title:'没有更多的数据了',
				  			icon:"none"	,								  	
				  		  })
				  	  }	
				  	   this.isFinish = true					  
				  	}
				 //    console.log(this.list)
					// console.log(res)
				  }
			      
			    })
			  
			},
			search () {
			  if (this.search_key.length) {
			    uni.showLoading({
			          title: '搜索中',
			      	mask:"true"
			      });
			    }
			    this.page = 1
			    this.getData()
			},
			tel(tel){
			  uni.makePhoneCall({
				phoneNumber:tel
			  })
			},
			my_info (item) {
			  uni.navigateTo({
			  	url:'../../pagesMy/MyInfo/MyInfo?id='+item.user_id
			  })
			}
			
		}
	}
</script>

<style>
	@import url("../Report/Report.css");
</style>
