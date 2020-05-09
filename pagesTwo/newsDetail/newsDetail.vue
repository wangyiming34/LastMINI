<template>
	<view class="wrap" style="padding-bottom: 44px;">
		<view class="NoticeDetails">
			<view class="title" style="padding: 0;">
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
		
		<!-- 评论 -->
		<view class="comment" style="margin-bottom: 0;">
			<view class="title" style="font-size:17px;font-weight:400;color:rgba(51,51,51,1);padding: 0 20px;">
				全部{{detail.comments}}条评论
			</view>
			<view class="content5 flex " v-for="(item,index) in comments" :key="index" style="padding-left:20px;padding-right: 20px;">
				<view class="img re" @click="MyInfo(item.user_id)">
					<image :src="item.avatar" mode="aspectFill" lazy-load="true" ></image>
					<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
				</view>
				
				<view class="" style="flex: 1;">
					<view class="flex justify-between" style="
					font-size: 26upx;
					line-height: 48upx;
					color: #939393;
					margin-bottom: 10upx;">
						<view style=" overflow: hidden;text-overflow: ellipsis; white-space: nowrap; width: 400upx;" @click="MyInfo(item.user_id)">
							{{item.nickname}} 
							<text v-show="item.company && item.job">• {{item.job}} {{item.company}}</text>
						</view>
						
					</view>
					
					<view >
						<view style="font-size: 14px;color: #333;line-height: 20px;display: block;text-align: justify;word-break: break-all;margin-bottom: 5px;">
							{{item.content}}
						</view>
					</view>
					
					<view class="flex justify-between">
						<view style="font-size:12px;font-weight:400;color:rgba(153,153,153,1);line-height:16px;flex: 1;">
							{{item.created_at.split(' ')[0].split('-')[1]}}.{{item.created_at.split(' ')[0].split('-')[2]}}
							
							{{item.created_at.split(' ')[1].split(':')[0]}}:{{item.created_at.split(' ')[1].split(':')[1]}}
						</view>
						
					</view>
				</view>
			</view>
		</view>
		<!-- 下方发布内容 -->
		<view class="issue align-center" style="z-index: 10000;">
			<input type="text" placeholder='请输入您的想法吧' v-model.trim="thought" />
			<view class="btn" @click="send">
				发布
			</view>
		</view>
		
	</view>
</template>

<script>
	var app = getApp().globalData
	export default {
		data() {
			return {
				detail: {},
				content:null,
				comments:[],
				thought:'',
				id:''
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.detail.title?this.detail.title.substring(0,30)+'...':'新闻详情',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/newsDetail/newsDetail?id='+this.id
			}
		},
		onLoad(e) {
			// console.log(e.id)
			this.id = e.id
			this.getData(e.id)
			this.getCom(e.id)
		},
		methods: {
			// 跳转个人主页
			MyInfo(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'../../pagesMy/MyInfo/MyInfo?id='+id
					})
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
				
			},
			// 发表评论
			send () {
				if(uni.getStorageSync('userId')){
					if (this.thought.length && this.thought.trim().length) {
					  this.$api.d_n_comment({
					   token: uni.getStorageSync("token"),
					   user_id: uni.getStorageSync("userId"),
					   id: this.id,
					   content: this.thought
					  }).then(res => {
					    if (res.data.code === '200') {
					      uni.showToast({
					      		title: res.data.msg,
					      		duration: 2000,
					      		icon:'none'
					      });
					      this.thought = ''
					      this.getCom()
											this.getData()
											setTimeout(function() {
												uni.pageScrollTo({
													scrollTop:1000000
												})
											}, 300);
											
					    } else if (res.data.code === '1073') {
					      uni.showToast({
													title: res.data.msg,
													duration: 2000,
													icon:'none'
					      });
					    }
					  })
					  // }
					} else {
										   uni.showToast({
												title: '评论内容不可为空',
												duration: 2000,
												icon:'none'
										   });
					}
				}else{
					uni.clearStorageSync()
					uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}, 1000);
				}
			      
			},
			// 评论列表
			getCom(id){
				this.$api.detion_news_comments({
					user_id:uni.getStorageSync('userId')||'',
					token: uni.getStorageSync('token')||'',
					id:this.id
				}).then(res=>{
					if (res.data.code === '200') {
						// console.log(res)
						  this.comments = res.data.data
						 
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
			},
			getData(id){
				this.$api.detion_news_detail({
					// user_id:uni.getStorageSync('userId'),
					// token: uni.getStorageSync('token'),
					id:this.id
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
	@import url("../../pagesMy/NoticeDetails/NoticeDetails.css");
	@import url("../../pagesMy/InfoDetail/InfoDetail.css");
</style>
