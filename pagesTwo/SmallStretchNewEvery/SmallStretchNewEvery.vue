<template>
	<view class="wrap1" style="overflow: hidden;background-color: white;">
		
		<!-- 选项卡下面的选项内容3 -->
		<view class="zongBanner">
			
			  <!-- 我的关注 -->
			  <view>
				  
				  <!-- 大家都在看 -->
				  <view class="vote-every">
					  <!-- <view class="vote-every-look">
						  <view id="vote-every-look-blue"></view>
						  <view>大家都在看</view>
					  </view> -->
					  <view v-for="(item,index) in everyList" :key="index" class="juhuasuan-loadmore-con" @click.stop="goSmallStretchPvw(item.id)">
						  <view class="juhuasuan-con border-bottom">
							  <view class="juhuasuan-con-img" >
								<image :src="item.image?item.image:item.images[0].url_image" lazy-load="true" mode="aspectFill"></image>
							  </view>

							  <view>
								<view class="juhuasuan-con-title">{{item.name}}</view>
								<view class="juhuasuan-con-tap">
								  <view class="juhuasuan-con-zhekou">
									<img src="https://web.detion.com/static/images/youhui.png" alt="">
									<view>{{parseInt(item.current_price/item.original_price*10*10)/10}}折</view>
								  </view>

								  <text v-if="n===0" class="juhuasuan-con-biaoqian">
									  {{item.cate_name}}
								  </text>
								</view>
								<view class="juhuasuan-con-price">
									<text>¥{{item.current_price.split('.')[0]}}.</text>
									<text>{{item.current_price.split('.')[1]}}</text>
									<text>¥{{item.original_price}}</text>
								</view>
								
								<!-- 新加的关注，点击 -->
								<view class="flex align-center" style="font-size:13px;font-weight:400;color:rgba(102,102,102,1);">
									<van-icon name="eye-o" size="17px"/>
									<view class="youhaowu3click">
										{{item.click}}
									</view>
									<van-icon name="star-o" size="15px"/>
									<view class="youhaowu3click">
										{{item.like}}
									</view>
								</view>
							  </view>
						  </view>
					  </view>

				  </view>
			  </view>
			  <view  class="noMore1" v-if="showTitle">
			  		暂无更多内容
			  </view>
			  <!-- 大家都在看加载更多 -->
			  <view style="height: 88upx;display: flex;  width: 100%;" v-if="loadingThree">
			       <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			  </view>
		</view>
		
		
		
		<!-- <view class="gotoTop">
		        <view class="gotoTop-send gotoTop-top" @click="fnscroll" v-if="!topShow">
					<van-icon name="upgrade" size="20px"/>
					<view>
						置顶
					</view>
		        </view>
		</view> -->
		
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	var app = getApp().globalData
	export default {
		components: {
		},
		data() {
			return {
				fin:false,
				loadingOne:false,
				loadingThree:false,
				n:0,  //控制三页分类选项卡的
				n1:0,
				n2:0,
				currentIndex:1, //控制头部选项卡的
				nav_list: ['友好物', '巨划算', '我关注'],
				bannerList:[],
				swiperCurrent: 0,
				classifyList: [], //分类列表，自己加全部
				ListData:[], //友好物列表
				category_id:'',//首页分类id
				page:1, //首页分页page
				category_id1:'',//聚划算分类id
				page1:1, //聚划算分页page
				chinaList:[],
				category_id2:'',//我关注分类id
				page2:1, //我关注分页page
				voteList:[],// 我关注的列表
				everyList:[], // 大家都在看列表
				scrollTop0:0,
				scrollTop1:0,
				scrollTop2:0,
				topShow:true,
				leftItems:[],
				rightItems:[],
				leftHeight:0,
				rightHeight:0,
				// 新增分类
				pagelist:["关注量","最新上传","查看量"],
				pageIndex1:0,
				pageIndex2:0,
				pageIndex3:0,
				order_type1:'',
				order_type2:'',
				order_type3:'',
				allow0:false,
				showTitle:false
				
			}
		},
		onPullDownRefresh(){
			this.page2 = 1
			this.everyLook()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		// 上拉加载更多
		onReachBottom(){
			
			if(this.allow0){
				this.allow0 = false
				this.loadingThree = true
				this.page2++
				this.everyLook()
			}
			
		},
		onLoad() {
			this.everyLook()
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {
				console.log('分享')
		    }
			return {
			      title: '德申汇小申展',
				  imageUrl:app.shareImg,
				  path: '/pagesMy/SmallStretch/SmallStretch'
			}
		},
		
		onPageScroll(e) {
			if(e.scrollTop>200){
				this.topShow = false
			}else{
				this.topShow = true
			}
		},
		methods: {
			
			// 发布
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
								url:'../pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						if (this.currentIndex === 0 || this.currentIndex === 1) {
						  uni.navigateTo({
						  	url:'../StretchIndexSend/StretchIndexSend'
						  })
						} else if (this.currentIndex === 2) {
						  uni.navigateTo({
						  	url:'../IssueHistory/IssueHistory'
						  })
						}
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
			// 置顶
			fnscroll(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			// 去详情
			goSmallStretchPvw(id){
				uni.navigateTo({
					url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+id
				})
			},
			

			// 大家都在看
			everyLook () {
			      this.$api.SmallStretchLook({
			        page: this.page2
			      }).then(res => {
			        if (res.data.code === '200') {
						// 第一页的时候
						if(this.page2 === 1){
							this.everyList = res.data.data
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
							this.everyList = this.everyList.concat(res.data.data)
							if(res.data.data.length>=20){
								this.allow0 = true
							}else{
								this.showTitle = true
								this.allow0 = false
							}	
						}
						// 加载进度条,加载完都得去掉
						this.loadingThree = false
						
						
						 // if (this.page2 === 1) {
							//   this.everyList = res.data.data
							//   // console.log(this.chinaList)
							//   this.loadingThree = false
						 // } else {
							//   if(res.data.data.length){
							// 	  setTimeout(()=>{
							// 		  this.everyList = this.everyList.concat(res.data.data)
							// 		  this.loadingThree = false
							// 		  uni.showToast({
							// 			title:'加载成功',
							// 			icon:"none"
							// 		  })
							// 	  },1500)
							//   }else{
							// 	  this.loadingThree = false
							// 	  uni.showToast({
							// 		title:'没有更多的数据了',
							// 		icon:"none"	,								  	
							// 	  })
							//   }							
						 // }
			        } else if (res.data.code === '1010') {
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
			    }
			
		}
	}
</script>

<style>
	@import url("../../pagesTwo/SmallStretchNew/SmallStretchNew.css");
</style>
