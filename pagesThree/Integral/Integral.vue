<template>
	<view class="" style="background-color: #FAFAFA;" v-if="finish">
		<view class="head re">
			<view class="shuo ab" @click.stop="explain">
				说明
			</view>
		</view>
		<view class="middle ab">
			<view class="">
				<view class="middle-top flex justify-around">
					<view class="wraptop2" @click.stop="MyInfo(top2.user_id)">
						<view class="topimg">
							<image src="https://web.detion.com/static/img/second.png" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view class="re avatarimg">
							<image :src="top2.avatar" lazy-load="true" class="imga" mode="aspectFill"></image>
							<!-- <view class="no">
								{{top2.type}}{{top2.no}}
							</view> -->
							<vip :type="top2.type" :no="top2.no" class="no"></vip>
						</view>
						<view class="nickname">
							{{top2.nickname}}
						</view>
						<view class="score">
							{{top2.score}}分
						</view>
					</view>
					
					<view class="wraptop1" @click.stop="MyInfo(top1.user_id)">
						<view class="topimg">
							<image src="https://web.detion.com/static/img/first.png" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view class="re avatarimg1">
							<image :src="top1.avatar" lazy-load="true" class="imga" mode="aspectFill"></image>
							<vip :type="top1.type" :no="top1.no" class="no"></vip>
						</view>
						<view class="nickname">
							{{top1.nickname}}
						</view>
						<view class="score">
							{{top1.score}}分
						</view>
					</view>
					
					<view class="wraptop2" @click.stop="MyInfo(top3.user_id)">
						<view class="topimg">
							<image src="https://web.detion.com/static/img/third.png" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view class="re avatarimg">
							<image :src="top3.avatar" lazy-load="true" class="imga" mode="aspectFill"></image>
							<vip :type="top3.type" :no="top3.no" class="no"></vip>
						</view>
						<view class="nickname">
							{{top3.nickname}}
						</view>
						<view class="score">
							{{top3.score}}分
						</view>
					</view>
				</view>
				<!-- 下面的排行 -->
				<view class="middle-bottom">
					<view v-for="(item,index) in list" :key="index" v-show="index>2" class="middle-for" :class="{forActive:item.user_id==userId}" @click.stop="MyInfo(item.user_id)">
						<view class="forContent flex align-center justify-between border-bottom-new2">
							<view class="flex align-center" style="flex: 1;">
								<view class="numb">
									{{item.top>9?item.top:'0'+item.top}}
								</view>
								<view class="forimg re">
									<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
									<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
								</view>
								<view class="nick">
									<view class="forNickname flex align-center">
										<view class="newName">
											{{item.nickname}}
										</view>
										<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
									</view>
									<vip :type="item.type" :no="item.no" class="forvip"></vip>
								</view>
							</view>
							<view class="forsc">
								{{item.score}}分
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="bot" v-if="myself" @click.stop="MyInfo(myself.user_id)">
			<!-- <view class="middle-for"> -->
				<view class="forContent flex align-center justify-between" style="padding: 15px 0;">
					<view class="flex align-center" style="flex: 1;">
						<view class="numb" style="color: white;">
							{{myself.top>9?myself.top:'0'+myself.top}}
						</view>
						<view class="forimg re">
							<image :src="myself.avatar?myself.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
							<head-logo :type="myself.type" :v_type="myself.add_v_type"></head-logo>
						</view>
						<view class="nick">
							<view class="forNickname flex align-center" style="color: white;">
								<view class="newName">
									{{myself.nickname}}
								</view>
								<level :type="myself.type" :v_type="myself.add_v_type" :vip_level="myself.vip_level"></level>
							</view>
							<vip :type="myself.type" :no="myself.no" class="forvip" style="color: white;" v-if="myself.no!=null&&myself.no!=''"></vip>
						</view>
					</view>
					<view class="forsc" style="color: white;">
						{{myself.score}}分
					</view>
				</view>
			<!-- </view> -->
		</view>
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				myself:'',
				list:[],
				finish:false,
				top1:'',
				top2:'',
				top3:'',
				userId:''
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '积分排行榜',
			  imageUrl:app.shareImg,
			  path: 'pagesThree/Integral/Integral'
			}
		},
		onLoad() {
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			this.userId = uni.getStorageSync('userId')
			this.getData()
		},
		methods: {
			explain(){
				uni.navigateTo({
					url:'../../pagesThree/Explain/Explain'
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			getData(){
				this.$api.credit_top({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					if(res.data.code=="200"){
						this.myself = res.data.data.myself
						this.list = res.data.data.list
						for(var val of this.list){
							if(val.top == 1){
								this.top1 = val
							}else if(val.top == 2){
								this.top2 = val
							}else if(val.top == 3){
								this.top3 = val
							}
						}
						uni.hideLoading();
						this.finish = true
					}
				})
			}
		}
	}
</script>

<style>
	@import url("./Integral.css");
</style>
