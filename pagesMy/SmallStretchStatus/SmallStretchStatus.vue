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
	          已上架
	        </view>
	
	        <view style="
	        text-align:center;
	        height:21px;
	        font-size:15px;
	        font-weight:400;
	        color:rgba(153,153,153,1);
	        line-height:21px;
	        margin-bottom:250px
	        ">
	          可在“发布历史中”中查看
	        </view>
			<view style="
			margin: 15px auto;
			width:73%;
			height:44px;
			background:rgba(6,77,197,1);
			border-radius:22px;
			text-align:center;
			line-height:44px;
			font-size:17px;
			font-weight:400;
			color:rgba(255,255,255,1);
			" @click="upload">
				继续上传
			</view>
	        <view style="
	         width:73%;
	         height:44px;
	         background:white;
	         border-radius:22px;
	         margin:0 auto;
	         text-align:center;
	         line-height:44px;
	         font-size:17px;
	         font-weight:400;
	         color:rgba(6,77,197,1);
			 border-radius:72upx;
			 border:1px solid rgba(221,221,221,1);
	        "  @click="abc">
	          返回小申展首页
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
				// uni.navigateTo({
				// 	url:'../StretchIndexSend/StretchIndexSend'
				// })
				
			},
			abc(){
				uni.navigateTo({
					url:'../../pagesTwo/SmallStretchNew/SmallStretchNew'
				})
			}
			
		}
	}
</script>

<style>

</style>
