<template>
	<view>
		<view v-for="(item,index) in list" :key="index" style="padding: 18px 3%;font-size: 16px;color: #333;" class="border-bottom-new2 flex justify-between align-center" @click="go(index)">
			<view class="" style="">
				{{item}}
			</view>
			<view class="flex align-center">
				<view class="">
					{{item=='创始会员'?china_gt:item=='全球会员'?other:item=='中国港澳台会员'?T:item=='会员'?china_lt:item=='员工账号'?E:''}}
				</view>
				<van-icon name="arrow" style="margin-left: 6px;" color="#ccc"/>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:['创始会员','全球会员','中国港澳台会员','会员','员工账号'],
				china_gt:0,      //创始会员
				china_lt:0,     //会员
				other:0,     //全球会员
				E: 0,     //员工账号
				T: 0     //中国港澳台会员
			}
		},
		onLoad() {
			this.getData()
		},
		methods: {
			go(index){
				if(index==0){
					uni.navigateTo({
						url:'../../pagesThree/UserReportDetail/UserReportDetail?type=2,1'
					})
				}else if(index==1){
					uni.navigateTo({
						url:'../../pagesThree/UserReportDetail/UserReportDetail?type=3'
					})
				}else if(index==2){
					uni.navigateTo({
						url:'../../pagesThree/UserReportDetail/UserReportDetail?type=5'
					})
				}else if(index==3){
					uni.navigateTo({
						url:'../../pagesThree/UserReportDetail/UserReportDetail?type=2'
					})
				}else{
					uni.navigateTo({
						url:'../../pagesThree/UserReportDetail/UserReportDetail?type=4'
					})
				}
					
			},
			getData(){
				this.$api.user_report({
				}).then(res=>{
					console.log(res)
					this.china_gt = res.data.data.china_gt
					this.china_lt = res.data.data.china_lt
					this.other = res.data.data.other
					this.E = res.data.data.E
					this.T = res.data.data.T
				})
			}
		}
	}
</script>

<style>
	@import url("./UserReport.css");
</style>
