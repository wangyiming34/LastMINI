<template>
	<view style="position: absolute;width: 100%;height: 100%;background:rgba(245,245,245,1);" v-if="show" id="neww" class="flex flex-d">
		<!-- 上面部分 -->
		<view class="" style="margin-top: 0;border-radius: 0;padding: 30upx;background-color: white;margin-bottom:16upx ;">
			<view class="flex" style="margin-bottom: 30upx;">
				<!-- 图片 -->
				<view class="serviceimg" style="width: 102upx;height: 102upx;margin: 0 21upx 0 0;">
					<image :src="info.img?info.img:'https://web.detion.com/static/image/coffee/default.png'" mode=""></image>
				</view>
				<!-- 公司名字等 -->
				<view class="item_name_wrap" style="width: 520upx;">
					<view class="service_item_name" style="font-size: 36upx;">
						{{info.short_name?info.short_name:info.name}}
					</view>
					<view class="service_address flex justify-between align-center" style="width: 100%;font-size: 28upx;font-weight:400;color:rgba(102,102,102,1);">
						<view class="">
							<text class="">浏览：</text> <text>{{info.view}}</text>
						</view>
						<view class="">
							<text class="">咨询：</text> <text>{{info.contact_amount}}</text>
						</view>
						<view class="">
							<text class="">关注：</text> <text>{{info.attention}}</text>
						</view>
						
					</view>
				</view>
				
			</view>
			
			<view class="flex">
				<view class="" style="font-size:24upx;font-weight:400;color:rgba(102,102,102,1);margin-right: 21upx;line-height:34upx ;">
					主营项目:
				</view>
				<view class="flex flex-wrap" style="flex: 1;">
					<view v-for="(item,index) in info.main" :key="index" style="padding: 3upx 14upx;background:rgba(255,237,233,1);border-radius:4upx;font-size:22upx;font-weight:500;color:rgba(248,100,66,1);margin-bottom:22upx;margin-right: 18upx;" v-show="info.main.length>0">
						{{item}}
					</view>
					<view style="padding: 3upx 14upx;background:rgba(255,237,233,1);border-radius:4upx;font-size:22upx;font-weight:500;color:rgba(248,100,66,1);" v-show="info.main.length===0">
						暂无
					</view>
				</view>
			</view>
			
		</view>
		<!-- 下面的部分-->
		<view class="flex align-center justify-around" style="padding: 0 15px;height: 44px;background-color: white;">
			<view v-for="(item,index) in tablist" :key="index" :class="tabindex===index?'tabActive':''" @click="tab(index)" class="newservicetab">
				{{item}}
			</view>
		</view>
		
		<!-- 下面列表 -->
		<view class="" style="background-color:rgba(245,245,245,1);position: relative;flex: 1;">
			<swiper class="swiper"  style="height:100%;rgba(245,245,245,1)" :current="tabindex" @change="changeSwiper">
				<!-- 第一个 =============================================================================================================-->
				<swiper-item>
					<view style="height: 100%;background-color:rgba(245,245,245,1)">
						<scroll-view scroll-y="true" class="scroll-Y" style="height: 100%;"  :enable-back-to-top="true" v-if="serviceList.length>0">
							
							<view class="" style="background-color:rgba(245,245,245,1)">
								<view v-for="(item,index) in serviceList" :key="index"  @click.stop="ServiceDetails(item)" style="padding: 30upx;background-color: white;" class="border-bottom-new2" v-show="index<6">
									<view class="flex" style="margin-bottom: 30upx;">
										<!-- 图片 -->
										<view class="serviceimg" style="width: 147upx;height: 98upx;margin: 0 21upx 0 0;">
											<image :src="item.img" mode=""></image>
										</view>
										<!-- 公司名字等 -->
										<view class="item_name_wrap" style="width: 450upx;">
											<view class="service_item_name">
												{{item.title}}
											</view>
											<view class="" >
												<text style="padding: 3upx 14upx;background:rgba(255,237,233,1);border-radius:4upx;font-size:22upx;font-weight:500;color:rgba(248,100,66,1);">{{item.cate_name}}</text>
												
											</view>
										</view>
										
									</view>
								</view>
								
								<view  class="noMore"  v-if="serviceList.length>0">
								  		——— 暂无更多内容 ———
								</view>
							</view>
							
							
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-if="serviceList.length==0" style="overflow: hidden;height: 100%;width: 100%;background-color:white">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂未发布服务
							</view>
						</view>
						
					</view>
				</swiper-item>
				<!-- 第二个 =========================================================================================================-->
				
				<swiper-item>
					<view style="height: 100%;background-color:white">
						<scroll-view scroll-y="true" class="scroll-Y" style="height: 100%;"  :enable-back-to-top="true">
							<view class="" style="background-color:white">
								<view class="middle" style="padding: 40upx 57upx;">
									
									<view class="flex industry">
										<view class="industryName">
											公司名称
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{info.name}}
										</view>
									</view>
									<view class="flex industry">
										<view class="industryName" style="text-align: justify;text-align-last: justify;">
											简称
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{info.short_name?info.short_name:'暂无'}}
										</view>
									</view>
									
									<!-- 所属行业 -->
									<view class="flex industry">
										<view class="industryName">
											所属行业
										</view>
										<view style="flex: 1;margin-left: 15px;">
											<view class="" v-if="introduction.industry_p">
												{{introduction.industry_p + '/' + introduction.industry}}
											</view>
											<view v-else>
												暂无
											</view>
										</view>
									</view>
									
									<!-- 联系方式 -->
									<view class="flex industry">
										<view class="industryName">
											联系方式
										</view>
										<view style="flex: 1;margin-left: 15px;color: #477ACC;" @click="tel">
											{{introduction.contact?introduction.contact:'暂无'}}
										</view>
									</view>
									
									<!-- 商城 -->
									<!-- <view class="flex industry">
										<view class="industryName">
											企业商城
										</view>
										<view style="flex: 1;margin-left: 15px;color: #477ACC;" @click="url">
											{{introduction.shop_url?introduction.shop_url:'暂无链接'}}
										</view>
									</view> -->
									
									<!-- 地址 -->
									<view class="flex industry" @click.stop="gogo">
										<view class="industryName">
											公司地址
										</view>
										<view style="flex: 1;margin-left: 15px;color: #477ACC;" v-if="introduction.address">
											{{introduction.address?introduction.address:'暂无'}}
										</view>
										<van-icon name="arrow" style="align-self: flex-start;margin-top: 6upx;" size="16px" color="#999999" v-if="introduction.address"/>
									</view>
									<!-- 服务范围 -->
									<view class="flex industry">
										<view class="industryName">
											服务范围
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{introduction.ranges}}
										</view>
									</view>
									
									<view class="flex industry">
										<view class="industryName">
											企业简介
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{introduction.description?introduction.description:'暂无'}}
										</view>
									</view>
									
								</view>
							</view>
						</scroll-view>
					</view>
				</swiper-item>
			
				<!-- 第三个=========================================== -->
				<swiper-item>
					<view style="height: 100%;background-color:rgba(245,245,245,1)">
						<scroll-view scroll-y="true" class="scroll-Y" style="height: 100%;"  :enable-back-to-top="true" v-if="contact">
							
							<view class="" style="background-color:white;padding:40upx 57upx;">
								<view class="flex" style="align-items: center; margin-bottom: 40upx;" @click.stop="MyInfo(contact.user_id)">
														
									<view  style="width: 96upx;height: 96upx;" class="re">
										<image :src="contact.avatar?contact.avatar:'../../static/img/user_icon.png'" style="height: 100%; width: 100%;border-radius: 100%;"></image>
										<head-logo :type="contact.type" :v_type="contact.add_v_type"></head-logo>
									</view>					
									
									<view  style="flex: 1; margin-left: 20upx;">
										<view class="name" style="margin-bottom: 12upx;">
											<view class="newName">
												{{contact.nickname}}
											</view>
										</view>
										<view class="flex align-center">
											<vip :type="contact.type" :no="contact.no" class="viip"></vip>
											<level  :vip_level="contact.vip_level"></level>
										</view>
									</view>
														
								</view>
								<!-- 头部下面的 -->
								<view>
									
									<view class="flex industry">
										<view class="industryName" style="text-align: justify;text-align-last: justify;">
											企业
										</view>
										<view style="flex: 1;margin-left: 15px;">
											<text v-if="contact.job">{{contact.job}}</text>
											<text v-if="contact.job" style="margin: 0 8upx;font-size: 14px;"> | </text>
											<text>{{info.name}}</text>
										</view>
									</view>
									
									<view class="flex industry">
										<view class="industryName" style="text-align: justify;text-align-last: justify;">
											俱乐部
										</view>
										
										<view style="flex: 1;margin-left: 15px;" v-show="contact.clubs.length>0">
											<view  v-for="(item,index) in contact.clubs" :key="index" >
												<text v-if="item.club_duty">{{item.club_duty}}</text>
												<text v-if="item.club_duty" style="margin: 0 8upx;font-size: 14px;"> | </text>
												<text>{{item.club_name}}</text>
											</view>
										</view>
										
										<view class="" v-show="contact.clubs.length==0" style="flex: 1;margin-left: 15px;">
											暂无俱乐部
										</view>
									</view>
									
									<!-- <view class="flex industry">
										<view class="industryName" style="text-align: justify;text-align-last: justify;">
											认证
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{contact.inform?contact.inform:'暂无认证'}}
										</view>
									</view> -->
									
									<view class="flex industry">
										<view class="industryName" style="text-align: justify;text-align-last: justify;">
											简介
										</view>
										<view style="flex: 1;margin-left: 15px;">
											{{contact.inform?contact.inform:'暂无简介'}}
										</view>
									</view>
									
								</view>
							</view>
							
							
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color:rgba(245,245,245,1)">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂无联系人
							</view>
						</view>
						
					</view>
				</swiper-item>
			
			</swiper>
		</view>
		
		<view class="bianji flex justify-around align-center" v-if="isMe">
			<view class="ed" @click.stop="edit()">
				编辑
			</view>
		</view>
		
		
		<view class="bianji flex justify-around align-center" v-else>
			<view class="flex align-center guan" @click="guanzhu">
				<van-icon name="plus" v-if="is_attention==0" size="16px"/>
				<van-icon name="wap-nav" size="16px" v-else/>
				<view class="" style="margin-left: 6upx;">
					{{is_attention==0?'关注':'已关注'}}
				</view>
			</view>
			<view class="dianhua" @click="tel">
				电话咨询
			</view>
		</view>

		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				tablist:['服务',"简介",'联系人'],
				tabindex:0,
				isMe:false,
				show:false,
				company_id:'',
				info:{},
				serviceList:[],
				introduction:{},
				contact:{},
				is_attention:10
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: this.info.name,
			  imageUrl:this.info.img?this.info.img:app.shareImg,
			  path: '/pagesTwo/MyBusiness/MyBusiness?id='+this.company_id
			}
		},
		onLoad(e) {
			// console.log(e)
			uni.showLoading({
			    title: '加载中',
				mask:"true"
			});
			if(uni.getStorageSync("company_id") == e.id){
				this.isMe = true
			}else{
				this.isMe = false
			}
			this.company_id = e.id
			// this.getStatus()
			this.getCompany()
		},
		methods: {
			gogo(){
				uni.openLocation({
				    latitude: Number(this.introduction.lnglat.lat),
				    longitude: Number(this.introduction.lnglat.lng),
				    success: function () {
				        console.log('success');
				    }
				});
			},
			// 服务详情
			ServiceDetails(item){
				// console.log(item)
				// 0就是 正常进详情
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesFour/ServiceDetails/ServiceDetails?id='+item.id +'&status=0'+"&user_id=" + item.user_id
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
			guanzhu(){
				
				if(uni.getStorageSync('userId')){
					// 0就是没关注要关注
					if(this.is_attention==0){
						this.$api.attention_company({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:1,
							id:this.company_id
						}).then(res=>{
							// console.log(res)
							if(res.data.code=="200"){
								uni.showToast({
								    title: '关注成功',
								    duration: 2000,
									icon:'none'
								});
								this.is_attention = 1
								this.info.attention++
							}
						})
					}else{
						this.$api.attention_company({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:0,
							id:this.company_id
						}).then(res=>{
							if(res.data.code=="200"){
								uni.showToast({
								    title: '取消关注',
								    duration: 2000,
									icon:'none'
								});
								this.is_attention = 0
								this.info.attention--
							}
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
			getCompany(){
				this.$api.company_detail({
					id:this.company_id,
					token: uni.getStorageSync("token")||'',
					user_id: uni.getStorageSync("userId")||'',
				}).then(res=>{
					if(res.data.code=="200"){
						// console.log(res.data.data.is_attention)
						uni.hideLoading();
						this.info = res.data.data.data
						uni.setStorageSync('service',JSON.stringify({view:this.info.view,companyId:this.company_id}))
						this.is_attention = res.data.data.is_attention
						this.serviceList = res.data.data.service
						this.introduction = res.data.data.introduction
						this.contact = res.data.data.contact
						this.show = true
					}
				})
			},
			changeSwiper(e){
				this.tabindex = e.detail.current
			},
			tab(ind){
				this.tabindex = ind
			},
			// 产品详情
			myProduct(item){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/MyProduct/MyProduct?id='+item.id + "&type="+item.type
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
			// 编辑企业
			edit(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/EditEnterpriseIndex/EditEnterpriseIndex?status=0'
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
			tabCheck(ind){
				this.tabCurrent = ind
			},
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
			tel(){
				if(uni.getStorageSync('userId')){
					uni.makePhoneCall({
						phoneNumber:this.introduction.contact,
						success:()=>{
							this.$api.company_add_count({
								id:this.company_id
							}).then(res=>{
								// console.log(res)
								this.info.contact_amount++
								
							})
						}
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
			url(){
				if(this.introduction.shop_url){
					uni.navigateTo({
						url:'../../pagesMy/view/view?url='+this.introduction.shop_url
					})
				}
			},
			all(){
				this.more = !this.more
				this.unfold = !this.unfold
			},
			getStatus(){
				if(this.isMe){
					this.$api.myself_company({
						token: uni.getStorageSync("token"),
						user_id: uni.getStorageSync("userId")
					}).then(res=>{
						// console.log(res)
						if(res.data.code === '1054'){
							uni.redirectTo({
								url:'../../pagesTwo/EnterpriseCertification/EnterpriseCertification'
							})
						}else if(res.data.code === '200'){
							this.id = res.data.data.id
							this.enterpriseId = res.data.data.id
							this.getCompany()
						}
					})
				}else{
					this.getCompany()
				}
				
			},
			
			getEnterprise(){
				this.$api.corporate_home_page({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					company_id:this.company_id
				}).then(res=>{
					// console.log(res)
					this.enterprise = res.data.data
					this.userList = res.data.data.user_club_data
					this.$nextTick(()=>{
						  let query1 = uni.createSelectorQuery()
						  query1.selectAll(".middle-content").boundingClientRect(data => {
								if(data[0].height>66){
									this.unfold = true
									this.btn = true
								}
						  }).exec()
						  
						  // console.log(this.listtui)
					})
				})
			},
			getShop(){
				this.$api.corporate_shop({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					company_id:this.company_id
				}).then(res=>{
					this.shopList = res.data.data
				})
				
			},
			getServer(){
				this.$api.corporate_product_service({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					company_id:this.company_id
				}).then(res=>{
					this.serverList = res.data.data
				})
				
			}
			
		}
	}
</script>

<style>
	@import url("../../pagesMy/MyProject/MyProject.css");
	@import url("../../pages/service/service.css");
	@import url("../../pagesFour/ServiceProvider/index.css");
	@import url("../../pages/information/information.css");
	@import url("./MyBusiness.css");
	@import url("../../pagesMy/InformationDetail/InformationDetail.css");
	@import url("../../pagesMy/LuDingJi/LuDingJi.css");
</style>
