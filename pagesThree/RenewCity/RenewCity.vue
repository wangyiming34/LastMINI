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
			  
			  <view class="" style="padding: 0 10px;background-color: white;">
					<view class="border-bottom-new2" style="padding: 15px 0;" v-for="(item,index) in list" :key="index" @click="go(item)">
						<view class="" style="color: rgb(51, 51, 51);
    font-size: 15px;
    font-weight: bold;
    line-height: 24px;">
							{{item.name}}
						</view>
						<view class="" style="color: #666;
    font-size: 13px;
    line-height: 20px;">
							VIP总数：{{item.usercount}}
						</view>
						<view class="" style="color: #666;
    font-size: 13px;
    line-height: 20px;">
							应续费VIP：{{item.renew}}
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
				end:'',
				cityName:''
			}
		},
		onLoad(e) {
			this.type = e.type
			this.cityName = e.cityName
			console.log(this.cityName)
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});			
			this.getData()
		},
		
		methods: {
			go(item){
				uni.navigateTo({
					url:'../../pagesThree/RenewCityClub/RenewCityClub?id='+item.club_id
				})
			},
			getData () {
			    this.$api.c_report({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
			      search: this.search_key,
			      type: this.type,
			      city_name: this.cityName
			    }).then(res => {
					console.log(res)
			      uni.hideLoading();
				  if (res.data.code === '200') {
					  this.list = res.data.data.list
					  this.isFinish = true
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
