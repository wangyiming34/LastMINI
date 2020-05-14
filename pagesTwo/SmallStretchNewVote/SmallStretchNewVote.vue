<template>
	<view class="wrap1" style="overflow: hidden;background-color: white;padding-top: 44px;">
		
		<!-- 选项卡下面的选项内容3 -->
		<view class="zongBanner">
			
			<!-- 分类选择 -->
			<view class="classify" style="top: 0;left: 0;">
					<scroll-view scroll-x="true" class="scroll-view_H">
						<view v-for="(item,index) in classifyList" :key="index" class="scroll-view-item_H classify-name" 
						@click="classifyChange2(index,item.id)" :class="n2===index?'classifyActive':''">
							{{item.name}}
						</view>
					</scroll-view>
			</view>
			<!-- 下划线 -->
		    <view class="stretchIndex-classify-line"></view>
			  <!-- 我的关注 -->
			  <view>
				  <view v-for="(item,index) in voteList" :key="index" class="juhuasuan-loadmore-con"
				  v-if="item.is_sale_out=='0'||item.deleted_at=='null'" @click.stop="goSmallStretchPvw(item.exhibition_id)"
				  >
					<view  @longpress="touch(item)">
					  <view class="guanzhu-name">
							  <text>{{item.nickname}}</text>
							  <text v-if="item.company"> I </text>
							  <text v-if="item.company">{{item.company}}</text>
					  </view>
					  <view class="juhuasuan-con border-bottom" >
						  <view class="juhuasuan-con-img" style="width:75px;height:75px" >
							<image :src="item.image?item.image:item.images[0].url_image" lazy-load="true" mode="aspectFill"></image>
						  </view>
						  <view >
							<view class="juhuasuan-con-title">{{item.name}}</view>
							<view class="new-zixun">
								<view class="juhuasuan-con-price">
									<text>¥{{item.current_price.split('.')[0]}}.</text>
									<text>{{item.current_price.split('.')[1]}}</text>
								</view>

							</view>

						  </view>
					  </view>
					</view>
					<text class="mm-zixun" @click.stop="phone(item.mobile)">
						  立即咨询
					</text>
				  </view>
				 <view v-for="(item5,index5) in voteList" :key="index5" class="juhuasuan-loadmore-con"
				  v-show="item5.is_sale_out=='1'||item5.deleted_at">

					<view style="position: relative;"  @longpress="touch(item5)">
						  <view class="mm-shixiao">
							 失效
						  </view>
						  <view style="opacity:.4 ; padding-left:40px">
							   <view class="guanzhu-name" style="opacity:.4 ;">
									  <text>{{item5.nickname}}</text>
									  <text v-if="item5.company"> I </text>
									  <text >{{item5.company}}</text>
							  </view>
							  <view class="juhuasuan-con border-bottom" >
								  <view class="juhuasuan-con-img" style="width:75px;height:75px" >
									<image :src="item5.image?item5.image:item5.images[0].url_image" lazy-load="true" mode="aspectFill"></image>
								  </view>
								  <view >
									<view class="juhuasuan-con-title">{{item5.name}}</view>

								  </view>
							  </view>
						  </view>
						  <text class="mm-zixun1">
							长按删除
						  </text>
					</view>
				  </view>
				   <!-- 关注下面的横线 -->
				  <view class="LuDingJi-no" v-if="voteList.length==0">
				  	<view class="LuDingJi-icon1">
				  		<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
				  	</view>
				  	<view class="LuDingJi-no-con">
				  		暂无此分类关注
				  	</view>
				  </view>
			  </view>
			  
		</view>
		<!-- 置顶和发布 -->
		
		<!-- 关注的回到顶部 -->
		<view class="gotoTop">
		        <view v-if="topShow" class="gotoTop-send"  @click="Issue">
					<view>
						发布
					</view>
					<view>
						历史
					</view>
		        </view>
		
		        <view class="gotoTop-send gotoTop-top" v-else @click="fnscroll">
					<van-icon name="upgrade" size="20px"/>
					<view>
						置顶
					</view>
		        </view>
		</view>
		
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../wxcomponents/vant/dist/dialog/dialog';
	export default {
		components: {
		},
		data() {
			return {
				fin:false,
				loadingOne:false,
				loadingTwo:false,
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
				order_type3:''
				
			}
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.currentIndex==0 && this.ListData.length>19){
				this.loadingOne = true
				this.page++
				this.getData()
			}
			if(this.currentIndex==1 && this.chinaList.length>19){
				this.loadingTwo = true
				this.page1++
				this.getChina()
			}
			if(this.currentIndex==2 && this.everyList.length>19){
				this.loadingThree = true
				this.page2++
				this.everyLook()
			}
			
		},
		onLoad() {
			this.getBanner()
			this.getClassify()
			this.getChina()
			// this.everyLook()
		},
		// onShareAppMessage(res) {
		//     if (res.from === 'button') {
		// 		console.log('分享')
		//     }
		// 	return {
		// 	      title: '德申汇小申展',
		// 		  path: '/pagesMy/SmallStretch/SmallStretch'
		// 	}
		// },
		onShow() {
			this.myVote()
		},
		onPageScroll(e) {
			if(e.scrollTop>200){
				this.topShow = false
			}else{
				this.topShow = true
			}
			if(this.currentIndex===0){
				this.scrollTop0 = e.scrollTop
			}
			if(this.currentIndex===1){
				this.scrollTop1 = e.scrollTop
				
				// console.log(this.scrollTop1)
			}
			if(this.currentIndex===2){
				this.scrollTop2 = e.scrollTop
			}
		},
		methods: {
			getChina(){
				
			},
			// 友好物切换关注等
			pageChange(index){
				this.pageIndex1 = index
				if(index==0){
					this.order_type1 = ''
				}else if(index == 1){
					this.order_type1 = 1
				}else{
					this.order_type1 = 2
				}
				this.getData()
			},
			// 聚划算切换关注等
			pageChange1(index){
				this.pageIndex2 = index
				if(index==0){
					this.order_type2 = ''
				}else if(index == 1){
					this.order_type2 = 1
				}else{
					this.order_type2 = 2
				}
				this.getChina()
			},
			search(){
				uni.navigateTo({
					url:'../../pagesMy/Search/Search'
				})
			},
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
								url:'/pagesMy/pay/pay'
							})
						}).catch(() => {
						  // on cancel
						});
					  } else if (uni.getStorageSync('isVip') === 1) {
						
						  uni.navigateTo({
						  	url:'../../pagesMy/IssueHistory/IssueHistory'
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
			// 置顶
			fnscroll(){
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
				})
			},
			 // 长按删除
			touch(item){
				Dialog.confirm({
				  title: '提示',
				  message: '确定要删除吗？',
				  confirmButtonText:'确定'
				}).then(() => {
					this.$api.SmallStretchVote({
					  token: uni.getStorageSync("token"),
					  user_id: uni.getStorageSync("userId"),
					  id: item.exhibition_id
					}).then(res => {
					  console.log(res)
					  this.myVote()
					  if (res.data.code === '1039') {
						uni.showToast({
							title:"删除成功",
							icon:'none'
						})
					    this.myVote()
					  } else {
					    uni.showToast({
					    	title:"删除失败",
					    	icon:'none'
					    })
					  }
					})	
				}).catch(() => {
				  // on cancel
				});
			},
			// 去详情
			goSmallStretchPvw(id){
				uni.navigateTo({
					url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+id
				})
			},

			// 电话咨询
			phone (tel) {
			     if (uni.getStorageSync("isVip") == 0) {
							Dialog.confirm({
							  title: '提示',
							  message: '您还不是VIP用户',
							  confirmButtonText:'去支付'
							}).then(() => {
							  // on confirm
							}).catch(() => {
							  // on cancel
							});
			     } else if (uni.getStorageSync("isVip") == 1) {
							Dialog.confirm({
							  title: '电话',
							  message: '他的手机号码：'+ tel,
							  confirmButtonText:'我要拨打'
							}).then(() => {
								uni.makePhoneCall({
									phoneNumber: tel
								});
							}).catch(() => {
							  // on cancel
							});
						
			     }
			},
			// 点赞或者是关注 带取消  我的关注列表
			myVote () {
			  this.$api.SmallStretchMyVote({
				token: uni.getStorageSync("token"),
				user_id: uni.getStorageSync("userId"),
				category_id: this.category_id2
			  }).then(res => {
				this.voteList = res.data.data
				console.log(res)
				// console.log('关注')
				// console.log(this.myVoteList)
			  })
			},
			
			// 控制商品分类样式
			classifyChange(ind,id){
				this.n = ind
				this.category_id = id
				this.page = 1
				this.getData()
			},
			classifyChange1(ind,id){
				this.n1 = ind
				this.category_id1 = id
				this.page1 = 1
				this.getChina()
			},
			classifyChange2(ind,id){
				this.n2 = ind
				this.category_id2 = id
				this.myVote()
			},
			// 商品分类
			getClassify () {
			      this.$api.SmallStretchGoodsCategory({
			      }).then(res => {
			        this.classifyList = res.data.data
			        this.classifyList.unshift(
			          {
			            'id': '',
			            'name': '全部'
			          }
			        )
			      })
			},
		    
	        // 获取banner
			getBanner () {
				  this.$api.SmallStretchBanner({
				  }).then(res => {
					  // console.log(res)
					this.bannerList = res.data.data
				  })
		    },
		    
			imageLoad(e){
				
			}
			
		}
	}
</script>

<style>
	@import url("../../pagesTwo/SmallStretchNew/SmallStretchNew.css");
</style>
