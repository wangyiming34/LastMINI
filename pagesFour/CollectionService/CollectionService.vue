<template>
	<view style="position: absolute;width: 100%;height: 100%;background-color:#FFFFFF;" class="flex flex-d">
		<!-- 头部选项卡 -->
		<view class="serviceHead">
			
			<!-- 选项卡 -->
			
			<view class="flex service align-center justify-between">
				
				<view class="flex align-center justify-between" style="padding: 0 15px;flex: 1;height: 44px;">
					<view v-for="(item,index) in tablist" :key="index" :class="tabindex===index?'tabActive':''" @click="tab(index)" class="servicetab" style="width: 50%;">
						{{item}}
					</view>
				</view>
				
			</view>
		</view>
		<!-- 下面列表 -->
		<view class="" style="flex: 1;position: relative;padding: 0 10px;">
			<swiper class="swiper"  style="height: 100%;" :current="tabindex" @change="changeSwiper">
				<!-- 第一个 =============================================================================================================-->
				<swiper-item>
					<view style="height: 100%;">
						<scroll-view scroll-y="true" class="scroll-Y" style="height: 100%;"  :enable-back-to-top="true" v-if="voteList.length>0" refresher-enabled="true" :refresher-triggered="triggered1" :refresher-threshold="100" @refresherpulling="onPulling1" @refresherrefresh="onRefresh1" @refresherrestore="onRestore1" @refresherabort="onAbort1" lower-threshold='1000' @scrolltolower="bottomvote">
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="votetop">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">下拉刷新中...</van-loading>
							</view>
							<view class="">
								<view v-for="(item,index) in voteList" :key="index" class="content-for" @click.stop="company(item)" @longpress="longC(item)">
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
												<text v-show="item.main==''|| item.main==null">
													暂无
												</text>
											</view>
										</view>
										<!-- 图片 -->
										<view class="serviceimg">
											<image :src="item.img" mode=""></image>
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
											<view class="ceo" v-for="(item2,index2) in item.clubs" :key="index2" style="font-size: 24upx;font-weight: 300;color:rgba(102,102,102,1);margin-bottom: 4px;" v-show="item.clubs.length">
												<text v-if="item2.club_name">{{item2.club_name}}</text>
												<text style="margin: 0 4upx;" v-if="item2.club_duty"> · </text>
												<text v-if="item2.club_duty">{{item2.club_duty}}</text>
											</view>
											<view class="ceo" v-show="!item.clubs.length">
												暂未加入俱乐部
											</view>
										</view>
															
									</view>
								</view>
								
								<view  class="noMore" v-if="showTitle" style="margin-top: 20px;">
								  		——— 暂无更多内容 ———
								</view>
							</view>
							
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="votebottom">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">触底加载中...</van-loading>
							</view>
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-if="voteList.length==0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂无关注企业
							</view>
						</view>
						
					</view>
				</swiper-item>
				<!-- 第二个 =========================================================================================================-->
				<swiper-item>
					<view style="height: 100%;">
						<scroll-view  scroll-y="true" class="scroll-Y" style="height: 100%;" enable-back-to-top="true" v-if="historyList.length>0" refresher-enabled="true" :refresher-triggered="triggered" :refresher-threshold="100" @refresherpulling="onPulling" @refresherrefresh="onRefresh" @refresherrestore="onRestore" @refresherabort="onAbort" lower-threshold='1000' @scrolltolower="bottomhis">
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="historytop">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">下拉刷新中...</van-loading>
							</view>
							<view class="">
								<view v-for="(item,index) in historyList" :key="index" class="content-for" @click.stop="serviceDetails(item)" @longpress="longF(item)">
									<view class="flex justify-between">
										<!-- 公司名字等 -->
										<view class="item_name_wrap" style="width: 450upx;">
											<view class="service_item_name">
												{{item.title}}
											</view>
											<view class="service_address flex justify-between align-center" style="width: 90%;">
												<text class="cate_name">{{item.cate_name?item.cate_name:'暂无'}}</text><text>{{item.city?item.city:'暂无'}}</text> 
												<view class="">
													<text class="">浏览：</text> <text style="color:#FF6010">{{item.view}}</text>
												</view>
											</view>
										</view>
										<!-- 图片 -->
										<view class="serviceimg" style="width: 147upx;height: 98upx;">
											<image :src="item.img" mode=""></image>
										</view>
									</view>
									
									<!-- 地址-->
									
									
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
											
											<view class="ceo" style="font-size: 24upx;font-weight: 300;color:rgba(102,102,102,1);">
												<text v-if="item.job">{{item.job}}</text>
												<text style="margin: 0 4upx;" v-if="item.job">I</text>
												<text v-if="item.company_name">{{item.company_name}}</text>
											</view>
											
										</view>
															
									</view>
								</view>
								
								<view  class="noMore" v-if="showTitle1" style="margin-top: 20px;">
								  		——— 暂无更多内容 ———
								</view>
							</view>
							
							<view style="height: 88upx;background-color: white; display: flex;  width: 100%;" v-if="historybottom">
								 <van-loading size="24px"  type="spinner" style="margin: auto;">触底加载中...</van-loading>
							</view>
						</scroll-view>
						
						
						<view class="LuDingJi-no" v-if="historyList.length==0" style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
							<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
								<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
							</view>
							<view class="LuDingJi-no-con">
								暂无收藏服务
							</view>
						</view>
					</view>
				</swiper-item>
				
			</swiper>
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
				myProps: {
				  label: 'name',
				  value: 'name',
				  children: 'child'
				},
				triggered: false,
				tabindex:0,
				tablist:['企业',"服务"],
				voteList:[],
				votetop:false,
				voteallowtop:true,
				votebottom:false,
				voteallowbottom:false,
				voteId:'',
				historyList:[],
				historyId:'',
				historytop:false,
				historyallowtop:true,
				historybottom:false,
				historyallowbottom:false,
				id:'',
				page1:1,
				limit:10,
				city1:'',
				search1:'',
				cate_id:'',
				List2:[],
				page2:1,
				showTitle:false,
				showTitle1:false,
				city:'全部',
				freshing:false,
				triggered1: false,
				freshing1:false,
				list:[],
				showtext:true,
				attention_id:0,
				collect_id:0
				
			}
		},
		onLoad(e) {
		},
		onShow() {
			this.attention_id = 0
			this.collect_id = 0
			uni.showLoading({
			    title: '加载中'
			});
			// 企业
			this.getVote()
			// 服务
			this.getHistory()
		},
		methods: {
			// 长按取消收藏服务
			longF(item1){
				// console.log(item)
				if(uni.getStorageSync('userId')){
					Dialog.confirm({
					  title: '提示',
					  message: '确定取消收藏该条服务吗？'
					}).then(() => {
						this.$api.collect_sp({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:0,
							id:item1.id
						}).then(res=>{
							if(res.data.code=="200"){
								uni.showToast({
								    title: '取消收藏服务成功',
								    duration: 2000,
									icon:'none'
								});
								this.historyList = this.historyList.filter((item,index)=> item.id != item1.id)
							}else{
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000,
									icon:'none'
								});
							}
						})
						})
				}else{
					uni.clearStorageSync()
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			},
			// 长按取消   关注企业
			longC(item1){
				// console.log(item)
				if(uni.getStorageSync('userId')){
					Dialog.confirm({
					  title: '提示',
					  message: '确定取消关注该企业吗？'
					}).then(() => {
						this.$api.attention_company({
							token: uni.getStorageSync("token"),
							user_id: uni.getStorageSync("userId"),
							type:0,
							id:item1.id
						}).then(res=>{
							if(res.data.code=="200"){
								uni.showToast({
								    title: '取消关注企业成功',
								    duration: 2000,
									icon:'none'
								});
								this.voteList = this.voteList.filter((item,index)=> item.id != item1.id)
							}else{
								uni.showToast({
								    title: res.data.msg,
								    duration: 2000,
									icon:'none'
								});
							}
						})
											
					}).catch(() => {
					  // on cancel
					});
					// 0就是没关注要关注
						
					
				}else{
					uni.clearStorageSync()
					uni.showToast({
					    title: '请登录',
					    duration: 2000,
						icon:'none'
					});
					uni.reLaunch({
						url: '/pages/login/login'
					})
				}
			},
			company(item){
				uni.navigateTo({
					url:'/pagesTwo/MyBusiness/MyBusiness?id='+item.id
				})
			},
			serviceDetails(item){
				uni.navigateTo({
					url:'/pagesFour/ServiceDetails/ServiceDetails?id='+item.id +'&status=0'+"&user_id=" + item.user_id
				})
			},
			bottomvote(){
				// 关注的企业
				if(this.voteallowbottom){
					this.votebottom = true
					this.voteallowbottom = false
					this.attention_id = this.voteList[this.voteList.length-1].attention_id
					setTimeout(()=> {
						this.getVote()
					}, 100);
					
				}
			},
			bottomhis(){
				// 收藏的服务
				if(this.historyallowbottom){
					this.historybottom = true
					this.historyallowbottom = false
					this.collect_id = this.historyList[this.historyList.length-1].collect_id
					setTimeout(()=> {
						this.getHistory()
					}, 100);
					
				}
			},	
			onPulling(e) {
				this.triggered = true;
			},
			onRefresh() {
				if (this.freshing) return;
				this.freshing = true;
				this.attention_id = 0
				this.collect_id = 0
				this.getHistory()
				this.getVote()
				setTimeout(() => {
					this.triggered = false;
					this.freshing = false;
					uni.showToast({
					    title: '刷新成功',
					    mask: "true",
						icon:'none'
					});
				},2000)
			},
			onRestore() {
				this.triggered = false; // 需要重置
			},
			onAbort() {
				// this.triggered = false;
			},
			onPulling1(e) {
				this.triggered1 = true;
			},
			onRefresh1() {
				if (this.freshing1) return;
				this.freshing1 = true;
				this.attention_id = 0
				this.collect_id = 0
				this.getHistory()
				this.getVote()
				setTimeout(() => {
					this.triggered1 = false;
					this.freshing1 = false;
					uni.showToast({
					    title: '刷新成功',
					    mask: "true",
						icon:'none'
					});
				},2000)
			},
			onRestore1() {
				this.triggered1 = false; // 需要重置
			},
			// 详情
			InformationDetail(id){
				uni.navigateTo({
					url:'../../pagesMy/InformationDetail/InformationDetail?id='+id
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 关注的企业
			getVote(){
				this.$api.my_attention_company({
					attention_id:this.attention_id,
					limit:20,
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					uni.hideLoading();
					if(!this.voteallowtop){
						setTimeout(()=>{
							uni.showToast({
							    title: '刷新成功',
							    duration: 1000,
								icon:'none'
							});
							this.votetop = false
							this.voteallowtop = true
						}, 1000);
					}
					if(!this.attention_id){
						if(res.data.data.length>=20){
							this.voteList = res.data.data
							this.voteallowbottom = true
							this.showTitle = false
							
						}else{
							this.voteList = res.data.data
							this.voteallowbottom = false
							this.showTitle = true
						}														
					}else{
						
						if(res.data.data.length>=20){
							this.voteList = this.voteList.concat(res.data.data)
							// console.log(this.voteList)
							this.voteallowbottom = true
							this.showTitle = false
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.votebottom = false
							}, 1000);
							 
						}else{
							this.voteList = this.voteList.concat(res.data.data)
							this.voteallowbottom = false
							this.showTitle = true
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.votebottom = false
							}, 1000);
						}
					}
				})
			},
			// 服务列表
			getHistory(){
				this.$api.my_collect_sp({
					collect_id:this.collect_id,
					limit:20,
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					// console.log(res)
					if(!this.historyallowtop){
						setTimeout(()=>{
							uni.showToast({
							    title: '刷新成功',
							    duration: 1000,
								icon:'none'
							});
							this.historytop = false
							this.historyallowtop = true
						}, 1000);
					}
					if(!this.collect_id){
						// console.log(1)
						if(res.data.data.length>=20){
							this.historyList = res.data.data
							this.historyallowbottom = true
							this.showTitle1 = false
							
						}else{
							this.historyList = res.data.data
							this.historyallowbottom = false
							this.showTitle1 = true
						}														
					}else{
						// console.log(2)
						if(res.data.data.length>=20){
							this.historyList = this.historyList.concat(res.data.data)
							this.showTitle1 = false
							this.historyallowbottom = true
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.historybottom = false
							}, 1000);
							 
						}else{
							this.historyList = this.historyList.concat(res.data.data)
							this.historyallowbottom = false
							this.showTitle1 = true
							setTimeout(()=>{
								uni.showToast({
								    title: '加载成功',
								    duration: 1000,
									icon:'none'
								});
								this.historybottom = false
							}, 1000);
							
						}
						
						
					}
				})
			},
			changeSwiper(e){
				this.tabindex = e.detail.current
			},
			tab(ind){
				this.tabindex = ind
			},
			
			
		}
	}
</script>

<style>
	@import url("../../pagesMy/MyProject/MyProject.css");
	@import url("../../pages/service/service.css");
	@import url("../ServiceProvider/index.css");
	::-webkit-scrollbar{
		display: none;
	}
</style>
