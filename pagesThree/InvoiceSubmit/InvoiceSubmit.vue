<template>
	<view class="wrap1" style="padding-top: 169upx;">
		<van-icon name="success" color="#666666" size="25px" style="margin-bottom: 25px;"/>
		<view class="aa">
			发票信息已提交
		</view>
		<view class="bb" @click="history">
			开票历史
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
			history(){
				uni.redirectTo({
				    url: '../../pagesThree/InvoiceHistory/InvoiceHistory'
				});
			}
		}
	}
</script>

<style>
	@import url("./InvoiceSubmit.css");
</style>
