<template>
	<view class="wrap1" style="padding-bottom: 44px;" v-if="finish">
		<!-- 头部 -->
		<view class="cons">
			<view class="imag re" @click.stop="pre">
				<image :src="info.avatar?info.avatar:'../../static/img/user_icon.png'" lazy-load="true" mode="aspectFill" ></image>
				<head-logo :type="info.type" :v_type="info.add_v_type"></head-logo>
			</view>
			<view class="edit" v-if="isMe" @click="edit">
				编辑
			</view>
		</view>
		<!-- 姓名关注等 -->
		<view class="name line80">
			<view class="flex">
				<view class="flex nametitle" style="padding-left: 190upx;">
					<level :type="info.type" :v_type="info.add_v_type" :vip_level="info.vip_level"></level>
					<view class="titlename">
						{{info.nickname}}
					</view>
					<view v-if="info.no" class="num">
					  <view class="flex aviewgn-center justify-center number">
						  编号:<vip :type="info.type" :no="info.no"></vip>
					  </view>
					</view>
					<view class="num" v-else>
					  <view class="flex aviewgn-center justify-center number">普通用户</view>
					</view>
				</view>
			</view>
			<!-- v-if="info.company" -->
			<view class="company" v-if="info.company" >
				{{info.job}} {{info.company}}
			</view>
		    <view class="info" >
			关注：{{info.GuanZhu}}&emsp;粉丝：{{info.FenSi}}
		    </view>
		</view>
		
		<view class="flex tel justify-around">
		        <view @click="wechat" class="aaaa">
		          <!-- <van-icon name="comment" size="30px" color="rgba(51,51,51,1)"/> -->
				  <image src="https://web.detion.com/static/img/icon21.png" lazy-load="true" class="imga" mode="aspectFill" style="width: 30px;height: 30px;margin: 0 auto;display: block;"></image>
				  <view class="text">
				  	微信
				  </view>
		        </view>
				
				
		        <view @click="phone" class="aaaa">
		          <view v-if="info.is_show_mobile === 0">
		            <image src="https://web.detion.com/static/img/icon20.png" lazy-load="true" class="imga" mode="aspectFill" style="width: 30px;height: 30px;margin: 0 auto;display: block;"></image>
		            <view class="text">联系电话</view>
		          </view>
		          <view v-else-if="info.is_show_mobile === 1">
		              <image src="https://web.detion.com/static/img/icon20.png" lazy-load="true" class="imga" mode="aspectFill" style="width: 30px;height: 30px;margin: 0 auto;display: block;"></image>
		              <view class="text">联系电话</view>
		          </view>
		        </view>
				
		        <view @click="MyInformation" class="aaaa">
				  <image src="https://web.detion.com/static/img/icon22.png" lazy-load="true" class="imga" mode="aspectFill" style="width: 30px;height: 30px;margin: 0 auto;display: block;"></image>
		          <view class="text" v-if="isMe">我的资讯圈</view>
		          <view class="text" v-else>TA的资讯圈</view>
		        </view>
		</view>
		<!-- 俱乐部 -->
		<view class="club">
		      <view class="proTitle border-bottom">俱乐部</view>
		      <view class="job" v-if="club.length">
		        <view v-for="item in club" :key="item.club_id">{{item.name}} {{item.dutyname}}</view>
		      </view>
		      <view class="job" v-else>
		        <view>暂未加入俱乐部</view>
				
		      </view>
		</view>
		<!-- 发布的项目 暂时隐藏-->
		<!-- v-if="number > 0" -->
		<!-- <view class="club" v-if="number > 0">
		      <view class="proTitle border-bottom">发布的项目/机会</view>
		      <view class="con flex align-start"  v-for="(item,index) in first_chance" :key="index" @click.stop="InformationDetail(item.id)">
				
		        <view class="pic flex align-center justify-center">
				  <image :src="item.url_image" lazy-load="true" ></image>
		        </view>
		        <view class="det">
		          <view class="title">{{item.title}}</view>
		          <view class="description">{{item.description}}</view>
		          <view class="date flex align-center">
		            <van-icon name="clock-o" style="margin-right: 5px;"/>{{item.created_at.split(' ')[0]}}</view>
		        </view>
		        <van-icon name="arrow" />
		      </view>
		      <view class="brief_more" v-if="more_list" @click="moreList" style="padding-bottom: 10px">
		        <view v-show="!is_all" class="flex align-center justify-center">展开全部<van-icon name="arrow-down" /></view>
		        <view v-show="is_all" class="flex align-center justify-center">收起全部<van-icon name="arrow-up" /></view>
		      </view>
		</view> -->
		
		<!--企业-->
		<view class="club" style="padding-bottom: 50px" v-if="company.id > 0">
		      <view class="proTitle border-bottom">企业</view>
		      <view class="smallTitle flex align-center" >
				  <image src="https://web.detion.com/static/img/icon24.png" lazy-load="true" class="imga" mode="aspectFill" style="width: 15px;height: 15px;"></image><text>概况</text>
			  </view>
		      <view class="con flex align-start" @click='goCompany'>
		        <view class="pic flex align-center justify-center">
				  <image :src="company.url_image?company.url_image:'https://web.detion.com/static/image/coffee/default.png'" lazy-load="true" mode="aspectFill"></image>
		        </view>
		        <view class="det">
		          <view class="title">{{company.company_name}}</view>
		          <view class="description publish">发布{{company.w_p_count}}个福利商品</view>
		          <view class="description publish">共发布{{company.p_s_count}}个产品/服务</view>
		          <view class="classify flex"><view>{{company.industry_p}}</view><view>{{company.industry}}</view></view>
		        </view>
		        <van-icon name="arrow" />
		      </view>
		      <view class="myShop" @click="toMyShop" v-if="company.shop_url">
		        
				<image src="https://web.detion.com/static/img/shop.png" mode="widthFix" style="display: block"></image>
		        
		      </view>
		      <view class="smallTitle">简介</view>
		      <view class="brief" :class="{'all':isAll}" ref="text" v-show="company">{{company.description?company.description:'暂无简介'}}</view>
		      <view class="brief_more" v-show="isClick" @click="more" style="margin-top: 10px">
		        <view v-show="isAll" class="flex align-center justify-center">展开全部 <van-icon name="arrow-down" /></view>
		        <view v-show="!isAll" class="flex align-center justify-center">收起全部 <van-icon name="arrow-up" /></view>
		      </view>
		</view>
		<view class="LuDingJi-no" v-show="empty" style="overflow: hidden;">
			<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true"  mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂未发布内容
			</view>
		</view>
		<!-- <view class="emptyList flex align-center justify-center" v-show="empty" style="position: relative;height: 180px;margin-top: 8px;padding-bottom: 0">
		      <view class="con">
				<van-icon name="send-gift-o" size="60px"/>
		        <view class="text">暂未发布内容</view>
		      </view>
		</view>	 -->
		<!-- v-if="info.gz_status !== 0" -->
		<view class="flex align-center justify-center star"  @click="concern" v-if="info.gz_status !== 0">
		      <van-icon name="star" size="20px"/>
		      <view class="text1" v-if="info.gz_status === 3 || info.gz_status === 4">关注</view>
		      <view class="text1" v-else-if="info.gz_status === 2">已关注</view>
			  <!-- v-else-if="info.gz_status === 1" -->
		      <view class="text1" v-else-if="info.gz_status === 1">互相关注</view>
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
		        isClick: false, // 是否显示全文
				isAll: false, // 是否展示所有简介
				info: {}, // 个人信息
				club: [], // 俱乐部信息
				company: {}, // 公司信息
				chance: [], // 项目机会列表
				noShop: false, // 是否有商城
				isFinish: false, // 页面是否加载完成
				isMe: false, // 是否是本人
				copyText: false, // 复制的文本
				first_chance: [], // 第一个元素
				more_chance: [], // 除掉第一个机会的剩下
				more_list: false, // 显示列表更多的按钮
				is_all: false, // 显示列表的展开或收起
				number: 0, // 机会的长度
				empty: true, // 企业概况和机会是否为空
			    id:'',
				finish:false
			}
		},
		onLoad(e) {
			
			this.id = e.id
			if (e.id != uni.getStorageSync('userId')) {
			      this.isMe = false
			    } else {
			      this.isMe = true
			 }
			 
			 
		},
		onShow() {
			uni.showLoading({
			    title: '加载中'
			});
			this.getData()
		},
		// onShareAppMessage:function(res) {
		// 	return {
		// 	  title: '德申汇个人主页',
		// 	  imageUrl:this.info.avatar?this.info.avatar:app.shareImg,
		// 	  path: '/pagesMy/MyInfo/MyInfo?id='+this.id
		// 	}
		// },
		methods: {
			goCompany(){
				if(uni.getStorageSync('userId')){
					if(this.isMe){
						this.$api.myself_company({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId")
						}).then(res=>{
							// console.log(res)
							if(res.data.code === '1054'){
								uni.navigateTo({
									url:'../../pagesTwo/EnterpriseCertification/EnterpriseCertification'
								})
							}else if(res.data.code === '200'){
								this.company_id = res.data.data.id
								uni.setStorageSync('company_id',Number(this.company_id))
								uni.navigateTo({
									url:'/pagesTwo/MyBusiness/MyBusiness?id='+uni.getStorageSync("company_id")
								})
							}
						})
					}else{
						uni.navigateTo({
							url:'../../pagesTwo/MyBusiness/MyBusiness?id='+this.company.id
						})
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
			// 项目详情
			InformationDetail(id){
				uni.navigateTo({
					url:'../../pagesMy/InformationDetail/InformationDetail?id='+id
				})
			},
			// 去用户的商城等
			toMyShop () {
			      var reg = new RegExp('(http|ftp|https):\\/\\/[\\w\\-_]+(\\.[\\w\\-_]+)+([\\w\\-\\.,@?^=%&:/~\\+#]*[\\w\\-\\@?^=%&/~\\+#])?')
			      if (!reg.test(this.company.shop_url)) {
					  uni.showToast({
					      title: '这网址不是以http://https://开头，或者不是网址,跳转失败！',
					      duration: 2000,
					  	icon:'none'
					  });
			      } else {
					  uni.navigateTo({
					  	url:"../view/view?url="+this.company.shop_url
					  })
			      }
			    },
			// 关注
			concern () {
				if(uni.getStorageSync('userId')){
					if (this.info.gz_status === 1 || this.info.gz_status === 2) {
						// 如果是是互相关注，或者是已关注，点击即是取消关注，显示关注
						Dialog.confirm({
						  title: '提示',
						  message: '确定取消关注吗？'
						}).then(() => {
							this.follow()
						})
					    
					} else if (this.info.gz_status === 3 || this.info.gz_status === 4) {
						// 如果是被关注，点击关注显示互相关注
					    this.follow()
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
			follow () {
				if(uni.getStorageSync('userId')){
					this.$api.NewsFollow({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  follow_id: this.id
					}).then(res => {
					  this.info.gz_status = res.data.data
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
							icon:'none'
						});
					  this.getData()
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
			// 预览
			pre(){
				
				var img = []
				if(this.info.avatar){
					img.push(this.info.avatar)
				}else{
					img.push('../../static/img/user_icon.png')
				}
				// console.log(img)
				  uni.previewImage({
					 urls: img
				 });
			
			},
			edit(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:"../MyPersonal/MyPersonal"
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
				 // 资讯圈
			 MyInformation(){
				 uni.navigateTo({
					url:"../MyInformation/MyInformation?id="+ this.id
				 })
				 
			  },
				// 复制微信和打电话
			    wechat () {
					if(uni.getStorageSync('userId')){
						if(this.isMe){
							if (this.info.is_show_wechat == 0) {
									uni.showToast({
										title:'用户尚未公开微信号',
										icon:'none'
									})
							} else if (this.info.is_show_wechat == 1) {
									Dialog.confirm({
									  title: '复制',
									  message: '复制他的微信号：'+ this.info.wechat,
									  confirmButtonText:'我要复制'
									}).then(() => {
									  uni.setClipboardData({
										  data: this.info.wechat,
										  success: function () {
											  console.log('success');
										  }
									  });
									}).catch(() => {
									  // on cancel
									});
							}
							
						}else{
							if (uni.getStorageSync("isVip") == 0) {
							  Dialog.confirm({
							    title: '提示',
							    message: '您还不是VIP用户',
								confirmButtonText:'去支付'
							  }).then(() => {
									uni.navigateTo({
										url:'/pagesMy/pay/pay'
									})
							    // on confirm
							  }).catch(() => {
							    // on cancel
							  });
							} else if (uni.getStorageSync("isVip") == 1) {
							  if (this.info.is_show_wechat == 0) {
									uni.showToast({
										title:'用户尚未公开微信号',
										icon:'none'
									})
							  } else if (this.info.is_show_wechat == 1) {
									Dialog.confirm({
									  title: '复制',
									  message: '复制他的微信号：'+ this.info.wechat,
									  confirmButtonText:'我要复制'
									}).then(() => {
									  uni.setClipboardData({
										  data: this.info.wechat,
										  success: function () {
											  console.log('success');
										  }
									  });
									}).catch(() => {
									  // on cancel
									});
							  }
							}
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
			phone () {
					 if(uni.getStorageSync('userId')){
					 	if(this.isMe){
							 if (this.info.is_show_mobile === 0) {
							   uni.showToast({
								title:'用户暂未公开手机号码',
								icon:'none'
							   })
							 }else{
								Dialog.confirm({
								  title: '电话',
								  message: '他的手机号码：'+ this.info.mobile,
								  confirmButtonText:'我要拨打'
								}).then(() => {
									uni.makePhoneCall({
										phoneNumber: this.info.mobile
									});
								}).catch(() => {
								  // on cancel
								});
							 }
					 	}else{
							if (uni.getStorageSync("isVip") == 0) {
									Dialog.confirm({
									  title: '提示',
									  message: '您还不是VIP用户',
									  confirmButtonText:'去支付'
									}).then(() => {
									  uni.navigateTo({
										url:'/pagesMy/pay/pay'
									  })
									}).catch(() => {
									  // on cancel
									});
							} else if (uni.getStorageSync("isVip") == 1) {
									if (this.info.is_show_mobile === 0) {
									  uni.showToast({
										title:'用户暂未公开手机号码',
										icon:'none'
									  })
									}else{
										Dialog.confirm({
										  title: '电话',
										  message: '他的手机号码：'+ this.info.mobile,
										  confirmButtonText:'我要拨打'
										}).then(() => {
											uni.makePhoneCall({
												phoneNumber: this.info.mobile
											});
										}).catch(() => {
										  // on cancel
										});
									}
							} 
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
			// 展示更多的项目
			 moreList () {
			      this.is_all = !this.is_all
			      if (this.is_all) {
			        this.first_chance = this.first_chance.concat(this.more_chance)
			      } else {
			        this.first_chance = this.first_chance.slice(0, 1)
			      }
			    },
			 getData(){
				  this.$api.MyHomePage({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					follow_id: this.id
				  }).then(res => {
					  // console.log(res)
					if (res.data.code === '200') {
					  this.info = res.data.data
					  this.club = res.data.data.club_data
					  this.company = res.data.data.company_data
					  this.chance = res.data.data.s_d_data
					  this.number = res.data.data.s_d_data.length
					  if (this.number > 1) {
						this.first_chance = this.chance.slice(0, 1)
						// console.log(this.first_chance)
						this.more_chance = this.chance.slice(1, this.chance.length)
						this.more_list = true
					  } else {
						this.first_chance = this.chance
					  }
					  if (this.company && this.company.shop_url !== '') {
						this.noShop = true
					  } else {
						this.noShop = false
					  }
					  if (this.number === 0 && this.company.id < 0) {
						this.empty = true
					  } else {
						this.empty = false
					  }
					  this.$nextTick(() => {
						this.isFinish = true
						this.finish = true
						
					  })
					} else if (res.data.code === '1010') {
					  uni.clearStorageSync()
					  uni.showToast({
						  title: '登录过期，请重新登录',
						  duration: 2000,
						  icon:'none'
					  });
					  // this.$router.replace({name: 'Login', params: {id: -1}})
					  uni.reLaunch({
						url: '../login/login'
					  })
					}
					uni.hideLoading();
				  })
			 }
		}
	}
</script>

<style>
	@import url("./MyInfo.css");
</style>
