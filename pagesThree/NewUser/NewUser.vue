<template>
	<view class="wrap1">
		
		<!-- 粉丝列表 -->
		<view class="wrap">
			<view class="">
				<view v-for="(item,index) in list1" :key="index" class="wrapfor flex" :class="{bnew2:index+1!=list1.length}" @click="MyInfo(item.user_id)">
					<view class="forimg re">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true"  mode="aspectFill"></image>
						<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
					</view>
					<view class="formiddle line-clamp1">
						<view class="forjob line-clamp1">
							<text>{{item.nickname}}</text>
							<text v-if="item.job" style="margin: 0 2px;">·</text>
							<text v-if="item.job">{{item.job}}</text>
						</view>
						<view class="forcompany line-clamp1" v-if="item.company">
							{{item.company}}
						</view>
					</view>
					<view class="align-self" @click.stop="vote(item)">
						<view class="huxiang flex align-center " v-if="item.status==1" >
							<van-icon name="exchange" class="formar"/>
							<text>互相关注</text>
						</view>
						
						<view class="huxiang flex align-center " v-if="item.status==2" >
							<text>已关注</text>
						</view>
						
						<view class="guan flex align-center" v-if="item.status==3 || item.status == 4">
							<text class="formar" style="margin-top: -4upx;">+</text>
							<text>关注</text>
						</view>
					</view>
					
				</view>
			</view>
			<!-- 没有数据显示 -->
			<view class="LuDingJi-no" v-if="list1.length==0" style="overflow: hidden;">
				<view class="LuDingJi-icon1">
					<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="LuDingJi-no-con">
					暂无新用户
				</view>
			</view>
			<view  class="noMore1" v-if="showTitle&&list1.length>0">
					暂无更多内容
			</view>
			<!-- 加载更多 -->
			<view style="height: 88upx; display: flex;width: 100%;" v-if="loading1">
			     <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
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
				list1:[],				
				page1:1,
				loading1:false,
				showTitle:false,
				allow0:false
				
			}
		},
		onLoad() {
			this.getFan()
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.allow0){
				this.allow0 = false
				this.loading1 = true
				this.page1++
				this.getFan()
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.page1 = 1
			this.getFan()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000)
		},
		methods: {
			
			getFan(){
				this.$api.new_users({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					page:this.page1
				}).then(res=>{
					// console.log(res)
					if (res.data.code === '200') {
						
						
						// 第一页的时候
						if(this.page1 === 1){
							this.list1 = res.data.data
							// 大于20条允许 继续加载,少于20条不允许加载并且显示没有更多
							if(res.data.data.length>=20){
								// 控制是否允许加载的变量
								this.allow0 = true
							}else{
								// 控制没有更多的变量
								this.showTitle = true
								this.allow0 = false
							}														
						}else{
							// 第二页的时候
							this.list1 = this.list1.concat(res.data.data)
							if(res.data.data.length>=20){
								this.allow0 = true
							}else{
								this.showTitle = true
								this.allow0 = false
							}	
						}
						// 加载进度条,加载完都得去掉
						this.loading1 = false
						
						
						  // if (this.page1 === 1) {
							 //  this.list1 = res.data.data
							 //  this.loading1 = false
						  // } else {
							 //  if(res.data.data.length){
								//   setTimeout(()=>{
								// 	  this.list1 = this.list1.concat(res.data.data)
								// 	  this.loading1 = false
								// 	  uni.showToast({
								// 		title:'加载成功',
								// 		icon:"none"
								// 	  })
								//   },1500)
							 //  }else{
								//   this.loading1 = false
								//   uni.showToast({
								// 	title:'没有更多的数据了',
								// 	icon:"none"	,								  	
								//   })
							 //  }
						  // }
						
					}else if (res.data.code === '1010') {
					  uni.clearStorageSync()
					  uni.showToast({
					      title: '登录过期，请重新登录',
					      duration: 2000,
					  	icon:'none'
					  });
					  
					  uni.reLaunch({
					  	url: '../../pages/login/login'
					  })
					}
					// console.log(this.list1)
				})
			},
			
			MyInfo(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 点击关注 取消等
			vote (item) {
			  if (item.status === 1 || item.status === 2) { // 如果是是互相关注，或者是已关注，点击即是取消关注，显示关注
				Dialog.confirm({
				  title: '提示',
				  message: '确定取消关注吗？'
				}).then(() => {
					this.follow(item)
				}).catch(() => {
				  // on cancel
				});
			    
			  } else if (item.status === 3) { // 如果是被关注，点击关注显示互相关注
			    this.follow(item)
			  } else if (item.status === 4) { // 如果是都未关注，显示已关注
			    this.follow(item)
			  }
			},
			follow (item) {
			  this.$api.NewsFollow({
			    token: uni.getStorageSync("token"),
			    user_id: uni.getStorageSync("userId"),
			    follow_id: item.user_id
			  }).then(res => {
			    item.status = res.data.data
			    Toast(res.data.msg)
				
			  })
			}
		}
	}
</script>

<style>
	@import url("../../pagesTwo/MyVoteList/MyVoteList.css");
</style>
