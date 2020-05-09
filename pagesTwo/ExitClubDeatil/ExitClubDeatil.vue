<template>
	<view style="overflow: auto;">
		<view class="audit" v-if="status==0">
			<view class="auditImg">
				<image src="../../static/img/user_icon.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="title">
				您的退出申请已提交会长审核，审核周期为5个工作日，到期后自动通过审核。
			</view>
			<view class="indexBtn" @click="goClub">
				返回俱乐部首页
			</view>
		</view>
		<view class="" v-if="status==3">
			<view class="auditImg" style="margin: 40px auto 20px;">
				<image src="../../static/img/user_icon.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="title" style="padding: 0 100upx;">
				您当前俱乐部会长对您进行挽留,  您是否继续退出俱乐部 ?
			</view>
			<view class="flex justify-between" style="padding: 0 20px;">
				<view class="btn btn1" @click="stay">
					留下
				</view>
				<view class="btn btn2" @click="exit">
					退出
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				status:0,
				detailId:''
			}
		},
		onLoad(e) {
			// console.log(e)
			this.id = e.id
			this.getData()
		},
		methods: {
			exit(){
				this.$api.remove_club_out({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.detailId
				}).then(res=>{
					uni.reLaunch({
						url:'../../pagesTwo/Club/Club'
					})
				})
			},
			stay(){
				this.$api.remove_club_stay({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.detailId
				}).then(res=>{
					// console.log(res)
					uni.reLaunch({
						url:'../../pagesTwo/Club/Club'
					})
				})
			},
			goClub(){
				uni.navigateTo({
					url:'../../pagesTwo/Club/Club'
				})
			},
			getData(){
				this.$api.club_login_out_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					club_id:this.id
				}).then(res=>{
					// console.log(res)
					this.detailId = res.data.data.id
					this.status = res.data.data.status
				})
			}
		}
	}
</script>

<style>
	@import url("./ExitClubDeatil.css");
</style>
