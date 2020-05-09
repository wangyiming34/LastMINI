<template>
	<view class="wrap1">
		<view v-for="(item,index) in list" :key="index" class="fo">
			<view class="flex justify-between">
				<view class="nickname">
					{{item.nickname}}
				</view>
				<view class="username" @click="phone(item.username)">
					{{item.username}}
				</view>
			</view>
			
			<view class="name">
				{{item.name}}
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
		onLoad() {
			this.getData()
		},
		methods: {
			phone(tel){
				uni.makePhoneCall({
					phoneNumber:tel
				})
			},
			getData(){
				this.$api.area_manager({
				}).then(res=>{
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./DistrictAssistant.css");
</style>
