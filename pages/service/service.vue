<template>
    <view class="wrap" style="padding-top: 50px;background:#FFFFFF;" v-if="finish">
    	<!-- 全屏透明遮罩 -->
    	<view class="zhezhao" v-show="showActive" @click.stop="showActive = !showActive">
    	</view>
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
		<!-- 轮播图改成滚动 -->
		<view class="swiper1">
			 <view class="scrollWrap">
				 <scroll-view class="scroll_H" scroll-x="true" scroll-with-animation="true" show-scrollbar="true" @scroll="scroll" @scrolltoupper="toupper" @scrolltolower="tolower">
					 <view class="flex" id="id">
					 	<view class="swiperItem1"  v-for="(item,index) in listTransition"  :key="index" :style="{width:screenWidth/5 + 'px'}" >
					 		<view class="swiperItem flex flex-d align-center" v-for="(item1,index1) in item" :key="index1" @click.stop="provider(item1)">
					 			 <view class="swiperItemImg">
					 			 	<image :src="item1.img" mode=""></image>
					 			 </view>
					 			 <view class="swiperItemTitle">
					 			 	{{item1.name}}
					 			 </view>
					 		</view>
					 	</view>
					 </view>
					 
				 </scroll-view>
			 </view>
			 <view class="scroll_bar_wrap re" v-if="showScroll">
			 	<view class="scroll_bar ab" :style="{left:left+'px'}">
			 	</view>
			 </view>
		</view>
    	<!-- 轮播图+搜索框end -->
        <!-- banner-->
		<view class="swipertwo" v-if="ad.length>0">
			 <swiper  autoplay="true"  class="swiperv" circular="true" style="80px" :current="swiperCurrent" @change="changeSwiper">
				<swiper-item class="swiper-item" @tap="swiper(item)" v-for="(item,index) in ad"  :key="index">
					<image :src="item.image" class="swiper-image"></image>
				</swiper-item >
			 </swiper>
			 <!-- 轮播指示点样式修改 -->
			 <view class="dots">
			   <block v-for="(item,index) in ad.length" :key="index">
			 	  <view class="dot" :class="index==swiperCurrent ? 'active' : ''"></view>
			   </block>
			 </view>
		</view>

    	<!-- 热门项目 -->
		<view class="title-name">
		 	 推荐服务商
		</view>
		
    	<view class="content-wrap">
    		<view v-for="(item,index) in hotList" :key="index" class="content-for" @click.stop="company(item)">
    			<view class="flex justify-between">
					<!-- 公司名字等 -->
    				<view class="item_name_wrap">
    					<view class="item_name">
    						{{item.name}}
    					</view>
						<view class="item_tab_wrap">
							<text class="">
								主营：
							</text>
							<text v-for="(item1,index1) in item.main" class="item_tab" :key="index1" v-show="item.main">
								<text>{{item1}}</text>
								<text class="shushu">I</text>
							</text>
							<text v-show="item.main==''||item.main==null">
								暂无
							</text>
						</view>
    				</view>
					<!-- 图片 -->
					<view class="serviceimg">
						<image :src="item.img?item.img:'https://web.detion.com/static/image/coffee/default.png'" mode=""></image>
					</view>
    			</view>
				
				<!-- 地址-->
				<view class="service_address">
					<text>地址：</text><text>{{item.city?item.city:'暂无'}}</text> <text class="service_address_read">浏览：</text> <text style="color:#FF6010">{{item.view}}</text>
				</view>
				
				<!-- 头像等 -->
				
				<view class="flex service_avc" style="margin-bottom: 28upx;" @click.stop="MyInfo(item.user_id)">
										
					<view  style="width: 48upx;height: 48upx;margin-top: 6upx;" class="re">
						<image :src="item.user_img?item.user_img:'../../static/img/user_icon.png'" style="height: 100%; width: 100%;border-radius: 50%;"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					</view>					
					
					<view  style="flex: 1; margin-left: 16upx;">
						<view class="name flex align-center" style="margin-bottom: 5upx;">
							<view class="newName" style="font-size: 24upx;font-weight: 500;color:rgba(51,51,51,1);">
								{{item.user_name}}
							</view>
							<vip :type="item.type" :no="item.no" class="bianhao"></vip>
							<level :type="item.type" :v_type="item.add_v_type" :vip_level="item.vip_level"></level>
						</view>
						<view class="ceo" v-for="(item2,index2) in item.clubs" :key="index2" style="font-size: 24upx;font-weight: 300;color:rgba(102,102,102,1);margin-bottom: 4px;" v-show="item.clubs.length>0">
							<text v-if="item2.club_name">{{item2.club_name}}</text>
							<text style="margin: 0 4upx;" v-if="item2.club_duty"> · </text>
							<text v-if="item2.club_duty">{{item2.club_duty}}</text>
						</view>
						<view class="ceo" v-show="item.clubs.length==0" style="font-size: 24upx;font-weight: 300;color:rgba(102,102,102,1);">
							暂未加入俱乐部
						</view>
					</view>
										
				</view>
    		</view>
    	</view>
		
		
    	<view style="height: 88upx; display: flex;  width: 100%;" v-if="loading">
    		  <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
    	</view>
    	  
    	<view  class="noMore" v-if="showTitle" style="margin-top: 20px;">
    	  		——— 暂无更多内容 ———
    	</view>
    	<!-- 提示框 -->
    	<van-toast id="van-toast" />
    	<!-- 确认框 -->
    	<van-dialog id="van-dialog" />
		<view class="myservice flex flex-d justify-center" @click.stop="myservice">
			<view class="">
				我的
			</view>
			<view class="">
				服务
			</view>
		</view>
    </view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	var  app = getApp().globalData
    export default {
        data() {
            return {
				swiperCurrent:0,
                showActive:false,
				loading:false,
				allowloading:false,
				page:1,
				hotList:[], //服务商
				swiperList:[],
				list:[],
				listTransition:[],
				screenWidth:'',
				left:0,
				boxWidth:0,
				finish:false,
				showTitle:false,
				ids:'',
				ad:'',
				showScroll:false
            }
        },
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇服务商',
			  imageUrl:app.shareImg,
			  path: '/pages/service/service'
			}
		},
		onPullDownRefresh(){
			this.ids = ''
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
				
				this.ids = ''
				for(var val of this.hotList){
					this.ids += ','+val.id
				}
				this.ids = this.ids.substr(1)
				this.allowloading = false
				this.loading = true
				this.page++
				this.$nextTick(()=>{
					this.getHot()
				})
			}
		},
		onHide() {
			this.showActive = false
		},
		onLoad(e) {
			const screenWidth = uni.getSystemInfoSync().screenWidth;
			this.screenWidth = screenWidth
			// 获取轮播图数据
			this.getData()
			// 获取服务商函数
			this.getHot()
		},
		onShow() {
			if(uni.getStorageSync('service')){
				for(var val of this.hotList){
					if(val.id==JSON.parse(uni.getStorageSync('service')).companyId){
						val.view = JSON.parse(uni.getStorageSync('service')).view
					}
				}
				this.$nextTick(function(){
					uni.removeStorageSync('service')
				})
			}
		},
        methods: {
			company(item){
				uni.navigateTo({
					url:'/pagesTwo/MyBusiness/MyBusiness?id='+item.id
				})
			},
			provider(item1){
				uni.navigateTo({
					url:'/pagesFour/ServiceProvider/ServiceProvider?id='+item1.id
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'/pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			myservice(){
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
						uni.navigateTo({
							url:'/pagesFour/MyService/MyService'
						})
						// this.$api.myself_company({
						// 	token: uni.getStorageSync("token"),
						// 	user_id: uni.getStorageSync("userId")
						// }).then(res=>{
						// 	// console.log(res)
						// 	if(res.data.code === '1054'){
						// 		uni.navigateTo({
						// 			url:'../../pagesTwo/EnterpriseCertification/EnterpriseCertification'
						// 		})
						// 	}else if(res.data.code === '200'){
						// 		uni.setStorageSync('company_id',Number(res.data.data.id))
						// 		uni.navigateTo({
						// 			url:'/pagesFour/MyService/MyService'
						// 		})
						// 	}
						// })
						
						
						
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
			// 修改轮播图的 分页器样式用的
			changeSwiper(e) {
			    this.swiperCurrent = e.detail.current;
			},
			swiper(item) {
				if(item.href_type==0){
					uni.navigateTo({
						url:'/pagesFour/ServiceDetails/ServiceDetails?id='+item.href_id + '&status=0&user_id=' + item.user_id
					})
				}else{
					uni.navigateTo({
						url:'/pagesMy/view/view?url='+ item.href
					})
				}
			   // console.log(item)
			},
			getHot () {
			  this.$api.sp_recommend({
					  limit:20,
					  page: this.page,
					  ids:this.ids
					}).then(res => {
						// console.log(res)
							if(res.data.code=== '200'){
								// uni.hideLoading()
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
							this.$nextTick(()=>{
								this.finish = true
							})
					})
					
			},
			scroll(e){
				var x = this.boxWidth-this.screenWidth
				this.left=e.detail.scrollLeft/x*20
			},
			toupper(){
				// this.left=0
			},
			tolower(){
				// this.left=20
			},
			getData(){
				this.$api.service_cate_list({
				}).then(res=>{
					console.log(res)
					if(res.data.data.cate.length>10){
						this.showScroll = true
					}else{
						this.showScroll = false
					}
					this.listTransition = this.arrayTransition(2,res.data.data.cate)
					this.boxWidth = parseInt(this.listTransition.length/5*this.screenWidth)
					this.ad = res.data.data.ad
				})
			},
            // 二维数组转换
			arrayTransition(n,arr){
				// 转换的二维数组
				var listTransition = []
				for(var i= 0;i<arr.length;i=i+n){
					listTransition.push(arr.slice(i,i+n))
				}
				return listTransition
			},
			// 搜索
			search(){
				uni.navigateTo({
					url:'/pagesFour/ServiceProvider/ServiceProvider'
				})
			},
			goMy(){
				// console.log(123)
				if(uni.getStorageSync('setInfo') ==0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
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
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') == 1) {
						  // uni.navigateTo({
						  // 	url:'../../pagesMy/ceshi/ceshi'
						  // })
							uni.navigateTo({
								url:'../../pagesMy/MyProject/MyProject'
							})
					  } 
				}
			},
				
			goClub(){
				if(uni.getStorageSync('setInfo') ===0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 2000,
						icon:'none'
					});
					
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
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
								url:'../../pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						uni.navigateTo({
							url:'../../pagesTwo/Club/Club'
						})
					  } 
				}
				
			},
			goEnterprise(){
				if(uni.getStorageSync('setInfo') === 0){
					uni.showToast({
					    title: '请完善个人信息',
					    duration: 1000,
						icon:'none'
					});
					setTimeout(function() {
						uni.navigateTo({
							url:'../../pages/PersonalIdcard/PersonalIdcard'
						})
					}, 1000);
				}else{
					this.$api.MyselfIndex({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId"),
						
					}).then(res=>{
						if (res.data.code === '200') {
						  if (res.data.data.company_data) {
						    this.company_id = res.data.data.company_data.id
							uni.setStorageSync('company_id',Number(this.company_id))
						  }
						  this.$nextTick(() => {
						    if (uni.getStorageSync("company_id")) {
						      uni.navigateTo({
						      	url:'../../pagesTwo/MyBusiness/MyBusiness?id='+uni.getStorageSync("company_id")
						      })
						    }else{
								uni.navigateTo({
									url:'../../pagesTwo/MyBusiness/MyBusiness'
								})
							} 
						  })
						}
					})
					
				}
			},
			goTradingVolume(){
				uni.navigateTo({
					url:'../../pagesTwo/TradingVolume/TradingVolume'
				})
			}
        }
    }
</script>

<style>
   @import url("../index/index.css");
   @import url("./service.css");

</style>