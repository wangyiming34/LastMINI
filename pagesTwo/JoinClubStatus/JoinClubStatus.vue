<template>
	<!-- 审核中 -->
	<view style="padding-top: 80px;" v-if="status">
		 <view style="margin: 0 auto;width: 80px;height: 80px;margin-bottom: 18px;">
		 	<image src="../../static/img/user_icon.png" lazy-load="true" class="imga" mode="aspectFill"></image>
		 </view>
		 
		 <view style="font-size:20px;font-weight:400;color:rgba(102,102,102,1);text-align: center;margin-bottom: 5px;">
		 	审核中
		 </view>
		 <view style="font-size:15px;font-weight:400;color:rgba(153,153,153,1);text-align: center;margin-bottom: 170px;">
		 	您已发起加入俱乐部申请，已提交至会长审核，请耐心等待…
		 </view>
		 <view style="margin: 0 auto;width:275px;height:44px;background:rgba(6,77,197,1);border-radius:22px;line-height: 44px;text-align: center;font-size:17px;font-weight:400;color:rgba(255,255,255,1);" @click="goClub">
		 	返回俱乐部首页
		 </view>
	</view>
	<!-- 审核失败 -->
	<view style="padding-top: 80px;" v-else>
		 <view style="margin: 0 auto;width: 80px;height: 80px;margin-bottom: 18px;">
		 	<image src="../../static/img/user_icon.png" lazy-load="true" class="imga" mode="aspectFill"></image>
		 </view>
		 
		 <view style="font-size:20px;font-weight:400;color:rgba(102,102,102,1);text-align: center;margin-bottom: 5px;">
		 	审核驳回
		 </view>
		 <view style="font-size:15px;font-weight:400;color:rgba(153,153,153,1);text-align: center;margin-bottom: 15px;">
		 	您加入俱乐部的申请已被驳回
		 </view>
		 <view style="font-size:15px;font-weight:400;color:rgba(153,153,153,1);text-align: center;margin-bottom: 100px;">
		 	驳回原因：{{reason}}
		 </view>
		 <view style="margin: 0 auto;width:275px;height:44px;background:rgba(6,77,197,1);border-radius:22px;line-height: 44px;text-align: center;font-size:17px;font-weight:400;color:rgba(255,255,255,1);" @click="join">
		 	加入其他俱乐部
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// true是审核中的状态
				status:true,
				reason:'空'
			}
		},
		methods: {
			join(){
				uni.reLaunch({
					url:'../../pagesTwo/JoinClub/JoinClub'
				})
			},
			goClub(){
				uni.navigateTo({
					url:'../../pagesTwo/Club/Club'
				})
				
			},
			// 加入俱乐部判断状态
			joinClub(){
				this.$api.join_club_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					if (res.data.code === '1019' ) { // 审核中
					  this.status = true
					}
					 else if (res.data.code === '1021') { // 审核驳回
					  this.reason = res.data.data.length ? res.data.data : '空'
					  this.status = false
					}
				})
				
			},
		}
	}
</script>

<style>

</style>
