<template>
	<view style="padding-top: 100px;">
		<!-- 上面 -->
		<view class="TradingVolume" style="background-color: #004BCB;height: 100px;padding-left: 10px;padding-top: 20px;">
			<!-- 金额 -->
			<view class="global-myself " style="background-color: #004BCB;color: white;font-size:16px ;width: 100%;">
				<view style="font-weight:500 ;text-align: center;">
					<text style="font-size: 35px;">{{total}}</text>万
				</view>
				<view style="font-weight:400 ;opacity: .7;text-align: center;">
					成交额
				</view>
			</view>
		</view>
		
		<!-- 下面列表 -->
		<!-- 第一页，全球榜单 -->
		<view style="padding: 0 32upx;">
			<view>
				<!-- 别人的排名 -->
				<view class="global-other flex align-center border-bottom-new2" v-for="(item,index) in global_list" :key="index" @click.stop="goClub(item.club_id)">
					<view>
						<view class="" v-if="item.rownum<4" style="width: 21px;height: 26px;">
							<image :src="item.rownum==1?'https://web.detion.com/static/images/one.png':item.rownum==2?'https://web.detion.com/static/images/two.png':item.rownum==3?'https://web.detion.com/static/images/three.png':''" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view style="font-size:16px;color:rgba(102,102,102,1);" v-else>
							{{item.rownum>9?item.rownum :'0'+item.rownum}}
						</view>
					</view>
					
					<view style="flex: 1;margin-left: 20px;">
						<view class="">
							<text style="color:#FF2A2A;font-size: 18px;font-weight: 500;">{{item.total}}万</text>
							<text style="color:#666666;font-size: 13px;font-weight: 400;">成交额</text>
						</view>
						<view style="font-size:13px;font-weight:500;color:rgba(51,51,51,1);margin-bottom: 2px;">
							<text>{{item.name}}</text>
						</view>
						
					</view>
				</view>
			</view>
			
			<!-- 触底加载 -->
			<view style="height: 88upx;background-color: #C0C0C0; display: flex;  width: 100%;" v-if="loading1">
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
	export default {
		data() {
			return {
				name:'',
				global_page: 1, // 全球榜分页
				global_list: [], // 全球榜
				global_mylist: [],
				loading1:false,
				allow1:false,
				total:''
			}
		},
		onLoad(e) {
			this.name = e.name
			setTimeout(()=>{
				this.getinfo()
			}, 300);
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.global_page = 1
			this.getinfo()
			setTimeout(function () {
				uni.stopPullDownRefresh();
				uni.showToast({
					title: '刷新成功',
					duration: 1000,
					icon:'none'
				});
			}, 2000);
		},
		// 触底加载
		onReachBottom(){
			// 第一页的上拉加载
			if(this.allow1){
				this.allow1 = false
				this.loading1 = true
				setTimeout(() => {
					this.global_page++
					this.getinfo()
					uni.showToast({
						title: '加载成功',
						duration: 1000,
						icon:'none'
					});
				  }, 1500)	
			}
		},
		methods: {
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
			goClub(id){
				if(id==0){
					uni.navigateTo({
						url:'../../pagesTwo/TradingClubFree/TradingClubFree?city='+this.name
					})
				}else{
					uni.navigateTo({
						url:'../../pagesTwo/TradingClub/TradingClub?id='+id
					})
				}
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
			// 列表
			getinfo(){
				this.$api.city_rank_clublist({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					city:this.name,
					page: this.global_page,
					limit:30
			    }).then(res => {
					console.log(res)
					if(res.data.code === '200'){
						this.total = res.data.data.total
						if(this.global_page === 1){
							if(res.data.data.list.length>=30){
								this.global_list = res.data.data.list
								this.allow1 = true
								this.loading1 = false
							}else{
								this.global_list = res.data.data.list
								this.allow1 = false
								this.loading1 = false
							}														
						}else{
							if(res.data.data.list.length>=30){
								this.global_list = this.global_list.concat(res.data.data.list)
								this.allow1 = true
								this.loading1 = false
							}else{
								this.global_list = this.global_list.concat(res.data.data.list)
								this.allow1 = false
								this.loading1 = false
							}	
						}
					}
				})
			}
		}
	}
</script>

<style>
	@import url("../TradingVolume/TradingVolume.css");
</style>
