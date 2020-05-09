<template>
	<view class="wrap1 aaa">
		<view class="" v-if="list.length>0">
			<view v-for="(item,index) in list" :key="index" class="aaafor flex justify-between align-center" @click="go(item.id)">
				<view class="flex1 cccc">
					<view class="abc">
						<text style="margin-right: 10px;">{{item.type=="1"?'纸质发票':'电子发票'}}</text>
						<text>发票金额￥{{item.invoice_money}}</text>
					</view>
					<view class="flex align-center bbc">
						<van-icon name="clock-o" style="margin-right: 4px;" size="16px"/>
						<view class="">
							{{item.created_at.split(' ')[0]}}
						</view>
					</view>
				</view>
				<view class="flex align-center ccc">
					<view class="ddd">
						{{item.state=="APPLY"?'申请中':item.state=="FINISHED"?'开票完成':item.state=="REFUNDED"?'开票驳回':''}}
					</view>
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
		
		<view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
			<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				<image src="https://web.detion.com/static/img/empty_history.png" lazy-load="true"  mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无历史记录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[
					{
						id: 34,
						type: "1",                                  //开票方式:1=纸质发票,2=电子发票
						invoice_money: "1000.00",
						created_at: "2019-05-17 11:03:01",
						state: "APPLY"							  //状态:APPLY=申请中,FINISHED=完成,REFUNDED=驳回
					},
					{
						id: 35,
						type: "2",
						invoice_money: "1000.00",
						created_at: "2019-05-17 11:03:12",
						state: "APPLY"
					},
					{
						id: 36,
						type: "1",
						invoice_money: "0.01",
						created_at: "2019-05-21 14:49:57",
						state: "FINISHED"
					},
					{
						id: 37,
						type: "1",
						invoice_money: "0.01",
						created_at: "2019-05-21 14:56:59",
						state: "REFUNDED"
					}
				]
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			go(id){
				uni.navigateTo({
				    url: '../../pagesThree/InvoiceDetail/InvoiceDetail?id='+id
				});
			},
			getData(){
				this.$api.invoice_history_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.list = res.data.data
				})
			}
		}
	}
</script>

<style>
	@import url("./InvoiceHistory.css");
</style>
