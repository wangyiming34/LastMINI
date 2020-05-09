<template>
	<view class="wrap" style="padding-bottom: 100px;background-color:#061f46;;" >
		 <view class="" style="width: 100%;">
		 	<image src="https://detions.oss-accelerate.aliyuncs.com/web/137083/pay.png" lazy-load="true"  mode="widthFix"></image>
		 </view>
		 
		 <view class="pay-fixed">
			 <view class="pay-bianhao flex align-center">
			 	<view class="new-border-right pay-referrer">
			 		推荐人
			 	</view>
				<input type="text" placeholder="例如:C1" placeholder-style="color:#ccc;font-size:14px" v-model.trim="referrer" :disabled="show"/>
			 </view>
			 <view class="pay-btn flex" @click="pay">
			 	<text>{{number}}</text><text>元/年</text><text style="color: #4C2F00;font-size: 20px;margin-left: 8px;">开通VIP</text>
			 </view>
		 </view>
		 <van-dialog id="van-dialog" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				referrer:'',
				number:1000,
				wxcode:'',
				letter:'',
				no:'',
				show:false
			}
		},
		onShow() {
		  if (uni.getStorageSync('setInfo') === 1) {
		  } else {
			uni.showToast({
			    title: '注册会员需要实名认证',
			    duration: 2000,
				icon:'none'
			});
			setTimeout(function() {
				uni.reLaunch({
					url:'../../pages/PersonalIdcard/PersonalIdcard'
				}); // 完善信息
			}, 1000);
			
		  }
		  
		  this.getMoney()
		  this.referrer1()
		},
		methods: {
			referrer1(){
				this.$api.referrer({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
				}).then(res=>{
					if(res.data.code=="200"){
						this.show = true
						if(res.data.data.type==1||res.data.data.type==2){
							this.letter = 'C'
						}else if(res.data.data.type==3){
							this.letter = 'G'
						}else if(res.data.data.type==4){
							this.letter = 'E'
						}else if(res.data.data.type==5){
							this.letter = 'T'
						}else if(res.data.data.type==6){
							this.letter = 'V'
						}else if(res.data.data.type==7){
							this.letter = 'B'
						}
						this.$nextTick(function(){
							this.referrer = this.letter + res.data.data.no
						})
					}
					
				})
			},
			getMoney(){
				this.$api.get_money_v2({
					user_id: uni.getStorageSync("userId"),
					year:1	
				}).then(res=>{
					if(res.data.code === '200'){
						// console.log(res)
						this.number = res.data.data.amount
					}
					
				})
			},
			pay(){
				// 支付成功别忘了把 vip改成1
				if(this.referrer){
					uni.showLoading({
					    title: '加载中',
						mask:"true"
					});
					this.$api.AddReferrer({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						referrer:this.referrer
					}).then(res=>{
						if(res.data.code === '200'){
							var that = this
							uni.login({
							  provider: 'weixin',
							  success: function (loginRes) {
								that.wxcode = loginRes.code
								if(loginRes.errMsg ==="login:ok"){
									that.$api.Payway({
										user_id: uni.getStorageSync("userId"),
										pay_way:'wxpaymini',
										year: 1,
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
													uni.setStorageSync("isVip",1)
											        uni.reLaunch({
											        	url:'../../pagesMy/PaySuccess/PaySuccess'
											        })
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
						}
					})
					
				}else{
					uni.showToast({
					    title: '请填写推荐人',
					    duration: 2000,
						icon:'none'
					});
				}
			}
			
		}
	}
</script>

<style>
	@import url("./pay.css");
</style>
