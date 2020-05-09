<template>
	<view>
		<view style="margin:20px auto;width: 670upx;height: 360upx;background-color: #649fd5;border-radius: 10px;" @click="go1">
			<image src="https://web.detion.com/static/image/resource/project_2.png" lazy-load="true"  mode="aspectFill"></image>
		</view>
		<view style="margin:0 auto;width: 670upx;height: 360upx;background-color: #ff787f;border-radius: 10px;" @click="go2">
			<image src="https://web.detion.com/static/image/resource/project_1.png" lazy-load="true"  mode="aspectFill"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			go1(){
				uni.navigateTo({
					url:'../../pagesMy/FindProject/FindProject'
				})
			},
			go2(){
				uni.navigateTo({
					url:'../../pagesMy/FindMoney/FindMoney'
				})
			}
			
		}
	}
</script>

<style>

</style>
