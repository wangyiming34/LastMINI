<template>
	<view style="padding-top: 44px;overflow: hidden;">
		<view class="title">
			发票
		</view>
		<view v-for="(item,index) in list" :key="index" class="for border-bottom-new2 flex justify-between" @click="go(index)">
			<view class="name">
				{{item}}
			</view>
			<van-icon name="arrow" color="#ccc"/>
		</view>
		
		<view class="flex align-center shuomingwrap">
			<view class="blueShu">
				
			</view>
			<view class="shuoming">
				发票说明
			</view>
		</view>
		
		<view class="notewrap">
			<view class="note">1. 您可以申请开具电子发票或纸质发票</view>
			<view class="note">2. 申请开具电子发票，请您准确填写邮箱地址</view>
			<view class="note">3. 电子发票将于7个工作日内发送至您填写的电子邮箱</view>
			<view class="note">4. 纸质发票申请处理后，将于10个工作日为您寄出</view>
			<view class="note">5. 纸质发票邮费自理</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['开具发票','开票记录']
			}
		},
		methods: {
			go(index){
				if(index==0){
					uni.navigateTo({
						url:'../../pagesThree/InvoiceList/InvoiceList'
					})
				}else{
					uni.navigateTo({
						url:'../../pagesThree/InvoiceHistory/InvoiceHistory'
					})
				}
			}
		}
	}
</script>

<style>
	@import url("./PayInvoice.css");
</style>
