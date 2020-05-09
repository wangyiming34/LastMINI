<template>
	<view class="wrap1">
		<view class="uni-list">
			<radio-group @change="radioChange" style="transform:scale(0.95);">
				<label class="uni-list-cell uni-list-cell-pd flex align-center" v-for="(item, index) in list" :key="index">
					<view>
						<radio :checked="index === current" color="#004DC5" :value="item.id"/>
					</view>
					<view class="fo">
						
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
				</label>
			</radio-group>
		</view>
		<view class="publicSend" @click="send">
			 开具发票
		</view> 
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				current: 0,
				order_id:'',
				price:''
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			send(){
				uni.navigateTo({
					url:'../../pagesThree/ApplyInvoice/ApplyInvoice?id='+this.order_id + '&price='+this.price
				})
			},
			radioChange(e){
				this.order_id = e.detail.value
				for(var val of this.list){
					if(val.id==e.detail.value){
						this.price = val.amount
					}
				}
				// console.log(this.price)
			},
			getData(){
				this.$api.invoice_order_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					
				}).then(res=>{
					this.list = res.data.data
					this.order_id = this.list[0].id
					this.price = this.list[0].amount
					// console.log(this.order_id)
				})
			}
		}
	}
</script>

<style>
	@import url("./InvoiceList.css");
	@import url("../PaymentHistory/PaymentHistory.css");
</style>
