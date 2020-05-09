<template>
	<view style="padding-top: 120px;">
		<!-- 上面 -->
		<view class="TradingVolume flex " style="background-color: #004BCB;height: 120px;padding-left: 10px;">
			<!-- 自己的排名 -->
			<view class="global-myself flex align-center" style="background-color: #004BCB;align-self: center;">
				<view style="width: 40px;height: 40px;margin: 0 20upx;" @click.stop="MyInfo(global_mylist.user_id)">
					<image :src="global_mylist.avatar?global_mylist.avatar:'../../static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill" style="border-radius: 100%;"></image>
				</view>
				<view style="flex: 1;">
					<view class="">
						<text style="color:white;font-size: 18px;font-weight: 500;">{{total}}万</text>
						<text style="color:white;font-size: 13px;font-weight: 400;opacity: .7;">成交额</text>
					</view>
					<view style="font-size:13px;font-weight:500;color:white;margin-bottom: 2px;opacity: .7;">					
							<text>{{global_mylist.name}}</text>
							<text v-if="global_mylist.company">I</text>
							<text v-if="global_mylist.company">{{global_mylist.company}}</text>
					</view>
					<view style="font-size:13px;font-weight:300;color:white;opacity: .7;" v-for="(item,index) in club" :key="index">
						<text>{{item.name}}</text><text>·</text><text>{{item.job}}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 下面列表 -->
		<!-- 第一页，全球榜单 -->
		<view style="padding: 0 32upx;">
			<view>
				<!-- 别人的排名 -->
				<view class="global-other flex align-center border-bottom-new2 justify-between" v-for="(item,index) in global_list" :key="index" style="padding: 17px 0;">
					<view style="
					font-size:18px;
					font-weight:600;
					color:rgba(255,42,42,1);
					">
						{{item.amount}}万
					</view>
					<view style="
					font-size:16px;
					font-weight:400;
					color:rgba(153,153,153,1);
					">
						{{item.created_at.split(' ')[0]}}
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
		<!-- 提示框 -->
		<van-toast id="van-toast" />
		<!-- 确认框 -->
		<van-dialog id="van-dialog" />
		
	</view>
</template>

<script>
	import Toast from '../../wxcomponents/vant/dist/toast/toast';
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		data() {
			return {
				other_id:'',
				global_page: 1, // 全球榜分页
				global_list: [], // 全球榜
				global_mylist: [],
				loading1:false,
				allow1:false,
				total:'',
				club:[]
			}
		},
		onLoad(e) {
			this.other_id = e.id
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
			// 列表
			getinfo(){
				this.$api.Turnover_user_detail({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					other_id:this.other_id,
					page: this.global_page,
					limit:30
			    }).then(res => {
					console.log(res)
					if(res.data.code === '200'){
						this.total = res.data.data.total
						if(this.global_page === 1){
							if(res.data.data.list.length>=30){
								this.global_list = res.data.data.list
								this.global_mylist = res.data.data.user
								this.club = res.data.data.clubs
								this.allow1 = true
								this.loading1 = false
							}else{
								this.global_list = res.data.data.list
								this.global_mylist = res.data.data.user
								this.club = res.data.data.clubs
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
