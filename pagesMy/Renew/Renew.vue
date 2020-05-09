<template>
	<view style="background: rgb(246, 246, 246);">
		<!-- 头部 -->
		<view class="wraphead re">
			<!-- 个人信息 -->
			<view class="flex" style="margin-bottom: 20px;">
				<view class="headimg">
					<image :src="info.avatar?info.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>

				<view class="headcontent">
					<view class="name">{{info.nickname}}</view>
					<view class="job" v-if="info.job">{{info.job}}</view>
					<view class="job" v-else>暂无职位</view>
					<view class="company" v-if="info.company">{{info.company}}</view>
					<view class="company" v-else>暂无公司</view>
					<view class="time">会员有效期至：{{(info.vip_ended_at || '').split(' ')[0].split('-')[0]}}年{{(info.vip_ended_at|| '').split(' ')[0].split('-')[1]}}月{{(info.vip_ended_at|| '').split(' ')[0].split('-')[2]}}日</view>
				</view>
			</view>
			<!-- 选择年份 -->
			<view class="flex align-center">
				<view class="chooseTime">
					选择续费时间:
				</view>
				<view class="flex align-center justify-between flex1">
					<view v-for="(item,index) in year" :key="index" class="chooseItem" :class="{ac:index==n}" @click.stop="tab(index)">
						{{item}}
					</view>
				</view>
				
			</view>
			<!-- 其他年份 -->
			<view class="flex justify-between align-center" v-if="n==3" style="margin-top: 20px;">
				<input type="number" placeholder="自定义时间（只能输入正整数）" class="flex1 ipt" v-model.trim="number" @input="ipt">  <text class="nian">年</text>
			</view>
		</view>
		<!-- 图片 -->
		<view class="">
			<image src="https://web.detion.com/static/img/pic6.jpg" lazy-load="true" class="imga" mode="widthFix"></image>
		</view>
		
		<!-- 悬浮充值 -->
		<view class="fix flex">
			<view class="left">
				<text>{{money}}</text><text style="font-size: 14px;color: rgb(0, 0, 0);margin-left: 5px;">元/年</text>
			</view>
			<view class="right" @click="pay">
				续费会员
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				year: ['1年', '2年', '3年', '其他'],
				info:{},
				money:'',
				number:null,
				n:0
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			pay(){
				// 年份到时候用n判断下，然后支付成功 把vip存上 1 ，跳到my页面
				if(this.n==0||this.n==1||this.n==2){
					uni.showLoading({
					    title: '加载中',
						mask:"true"
					});
					var that = this
					uni.login({
					  provider: 'weixin',
					  success: function (loginRes) {
						that.wxcode = loginRes.code
						if(loginRes.errMsg ==="login:ok"){
							that.$api.Payway({
								user_id: uni.getStorageSync("userId"),
								pay_way:'wxpaymini',
								year: that.n+1,
								code:that.wxcode
							}).then(res1=>{
								uni.hideLoading();
								if(res1.data.code=='200'){
									uni.requestPayment({
									    provider: 'wxpay',
									    timeStamp: res1.data.data.timeStamp,
									    nonceStr: res1.data.data.nonceStr,
									    package: res1.data.data.package,
									    signType: res1.data.data.signType,
									    paySign: res1.data.data.paySign,
									    success: function (res) {
											uni.showToast({
											    title: '续费成功',
											    duration: 2000,
												icon:'none'
											});
											uni.setStorageSync("isVip",1)
											setTimeout(()=>{
												uni.switchTab({
												    url: '/pages/index/index'
												});
											},1000)
									    },
									    fail: function (err) {
									        uni.showToast({
									            title: '支付失败',
									            duration: 2000,
									        	icon:'none'
									        });
									    }
									});
								}else if(res1.data.code=='1099'){
									uni.showToast({
									    title: '注册会员需要实名认证',
									    duration: 2000,
										icon:'none'
									});
									setTimeout(function() {
										uni.reLaunch({
											url:'/pages/PersonalIdcard/PersonalIdcard'
										}); // 完善信息
									}, 1000);
								}
							})
						}
					  }
					});
				}else{
					if(this.number>3){
						uni.showLoading({
						    title: '加载中',
							mask:"true"
						});
						var that = this
						uni.login({
						  provider: 'weixin',
						  success: function (loginRes) {
							that.wxcode = loginRes.code
							if(loginRes.errMsg ==="login:ok"){
								that.$api.Payway({
									user_id: uni.getStorageSync("userId"),
									pay_way:'wxpaymini',
									year: that.number,
									code:that.wxcode
								}).then(res1=>{
									uni.hideLoading();
									if(res1.data.code=='200'){
										uni.requestPayment({
										    provider: 'wxpay',
										    timeStamp: res1.data.data.timeStamp,
										    nonceStr: res1.data.data.nonceStr,
										    package: res1.data.data.package,
										    signType: res1.data.data.signType,
										    paySign: res1.data.data.paySign,
										    success: function (res) {
												uni.showToast({
												    title: '续费成功',
												    duration: 2000,
													icon:'none'
												});
												uni.setStorageSync("isVip",1)
												setTimeout(()=>{
													uni.switchTab({
													    url: '/pages/index/index'
													});
												},1000)
										    },
										    fail: function (err) {
										        uni.showToast({
										            title: '支付失败',
										            duration: 2000,
										        	icon:'none'
										        });
										    }
										});
									}else if(res1.data.code=='1099'){
										uni.showToast({
										    title: '注册会员需要实名认证',
										    duration: 2000,
											icon:'none'
										});
										setTimeout(function() {
											uni.reLaunch({
												url:'/pages/PersonalIdcard/PersonalIdcard'
											}); // 完善信息
										}, 1000);
									}
								})
							}
						  }
						});
					}else{
						uni.showToast({
						    title: '请输入续费时长并且时间大于3年',
						    mask: "true",
							icon:'none'
						});
					}
				}
			},
			ipt(e){
				setTimeout(() => { this.number = this.number.replace(/\D/g,'') }, 0)
				//    console.log(e)
			},
			tab(index){
				this.n = index
				// this.number = index+1
			},
			getData(){
				this.$api.MyselfIndex({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.info = res.data.data
					this.$api.get_money_v2({
						year: 1,
						user_id: uni.getStorageSync("userId")
					}).then(res=>{
						this.money = res.data.data.amount
					})
				})
			}
		}
	}
</script>

<style>
	@import url("./Renew.css");
</style>
