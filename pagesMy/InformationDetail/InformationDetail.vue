<template>
	<view class='SmallStretchPvw' style="padding-bottom: 35px;background-color: white;">
	  
	          <!-- 顶部title -->
	          <view class="title" style="padding: 20px 16px 10px;">
	          	{{Detail.title}}
	          </view>
			  <!-- 可投资金和定位 -->
			  <view class="flex" style="padding: 0px 16px">
			  	<view class="flex align-center dingwei">
			  		<van-icon name="location-o" />
			  		<view style="margin-left: 3px;">
			  			{{Detail.cityname}}
			  		</view>
			  	</view>
				<view class="flex align-center dingwei" style="margin-left: 15px;color: #064DC5;">
					<van-icon name="gold-coin-o" />
					<view style="margin-left: 3px;">
						{{Detail.op_type===1?'可投资金':'所需资金'}}{{Detail.money}}
					</view>
				</view>
			  </view>
			  <!-- 时间和收藏数量 -->
			  <view  style="padding: 20px 16px 0;font-size:14px;font-weight:400;color:rgba(153,153,153,1);" class="flex justify-between align-center" >
				<view class="flex align-center">
					<view class="" >
						{{(Detail.created_at || '').split(' ')[0]}}
					</view>
					<view style="margin-left: 30px;">
						{{Detail.click}}阅读
					</view>
				</view>
				<view class="flex justify-between align-center">
					<view>
					  <van-icon name="star-o" v-if="vote_status===false" size="13px"/>
					  <van-icon name="star" color="#064DC5" v-else size="13px"/>
					</view>
					  
					<text style="font-size:14px;font-weight:400;color:rgba(153,153,153,1);margin-left: 5px;">{{like}}</text>
				</view>
			  </view>
	          <!-- 中间公司等 -->
	
			  <view style="padding: 20px 16px;" @click.stop="MyInfo(Detail.user_id)">
				  <view class="SmallStretchPvw-company flex justify-between">
						<view style="width: 40px;height: 40px;" class="re">
							<image :src="Detail.avatar?Detail.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga imgaa" mode="aspectFill"></image>
							<head-logo :type="Detail.type" :v_type="Detail.add_v_type"></head-logo>
						</view>
						
						<view style="width: 460upx;align-self: center;">
							<view style="font-size:16px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 0px;" class="flex align-center">
								<view class="newName">
									{{Detail.nickname}}
								</view>
								<level :type="Detail.type" :v_type="Detail.add_v_type" :vip_level="Detail.vip_level"></level>
							</view>
							<view style="font-size:14px;font-weight:300;color:rgba(102,102,102,1); margin-bottom: 0px;" class="flex align-center justify-between">
								<view class="">
									<text v-if="Detail.company">{{Detail.company}}</text>
									<text v-if="Detail.job" style="margin: 0 5px;"> I </text>
									<text v-if="Detail.job">{{Detail.job}}</text>
								</view>
							</view>
							<view v-for="(item,index) in Detail.club_data" :key="index" v-if="Detail.club_data.length>0" class="addclub">
								<text>{{item.name}}</text>
								<text style="margin: 0 5px;"> I </text>
								<text >{{item.dutyname}}</text>
							</view>
						</view>
						
						<van-icon name="arrow" color="rgba(102,102,102,1);"/>
				  </view> 
			  </view>

			  <!-- 标签 -->
			  <view class="flex align-center" style="padding: 0 16px;margin-bottom: 10px;">
				  <view style="" class="blueShu">
				  	<!-- <image src="../../static/img/blue.png" lazy-load="true" class="imga" mode="aspectFill"></image> -->
				  </view>
				  <view style="margin-left: 5px;font-size:17px;font-weight:500;color:rgba(68,68,68,1);">
				  	项目标签
				  </view>
			  </view>
	  
			  <view style="padding: 0 ;margin-bottom: 10px; flex-wrap: wrap;" class="flex" >
			  	<view v-for="(item,index) in Detail.label" :key="index" class="lable">
			  		{{item}}
			  	</view>
			  </view>
	        
	          <!-- 下面简介和内容 -->
	          <view class="SmallStretchPvw-bottom">
	            <view class="SmallStretchPvw-bottom-info">
	              <view class="SmallStretchPvw-bottom-title re">
	                <view class="SmallStretchPvw-bottom-yellow1">详细信息</view>
	                <view class="SmallStretchPvw-bottom-yellow"></view>
	              </view>
	            </view>
	            <!-- 图片 -->
	            <view class="SmallStretchPvw-bottom-img" >
	                <view  class="SmallStretchPvw-bottom-img-box" v-for="(img, index) in Detail.images"  :key="index">
						<image :src="img.url_image" lazy-load="true" class="imga" mode="widthFix"></image>
	                </view>
	            </view>
	  
	            <!-- 文字 -->
	            <view class="xiangxixinxineirong" v-if="Detail.content">
	               {{Detail.content}}
	            </view>
	          </view>
	  
	          <!-- 最后的发送 -->
	        
	          <view class="SmallStretchPvw-bottom-cccline">
	  
	          </view>
	          <!-- ----关注和咨询---- -->
	          <view class="flex align-center" style="position: fixed;bottom: 0;left: 0;z-index: 10; background-color: white;width: 100%;padding: 10px;16px">
				  <view style="width: 80px;" @click="vote">
					 <van-icon :name="vote_status===false?'star-o':'star'" :color="vote_status===false?'#black':'#0065D0'" size="18px"/>
				  	 <view class="SmallStretchPvw-vote" >{{vote_status===false?'收藏':'已收藏'}}</view>
				  </view>
				  
	              <view class="SmallStretchPvw-consult" @click="phone" style="flex: 1;">联系会员</view>
	          </view>
			  <van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				show: false,
				vote_status: false,
				tel: '',
				like: 0,
				id: '',
				Detail: '',
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.Detail.title?this.Detail.title.substring(0,30)+'...':'德申汇项目详情',
			  imageUrl:this.Detail.images[0].url_image?this.Detail.images[0].url_image:app.shareImg,
			  path: '/pagesMy/InformationDetail/InformationDetail?id='+this.id
			}

		},
		onLoad(e) {
			this.id = e.id
			this.getData()
		},
		methods: {
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
			// 关注
			vote () {
			      if (uni.getStorageSync("userId")) {
						if (this.vote_status) {
						  this.vote_status = false
						  this.like--
						} else {
						  this.vote_status = true
						  this.like++
						}
			        this.$api.Opportunity_vote({
			          user_id: uni.getStorageSync("userId"),
			          token: uni.getStorageSync("token"),
			          id: this.id
			        }).then(res => {
			          if (res.data.code === '1039') {
			            uni.showToast({
			                title: '取消收藏',
			                duration: 2000,
			            	icon:'none'
			            });
			          } else if (res.data.code === '1038') {
			            
						uni.showToast({
						    title: '收藏成功',
						    duration: 2000,
							icon:'none'
						});
			          }
			        })
			      } else {
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
			// 电话咨询
			phone () {
				if(uni.getStorageSync('userId')){
					if (uni.getStorageSync("isVip") == 0) {
							Dialog.confirm({
							  title: '提示',
							  message: '您还不是VIP用户',
							  confirmButtonText:'去支付'
							}).then(() => {
							  // on confirm
							}).catch(() => {
							  // on cancel
							});
					} else if (uni.getStorageSync("isVip") == 1) {
							Dialog.confirm({
							  title: '电话',
							  message: '当前商家电话为' + this.tel + '，是否立即呼叫？',
							  confirmButtonText:'我要拨打'
							}).then(() => {
								uni.makePhoneCall({
									phoneNumber: this.tel
								});
							}).catch(() => {
							  // on cancel
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
			getData(){
				this.$api.Opportunity_detail({
					token: uni.getStorageSync("token")|| '',
					user_id: uni.getStorageSync("userId") || '',
					id:this.id
				}).then(res=>{
					if (res.data.code === '200') {
					  this.Detail = res.data.data
					  this.vote_status = res.data.data.vote_status
					  this.like = res.data.data.like
					  this.tel = res.data.data.username
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
		}
	}
</script>

<style>
	@import url("./InformationDetail.css");
</style>
