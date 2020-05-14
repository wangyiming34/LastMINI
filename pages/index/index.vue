<template>
	<view class="wrap" style="padding-top: 100upx;">
		<!-- 全屏透明遮罩 -->
		<view class="zhezhao" v-show="showActive" @click.stop="showActive = !showActive">
		</view>
		<!-- 未支付遮罩 -->
			<view class="tanImg" v-if="is_pay" :animation="animationData" >
				<image src="https://web.detion.com/static/img/pay.png" ></image>
				<view class="close" @click="close"></view>
				<view class="go" @click="pay"></view>
			</view>
			<view class="tanchuceng" v-if="is_pay">	
			</view>		
		<!-- 未支付弹出支付框end -->
		<!-- 搜索框start -->
		<view class="ipt">
			 <view class="ipt-left" style="background-color:#F2F2F2;" @click="search">
				请搜索输入内容
			 </view>
			<!-- </navigator>	 -->
			 <view class="ipt-right re" >
				<view class="" @click.stop="showActive = !showActive" style="width: 100%;height: 100%;">
					<image src="https://web.detion.com/static/image/resource/icon6.png" lazy-load="true" class="imga" mode="widthFix" style="display: block;"></image>
				</view>
				<view class="Active1" v-show="showActive">
					<view class="Active1-class border-bottom-new" @click.stop="goClub">
						俱乐部
					</view>
					
					<view class="Active1-class border-bottom-new" @click.stop="goEnterprise">
						企业认证
					</view>
					
					<view class="Active1-class border-bottom-new" @click.stop="goTradingVolume">
						交易额
					</view>
					<view class="Active1-class" @click.stop="goMy">
						项目/机会
					</view>
				</view>
			 </view>
		</view>
		<!-- 轮播图+ -->
		<view class="swiper">
			 
			 <swiper indicator-dots="true" autoplay="true"  class="swipers" circular="true">
				<swiper-item class="swiper-item" @tap="swiper(item)" v-for="(item,index) in banner "  :key="index">
					<image :src="item.image" class="swiper-image"></image>
				</swiper-item >
			 </swiper>
		</view>
		<!-- 轮播图+搜索框end -->
	    <!-- banner下导航 -->
		<view class="banner-bottom">
			  <view class="item1" @click="SmallStretchNew">
				   <image :src="icon[0]" alt="" class="icon">
				   <view class="text">小申展</view>
			  </view>
			  <view class="item1" @click="LuDingJi">
				   <image :src="icon[1]" alt="" class="icon">
				   <view class="text">路顶记</view>
			  </view>
			  <view class="item1" @click="goActivity">
					<image :src="icon[2]" alt="" class="icon">
					<view class="text">活动</view>
			  </view>
			  
			  <view class="item1" @click="LocalLife">
					<image :src="icon[3]" alt="" class="icon">
					<view class="text">本地生活</view>
			  </view>
			  
			  <view class="item1 re" @click="vip">
					<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wxa2eeaf66a51d1ed0.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.nKJk7OePxnMl26e733713395bbd745bd0fb2d65f5ef9.png" class="ab xufei" v-if="iconShow==1"></image>
					<image src="https://detions.oss-accelerate.aliyuncs.com//wx/wx23b4a3be24fdd6bd.o6zAJs2ZH3_rfb40rIaXLyfXrUwQ.xZ1FxBxv2jx518fed604ce53aec431f28e8170be3ee9.png" class="ab xufei" v-else></image>
					<image :src="icon[4]" alt="" class="icon icon1">
					<view class="text">会员服务</view>
			  </view>
			  
			  <view class="item1" @click="detion">
					<image :src="icon[5]" alt="" class="icon icon1">
					<view class="text">了解德申</view>
			  </view>
			  
			  <view class="item1" @click="goShop">
					<image :src="icon[6]" alt="" class="icon icon1">
					<view class="text">{{statusShow==1?'积分排行':'德申商城'}}</view>
			  </view>
			  
			  <view class="item1" @click.stop="goTradingVolume">
					<image :src="icon[7]" alt="" class="icon icon1">
					<view class="text">交易额</view>
			  </view>
			 <!-- <view class="item" @click="InviteFriends">
					<image src="https://web.detion.com/static/image/year/icon5.png" alt="" class="icon">
					<view class="text">邀请好友</view>
			  </view> -->
		</view>
		<view class="tt">
			<image :src="item.image"  alt="" v-for="(item,index) in banner2" :key="index" @click="capsule(item)">
		</view>
		 <!-- 咖啡厅等 -->
		<view class="menu_list flex justify-between" v-if="statusShow==2">
		   
			   <view class="pic_left" @click="coffee">
					 <image :src="tile[0]"  alt="">
			   </view>
			   <button class="pic_left"  open-type="share" type="primary" style="padding: 0;border: none;border-radius:0" plain="true">
				   <image :src="tile[1]"  alt="">
			   </button>
			   <!-- <view class="pic_left" @click="InviteFriends">
					 <image :src="tile[1]" mode="widthFix" alt="">
			   </view> -->
		</view>
			 
		 <!-- 热门项目 -->
		<view class="hot" style="background-color: white;width: 100%;">
			  <view class=" flex justify-between align-center">
				  <view class="flex hot-title">
				  	<view  class="blueShu" style="margin-right: 4px;">
				  		<!-- <image src="../../static/img/blue.png"  style="height: 100%; width: 100%;"></image> -->
				  	</view>
				  	<view>
				  		项目/机会 <text style="font-size: 12px;color: #999;margin-left: 10px;line-height: 20px;">项目/投资/机会</text>
				  	</view>
				  </view>
				
				 <view class="flex align-center" @click="goProjectList">
					<view style="font-size:16px;font-weight:500;color:rgba(102,102,102,1);">
						筛选
					</view>
					<image src="https://web.detion.com/static/image/resource/icon7.png" lazy-load="true" class="imga" mode="aspectFill" style="margin-left: 5px;width: 16px;height: 16px;"></image>
				 </view>
			  </view>
			  
			  <view class="border-bottom-new2 re" style="padding: 30upx 0 18upx;" v-for="(item,index) in hotList" :key="index" @click.stop="InformationDetail(item.id)">
			  	<view class="flex" style="align-items: center; margin-bottom: 28upx;" @click.stop="MyInfo(item.user_id)">
										
			  		<view   class="re">
						<view class="imgWrapTal" style="width: 80upx;height: 80upx;">
							<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'"  mode="aspectFill"></image>
						</view>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
			  		</view>					
					
					<view  style="flex: 1; margin-left: 20upx;">
						<view class="name flex align-center">
							<view class="newName">
								{{item.nickname}}
							</view>
							<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
						</view>
						<view class="ceo">
							<text v-if="item.job">{{item.job}}</text>
							<text style="margin: 0 4upx;" v-if="item.company"> I </text>
							<text v-if="item.company">{{item.company}}</text>
						</view>
					</view>
										
			  	</view>
				<view class="flex" style="width: 100%;">
					<view style="flex: 1; margin-right: 36upx;">
						<view style="
						margin-bottom: 10upx;
						width: 100%;
						word-break:break-all;
						overflow:hidden;
						display:-webkit-box; 
						text-overflow:ellipsis;
						-webkit-line-clamp:2;
						-webkit-box-orient:vertical;
						white-space:normal;
						font-size:30upx;
						font-weight:400;
						color:rgba(51,51,51,1);
						line-height:42upx;">
							<text style="margin-right: 10px;font-weight:400;color:rgba(255,255,255,1);font-size: 12px;padding: 0px 5px;border-radius:2px;" v-if="item.op_type == 1||item.op_type == 2" :class="item.op_type == 1?'colorblue':item.op_type == 2?'coloryellow':''">
								{{item.op_type == 1 ? '合作':item.op_type == 2 ?'资源':''}}
							</text>
							{{item.title}}
						</view>
						<view  style="width: 100%;height: 18px;flex-wrap: wrap;overflow: hidden;margin-top: 10px;" class="flex">
							<view class="" v-for="(item2,index2) in item.label" :key="index2" style="height:18px;background:rgba(240,240,240,1);border-radius:2px;line-height: 18px;padding: 0 5px;font-weight:400;color:rgba(153,153,153,1);font-size: 12px;margin-right: 7px;">
								{{item2.name}}
							</view>
						</view>
						
					</view>
					<view style="width: 200upx; height: 145upx;">
						<image :src="item.images[0].url_image" mode="aspectFill"></image>
					</view>
				</view>
				
				<view class="flex justify-between" style="margin-top: 15px;">
					<view style="
					font-size:24upx;
					font-weight:400;
					color:rgba(153,153,153,1);
					line-height:24upx;
					">
						<text style="margin-right: 30upx;">{{item.created_at.split(' ')[0]}}</text>
						<text>{{item.click}}阅读</text>
					</view>
					
					<view class="starColor flex align-center">
						<van-icon :name="item.vote_status?'star':'star-o'" size="13px" style="margin-right: 5px;" :class="{starActive:item.vote_status}" />
						<!-- <van-icon name="star" /> -->
						<view style="font-size: 12px;">
							{{item.like}}
						</view>
					</view>
				</view>
			  </view>
			  
		</view>
		<view style="height: 88upx; display: flex;  width: 100%;" v-if="loading">
			  <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
		</view>
		  
		<view  class="noMore" v-if="showTitle">
		  		——— 暂无更多内容 ———
		</view>
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	var  app = getApp().globalData
	export default {
		data() {
			return {
				nickname:'',
				showTitle:false,
				company_id:'',
				showActive:false,
				show:false,
				loading:false,
				allowloading:false,
				title: 'Hello',
				is_pay: false, // 提示支付弹窗
				banner: [], // 轮播
				animationData: {}, //自定义动画
				page:1,
				hotList:[], //热门项目
				tile:[], // 咖啡厅等
				icon:[], // 会员服务等小图标
				banner2:{},
				iconShow:2,//1是续费，2是开通
				token:null,
				userId:null,
				statusShow:1
			}
		},
		onPullDownRefresh(){
			this.page = 1
			this.getHot()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		onReachBottom(){
			if(this.allowloading){
				this.allowloading = false
				this.loading = true
				this.page++
				this.getHot()
			}
		},
		onHide() {
			this.showActive = false
		},
		onLoad(option) {
			this.token = app.token
			this.userId = app.userId
			// 获取状态
			this.getShow()
			// 获取图片和颜色
			this.getImg()
			// 获取轮播图数据
			this.getData()
			this.getData1()
			// 获取热门项目
			this.getHot()
			
			if(uni.getStorageSync("userId")){
				var that = this
				var date = new Date() / 1000
				if (uni.getStorageSync("expiretime")) { // 登录过
						this.getLocationInfo();
				        // if (uni.getStorageSync("setInfo")== 1) {
							// this.getLocationInfo();
				          if (uni.getStorageSync('isVip') == 0) { // 未支付
						      // console.log('未支付')
				            if (uni.getStorageSync('tips_pay')) { //检测
				              uni.showTabBar()
							  that.is_pay = false
							  this.getLocationInfo();
				            } else {
				              that.is_pay = true
							  uni.hideTabBar()
				            }
				          } else if (uni.getStorageSync('isVip') == 1) {
				            // console.log('IsVip')
				          }
				        // } else if (uni.getStorageSync("setInfo") == 0) {
				        //   uni.reLaunch({
				        //   	 url:'../PersonalIdcard/PersonalIdcard'
				        //   }); // 完善信息
				        // }
				} else if (uni.getStorageSync("expiretime")==='' || uni.getStorageSync("expiretime")===undefined ||uni.getStorageSync("expiretime")===null || date > uni.getStorageSync("expiretime")) { // 未登录过或登录过已过期
					uni.clearStorageSync()
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					this.$nextTick(function(){
						uni.reLaunch({
							url: '/pages/login/login'
						})
					})
					 
				}
			}
			
		},
		onShow(){
			if(uni.getStorageSync("userId")){
				this.$api.MyselfIndex({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res1=>{
					// console.log(res1.data.data.nickname)
					this.nickname = res1.data.data.nickname
					if(res1.data.data.is_vip==1){
						this.iconShow = 1
					}else{
						this.iconShow = 2
					}
					this.$api.is_get_badge({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId")
					}).then(res=>{
						if(res.data.code=='1079'){
							uni.setStorageSync("isVip",1)
							// 弹窗跳填写地址
							Dialog.confirm({
							  title: '提示',
							  message: '尊敬的'+res.data.data.nickname+'先生/女士：您已缴费成功，德申汇为您献上一份专属礼包，填写地址，马上领取',
							  confirmButtonText:'立即领取'
							}).then(() => {
								uni.navigateTo({
									url:'../../pagesMy/PayStep/PayStep'
								})
							}).catch(() => {
							  // on cancel
							});
						}else if(res.data.code=='1081'){
							uni.setStorageSync("isVip",1)
						}
					})
				})
				// 国外实名认证是否通过
				this.getforeign()
				
				// 动态创建遮罩特效
				var animation = uni.createAnimation({
				      duration: 300,
				      timingFunction: 'linear',
				})			
				this.animation = animation			
				animation.translateY(-500).step()			
				this.animationData = animation.export()
				setTimeout(function() {
				  animation.translateY(0).step()
				  this.animationData = animation.export()
				}.bind(this), 300)
			}
			
		},
		onShareAppMessage(res) {
			if (res.from === 'button') {// 来自页面内分享按钮
			    return {
			      title:this.nickname +'邀请您加入德申汇',
			      path: "/pages/login/login?userId="+uni.getStorageSync('userId'),
			      imageUrl:app.shareImg
			    }
			}
		    return {
		      title: '德申汇小程序',
		      path: "/pages/index/index",
			  imageUrl:app.shareImg
		    }
		},
		methods: {
			// 获取状态
			getShow(){
				this.$api.Wxapplet_disable({
				}).then(res=>{
					this.statusShow = res.data.data
				})
			},
			// 胶囊跳转
			capsule(item){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/view/view?url='+ item.href
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
			},
			coffee(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/view/view?url=https://web.detion.com/CoffeeIndex'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
			},
			// 获取图片
			getImg(){
				this.$api.home_page_img_2({
					version:3
				}).then(res=>{
					this.tile = res.data.data.imgs.tile
					this.icon = res.data.data.imgs.icon
				})
			},
			// 了解德申
			detion(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/view/view?url=https://web.detion.com/Detion'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
				// uni.redirectTo({
				// 	url:'/pagesFour/ServiceStatus/ServiceStatus?type=0'
				// })
				// uni.navigateTo({
				// 	url:'/pagesMy/Upload/Upload'
				// })
			},
			// 邀请好友
			InviteFriends(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesThree/InviteFriends/InviteFriends'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 会员服务
			vip(){
				if(uni.getStorageSync('userId')){
					if (Number(uni.getStorageSync('setInfo')) === 1) {
						this.$api.is_get_badge({
						  token: uni.getStorageSync("token"),
						  user_id: uni.getStorageSync("userId")
						}).then(res => {
						  if (res.data.code === '1016') { // 不是vip
								uni.navigateTo({
									url:'/pagesMy/pay/pay'
								})
						  } else if (res.data.code === '1079') { // 缴费成功未选择礼包
								uni.navigateTo({
									url:'/pagesMy/PayStep/PayStep'
								})
						  } else if (res.data.code === '1081' || res.data.code === '1077') { // 10000之后领取礼包完成可以正常续费或10000之前没有领取资格
								uni.navigateTo({
									url:'/pagesMy/Renew/Renew'
								})
						  } else if (res.data.code === '1099') {
								uni.navigateTo({
									url:'/pages/PersonalIdcard/PersonalIdcard'
								})
						  } else {
							uni.showToast({
							    title: res.data.msg,
							    mask: "true",
								icon:'none'
							});
						  }
						})
					  } else if (Number(uni.getStorageSync('setInfo')) === 0) {
						uni.navigateTo({
							url:'/pages/PersonalIdcard/PersonalIdcard'
						})
					  }
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			swiper(item){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:"/pagesMy/view/view?url="+item.href
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			search(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/Search/Search'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},	
			LuDingJi(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/LuDingJi/LuDingJi'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			SmallStretchNew(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/SmallStretchNew/SmallStretchNew'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			LocalLife(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/LocalLife/LocalLife'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 商城
			goShop(){
				if(uni.getStorageSync('userId')){
					if(this.statusShow==2){
						this.$api.shop_mobile({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							
						}).then(res=>{
							  // console.log(res)
							  uni.navigateTo({
								  url:'/pagesMy/view/view?url=https://shop.detion.com/'+'&accounts=' + res.data.data.accounts +'&pwd=' + res.data.data.pwd
							  })
						})
					}else{
						uni.navigateTo({
							url:'/pagesThree/Integral/Integral'
						})
					}
					
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 活动界面
			goActivity(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/Activity/Activity'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			goMy(){
				if(uni.getStorageSync('userId')){
					if(uni.getStorageSync('setInfo') ==0){
						uni.showToast({
						    title: '请完善个人信息',
						    duration: 2000,
							icon:'none'
						});
						
						setTimeout(function() {
							uni.navigateTo({
								url:'/pages/PersonalIdcard/PersonalIdcard'
							})
						}, 1000);
						
					}else{
						// console.log(456)
						if (uni.getStorageSync('isVip') == 0) {
							Dialog.confirm({
							  title: '提示',
							  message: '您还不是VIP用户,去支付？',
							  confirmButtonText:'去支付'
							}).then(() => {
								uni.navigateTo({
									url:'/pagesMy/pay/pay'
								})
							}).catch(() => {
							  // on cancel
							});
						  } else if (uni.getStorageSync('isVip') == 1) {
								uni.navigateTo({
									url:'/pagesMy/MyProject/MyProject'
								})
						  } 
					}
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
				
			goClub(){
				if(uni.getStorageSync('userId')){
					if(uni.getStorageSync('setInfo') ===0){
						uni.showToast({
						    title: '请完善个人信息',
						    duration: 2000,
							icon:'none'
						});
						
						setTimeout(function() {
							uni.navigateTo({
								url:'/pages/PersonalIdcard/PersonalIdcard'
							})
						}, 1000);
						
					}else{
						if (uni.getStorageSync('isVip') === 0) {
							Dialog.confirm({
							  title: '提示',
							  message: '您还不是VIP用户,去支付？',
							  confirmButtonText:'去支付'
							}).then(() => {
								uni.navigateTo({
									url:'/pagesMy/pay/pay'
								})
							}).catch(() => {
							  // on cancel
							});
						  } else if (uni.getStorageSync('isVip') === 1) {
							uni.navigateTo({
								url:'/pagesTwo/Club/Club'
							})
						  } 
					}
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
				
			},
			goEnterprise(){
				if(uni.getStorageSync('userId')){
					if(uni.getStorageSync('setInfo') === 0){
						uni.showToast({
						    title: '请完善个人信息',
						    duration: 1000,
							icon:'none'
						});
						setTimeout(function() {
							uni.navigateTo({
								url:'/pages/PersonalIdcard/PersonalIdcard'
							})
						}, 1000);
					}else{
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
						
						
					}
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			goTradingVolume(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/TradingVolume/TradingVolume'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			getforeign(){
				this.$api.register_applies_status({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					if(res.data.code === '1022'){
						uni.setStorageSync("setInfo",1)
					}
					
				})
			},
			
			// 会友汇详情
			InformationDetail(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/InformationDetail/InformationDetail?id='+id
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 跳转筛选
			goProjectList(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/ProjectList/ProjectList'
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
				
			// 跳转个人主页
			MyInfo(id){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/MyInfo/MyInfo?id='+id
					})
				}else{
					Dialog.confirm({
					  title: '提示',
					  message: '您还没有登录,请登录后查看,去登录?'
					}).then(() => {
						uni.clearStorageSync()
						uni.setStorageSync('path',this.$url.getCurrentPageUrlWithArgs())
						uni.reLaunch({
							url: '/pages/login/login'
						})
					}).catch(() => {
					  // on cancel
					});
				}
				
			},
			// 返回顶部
			top(){
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 300
				});
			},
			// 地理位置

			getLocationInfo(){  //1. 获取地理位置
				var _this=this;
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						let latitude,longitude;
						latitude = res.latitude.toString();
						longitude = res.longitude.toString();
						
						uni.request({
							header:{
								"Content-Type": "application/text"
							},
							// url:'https://api.map.baidu.com/geocoder/v2/?ak=YA8xdgvGfK7k8cES9kOau8GaEhXjkr9y&location=' + latitude + ',' + longitude + '&output=json',
							url:'https://apis.map.qq.com/ws/geocoder/v1/?location='+latitude+','+longitude+'&key=OJHBZ-W72Y4-W3MUW-XMF3J-MAWUJ-DLFKN',
							success(re) {
								// console.log(re)
								var wxcity = re.data.result.address_component.city
								app.city = wxcity.substring(0, wxcity.length - 1)
								uni.setStorageSync("city",wxcity.substring(0, wxcity.length - 1))
								uni.showToast({
									title:'当前城市：'+ wxcity.substring(0, wxcity.length - 1) ,
									icon:"none"	,
								})
								if(re.statusCode === 200){
									// console.log("获取中文街道地理位置成功")
								}else{
									console.log("获取信息失败，请重试！")
								}
							 }
						});
					}
				});
			},

			// 关闭遮罩和去支付
			close () {
			  uni.showTabBar()
			  this.is_pay = false
			  uni.setStorageSync("tips_pay",true)
			},
			pay () {
			  uni.showTabBar()
			  this.is_pay = false
			  uni.setStorageSync("tips_pay",true)
			  uni.navigateTo({
			  	url:'/pagesMy/pay/pay'
			  })
			},
			
			// 获取热门
			getHot () {
			      this.$api.Opportunity_index({
			              token: uni.getStorageSync("token") || this.token,
			              user_id: uni.getStorageSync("userId") || this.userId,
			              page: this.page
			            }).then(res => {
							if(res.data.code=== '200'){
								if(this.page===1){
									this.hotList = res.data.data
									if(res.data.data.length>=20){
										this.allowloading= true
										this.loading =false
									}else{
										this.allowloading= false
										this.loading =false
										this.showTitle = true
									}
								}else{
									this.hotList = this.hotList.concat(res.data.data)
									if(res.data.data.length>=20){
										this.allowloading= true
										this.loading =false
									}else{
										this.allowloading= false
										this.loading =false
										this.showTitle = true
									}
								}
								
							}
			            })
		
			},
			// 获取轮播图和热搜数据
			getData () {
			      // 热搜、轮播
			      this.$api.Swiper({
			        token: uni.getStorageSync("token") || this.token,
			        user_id: uni.getStorageSync("userId") || this.userId
			      }).then(res => {
				
			        if (res.data.code === '200') {
			          this.banner = res.data.data.resource_banner
			          // this.isFinish = true
			        } else if (res.data.code === '1010') {
					  uni.clearStorageSync()
					  uni.showToast({
					  	title:'登录过期，请重新登录',
						icon:"none"
					  })
					  uni.reLaunch({
					  	url:"../login/login"
					  })
			        }
			  
			      })
			},
			getData1 () {
			      // 热搜、轮播
			      this.$api.Swiper({
			        token: uni.getStorageSync("token") || this.token,
			        user_id: uni.getStorageSync("userId") || this.userId,
					type:2
			      }).then(res => {
					 this.banner2 = res.data.data.resource_banner
			    })
			}
				
	
		}
	}
</script>

<style>
	@import url("./index.css");
	
</style>
