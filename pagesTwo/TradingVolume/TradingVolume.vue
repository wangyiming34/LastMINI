<template>
	<view style="padding-top: 187px;">
		<!-- 上面 -->
		<view class="TradingVolume">
			<view class="TradingVolume-img">
				<image src="https://web.detion.com/static/images/TradingVolume.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="TradingVolume-tab flex justify-around align-center">
				<view v-for="(item,index) in tabList" :key="index" class="tabwrap re" :class="{tabActive:tabIndex===index}" @click="nav(index)">
					{{item}}
				</view>
			</view>
		</view>
		
		<!-- 下面列表 -->
		<!-- 第一页，全球榜单 -->
		<view v-show="tabIndex===0" style="padding: 0 32upx;">
			<view v-if="global_list.length>0">
				<!-- 自己的排名 -->
				<view class="global-myself flex align-center" @click.stop="goHistory(global_mylist[0].user_id)" v-if="global_mylist.length>0">
					<view>
						<view class="" v-if="global_mylist[0].num<4" style="width: 21px;height: 26px;">
							<image :src="global_mylist[0].num==1?'https://web.detion.com/static/images/one.png':global_mylist[0].num==2?'https://web.detion.com/static/images/two.png':global_mylist[0].num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view v-else style="font-size:16px;color:rgba(102,102,102,1);">
							{{global_mylist[0].num>9?global_mylist[0].num :'0'+global_mylist[0].num}}
						</view>
					</view>
					<view style="width: 40px;height: 40px;margin: 0 20upx;" @click.stop="MyInfo(global_mylist[0].user_id)">
						<image :src="global_mylist[0].avatar?global_mylist[0].avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" style="border-radius: 100%;"></image>
					</view>
					<view style="flex: 1;">
						<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{global_mylist[0].toatl}}万</text>
						<text style="color:#666666;font-size: 13px;font-weight: 400;">我的成交额</text>
					</view>
				</view>
				<!-- 别人的排名 -->
				<view class="global-other flex align-center border-bottom-new2" v-for="(item,index) in global_list" :key="index" @click.stop="goHistory(item.user_id)" style="padding: 15px 0;">
					<view>
						<view class="" v-if="item.num<4" style="width: 21px;height: 26px;">
							<!-- <image :src="item.num==1?'../../static/img/icon1.png':item.num==2?'../../static/img/icon2.png':item.num==3?'../../static/img/icon3.png':''" lazy-load="true" class="imga" mode="aspectFill"></image> -->
							
							<image :src="item.num==1?'https://web.detion.com/static/images/one.png':item.num==2?'https://web.detion.com/static/images/two.png':item.num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view style="font-size:16px;color:rgba(102,102,102,1);" v-else>
							{{item.num>9?item.num :'0'+item.num}}
						</view>
					</view>
					<view style="width: 40px;height: 40px;margin: 0 20upx;" @click.stop="MyInfo(item.user_id)">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" style="border-radius: 100%;"></image>
					</view>
					<view style="flex: 1;">
						<view class="">
							<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{item.toatl}}万</text>
							<text style="color:#666666;font-size: 13px;font-weight: 400;">成交额</text>
						</view>
						<view style="font-size:13px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 2px;">
							<text>{{item.name}}</text>
							<text v-if="item.club_name">I</text>
							<text v-if="item.club_name">{{item.club_name}}</text>
							<text v-if="item.club_duty">·</text>
							<text v-if="item.club_duty">{{item.club_duty}}</text>
						</view>
						<view style="font-size:13px;font-weight:300;color:rgba(102,102,102,1);" v-if="item.company_name">
							{{item.company_name}}
						</view>
					</view>
				</view>
			</view>
			<!-- 无数据显示 -->
			<view class="LuDingJi-no" v-else>
				<view class="LuDingJi-icon1">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无数据
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle1&&global_list.length>0">
					暂无更多内容
			</view>
			<!-- 触底加载 -->
			<view style="height: 88upx;display: flex;  width: 100%;" v-if="loading1">
				 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第二页，城市榜单 -->
		<view v-show="tabIndex===1" style="padding: 0 32upx;">
			<view v-if="china_list.length>0">
				<!-- 自己的排名 -->
				<view class="global-myself flex align-center" @click.stop="goCity(china_mylist[0].name)" v-if="china_mylist.length>0">
					<view>
						<view class="" v-if="china_mylist[0].num<4" style="width: 21px;height: 26px;">
							<!-- <image :src="china_mylist[0].num==1?'../../static/img/icon1.png':china_mylist[0].num==2?'../../static/img/icon2.png':china_mylist[0].num==3?'../../static/img/icon3.png':''" lazy-load="true" class="imga" mode="aspectFill"></image> -->
							
							<image :src="china_mylist[0].num==1?'https://web.detion.com/static/images/one.png':china_mylist[0].num==2?'https://web.detion.com/static/images/two.png':china_mylist[0].num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view v-else style="font-size:16px;color:rgba(102,102,102,1);">
							{{china_mylist[0].num>9?china_mylist[0].num :'0'+china_mylist[0].num}}
						</view>
					</view>
					
					<view style="flex: 1; margin-left: 20px;">
						<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{china_mylist[0].toatl}}万</text>
						<text style="color:#666666;font-size: 13px;font-weight: 400;">我所在的城市成交额</text>
					</view>
				</view>
				<!-- 别人的排名 -->
				<view class="global-other flex align-center border-bottom-new2" v-for="(item,index) in china_list" :key="index" @click.stop="goCity(item.name)" style="padding: 15px 0;">
					<view>
						<view class="" v-if="item.num<4" style="width: 21px;height: 26px;">
							<!-- <image :src="item.num==1?'../../static/img/icon1.png':item.num==2?'../../static/img/icon2.png':item.num==3?'../../static/img/icon3.png':''" lazy-load="true" class="imga" mode="aspectFill"></image> -->
							
							<image :src="item.num==1?'https://web.detion.com/static/images/one.png':item.num==2?'https://web.detion.com/static/images/two.png':item.num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
							
						</view>
						<view style="font-size:16px;color:rgba(102,102,102,1);" v-else>
							{{item.num>9?item.num :'0'+item.num}}
						</view>
					</view>
					
					<view style="flex: 1;margin-left: 20px;">
						<view class="">
							<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{item.toatl}}万</text>
							<text style="color:#666666;font-size: 13px;font-weight: 400;">成交额</text>
						</view>
						<view style="font-size:13px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 2px;">
							<text>{{item.name}}</text>
						</view>
						
					</view>
				</view>
			</view>
			<!-- 无数据显示 -->
			<view class="LuDingJi-no" v-else>
				<view class="LuDingJi-icon1">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无数据
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle2&&china_list.length>0">
					暂无更多内容
			</view>
			<!-- 触底加载 -->
			<view style="height: 88upx;display: flex;  width: 100%;" v-if="loading2">
				 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<!-- 第三页，俱乐部榜单 -->
		<view v-show="tabIndex===2" style="padding: 0 32upx;">
			<view v-if="club_list.length>0">
				<!-- 自己的排名 -->
				<view class="global-myself flex align-center" v-for="(item5,index5) in club_mylist" :key="index5" @click.stop="goClub(item5.club_id)">
					<view>
						<view class="" v-if="item5.num<4" style="width: 21px;height: 26px;">
							<!-- <image :src="item5.num==1?'../../static/img/icon1.png':item5.num==2?'../../static/img/icon2.png':item5.num==3?'../../static/img/icon3.png':''" lazy-load="true" class="imga" mode="aspectFill"></image> -->
							
							<image :src="item5.num==1?'https://web.detion.com/static/images/one.png':item5.num==2?'https://web.detion.com/static/images/two.png':item5.num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view v-else style="font-size:16px;color:rgba(102,102,102,1);">
							{{item5.num>9?item5.num :'0'+item5.num}}
						</view>
					</view>
					
					<view style="flex: 1; margin-left: 20px;">
						<view class="">
							<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{item5.toatl}}万</text>
							<text style="color:#666666;font-size: 13px;font-weight: 400;">我所在的俱乐部</text>
						</view>
						
						<view style="font-size:13px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 2px;">
							{{item5.name}}
						</view>
						
					</view>
				</view>
				<!-- 别人的排名 -->
				<view class="global-other flex align-center border-bottom-new2" v-for="(item,index) in club_list" :key="index" @click.stop="goClub(item.club_id)" style="padding: 15px 0;">
					<view>
						<view class="" v-if="item.num<4" style="width: 21px;height: 26px;">
							<!-- <image :src="item.num==1?'../../static/img/icon1.png':item.num==2?'../../static/img/icon2.png':item.num==3?'../../static/img/icon3.png':''" lazy-load="true" class="imga" mode="aspectFill"></image> -->
							<image :src="item.num==1?'https://web.detion.com/static/images/one.png':item.num==2?'https://web.detion.com/static/images/two.png':item.num==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view style="font-size:16px;color:rgba(102,102,102,1);" v-else>
							{{item.num>9?item.num :'0'+item.num}}
						</view>
					</view>
					
					<view style="flex: 1;margin-left: 20px;">
						<view class="">
							<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{item.toatl}}万</text>
							<text style="color:#666666;font-size: 13px;font-weight: 400;">成交额</text>
						</view>
						<view style="font-size:13px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 2px;">
							<text>{{item.name}}</text>
						</view>
						
					</view>
				</view>
			</view>
			<!-- 无数据显示 -->
			<view class="LuDingJi-no" v-else>
				<view class="LuDingJi-icon1">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无数据
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle3&&club_list.length>0">
					暂无更多内容
			</view>
			<!-- 触底加载 -->
			<view style="height: 88upx;display: flex;  width: 100%;" v-if="loading3">
				 <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		<view class="gotoTop">
		        <view class="gotoTop-send"  @click="Issue" >
					<van-icon name="records" size="20px"/>
					<view>
						发布
					</view>
		        </view>
		</view>
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		data() {
			return {
				showTitle3:false,
				showTitle2:false,
				showTitle1:false,
				myClub:[],
				tabIndex:0,
				tabList:['全球总榜','城市榜','俱乐部榜'],
				global_page: 1, // 全球榜分页
				global_list: [], // 全球榜
				global_mylist: [],
				loading1:false,
				allow1:false,
				
				china_page: 1, // 城市分页
				china_list: [], // 城市榜
				china_mylist: [],
				loading2:false,
				allow2:false,
				
				club_page: 1, // 俱乐部分页
				club_list: [], // 俱乐部榜
				club_mylist: [],
				loading3:false,
				allow3:false
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '交易额',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/TradingVolume/TradingVolume'
			}
		},
		onLoad() {
			this.my()
			this.getGlobal()
			this.getChina()
		},
		// 下拉刷新
		onPullDownRefresh() {
			if(this.tabIndex === 0){
				this.global_page = 1
				this.getGlobal()
				setTimeout(function () {
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '刷新成功',
						duration: 1000,
						icon:'none'
					});
				}, 1000);
			}
			
			if(this.tabIndex === 1){
				this.china_page = 1
				this.getChina()
				setTimeout(function () {
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '刷新成功',
						duration: 1000,
						icon:'none'
					});
				}, 1000);
			}
			
			if(this.tabIndex === 2){
				this.club_page = 1
				this.getClub()()
				setTimeout(function () {
					uni.stopPullDownRefresh();
					uni.showToast({
						title: '刷新成功',
						duration: 1000,
						icon:'none'
					});
				}, 1000);
			}

		},
		// 触底加载
		onReachBottom(){
			// 第一页的上拉加载
			if(this.tabIndex ===0 && this.allow1){
				this.allow1 = false
				this.loading1 = true
				this.global_page++
				this.getGlobal()
				// setTimeout(() => {
				// 	this.global_page++
				// 	this.getGlobal()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				//   }, 1500)	
			}
			
			if(this.tabIndex ===1 && this.allow2){
				this.allow2 = false
				this.loading2 = true
				this.china_page++
				this.getChina()
				// setTimeout(() => {
				// 	this.china_page++
				// 	this.getChina()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				//   }, 1500)	
			}
			
			if(this.tabIndex ===2 && this.allow3){
				this.allow3 = false
				this.loading3 = true
				this.club_page++
				this.getClub()()
				// setTimeout(() => {
				// 	this.club_page++
				// 	this.getClub()()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				//   }, 1500)	
			}

		},
		methods: {
			goClub(id){
				uni.navigateTo({
					url:'../../pagesTwo/TradingClub/TradingClub?id='+id
				})
			},
			goCity(name){
				uni.navigateTo({
					url:'../../pagesTwo/TradingCity/TradingCity?name='+name
				})
			},
			goHistory(id){
				uni.navigateTo({
					url:'../../pagesTwo/TradingHistory/TradingHistory?id='+id
				})
			},
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 发布跳转
			Issue(){
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
					}, 300);
					
				}else{
					if (uni.getStorageSync('isVip') === 0) {
						Dialog.confirm({
						  title: '提示',
						  message: '您还不是VIP用户,没有发布权限',
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
							url:'../../pagesTwo/TradingVolumeSend/TradingVolumeSend'
						})
					  } else {
						uni.clearStorageSync()
						uni.showToast({
						    title: '请登录',
						    duration: 2000,
							icon:'none'
						});
						
						uni.reLaunch({
							url: '../../pages/login/login'
						})
					  }
				}
				
			},
			// 全球榜
			getGlobal(){
				this.$api.Turnover_index({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type: 0,
					page: this.global_page
			    }).then(res => {
					// console.log(res)
					if(res.data.code === '200'){
						if(this.global_page === 1){
							if(res.data.data.data.length>=30){
								this.global_list = res.data.data.data
								this.global_mylist = res.data.data.now
								this.allow1 = true
								this.loading1 = false
							}else{
								this.global_list = res.data.data.data
								this.global_mylist = res.data.data.now
								this.allow1 = false
								this.loading1 = false
								this.showTitle1 = true
							}														
						}else{
							if(res.data.data.data.length>=30){
								this.global_list = this.global_list.concat(res.data.data.data)
								this.allow1 = true
								this.loading1 = false
							}else{
								this.global_list = this.global_list.concat(res.data.data.data)
								this.allow1 = false
								this.loading1 = false
								this.showTitle1 = true
							}	
						}
					}
				})
			},
			// 城市榜
			getChina(){
				this.$api.Turnover_index({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type: 1,
					page: this.china_page,
					city_name:uni.getStorageSync('city')
			    }).then(res => {
					// console.log(res)
					if(res.data.code === '200'){
						if(this.china_page === 1){
							if(res.data.data.data.length>=30){
								this.china_list = res.data.data.data
								this.china_mylist = res.data.data.now
								this.allow2 = true
								this.loading2 = false
							}else{
								this.china_list = res.data.data.data
								this.china_mylist = res.data.data.now
								this.allow2 = false
								this.loading2 = false
								this.showTitle2 = true
							}														
						}else{
							if(res.data.data.data.length>=30){
								this.china_list = this.china_list.concat(res.data.data.data)
								this.allow2 = true
								this.loading2 = false
							}else{
								this.china_list = this.china_list.concat(res.data.data.data)
								this.allow2 = false
								this.loading2 = false
								this.showTitle2 = true
							}	
						}
					}
				})
			},
			// 俱乐部榜
			getClub(){
				this.$api.Turnover_index({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					type: 2,
					page: this.club_page,
					club_data:JSON.stringify(this.myClub)
			    }).then(res => {
					// console.log(res)
					if(res.data.code === '200'){
						if(this.club_page === 1){
							if(res.data.data.data.length>=30){
								this.club_list = res.data.data.data
								this.club_mylist = res.data.data.now
								this.allow3 = true
								this.loading3 = false
							}else{
								this.club_list = res.data.data.data
								this.club_mylist = res.data.data.now
								this.allow3 = false
								this.loading3 = false
								this.showTitle3 = true
							}														
						}else{
							if(res.data.data.data.length>=30){
								this.club_list = this.club_list.concat(res.data.data.data)
								this.allow3 = true
								this.loading3 = false
							}else{
								this.club_list = this.club_list.concat(res.data.data.data)
								this.allow3 = false
								this.loading3 = false
								this.showTitle3 = true
							}	
						}
					}
				})
			},
			nav(ind){
				this.tabIndex = ind
			},
			my(){
				this.$api.Myself_index({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId")
				}).then(res=>{
					this.myClub = res.data.data.club_data
					this.getClub()
				})
			}
		}
	}
</script>

<style>
	@import url("./TradingVolume.css");
</style>
