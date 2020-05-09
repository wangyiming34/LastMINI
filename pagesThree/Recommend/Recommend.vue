<template>
	<view :class="{wrap1:list1.length!=0}">
		
		<!-- 粉丝列表 -->
		<view class="wrap">
			<view class="" v-if="list1.length>0" style="padding-top: 40px;">
				<view class="count1">
					总计：{{count}}人
				</view>
				<view v-for="(item,index) in list1" :key="index" class="wrapfor flex" :class="{bnew2:index+1!=list1.length}" @click="MyInfo(item.user_id)">
					<view class="forimg re" style="width: 50px;height: 50px;border-radius: 100%;">
						<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true"  mode="aspectFill" style="border-radius: 100%;"></image>
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
					暂无用户推荐
				</view>
			</view>
			<view  class="noMore1" v-if="list1.length>0&&showTitle">
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
				list1:[
					{user_id: 13072,
					  avatar: 'https://detion.oss-cn-beijing.aliyuncs.com/346F5221-E333-44DC-A525-112416BF2535.jpg',
					  nickname: 'dsadsada',
					  company: null,
					  job: null,
					  type: '2',
					  no: 10011,
					  created_at: 1223,
					  status: 4}
				],				
				page1:1,
				loading1:false,
				count:0,
				allow0:false,
				showTitle:false
				
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
				this.$api.my_recommend({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					page:this.page1
				}).then(res=>{
					// console.log(res)
					if (res.data.code === '200') {
						this.count = res.data.data.count
						if(this.page1 === 1){
							this.list1 = res.data.data.list
							if(res.data.data.list.length>=20){
								this.allow0 = true
								
							}else{
								this.showTitle = true
								this.allow0 = false
							}														
						}else{
							this.list1 = this.list1.concat(res.data.data.list)
							if(res.data.data.list.length>=20){
								this.allow0 = true
								
							}else{
								this.showTitle = true
								this.allow0 = false
							}	
						}
						this.loading1 = false

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
	.count1{
	font-size: 16px;
	line-height: 40px;
	padding: 0 3%;
	color: #333;
	position: fixed;
	top: 0;
	width: 100%;
	left: 0;
	z-index: 200;
	background: #fafafa;
	}
</style>
