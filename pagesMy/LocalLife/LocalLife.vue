<template>
	<view class="LocalLife">
		<!-- 头部定位选择 -->
		<view class="flex justify-between align-center top">
			<picker @change="bindPickerChange" mode = 'region'>
				<view class="flex align-center dingwei">
					<van-icon name="location" />
					<input type="text" disabled="" v-model="city"/>
				</view>
			</picker>
			<view class="all" @click="all">
				{{title}}
			</view>
		</view>
		
		<!-- 下面的样式 -->
		<van-transition :show="show" custom-class="block">
			
			<view class="LocalLife-list" v-if="shopList.length>0">
				<view class="border-bottom-new2" v-for="(item,index) in shopList" :key="index" style="padding: 15px 0;" >
					<!-- 标题 -->
					<view class="title">
						{{item.name}}
					</view>
					<!-- 标题下的距离等 -->
					<view class="flex justify-between  align-center" style="padding: 12upx 0;">
						
						<view class="flex align-center" style="flex: 1;">
							<view class="discount">
								{{item.discount}}						
							</view>
							<view class="cate">
								{{item.catename}}
							</view>
						</view>
						
						<view class="flex align-center" style="color:#064DC5;font-weight:400;color:rgba(6,77,197,1);font-size: 13px;">
							<view class="" @click="map(item)">
								{{item.distance}}km
							</view>
							<!-- <van-icon name="weapp-nav" style="margin-left: 5px;"/> -->
							<van-icon name="flag-o" style="margin-left: 5px;" @click="map(item)"/>
							<view class="" style="margin-left: 5px;">
								|
							</view>
							<view class="" style="margin-left: 5px;" @click="tel(item)">
								电话
							</view>
							<van-icon name="phone" style="margin-left: 5px;" @click="tel(item)"/>
						</view>
						
					</view>
					<!-- 图片 -->
					<view class="img" >
						<image :src="item1.src" v-for="(item1,index1) in item.images" :key="index1" v-show="index1<3" @click="yulan(item.images,index1)"></image>
					</view>
					<!-- 头像名字等 -->
					<view class="flex avatar" @click.stop="MyInfo(item.user_id)">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" ></image>
						
						<view class="flex" style="flex: 1;margin-left: 5px;color:rgba(102,102,102,1);font-weight:300;font-size:13px; align-self: center;">
							<view class="" style="margin-right: 5px;">
								<text>{{item.nickname}}</text>
							</view>
							<view style="flex:1;">
								<view v-for="(item2,index2) in item.club_data" :key="index2" v-show="item.club_data.length>0" style="width: 100%;">
									<text v-show="item2.name" > I </text>
									<text v-show="item2.name" class="left">{{item2.name}}</text>
									<text v-show="item2.dutyname" class="left"> · </text>
									<text v-show="item2.dutyname" class="left">{{item2.dutyname}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="LuDingJi-no" v-else style="overflow: hidden;">
				<view class="LuDingJi-icon1" style="margin: 150px auto 30px;width: 150px;height: 132px;">
					<image src="https://web.detion.com/static/img/empty_list.png" lazy-load="true"  mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					{{city}}暂无会友门店赶紧来入驻吧！
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle&&shopList.length>0">
					暂无更多内容
			</view>
			<!-- 上拉加载 -->
			<view style="height: 88upx; display: flex;  width: 100%;" v-if="loading">
				   <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</van-transition>
		
		<van-transition :show="!show" custom-class="block">
			<view class="category">
				<view v-for="(item,index) in list" :key="index" class="name" @click="category(item)">
					{{item.name}}
				</view>
			</view>
		</van-transition>
		
		<view class="ruzhu" @click="phone">
			<!-- <view class=""> -->
				<van-icon name="shop" color="#666666" style="margin-top: 5px;"/>
			<!-- </view> -->
			<view class="" style="color: #666666;font-size: 12px;">
				入驻
			</view>
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
				show:true,
				city:'哈尔滨',
				longitude:'',
				latitude:'',
				cate_id:'',
				page:1,
				shopList:[],
				list:[],
				loading:false,
				allowLoad:false,
				title:'全部',
				showTitle:false
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇本地生活',
			  imageUrl:app.shareImg,
			  path: '/pagesMy/LocalLife/LocalLife'
			}
		},
		onPullDownRefresh(){
			this.page = 1
			this.getData()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		// 触底加载
		onReachBottom(){
			if(this.allowLoad){
				this.allowLoad = false				
				this.loading = true
				this.page++
				this.getData()
				// setTimeout(() => {
					
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		onShow() {
			
			
		},
		onLoad(e) {
			var that = this
			uni.getLocation({
			    type: 'wgs84',
			    success: function (res) {
					that.longitude = res.longitude
					that.latitude = res.latitude
					that.getData()
					that.getCategory()
			    }
			});
			this.city = uni.getStorageSync('city')
			uni.showLoading({
			    title: '加载中'
			});
		},
		methods: {
			// 跳转个人主页
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			phone(){
				Dialog.confirm({
				  title: '入驻电话',
				  message:'拨打德申小助手电话?'
				}).then(() => {
					uni.makePhoneCall({
					    phoneNumber: '15645088075' //仅为示例
					});
				})
				
			},
			tel(it){
				uni.makePhoneCall({
				    phoneNumber: it.mobile //仅为示例
				});
			},
			map(it){
				uni.openLocation({
				    latitude: Number(it.latitude),
				    longitude: Number(it.longitude),
				    success: function () {
				        console.log('success');
				    }
				});
				
			},
			yulan(it,ind){
				console.log(it)
				var arr = []
				it.forEach((item,index)=>{
					arr.push(item.src)
				})
				 uni.previewImage({
					urls: arr,
					current:ind
				});
			},
			bindPickerChange(e){
				this.city = e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
				this.page = 1
				this.$nextTick(()=>{
					this.getData()
				})
			},
			category(it){
				this.cate_id = it.id
				this.page = 1
				this.getData()
				this.title = it.name
				this.show = true
			},
			getCategory(){
				this.$api.local_life_category_list({
				}).then(res=>{
					this.list = res.data.data
					this.list.unshift({
							"id": '',
							"name": "全部"
						})
				})
			},
			getData(){
				this.$api.local_life_list({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					longitude:this.longitude,
					latitude:this.latitude,
					city:this.city,
					cate_id:this.cate_id,
					page:this.page
				}).then(res=>{
					uni.hideLoading();
					if(res.data.code=== '200'){
						if(this.page===1){
							this.shopList = res.data.data
							if(res.data.data.length>=20){
								this.allowLoad= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowLoad= false
								this.loading =false
								this.showTitle = true
							}
						}else{
							this.shopList =this.shopList.concat(res.data.data) 
							if(res.data.data.length>=20){
								this.allowLoad= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowLoad= false
								this.loading =false
								this.showTitle = true
							}
						}
						
					}
				})
			},
			all(){
				this.show = !this.show
			}
		}
	}
</script>

<style>
	@import url("./LocalLife.css");
</style>
