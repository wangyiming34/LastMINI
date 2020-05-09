<template>
	<view class="wrap">
		<view class="NoticeDetails">
			<view class="title">
				{{detail.title}}
			</view>
			<view class="description">
				{{detail.description}}
			</view>
			<view class="flex justify-between align-center">
				<view class="NoticeDetails-text">
					<van-icon name="browsing-history-o"  size="16px"/>
					<view style="margin-left: 5px;">{{detail.click}}</view>
				</view>
				<view class="NoticeDetails-text">
					<van-icon name="underway-o" size="16px" />
					<view style="margin-left: 5px;">{{(detail.created_at || '').split(' ')[0]}}</view>
				</view>
			</view>
			
			<rich-text :nodes="content" type = 'node' style="margin-top: 10px;" class="con"></rich-text>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {},
				content:null
			}
		},
		onLoad(e) {
			// console.log(e.id)
			this.getData(e.id)
		},
		methods: {
			getData(id){
				this.$api.DetionNoticeDetails({
					user_id:uni.getStorageSync('userId'),
					token: uni.getStorageSync('token'),
					id:id
				}).then(res=>{
					if (res.data.code === '200') {
						// console.log(res)
						  this.detail = res.data.data
						  // 富文本的img宽度替换
						  this.content = res.data.data.content.replace(/\width: 471px/gi, 'width:100%').replace(/\<img/gi, '<img style="width:100%;height:auto"')
						  // console.log(this.content)
						} else if (res.data.code === '1010') {
						  uni.clearStorageSync()
						  uni.showToast({
						      title: '登录过期，请重新登录',
						      duration: 2000,
							  icon:'none'
						  });
						  uni.reLaunch({
						  	url: '../../pages/login/login'
						  })
						}
				})
			}
		},
		filters: {
					/**
					 * 处理富文本里的图片宽度自适应
					 * 1.去掉img标签里的style、width、height属性
					 * 2.img标签添加style属性：max-width:100%;height:auto
					 * 3.修改所有style里的width属性为max-width:100%
					 * 4.去掉<br/>标签
					 * @param html
					 * @returns {void|string|*}
					 */
					formatRichText (html) { //控制小程序中图片大小
					    let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
					        match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
					        match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
					        match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
					        return match;
					    });
					    newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
					        match = match.replace(/width:[^;]+;/gi, 'max-width:100%;').replace(/width:[^;]+;/gi, 'max-width:100%;');
					        return match;
					    });
					    newContent = newContent.replace(/<br[^>]*\/>/gi, '');
					    newContent = newContent.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:inline-block;margin:10rpx auto;"');
					    return newContent;
					}	
				}
		
	}
</script>

<style>
	@import url("./NoticeDetails.css");
</style>
