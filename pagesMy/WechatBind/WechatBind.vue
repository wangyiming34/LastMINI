<template>
	<view class="ChangePassword" style="padding-top: 100px;">
		<view class="flex new-b re tel align-center">
			<view class="phone flex align-center" @click="phone">
				<view class="" style="margin-right: 8upx;">
					+{{num}}
				</view>
				<van-icon name="arrow-down" />
			</view>
			<input type="number"  maxlength="12" minlength="6"  placeholder="请输入手机号码" v-model="phoneNum" style="flex: 1;" placeholder-style="color:rgba(223,223,223,1)"/>
		</view>
		
		
		<view class="flex new-b re tel align-center justify-between">
			<input type="number" placeholder="请输入验证码" v-model="code" placeholder-style="color:rgba(223,223,223,1)" />
			<get-code @click.native="getCode" ref="get_code" class="code"/>
		</view>
		
		<view class="exit" @click="ok" style="height: 48px;line-height: 48px;">
			确认
		</view>

	</view>
</template>

<script>
	import GetCode from '../../common/getCode.vue'
	const app = getApp().globalData
	export default {
		components: {
			GetCode,
		},
		data() {
			return {
				  num:86,
				  phoneNum: '', // 手机号码
				  code: '', // 验证码
				  oldPhone:0,
				  isSetPass:0

			}
		},
		onLoad(e) {
		},
		onShow() {
			this.num = app.num
		},
		methods: {
			ok(){
				if (this.phoneNum !== '' && this.code !== '') {
					if (this.phoneNum.length < 6) {
						uni.showToast({
						    title:'手机号不能小于6位' ,
						    icon: 'none',
						    mask: true
						});	
						  return
						}
						
					this.$api.bind_mobile({
						mobile: this.phoneNum,
						captcha: this.code,
						unionid: uni.getStorageSync('unionid'),
						pid: Number(uni.getStorageSync('pid')) ? Number(uni.getStorageSync('pid')) : '',
					}).then(res=>{
						uni.showToast({
							title:res.data.msg ,
							icon: 'none',
							mask: true
						});
						if(res.data.code==='200'){
							uni.removeStorageSync('unionid')
							this.isSetPass = res.data.data.is_set_pass // 是否设置过密码
							// console.log(res)
							// 存 token
							uni.setStorageSync("token",res.data.data.userinfo.token)
							// 存是不是vip
							uni.setStorageSync("isVip",res.data.data.userinfo.is_vip)
							// 存userid
							uni.setStorageSync("userId",res.data.data.userinfo.user_id)
							// 存时间
							uni.setStorageSync("expiretime",res.data.data.userinfo.expiretime)
							// 存vip到期时间
							uni.setStorageSync("vipEnd",res.data.data.userinfo.vip_ended_at)
							// 存是不是加入了俱乐部
							uni.setStorageSync("isJoin",res.data.data.is_join)
							// 存是不是设置了个人信息
							uni.setStorageSync("setInfo",res.data.data.is_set_info)
							if (this.isSetPass === 0) {
							        // 未设置密码---去设置密码
							        uni.redirectTo({
							            url:'/pages/setPassword/setPassword?state=0&number=' + this.phoneNum + '&code=0'
							        });
							    } else if (this.isSetPass === 1) {
										if (uni.getStorageSync('path')) {
											// 是正常页面
										  if(uni.getStorageSync('path').indexOf('/pages/information')==-1||uni.getStorageSync('path').indexOf('/pages/index')==-1||uni.getStorageSync('path').indexOf('/pages/service')==-1||uni.getStorageSync('path').indexOf('/pages/my')==-1){
											  uni.reLaunch({
											  	url:uni.getStorageSync('path')
											  })
										  }else{
											  // TabBar界面
											  uni.switchTab({
											  	url:uni.getStorageSync('path')
											  })
										  }
										  this.$nextTick(function(){
										  	uni.removeStorageSync('path')
										  })
										} else {
										  uni.switchTab({
										      url: '/pages/index/index'
										  });
										}
							  }
						}
						
					})
					
					
				}else {
						if (this.phoneNum === '') {
							uni.showToast({
								title:'请输入手机号' ,
								icon: 'none',
								mask: true
							});	
						  
						} else if (this.code === '') {
							uni.showToast({
								title:'请输入验证码' ,
								icon: 'none',
								mask: true
							});	
						
						}
				  }
				
			},
				
			// 获取code
			getCode () {
			      if (this.phoneNum.length && this.phoneNum.trim().length) {
					  
			        if (this.$refs.get_code.msg === '获取验证码') {
			          this.$api.Sms({
			            mobile: this.phoneNum,
			            coucode: this.num,
			            event: 'bind_mobile'
			          }).then(res => {
						  // console.log(res)
			            if (res.data.code === '200') {
			              this.$refs.get_code.startCount()
						  uni.showToast({
						      title:res.data.msg ,
						      icon: 'none',
						      mask: true
						  });	
			            } else {
						  uni.showToast({
						      title:res.data.msg ,
						      icon: 'none',
						      mask: true
						  });	
			            }
			          })
			        }
			      } else {
			        uni.showToast({
			            title: '手机号码不能为空',
			            icon: 'none',
			            mask: true
			        });	
			      }
			    },
			// 跳转选择手机前缀号码
			phone(){
			   uni.navigateTo({
			   	url:"../../pages/phone/phone"
			   })
			}
		}
	}
</script>

<style>
	@import url("../ChangePhone/ChangePhone.css");
</style>
