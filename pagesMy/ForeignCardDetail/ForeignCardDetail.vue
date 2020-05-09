<template>
	<view style="padding-top:70px">
		<view style="font-size: 80px;">
			<van-icon name="clear" v-if="audit" color="#cccccc"/>
			<van-icon name="checked" v-else color="#55aaff"/>
		</view>
		
		<view style="width: 100%;font-size:40upx;font-weight:400;color:rgba(102,102,102,1);"  v-if="audit">
			<view style="width:360upx;text-align: center;margin: 0 auto;line-height:60upx;">
				审核未通过
			</view>
			<view style="width:360upx;text-align: center;margin: 0 auto;line-height:60upx;">
				Audit not approved
			</view>
			
			<view style="width:550upx;height:109upx;background:rgba(249,251,254,1);border-radius:8upx;line-height: 109upx;text-align: center;font-weight:400;color:rgba(102,102,102,1);font-size: 30upx;margin: 0 auto;">
					理由(reason)：{{reason.reply}}
			</view>
		</view>
		<view style="width: 100%;font-size:40upx;font-weight:400;color:rgba(102,102,102,1);" v-else>
			<view style="width:360upx;text-align: center;margin: 0 auto;line-height:60upx;">
				您的认证信息已提交
				请耐心等到审核
			</view>
			<view style="width:360upx;text-align: center;margin: 0 auto;line-height:60upx;">
				Your certification information has been submitted, please wait patiently for the review
			</view>
		</view>
		
		<!-- 返回和重新编辑 -->
		<view style="margin: 50px auto;width:550upx;height:90upx;background:rgba(6,77,197,1);border-radius:72upx;text-align: center;line-height: 90upx;font-weight:400;
color:rgba(255,255,255,1);font-size: 34upx;" v-if="audit" @click="edit">
			重新编辑上传(reedit)
		</view>
		
		<view style="margin: 50px auto;width:550upx;height:90upx;background:rgba(6,77,197,1);border-radius:72upx;text-align: center;line-height: 90upx;font-weight:400;
		color:rgba(255,255,255,1);font-size: 34upx;" v-else @click="back">
			返回(return)
		</view>
		
		<view style="font-size:40upx;font-weight:500;color:rgba(6,77,197,1);text-align: center;" @click="tel">
			联系我们(contact us)
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 审核中，true是审核没通过
				audit:false,
				reason:{}
			}
		},
		onShow() {
			this.getData()
		},
		methods: {
			edit(){
				uni.navigateTo({
					url:'../../pagesMy/ForeignCardEdit/ForeignCardEdit?id='+this.reason.id
				})
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			tel(){
				uni.makePhoneCall({
				    phoneNumber: '15645088075' //仅为示例
				});
			},
			getData(){
				this.$api.register_applies_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
					// user_id:15000
				}).then(res=>{
					if(res.data.code==='1021'){
						this.audit = true
						this.reason = res.data.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
