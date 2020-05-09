<template>
	<view style="overflow: hidden;">
		<view class="" v-if="type==0">
			<view class="" style="width: 220upx;height: 220upx;margin: 80upx auto 36upx;">
				<image src="https://web.detion.com/static/image/information/suc.png" mode=""></image>
			</view>
			
			<view class="" style="text-align: center;font-size:40upx;font-weight:400;color:rgba(102,102,102,1);line-height:60upx;">
				发布成功
			</view>
			
			<view class="" style="width:390upx;font-size:30upx;font-weight:400;color:rgba(153,153,153,1);line-height:42upx;margin: 0 auto 264upx;text-align: center;">
				用户服务中心将尽快完成审核
				请耐心等待
			</view>
			<view class="" style="width:550upx;height:90upx;background:rgba(212,45,37,1);border-radius:72upx;text-align: center;margin: 0 auto 30upx;font-size:34upx;font-weight:400;color:rgba(255,255,255,1);line-height:90upx;" @click.stop="look">
				查看其他服务商
			</view>
			<view class="" style="width:550upx;height:90upx;background:rgba(255,255,255,1);border-radius:72upx;border:2upx solid rgba(212,45,37,1);margin: 0 auto;font-size:34upx;font-weight:400;color:rgba(212,45,37,1);line-height:86upx;text-align: center;" @click.stop="again">
				再次上传
			</view>
		</view>
		<view class="" v-if="type==1">
			<view class="" style="width: 220upx;height: 220upx;margin: 80upx auto 36upx;">
				<image src="https://web.detion.com/static/image/club/fail.png" mode=""></image>
			</view>
			
			<view class="" style="text-align: center;font-size:40upx;font-weight:400;color:rgba(102,102,102,1);line-height:60upx;margin-bottom: 19upx;">
				审核失败
			</view>
			
			<view class="" style="width:570upx;font-size:30upx;font-weight:400;color:rgba(153,153,153,1);line-height:42upx;margin: 0 auto 264upx;text-align: center;background:rgba(250,250,250,1);padding: 19upx 55upx;">
				未通过原因为{{reason}}
			</view>
			<view class="" style="width:550upx;height:90upx;background:rgba(212,45,37,1);border-radius:72upx;text-align: center;margin: 0 auto 30upx;font-size:34upx;font-weight:400;color:rgba(255,255,255,1);line-height:90upx;" @click.stop="UploadAgain">
				重新上传
			</view>
			<view class="" style="width:550upx;height:90upx;background:rgba(255,255,255,1);border-radius:72upx;border:2upx solid rgba(212,45,37,1);margin: 0 auto;font-size:34upx;font-weight:400;color:rgba(212,45,37,1);line-height:86upx;text-align: center;" @click.stop="look">
				查看其他服务商
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'',
				id:'',
				reason:''
			}
		},
		onLoad(e) {
			// 0是发布成功过来的，1是违规了
			this.type = e.type
			// 违规的id
			this.id = e.id
			this.reason = e.reason
		},
		methods: {
			UploadAgain(){
				uni.navigateTo({
					url:'/pagesFour/ServiceEdit/ServiceEdit?status=100&id=' + this.id
				})
			},
			look(){
				uni.switchTab({
					url:'/pages/service/service'
				})
			},
			again(){
				uni.redirectTo({
					url:'/pagesFour/ServiceEdit/ServiceEdit'
				})
			}
		}
	}
</script>

<style>

</style>
