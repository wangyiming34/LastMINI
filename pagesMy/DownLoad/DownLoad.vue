<template>
	<view style="height: 100%;width: 100%;">
		<view style="position: relative;width: 100%;height: 100%;" class="download">
		  <image src="https://web.detion.com/static/img/download.png" style="width: 100%; height: 100%;"></image>
		  <view class="btn" v-if="isAndroid">
			<image src="https://web.detion.com/static/img/btn1.png" @click="ios"></image>
			<image src="https://web.detion.com/static/img/btn3.png" @click="android"></image>
		  </view>
		  <view class="btn" v-else-if="isiOS">
			  
			<image src="https://web.detion.com/static/img/btn2.png" @click="ios"></image>
			<image src="https://web.detion.com/static/img/btn4.png" @click="android"></image>
		  </view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isAndroid: false,
				isiOS: false
			}
		},
		onShow() {
			var _this = this
			uni.getSystemInfo({
			    success: function (res) {
					console.log(res)
					// console.log(res.platform);
			  //       console.log(typeof res.platform);
					var platform = res.platform
					if(platform=='android'){
						_this.isAndroid = true
					}else if(platform=='ios'){
						_this.isiOS = true
					}
			    }
			 });
			
		},
		methods: {
			android () {
			  // 安卓下载
			  uni.navigateTo({
			  	url:"../view/view?url=https://51gsc.com/app/X5n5"
			  })
			  // window.location.href = 'https://www.pgyer.com/YOzH'
			},
			ios () {
			  // ios下载
			  uni.navigateTo({
			  	url:"../view/view?url=https://apps.apple.com/cn/app/%E5%BE%B7%E7%94%B3%E6%B1%87/id1464872512"
			  })
			}
		}
	}
</script>

<style>
.download .btn{
  position: absolute;
  width: 78%;
  height: 260upx;
  left: 11%;
  bottom:18%;
  z-index: 100;
}
.download .btn image{
  display: block;
  margin-bottom: 20px;
  width: 100%;
  height: 85upx;
}

</style>
