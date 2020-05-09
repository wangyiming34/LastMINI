<template>
	<view class="ChangePassword">
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
		<view class="flex new-b re tel align-center">
			<input type="password"  placeholder="请输入新密码"
                   maxlength="20" minlength="6" required="required" v-model="password" placeholder-style="color:rgba(223,223,223,1)"/>
		</view>
		<view class="exit" @click="ok">
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
				  password: '' // 密码

			}
		},
		onShow() {
			this.num = app.num
		},
		methods: {
			ok(){
				if (this.password !== '' && this.phoneNum !== '' && this.code !== '') {
					if (this.phoneNum.length < 6) {
						uni.showToast({
						    title:'手机号不能小于6位' ,
						    icon: 'none',
						    mask: true
						});	
						  return
						}
						if (this.password.length < 6) {
							uni.showToast({
								title:'密码不能小于6位' ,
								icon: 'none',
								mask: true
							});	
						  return
						}
					this.$api.ChangePassword({
						  mobile: this.phoneNum,
						  captcha: this.code,
						  newpassword: this.password
					}).then(res=>{
						uni.showToast({
							title:res.data.msg ,
							icon: 'none',
							mask: true
						});
						if(res.data.code==='1049'){
							uni.navigateBack();
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
						
						} else if (this.password === '') {
							uni.showToast({
								title:'请输入密码' ,
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
			            event: 'resetpwd'
			          }).then(res => {
						  console.log(res)
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
	@import url("./ChangePassword.css");
</style>
