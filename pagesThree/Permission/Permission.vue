<template>
	<view class="wrap1">
		<!-- <view class="Permission flex align-center re" @click="Report" v-if="is_report">
			<view class="PermissionImg">
				<image src="https://web.detion.com/static/image/my/report_icon1.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="border-bottom-new2 title">
				数据报表
			</view>
		</view> -->
		
		<!-- <view class="Permission flex align-center re" @click="ClubAuditList" v-if="is_auth">
			<view class="PermissionImg">
				<image src="https://web.detion.com/static/image/my/report_icon2.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="border-bottom-new2 title re">
				俱乐部申请审批
				<view class="ab red" v-if="auth_num>0">
					{{auth_num}}
				</view>
			</view>
			
		</view> -->
		
		<view class="Permission flex align-center re" v-if="is_fund" @click="FundsApprovalList">
			<view class="PermissionImg">
				<image src="https://web.detion.com/static/image/my/report_icon3.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="border-bottom-new2 title re">
				经费申请审批
				<view class="ab red" v-if="fund_num>0">
					{{fund_num}}
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_auth: false, // 是否显示俱乐部申请（城市会长+张总)
				auth_num:0,
				is_report: false, // 是否显示报表系统 （创始人）
				fund_num: 1, // 经费审批数量
				is_fund: false, // 审批权限
			}
		},
		onShow() {
			this.getAuth()
			this.getFund()
			this.getReport()
		},
		methods: {
			// 经费审批
			FundsApprovalList(){
				uni.navigateTo({
					url:'../../pagesMy/FundsApprovalList/FundsApprovalList'
				})
			},
			// 数据报表
			Report(){
				uni.navigateTo({
					url:'../../pagesThree/Report/Report'
				})
			},
			// 俱乐部审核
			ClubAuditList(){
				uni.navigateTo({
					url:'../../pagesThree/ClubAuditList/ClubAuditList'
				})
			},
			// 报表系统查看权限
			getReport(){
				this.$api.report_auth({
				  user_id: uni.getStorageSync('userId')
				}).then(res => {
					
				    this.is_report = res.data.data
				})
			},
			// 经费审批权限
			getFund () {
			  this.$api.fund_auth({
			    user_id: uni.getStorageSync('userId'),
			    token: uni.getStorageSync('token')
			  }).then(res => {
				  
			    if (res.data.code === '200') {
			        this.fund_num = res.data.data
			        this.is_fund = true
			    } else {
			        this.is_fund = false
			    }
			  })
			},
			// 俱乐部申请审批入口权限及消息数量
			getAuth () {
			  this.$api.check_club_apply_Auth({
			    user_id: uni.getStorageSync('userId'),
			    token: uni.getStorageSync('token')
			  }).then(res => {
				  
			    if (res.data.code === '200') {
					this.auth_num = res.data.data
			        this.is_auth = true
			    } else {
			        this.is_auth = false
			    }
			  })
			},
		}
	}
</script>

<style>
	@import url("./Permission.css");
</style>
