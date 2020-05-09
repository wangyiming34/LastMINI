<template>
	<view class="wrap">
		<!-- 选项卡 -->
		 <view class="notice-head">
			 <view class="notice-tab" :class="currentIndex===0?'nocActive':''" @click="currentIndex=0">
			 	德申公告
				<view class="notice-red" v-if="notice_count">
					{{notice_count}}
				</view>
			 </view>
			 
			 <view class="notice-tab" :class="currentIndex===1?'nocActive':''" @click="currentIndex=1">
			 	俱乐部
				<view class="notice-red" v-if="club_count">
					{{club_count}}
				</view>
			 </view>
		 </view>
		 <!-- 轮播图选项卡内容 -->
		 <view class="noc-swiper">
			 <swiper class="swiper" :current='currentIndex' @change="swiper">
				 <!-- 德申活动 -->
				 <swiper-item>
					 <scroll-view scroll-y="true" class="scrollView">
						   <view v-for="(item,index) in list" :key="index" class="scroll-notice" @click="go(item.id)">
							   <!-- 未读标志 -->
							   <view class="red-read" v-if="item.red_dian===0">
							   </view>
							  <view class="notice-title">
							  	{{item.title}}
							  </view>
							  <view class="notice-description">
							  	{{item.description}}
							  </view>
							  <view class="notice-read flex">
							  	<view class="notice-time">
							  		{{item.created_at}}
							  	</view>
								<view class="notice-click">
									阅读：{{item.click}}
								</view>
							  </view>
						   </view>
					 </scroll-view>
					 
				 </swiper-item>
				 
				 <!-- 俱乐部消息 -->
				 <swiper-item>
					 <view class="notice-down">
						 <view class="LuDingJi-icon1">
						 	<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
						 </view>
						 <!-- <view class="notice-go" @click="DownLoad">
						 	下载app
						 </view> -->
						 <view style="padding: 10px 50upx;color: #cccccc;font-size: 17px;line-height: 28px;text-align: center;">
						 	请去应用商店点击搜索"德申汇"APP，更多体验等你来~!
						 </view>
					 </view>
				 </swiper-item>
				 
			 </swiper>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex: 0, //控制选项卡
				list: [], // 德申公告列表
			    notice_count: 0, // 德申公告未读数
			    club_count: 0 // 俱乐部未读数
			}
		},
		onShow() {
			// 请求信息数据
			this.getNotice()
			this.getClub()
		},
		methods: {
			// 进入下载界面
			DownLoad(){
				uni.navigateTo({
					url:"../DownLoad/DownLoad"
				})
			},
			// 进入消息详情页
			go(id){
				uni.navigateTo({
					url:"../NoticeDetails/NoticeDetails?id="+id
				})
			},
			// 轮播图切换
			swiper(e){
				this.currentIndex = e.detail.current
			},
			// 请求德申消息
			getNotice () {
			      this.$api.DetionNotice({
			        user_id:uni.getStorageSync('userId'),
			        token: uni.getStorageSync('token')
			      }).then(res => {
					  // console.log(res)
			        if (res.data.code === '200') {
			          this.list = res.data.data.list
					  console.log(this.list)
			          this.notice_count = res.data.data.count
			        } else if (res.data.code === '1010') {
			          uni.clearStorageSync()
			          uni.showToast({
			              title: '登录过期，请重新登录',
			              duration: 2000,
			          	icon:'none'
			          });
			          uni.reLaunch({
			          	url: '../../pages/login/login'
			          })
			        }
			      })
			    },
			// 获取俱乐部消息数量
			getClub () {
			  this.$api.ClubMsg({
				user_id:uni.getStorageSync('userId'),
				token: uni.getStorageSync('token')
			  }).then(res => {
				  // console.log(res)
				this.club_count = res.data.data.count
			  })
			}
		}
	}
</script>

<style>
  @import url("./Notice.css");
</style>
