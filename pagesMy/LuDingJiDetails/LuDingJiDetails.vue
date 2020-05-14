<template>
	<view v-if="finish">
		<!-- 头部轮播图 -->
		<view class="LuDingJiDetails-swiper">
			<swiper class="swiper" indicator-dots="true" autoplay="true" indicator-active-color="white" indicator-color="#ccc">
				<swiper-item v-for="(item,index) in details.images" :key="index">
					<view class="swiper-item">
						 <image :src="item.src" lazy-load="true" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 中部 -->
		<view class="BoxCenter">
				<!-- 标题咨询量 -->
				<view class="LuDingJiDetails-title">
					{{details.title}}
				</view>
				
				<view class="flex justify-between align-center" style="margin-bottom: 15px;">
					<view class="LuDingJiDetails-zixun">
						<text>人气：</text><text>{{details.vote}}</text>
						<text>咨询量：</text><text>{{details.consult}}</text>
					</view>
					
					<view class="flex" style="align-items: flex-end;">
						<van-icon name="eye-o" color="rgba(153,153,153,1)" style="margin-right:5px"/>
						<text style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);line-height: 14px;">{{details.click}}浏览</text>
					</view>
				</view>
				<!-- 头像俱乐部等 -->
				<view class="LuDingJiDetails-blue flex justify-between align-center" @click.stop="MyInfo(details.user_id)">
					<view class="LuDingJiDetails-av re">
						<image :src="details.avatar?details.avatar:'../../static/img/user_icon.png'" lazy-load="true" mode="aspectFill"></image>
						<head-logo :type="details.type" :v_type="details.add_v_type"></head-logo>
					</view>
					
					<view class="LuDingJiDetails-person">
						<view class="LuDingJiDetails-person-name flex align-center">
							<!-- {{details.nickname}} -->
							<view class="newName">
								{{details.nickname}}
							</view>
							<level :type="details.type" :v_type="details.add_v_type" :vip_level="details.vip_level"></level>
						</view>
						<view class="LuDingJiDetails-company" v-show="details.company">
							<text>{{details.company}}</text><text v-if="details.job" class="LuDingJiDetails-text"> I </text><text v-if="details.job">{{details.job}}</text>
						</view>
						<view class="LuDingJiDetails-club" v-for="(item,index) in details.club_data" :key='index' v-show="details.club_data.length>0">
							<text>{{item.name}}</text><text class="LuDingJiDetails-text"> I </text><text>{{item.dutyname}}</text>
						</view>
					</view>
					
					<view class="before">
						<van-icon name="arrow" color="#ccc"/>
					</view>
				</view>
				
				<!-- 咨询投票按钮 -->
				
				<view class="flex justify-between">
					<view class="" style="width: 335upx;height: 120upx;">
						<image src="https://web.detion.com/static/image/resource/vote_btn.png" lazy-load="true" class="imga" mode="aspectFill" v-if="details.vote_status" @click="vote"></image>
						<image src="https://web.detion.com/static/image/resource/vote_btn2.png" lazy-load="true" class="imga" mode="aspectFill" v-else></image>
					</view>
					<view class="" style="width: 335upx;height: 120upx;" @click="phone">
						<image src="https://web.detion.com/static/image/resource/consult_btn.png" lazy-load="true" class="imga" mode="aspectFill"></image>
					</view>
				</view>
		</view>
		<!-- 灰色的条 -->
		<view class="line-ccc">
			
		</view>
		<!-- 项目介绍 -->
		<view class="LuDingJiDetails-content">
			<view class="LuDingJiDetails-wenzi">
				<view class="LuDingJiDetails-wenzi-title">
					项目介绍
				</view>
				<view class="LuDingJiDetails-wenzi-yellow">
					
				</view>
			</view>
			
			<rich-text :nodes="content"></rich-text>
			
		</view>
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				id:'',
				details:{},
				content:'',
				finish:false
			}
		},
		onShareAppMessage:function(res) {
		    // console.log(this.details.images[0].src?this.details.images[0].src:app.shareImg)
			return {
			  title: this.details.title?this.details.title.substring(0,30)+'...':'德申汇路顶记详情',
			  imageUrl:this.details.images[0].src?this.details.images[0].src:app.shareImg,
			  path: '/pagesMy/LuDingJiDetails/LuDingJiDetails?id='+this.id
			}
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.id = e.id			
			this.getData()
		},
		methods: {
			MyInfo(id){
				uni.navigateTo({
					url:'/pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			vote(){
				if(uni.getStorageSync('userId')){
					Dialog.confirm({
					  title: '提示',
					  message: '每个项目对同一个项目只能投票一次，您确定投给您所选的项目？'
					}).then(() => {
						this.details.vote_status = false
						this.details.vote++
						this.$api.LuDingJiVote({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							id:this.details.id
						}).then(res=>{
							if(res.data.code=="1094"){
								uni.showToast({
								    title: '投票成功',
								    duration: 1000,
									icon:'none'
								});
								uni.setStorageSync('ludingji',this.details.id)
							}
							
						})
					}).catch(() => {
					  // on cancel
					});
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			phone(){
				if(uni.getStorageSync('userId')){
					uni.makePhoneCall({
						phoneNumber:this.details.username
					})
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			getData(){
				this.$api.LuDetails({
					token: uni.getStorageSync("token") || '',
					user_id: uni.getStorageSync("userId") || '',
					id:this.id
				}).then(res=>{
					uni.hideLoading();
					this.details = res.data.data
					this.content = res.data.data.content.replace(/\width: 471px/gi, 'width:100%').replace(/\<img/gi, '<img style="width:100%;height:auto"')
					this.finish = true
				})
			}
		}
	}
</script>

<style>
	@import url("./LuDingJiDetails.css");
</style>
