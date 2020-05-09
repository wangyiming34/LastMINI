<template>
	<view class="wrap1">
		<view class="for-wrap">
			<view v-for="(item,index) in list" :key="index" class="fo">
				<view class="price">
					交易金额<text>￥</text>{{item.amount}}
				</view>
				<view class="time">
					交易时间：{{item.paid_at}}
				</view>
				<view class="order">
					交易单号：{{item.orderid}}
				</view>
			</view> 
			
		</view>
		
		
		<view class="refund" @click="goDown">
			申请退款
		</view>
		
		<view class="gotoTop">
			<view class="gotoTop-send"  @click="Issue">
				<view style="font-size: 15px;">
					发票
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
		onLoad() {
			this.getData()
		},
		methods: {
			Issue(){
				uni.navigateTo({
					url:'../../pagesThree/PayInvoice/PayInvoice'
				})
			},
			goDown(){
				uni.navigateTo({
					url:'../../pagesMy/DownLoad/DownLoad'
				})
			},
			getData(){
				this.$api.pay_record({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					
				}).then(res=>{
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./PaymentHistory.css");
</style>
