<template>
	<view>
		<view class="" v-if="show"> 
			<wm-poster imgSrc="https://web.detion.com/static/img/invite.jpg" QrSrc="https://detions.oss-accelerate.aliyuncs.com//wxa2eeaf66a51d1ed0.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.n5JZRn6P250bc8a21f31528b658b9364a27bc72b667a.jpg" :Referrer="name"  TitleColor="#2063ff" @success="suc"></wm-poster>
		</view>
	    <view class="" v-if="!show" @click="pre">
	    	<image :src="src" mode="widthFix"></image>
	    </view>
	</view>
</template>

<script>
	import wmPoster from "@/components/wm-poster/wm-poster.vue"
	export default {
		components: {wmPoster},
		data() {
			return {
				name:'从一名',
				show:true,
				src:''
			}
		},
		onLoad() {
			this.$api.get_user_info({
				user_id: uni.getStorageSync("userId")
			}).then(res=>{
				this.name = res.data.data.nickname
			})
		},
		methods: {
			pre(){
				// console.log(123)
				uni.previewImage({
						urls: [this.src],
						longPressActions: {
							itemList: ['发送给朋友', '保存图片', '收藏'],
							success: function(data) {
								console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
							},
							fail: function(err) {
								console.log(err.errMsg);
							}
						}
					});
			},
			suc(e){
				// console.log(e.tempFilePath)
				this.src = e.tempFilePath
				this.show = false
				// console.log(this.src)
			}
		}
	}
</script>

<style>

</style>
