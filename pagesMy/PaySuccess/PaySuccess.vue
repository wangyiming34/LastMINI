<template>
	<view class="content scroll pt0">
	    <view class="success_con">
	      <view class="head flex align-center justify-center">
	        <image src="https://web.detion.com/static/img/icon40.png" alt="" style="width: 30px;height: 30px;">
	        <view class="text">缴费成功</view>
	      </view>
	      <view class="tips">恭喜您成为德申国际商务社交平台的会友</view>
	      <view class="service_con">
	        <view class="service_title flex align-center justify-center">
	          <image src="https://web.detion.com/static/img/icon41.png" alt="">
	          <view>您的专属客服顾问</view>
	          <image src="https://web.detion.com/static/img/icon41.png" alt="" class="rotate">
	        </view>
	        <image :src="code" alt="" class="code" @click="pre">
	        <view class="text">扫描二维码或搜索微信</view>
	        <view class="tel flex align-center justify-center">
	          <view class="phone">{{tel}}</view>
	          <view class="copy tag-read"  @click="copy">复制</view>
	        </view>
	      </view>
	      <view class="service_title flex align-center justify-center" style="margin-top: 5px">
	        <image src="https://web.detion.com/static/img/icon41.png" alt="" style="width: 10px;height: 12px;">
	        <view style="width: 80px">会员权益</view>
	        <image src="https://web.detion.com/static/img/icon41.png" alt="" class="rotate" style="width: 10px;height: 12px;">
	      </view>
	      <view class="update_text" style="margin-top: 0;padding: 0 20px;" >
	        <view class="detail flex align-start">
	          <view class="num number">一、</view>
	          <view class="num text flex_1">填写收货地址，平台赠送专属德申徽章和精美礼品</view>
	        </view>
	        <view class="detail flex align-start">
	          <view class="num number">二、</view>
	          <view class="num text flex_1">专属德申客服为您贴心服务</view>
	        </view>
	        <view class="detail flex align-start">
	          <view class="num number">三、</view>
	          <view class="num text flex_1">加入德申汇正式会员群中，与全球企业家进行近距离的交流和沟通</view>
	        </view>
	        <view class="detail flex align-start">
	          <view class="num number">四、</view>
	          <view class="num text flex_1" style="color: #064DC5" @click="pic">查看更多会员权益>></view>
	        </view>
	      </view>
	      <view class="edit_btn" @click="address">填写收获地址</view>
	    </view>
		
		<!-- 未支付遮罩 -->
		<view class="tanImg" v-if="is_pay" :animation="animationData" >
			<view class="ab" style="top: 90px;left: 65px;">
				尊敬的{{nickname}}先生/女士:
			</view>
			<image src="https://web.detion.com/static/img/letter.png" @click="start"></image>
			<!-- <view class="close" @click="close"></view>
			<view class="go" @click="pay"></view> -->
		</view>
		<view class="tanchuceng" v-if="is_pay">	
		</view>		
		<!-- 未支付弹出支付框end -->
	  </view>
</template>

<script>
	export default {
		data() {
			return {
				is_pay:true,
				code: '',
			    tel: '',
			    show_code: false, // 二维码弹窗
			    show_letter: false, // 展示信
			    show: false,
			    nickname: '',
				animationData: {}, //自定义动画
			}
		},
		onShow() {
			this.$api.MyselfIndex({
				token: uni.getStorageSync("token"),
				user_id: uni.getStorageSync("userId"),
				
			}).then(res=>{
				console.log(res)
				this.nickname = res.data.data.nickname
			})
			// 动态创建遮罩特效
			var animation = uni.createAnimation({
				  duration: 300,
				  timingFunction: 'linear',
				})			
				this.animation = animation			
				animation.translateY(-500).step()			
				this.animationData = animation.export()
				setTimeout(function() {
				  animation.translateY(0).step()
				  this.animationData = animation.export()
				}.bind(this), 300)
		},
		onLoad() {
			this.getData()
		},
		methods: {
			start(){
				this.is_pay = false
			},
			address(){
				uni.navigateTo({
					url:'../../pagesMy/PayStep/PayStep'
				})
			},
			pic(){
				uni.navigateTo({
					url:'../../pagesMy/view/view?url='+ "https://web.detion.com/VipDetail"
				})
			},
			copy(){
				uni.setClipboardData({
				    data:String(this.tel),
				    success: function (res) {
				        uni.getClipboardData({
							success: function(res) {
								// console.log(res)
								uni.showToast({
									title: '已复制到剪贴板'
								});
							}
						});
				    }
				});
			},
			// 预览二维码
			pre(){
				uni.previewImage({
					urls: [this.code],
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							// console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							// console.log(err.errMsg);
						}
					}
				});
			},
			// 获取二维码
			getData(){
				this.$api.service_er_mobile({
					
				}).then(res=>{
					this.tel = res.data.data.mobile
					this.code = res.data.data.er
				})
			}
		}
	}
</script>

<style>
	@import url("./PaySuccess.css");
	/* @import url("../../pages/index/index.css"); */
</style>
