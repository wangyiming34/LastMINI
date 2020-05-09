<template>
	<view class="body">
	      <view class="loginCon">
	        <view class="login_tips">设置密码</view>
	        <view class="small_tips"></view>
	        <view class="abc" style="margin-bottom: 0">
	          <input :type="passwordType" v-model="password" placeholder="请输入密码"
	                 maxlength="20" minlength="6" required="required" class="password">
	          <view class="pass_icon">
	            <image :src="passwordType == 'password'?'https://web.detion.com/static/img/hide_pass.png':'https://web.detion.com/static/img/show_pass.png'"
	                 class="hide_icon"
	                 title="" alt="" @click="changeType">
	          </view>
	        </view>
	        <view class="input_tips">
	          <view class="pass_tips">密码长度6-20位</view>
	        </view>
	        <view class="ope"></view>
	        <view class="login_sub">
	          <button type="primary"  class="submit" @click="save">下一步</button>
	        </view>
	      </view>
    </view>
</template>

<script>
	export default {
		data() {
			return {
				 passwordType: 'password', // 密码类型
				 password: '', // 密码
				 state:0,
				 code:0,
				 phoneNumber:0
			}
		},
		onLoad(options) {
			this.state = options.state
			this.code  = options.code
			this.phoneNumber = options.number
			// console.log(options)
		},
		onBackpress(){
			// console.log('login')
		},
		methods: {
			/**
			 * 密码明暗文切换
			 */
			changeType () {
			  this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
			},
			save () {
			      if (this.password.length >= 6 && this.password.length <= 20) {
			        // if (Number(this.state) === 0) { // 未设置过密码
			          this.$api.SetPwd({
			            pass: this.password,
			            token: uni.getStorageSync('token'),
			            user_id:uni.getStorageSync('userId')
			          }).then(res => {
						uni.showToast({
						    title: res.data.msg,
						    duration: 1000,
							icon:"none"
						});
			            if (res.data.code === '200') {
			              // 登录成功设置成功
			              this.login()
			            }
			          })
			        // } else if (Number(this.state) === 1) { // 找回密码  还没做好
			        //   this.$server.UserResetpwd({
			        //     mobile: this.$route.params.number,
			        //     captcha: this.$route.params.code,
			        //     newpassword: this.password
			        //   }).then(res => {
			        //     // 登录失败信息
			        //     this.$toast(res.msg)
			        //     if (res.code === '200') {
			        //       this.login()
			        //     }
			        //   })
			        // }
			      } else if (this.password.length && this.password < 6) {
					  uni.showToast({
					      title: '密码长度最少6位',
					      duration: 1000,
						  icon:"none"
					  });
			        
			      } else if (this.password.length > 20) {
					  uni.showToast({
					      title: '密码长度最大20位',
					      duration: 1000,
						  icon:"none"
					  });
			        
			      } else {
					  uni.showToast({
					      title: '密码不可为空',
					      duration: 1000,
						  icon:"none"
					  });
			      }
			    },
			    login () {
					uni.showLoading({
					    title: '加载中...',
						mask:true
					});
			      // 登录
			      this.$api.UserLogin({
			        account: this.phoneNumber,
			        password: this.password
			      }).then(res => {
			        uni.hideLoading();
					uni.showToast({
					    title: res.data.msg,
					    duration: 1000,
						icon:"none"
					});
					if(res.data.code=="200"){
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
						// uni.switchTab({
						//     url: '/pages/index/index'
						// });
					}
			        
					})
			    }
		
		}
	}
</script>

<style>
 @import url("setPassword.css");
</style>
