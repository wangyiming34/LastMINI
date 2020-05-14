<template>
	<view class='SmallStretchPvw' v-if="finish">
	  
	          <!-- 顶部图片 -->
	          <view class="SmallStretchPvw-img" style="height: 750upx;">
				<image :src="Detail.image?Detail.image:Detail.images[0].url_image" lazy-load="true" class="imga" style="width: 750upx;height: 750upx;"></image>
	          </view>
	          <!-- 中间公司等 -->
	          <view class="SmallStretchPvw-center">
	  
	                <view class="SmallStretchPvw-name">
	                    {{Detail.name}}
	                </view>
	  
	                <view class="SmallStretchPvw-company" id="SmallStretchPvw-company">
	                  <view v-if="Detail.company">公司：{{Detail.company}}</view>
					  
					  <view v-show="Detail.club_data" class="flex"> 
							<view>
                                 会员：
							</view>
							
							<view style="flex:1" class="flex">
								<view>
									{{Detail.nickname}}<text v-show="Detail.club_data[0].name">I</text>
								</view>
								<view style="flex:1;margin-left: 3upx;">
										<view v-for="(item,index) in Detail.club_data" :key="index" >
											<text v-show="item.name" style="margin-left: 0;">{{item.name}}{{item.dutyname}}</text>
										</view>
								</view>
								
							</view>
					  
					  </view>
	                  
	                </view>
	  
	                <view class="SmallStretchPvw-price">
	                  <view>
	                    ¥{{Detail.current_price}}
	                  </view>
	                  <view class="flex align-center">
	                     <view class="re" id="SmallStretchPvw-price-img">
						   <image src="https://web.detion.com/static/images/youhui.png" lazy-load="true"  mode="aspectFill"></image>
	                       <view>{{parseInt(Detail.current_price/Detail.original_price*10*10)/10}}折</view>
	                     </view>
	                  </view>
	                  <view class="SmallStretchPvw-price-like">
	                    <view>
	                      <van-icon name="star-o" v-if="vote_status===false" size="15px"/>
	                      <van-icon name="star" color="#064DC5" v-else size="15px"/>
	                    </view>
	  
	                    <b>{{like}}</b>
	                  </view>
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
					<!-- Detail.image?index>0:index>-1 -->
	                <view  class="SmallStretchPvw-bottom-img-box" v-for="(img, index) in Detail.images"  :key="index" v-show="Detail.image">
						<image :src="img.url_image" lazy-load="true" class="imga" mode="widthFix"></image>
	                </view>
					<view  class="SmallStretchPvw-bottom-img-box" v-for="(img, index) in Detail.images"  :key="index" v-show="!Detail.image">
						<image :src="img.url_image" lazy-load="true" class="imga" mode="widthFix" v-if="index>0"></image>
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
	          <view class="SmallStretchPvw-bottom-vote">
	              <view class="SmallStretchPvw-vote" @click="vote">{{vote_status===false?'关注':'取消关注'}}</view>
	              <view class="SmallStretchPvw-consult" @click="phone">咨询</view>
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
			  myData: [] ,// 为了拿公司等
			  finish:false
				
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.Detail.name?this.Detail.name.substring(0,30)+'...':'德申汇小申展详情',
			  imageUrl:this.Detail.image?this.Detail.image:this.Detail.images[0].url_image,
			  path: '/pagesMy/SmallStretchPvw/SmallStretchPvw?id='+this.id
			}
			
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});			
			this.id = e.id
			this.getSmallStretchDetail()
		},
		methods: {
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
			        this.$api.SmallStretchVote({
			          user_id: uni.getStorageSync("userId"),
			          token: uni.getStorageSync("token"),
			          id: this.id
			        }).then(res => {
			          if (res.data.code === '1039') {
			            uni.showToast({
			                title: '取消关注成功',
			                duration: 2000,
			            	icon:'none'
			            });
			          } else if (res.data.code === '1038') {
			            
						uni.showToast({
						    title: '关注成功',
						    duration: 2000,
							icon:'none'
						});
			          }
			        })
			      } else {
					uni.clearStorageSync()
			        uni.showToast({
			            title: '您还没有登录，请登录',
			            duration: 2000,
			        	  icon:'none'
			        });
					uni.reLaunch({
						url: '../../pages/login/login'
					})
			      }
			    },
			// 电话咨询
			phone () {
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
			   },
			 // 详情
			getSmallStretchDetail () {
			  this.$api.SmallStretchDetail({
				user_id: uni.getStorageSync("userId") || '',
				token: uni.getStorageSync("token") || '',
				id: this.id
			  }).then(res => {
				if (res.data.code === '200') {
				  this.Detail = res.data.data
				  // console.log(this.Detail)
				  this.vote_status = res.data.data.vote_status
				  this.like = res.data.data.like
				  this.tel = res.data.data.mobile
				  uni.hideLoading();
				  this.finish = true
				} else if (res.data.code === '1010') {
				  uni.clearStorageSync()
				  uni.showToast({
				      title: '登录过期，请重新登录',
				      duration: 2000,
				  	  icon:'none'
				  });
				  uni.reLaunch({
				  	url: '/pages/login/login'
				  })
				}
			  })
			},
		}
	}
</script>

<style>
	@import url("./SmallStretchPvw.css");
</style>
