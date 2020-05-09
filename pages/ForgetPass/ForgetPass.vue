<template>
	<view class="content">
	    <view class="loginCon new_loginCon">
	      <view class="login_tips">找回密码</view>
	      <view class="small_tips"></view>
	      <view class="text flex align-center">
	        <view class="location flex align-center" @click="chooseLocation">+<text class="locNum">{{num}}</text><view class="caret"></view></view>
	        <input type="number" v-model="phone"  placeholder="请输入手机号码" class="phoneNum" maxlength="12" minlength="6">
	      </view>
	      <view class="text flex code align-center ">
	        <view class="align-center flex">
	          <input type="number" placeholder="验证码" v-model="code">
	        </view>
	        <get-code @click.native="getCode" ref="get_code"/>
	      </view>
	      <view class="text flex code align-center ">
	        <view class="align-center flex">
	          <input :type="passwordType" v-model="password" placeholder="请输入新密码"
	                 maxlength="20" minlength="6" required="required" class="password">
	        </view>
	        <view style="width: 16px; z-index: 1000; margin-top: -4upx; margin-right: 20upx;">
	          <image :src="passwordType == 'password'?'https://web.detion.com/static/img/hide_pass.png':'https://web.detion.com/static/img/show_pass.png'"  
	               title="" alt="" @click="changeType" class="mimg">
	        </view>
	      </view>
	      <view class="tips" style="font-size: 14px;color:#999;text-align: center;margin-top: 10px">密码长度在6-20位</view>
	      <view class="login_sub" style="margin-top: 100px">
	        <view class="submit" @click="confirm">确认</view>
	      </view>
	    </view>
	  </view>
</template>

<script>
	import GetCode from '../../common/getCode.vue'
	var num = getApp().globalData
	export default {
		components: {
			GetCode,
		},
		data() {
			return {
				num:86,
				password: '',
			    passwordType: 'password', // 密码类型
			    code: '',
			    phone: ''
				
			}
		},
		onShow() {
			this.num  = num.num
		},
		methods: {
			// 确定提交
			confirm () {
				
			      if (this.phone.length && this.phone.trim().length && this.code.length && this.code.trim().length && this.password.length && this.password.trim().length) {
			        this.$api.ForgetPass({
			          mobile: this.phone,
			          captcha: this.code,
			          newpassword: this.password
			        }).then(res => {
			          // 重置后信息
					 
					  uni.showToast({
					  	title:res.data.msg,
						icon:"none"
					  })
			          if (res.data.code === '200') {
			            // this.$router.replace({name: 'Login', params: {id: localStorage.pid ? localStorage.pid : -1}})
						
						uni.reLaunch({
							url: '../login/login'
						})
			          }
			        })
			      } else if (this.phone.length === 0 || this.phone.trim().length === 0) {
					  uni.showToast({
					  	title:'手机号不可为空',
						icon:"none"
					  })		       
			      } else if (this.code.length === 0 || this.code.trim().length === 0) {
					uni.showToast({
						title:'验证码不可为空',
						icon:"none"
					})
			      } else if (this.password.length === 0 || this.password.trim().length === 0) {
					uni.showToast({
						title:'密码不可为空',
						icon:"none"
					})
			      } else if (this.password.length >= 20 && this.password.length < 6) {
					uni.showToast({
						title:'密码长度在6-20位',
						icon:"none"
					})					
			      }
			    },
			// 号码归属地
			chooseLocation(){
				uni.navigateTo({
					url: '../../pages/phone/phone'
				})
			},
			// 改变密码显示隐藏
			changeType () {
			      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
			 },
			// 获取验证码
			getCode () {
			      if (this.phone.length && this.phone.trim().length) {
			        if (this.$refs.get_code.msg === '获取验证码') {
			          this.$api.Sms({
			            mobile: this.phone,
			            coucode: this.num,
			            event: 'forget_pass'
			          }).then(res => {
						  // console.log(res)
			            if (res.data.code === '200') {
			              this.$refs.get_code.startCount()
			            } else {
						  uni.showToast({
						  	title:res.data.msg,
						  	icon:"none"
						  })
			            }
			          })
			        }
			      } else {
					uni.showToast({
						title:'手机号不可为空',
						icon:"none"
					})
			      }
			    },
		}
	}
</script>

<style>
	@import url("ForgetPass.css");
</style>
