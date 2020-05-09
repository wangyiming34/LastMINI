<template>
	<view class='SmallStretchStatus-body'>
	      <!-- 图片 -->
	        <view style="
	        width:79px;
	        height:79px;
	        margin:0 auto;
	        margin-bottom:18px;
			color: rgba(6,77,197,1);
	        ">
	          <van-icon name="checked" size="50px" style="margin-top: 100upx;"/>
	        </view>
	      <!-- 文字 -->
	        <view style="
	        text-align:center;
	        height:30px;
	        font-size:20px;
	        font-weight:400;
	        color:rgba(102,102,102,1);
	        line-height:30px;
	        margin-bottom:5px
	        ">
	          上传成功
	        </view>
	
	        <view style="
	        margin: 15px auto;
			margin-top: 150px;
	        width:73%;
	        height:44px;
	        background:rgba(6,77,197,1);
	        border-radius:22px;
	        text-align:center;
	        line-height:44px;
	        font-size:17px;
	        font-weight:400;
	        color:rgba(255,255,255,1);
	        "  @click="abc">
	          返回榜单
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
			upload(){
				uni.reLaunch({
					url:'../StretchIndexSend/StretchIndexSend'
				})
				
			},
			abc(){
				uni.navigateTo({
					url:'../TradingVolume/TradingVolume'
				})
			}
			
		}
	}
</script>

<style>

</style>
