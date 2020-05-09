<template>
	<view class="wrap1">
		<view class="proDetail">
			<view class="title">
				{{detail.title}}
			</view>
			<view class="description">
				{{detail.description}}
			</view>
			<view class="flex justify-between align-center iicon">
				<view class="flex">
					<van-icon name="clock-o" />
					<text class="textmar">{{detail.created_at.split(' ')[0]}}</text>
				</view>
				<view class="flex">
					<van-icon name="eye-o" />
					<text class="textmar">{{detail.click}}</text>
				</view>
			</view>
			<view class="content">
				{{detail.content}}
			</view>
			<view class="" style="margin-bottom: 10px;">
				<image :src="detail.url_image" lazy-load="true" mode="widthFix"></image>
			</view>
			
			<view class="flex align-center" style="margin-bottom: 30px;">
				<view class="blueShu">
					
				</view>
				<view style="font-size: 20px;line-height: 24px;color: #333;font-weight: bold;margin-left: 5px;">
					相关企业
				</view>
			</view>
			
			<view class="flex justify-between" style="margin-bottom: 20px;" @click="aaa">
				<view class="flex abb align-center">
					<view style="width: 30px;height: 30px;border-radius: 4px;">
						<image :src="detail.company_data.url_image" lazy-load="true" mode="aspectFill" style="border-radius: 4px;"></image>
					</view>
					<view class="" style="margin-left: 10px;">
						<view class="name">
							{{detail.company_data.company_name}}
						</view>
						<view class="indu">
							<text>{{detail.company_data.industry_p}}</text>
							<text style="margin-left: 5px;">{{detail.company_data.industry}}</text>
						</view>
					</view>
				</view>
				<van-icon name="arrow" color="#999999"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:'',
				type:'',
				detail:''
			}
		},
		onLoad(e) {
			this.id = e.id
			this.type = e.type
			this.getData()
		},
		methods: {
			aaa(){
				uni.navigateTo({
					url:'../../pagesTwo/MyBusiness/MyBusiness?id='+this.detail.company_id
				})
			},
			getData(){
				this.$api.pro_ser_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					id:this.id,
					type:this.type
				}).then(res=>{
					console.log(res)
					this.detail = res.data.data
				})
				
			}
		}
	}
</script>

<style>
	@import url("./MyProduct.css");
</style>
