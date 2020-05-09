<template>
	<view v-show="isFinish" class="wrap1 setting">
	   <navigator url="../ChangePassword/ChangePassword" hover-class="none">
		<view class="password mar-b" >
			<view>
				密码修改
			</view>
			<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
		</view>
	  </navigator>
		<!-- 手机 -->
		<view class="phone mar-b">
		  <navigator :url="'../ChangePhone/ChangePhone?oldPhone='+info.username" hover-class="none">
			<view class="password border-bottom1">
				<view >
					手机绑定
				</view>
				<view class="flex align-center">
					<view >
						{{info.username}}
					</view>
					<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
				</view>
			</view>
		 </navigator>
			<view class="password border-bottom1">
				<view>
					是否在主页显示手机号码
				</view>
				<van-switch size="16px" :checked="checked1" @change="onChange1" />
			</view>
		 <navigator url="../ChangeWechat/ChangeWechat" hover-class="none">
			<view class="password border-bottom1">
				<view >
					微信绑定
				</view>
				<view class="flex align-center ">
					<view  v-if="info.wechat_no">
						{{info.wechat_no}}
					</view>
					<view v-else>
						未绑定
					</view>
					<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
				</view>
			</view>
		  </navigator>
			<view class="password">
				<view >
					是否在主页显示微信号码
				</view>
				<van-switch size="16px" :checked="checked2" @change="onChange2" />
			</view>
			
		</view>
		<!-- 俱乐部 -->
		<view class="club">
			
			<view class="password border-bottom1" @click="exitClub">
				<view >
					退出俱乐部
				</view>
				<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
			</view>
		    <navigator url="../AboutUs/AboutUs" hover-class="none">
				<view class="password border-bottom1">
					<view >
						关于我们
					</view>
					
					<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
				</view>
			</navigator>
			<navigator url="../Feedback/Feedback" hover-class="none">
				<view class="password">
					<view >
						反馈于建议
					</view>
					<van-icon name="arrow" size="16px" color="rgba(153,152,153,1)"/>
				</view>
			</navigator>
		</view>
		
		<view class="exit" @click="exit">
			退出登录
		</view>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		
		data() {
			return {
				info: {},
				isFinish: false,
				checked1:false,
				checked2:true
			}
		},
		onShow() {
			uni.showLoading({
			    title: '加载中'
			});
			this.getData()
		},
		methods: {
			// 推出俱乐部
			exitClub(){
				if(uni.getStorageSync('isJoin')=='1'){
					uni.navigateTo({
						url:'../../pagesTwo/ExitClubList/ExitClubList'
					})
				}else{
					uni.showToast({
					    title: '您还没有加入俱乐部',
					    mask: "true",
						icon:'none'
					});
				}
				
			},
			// 退出
			exit () {
				Dialog.confirm({
				  title: '提示',
				  message: '确定要退出登录吗？'
				}).then(() => {
				  uni.clearStorageSync()
				  uni.reLaunch({
				  	url: '../../pages/login/login'
				  })
				}).catch(() => {
				  // on cancel
				});
			     
			    },
			// 开关
			onChange1(e) {
				this.checked1 = e.detail
			     this.$api.ShowPhone({
			            token: uni.getStorageSync("token"),
			            user_id: uni.getStorageSync("userId")
				  }).then(res => {
					if (res.data.code === '200') {
					  this.getData()
					}
				  })
			  },
			onChange2(e) {
				this.checked2 = e.detail 
				this.$api.ShowWechat({
				       token: uni.getStorageSync("token"),
				       user_id: uni.getStorageSync("userId")
				 }).then(res => {
					if (res.data.code === '200') {
					  this.getData()
					}
				 })
			  },
			// 获取个人设置信息
			getData () {
			      this.$api.MyselfSetDefaultMobileWechat({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId")
			      }).then(res => {
					  
			        this.info = res.data.data
					// console.log(typeof res.data.data.is_show_mobile)
					if(res.data.data.is_show_mobile===0){
						this.checked1 = false
					}else if(res.data.data.is_show_mobile===1){
						this.checked1 = true
					}
					
					if(res.data.data.is_show_wechat===0){
						this.checked2 = false
					}else if(res.data.data.is_show_wechat===1){
						this.checked2 = true
					}
			        this.isFinish = true
					uni.hideLoading();
			      })
			 },
		}
	}
</script>

<style>
	@import url("./Setting.css");
</style>
