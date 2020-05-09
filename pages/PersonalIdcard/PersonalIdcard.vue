<template>
	<view class="content"> 
	     <view class="personal_con" style="padding-top: 50px">
	       <view @click="login" style="position: absolute;left: 0;top:0;font-size: 14px;line-height: 40px;padding: 0 3%;text-decoration: underline;color: #064DC5;text-align: right">已有账号去登录></view>
	       <view class="infoCon infoConNew" style="margin: 0 auto;width: 90%">
			 <view style="font-size:44upx;font-weight:500;color:rgba(51,51,51,1);">
			   国内用户认证
			 </view>
	         <view class="text flex align-center justify-between">
	           <label for="name">姓&emsp;&emsp;名</label>
	           <input type="text" placeholder="请填写" id="name" v-model.trim="nickname" style="text-align: right;">
	         </view>
	         <view class="text flex align-center justify-between">
	           <label for="id">身份证号</label>
	           <input type="text" placeholder="请填写" id="id" v-model.trim="idcard" style="text-align: right;">
	         </view>
	         <view class="text flex align-center justify-between">
	           <label for="detail">详细地址</label>
			   <picker mode = 'region' @change="pickercity">
				   <view class="flex align-center justify-between">
						<input type="text" placeholder="点击选择" id="detail" v-model.trim="address" disabled="" style="text-align: right;">
						<van-icon name="arrow" color="#CCCCCC" size="12px"/>
				   </view>
				  
			   </picker>
	         </view>
	       </view>
	       <view class="btn1">
			 <view class="" @click="next">
			 	完成
			 </view>
	       </view>
		   <view class="btn2">
				 <view id="haiwai" @click="foreign">
					<view class="first">
						海外及中国港澳台认证
					</view>
					<view class="two">
						Overseas, Hong Kong, Macao and Taiwan
					</view>
				 </view>
		   </view>
	     </view>
	   </view>
</template>

<script>
	export default {
		data() {
			return {
				 nickname: '',
				 idcard: '',
			     address: ''
			}
		},
		methods: {
				foreign(){
					this.$api.register_applies_status({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId")
					}).then(res=>{
						if(res.data.code === '1023'){
							uni.navigateTo({
								url:'../../pagesMy/ForeignCard/ForeignCard'
							})
						}
						if(res.data.code === '1099'){
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon:'none'
							});
						}
						if(res.data.code === '1022'){
							uni.setStorageSync("setInfo",1)
							uni.showToast({
							    title: res.data.msg,
							    duration: 2000,
								icon:'none'
							});
							setTimeout(function() {
								uni.navigateBack({
									delta:1
								})
							}, 1000);
							
						}
						
						if(res.data.code === '1021'||res.data.code === '1019'){
							uni.navigateTo({
								url:'../../pagesMy/ForeignCardDetail/ForeignCardDetail'
							})
						}
					})
					
					
				},
				// 选择城市
				pickercity(e){
					this.address = e.detail.value[0].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔/g, '') + ' ' +e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
				},
			    next () {
			      if (!this.nickname) {
					  uni.showToast({
					      title: '请输入姓名',
					      duration: 1000,
						  icon:"none"
					  });
			       
			      } else if (!this.idcard) {
					  uni.showToast({
					      title: '请输入身份证号',
					      duration: 1000,
					  	  icon:"none"
					  });
			   
			      } else if (!this.address) {
					  uni.showToast({
					      title: '请输入详细地址',
					      duration: 1000,
					  	  icon:"none"
					  });
			      } else {
					  uni.showLoading({
					      title: '提交中...'
					  });
			    
			        this.$api.UserAddUserInfo({
			          token: uni.getStorageSync('token'),
			          user_id: uni.getStorageSync('userId'),
			          nickname: this.nickname, // 昵称
			          idcard: this.idcard, // 身份证号
			          politics: '其他', // 政治面貌
			          country: '中国', // 国家
			          avatar: 'https://web.detion.com/static/img/logo_icon.png',
			          address: this.address, // 地址
			          education: '其他' // 文化程度
			        }).then(res => {
			          uni.hideLoading();
			          if (res.data.code === '200') { // 完善提交后跳转资源
			            
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
						uni.setStorageSync("setInfo",1)
					    uni.switchTab({
					        url: '/pages/index/index'
					    });
			            
			          } else if (res.data.code === '1010') {
						uni.clearStorageSync()
			            uni.reLaunch({
			                url: '../login/login'
			            });
						uni.showToast({
							title:'登录过期，请重新登录',
							icon:"none"
						})
			            
			          } else {
			            uni.showToast({
			            	title:res.data.msg,
			            	icon:"none"
			            })
			          }
			        })
			      }
			    },
			    login () {
					// 清除缓存并且跳到首页
			        uni.clearStorageSync()
					uni.reLaunch({
						url: '../login/login'
					});
			    }
			
		}
	}
</script>

<style>
	@import url("index.css");
</style>
