<template>
	<view>
		<view v-for="(item,index) in list" :key="index" class="exitClub heightLine flex">
			
			<view class="exitClubImg">
				<image :src="item.url_image?item.url_image:'../../static/img/logo.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			
			
			<view class="flex1 re exitClubRight">
				<view class="name">
					{{item.name}}
				</view>
				<view class="title">
					<text>创始人：{{item.cdr}}</text>
					<text style="margin: 0 5px;"> I </text>
					<text>现任会长：{{item.nickname}}</text>
				</view>
				
			</view>
			
			
			<view class="re" style="width: 55px;align-self: center;height: 20px;">
				<view class="ab exitbtn" v-if="item.status==2" @click="goReason(item.id)">
					退出
				</view>
				<view class="ab exitbtn2" v-else @click="goStatus(item.id)">
					退出中
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			goStatus(id){
				uni.navigateTo({
					url:'../../pagesTwo/ExitClubDeatil/ExitClubDeatil?id='+id
				})
			},
			goReason(id){
				uni.navigateTo({
					url:'../../pagesTwo/ExitClubReason/ExitClubReason?id='+id
				})
			},
			getData(){
				this.$api.club_login_out_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then((res)=>{
					// console.log(res)
					this.list = res.data.data
				})
			}
			
		}
	}
</script>

<style>
	@import url("./ExitClubList.css");
</style>
