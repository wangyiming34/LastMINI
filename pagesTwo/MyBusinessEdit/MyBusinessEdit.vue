<template>
	<view style="padding: 0 30upx;">
		<view class="border-bottom-new2 flex justify-between" style="padding: 39upx 0;" @click="edit1">
			<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);">
				编辑我的企业主页
			</view>
			<van-icon name="arrow" />
		</view>
		
		<view class="border-bottom-new2 flex justify-between" style="padding: 39upx 0;" @click="edit2">
			<view style="font-size:17px;font-weight:500;color:rgba(51,51,51,1);">
				编辑企业产品/服务
			</view>
			<van-icon name="arrow" />
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:''
			}
		},
		onLoad(e) {
			this.id = e.id
		},
		methods: {
			// 编辑企业 status=1 是认证完善， status = 0 是重新编辑
			edit1(){
				uni.navigateTo({
					url:"../../pagesTwo/EditEnterpriseIndex/EditEnterpriseIndex?status=0&id="+this.id
				})
			},
			edit2(){
				uni.navigateTo({
					url:"../../pagesTwo/MyBusinessProduct/MyBusinessProduct?id="+this.id
				})
			}
		}
	}
</script>

<style>

</style>
