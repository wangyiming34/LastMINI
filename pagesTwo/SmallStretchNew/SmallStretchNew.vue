<template>
	<view class="wrap1" style="overflow: hidden;padding: 88px 0 0;">
		<!-- 全屏透明遮罩 -->
		<view class="zhezhao" v-show="showActive" @click.stop="showActive = !showActive">
			
		</view>
		<!-- 头部搜索 -->
		<view class="ipt" style="height: 44px;">
			<navigator url="../../pagesMy/Search/Search">
				 <view class="ipt-left" style="background-color:#F2F2F2;">
					请搜索输入内容
				 </view>
			</navigator>	
			 <view class="re flex align-center" >
				<!-- <van-icon name="bars" size="22px" @click.stop="showActive = !showActive"/> -->
				<image src="https://web.detion.com/static/image/exhibition/icon1.jpg" lazy-load="true" style="width: 44upx;height: 44upx;" mode="aspectFill" @click.stop="showActive = !showActive"></image>
				<view class="Active1" v-show="showActive">
					<view class="Active1-class border-bottom-new" v-for="(item, index) in pagelist" :key="index" @click.stop="pageChange1(index)">
							{{item}}
					</view>
				</view>
			 </view>
		</view>
		<!-- 分类选择 -->
		<view class="classify">
				<scroll-view scroll-x="true" class="scroll-view_H" >
					<view v-for="(item,index) in classifyList" :key="index" class="scroll-view-item_H classify-name" 
					@click="classifyChange1(index,item.id)" :class="n1===index?'classifyActive':''">
						{{item.name}}
					</view>
				</scroll-view>
		</view>
		<!-- 轮播图加中间的地址选项等 -->
		<view class="newSwiper" v-if="n1==0">
			<!-- 轮播图 -->
			<view class="banner-swiper">
				<swiper class="swiper1" :duration="500" autoplay interval="3000" circular="true"
				:current="swiperCurrent" @change="changeSwiper">
					<swiper-item v-for="item in bannerList" :key="item.banner_id" @click="bannerGo(item)">
						<image :src="item.image"  lazy-load="true"></image>
					</swiper-item>
				</swiper>
				<!-- 轮播指示点样式修改 -->
				<view class="dots">
				  <block v-for="(item,index) in bannerList.length" :key="index">
					  <view class="dot" :class="index==swiperCurrent ? 'active' : ''"></view>
				  </block>
				</view>
			</view>
			<!-- 新增我关注，大家都在看，城市选择等 -->
			<view class="flex align-center justify-between" style="padding: 0 10px;" >
					<picker @change="bindPickerChange" mode = 'region' >
						<view class="felx flex-d justify-between align-center newnewwrap" >
							<view class="newimg">
								<image src="https://web.detion.com/static/image/exhibition/icon2.png" lazy-load="true" mode="aspectFill"></image>
							</view>
							<view class="newnewwraptitle">
								位置切换
							</view>
						</view>
					</picker>
					<view class="felx flex-d justify-between align-center newnewwrap" @click.stop="myVote">
						<view class="newimg">
							<image src="https://web.detion.com/static/image/exhibition/icon3.png" lazy-load="true" mode="aspectFill"></image>
						</view>
						<view class="newnewwraptitle">
							我的关注
						</view>
					</view>
					
					<view class="felx flex-d justify-between align-center newnewwrap" @click.stop="everyLook">
						<view class="newimg">
							<image src="https://web.detion.com/static/image/exhibition/icon4.png" lazy-load="true" mode="aspectFill"></image>
						</view>
						<view class="newnewwraptitle">
							大家在看
						</view>
					</view>
					
					<view class="felx flex-d justify-between align-center newnewwrap" @click.stop="history">
						<view class="newimg">
							<image src="https://web.detion.com/static/image/exhibition/icon5.png" lazy-load="true" mode="aspectFill"></image>
						</view>
						<view class="newnewwraptitle">
							发布历史
						</view>
					</view>
					
			</view>
			<!-- 友好物 -->
			<view class="youhaowuwrap" @click.stop="youhaowu">
				<view class="youshangmian flex justify-between align-center">
					<view class="youhaowutext">
						<text>友好物</text>
						<text class="youshu" style="margin: 0 3px;">|</text>
						<text class="youshu">精选推荐</text>
					</view>
					<view class="">
						<van-icon name="arrow" color="white"/>
					</view>
				</view>
				
				<view class="youhaowu3 flex justify-between" >
					<view v-for="(item,index) in youList" :key="index" class="youhaowufor" @click.stop="goSmallStretchPvw(item.id)">
						<view class="youhaowu3img">
							<image :src="item.image?item.image:item.images[0].url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
						</view>
						<view style="width: 100%;margin-top: 6px;">
							<view class="youhaowujiage"><text style="font-size: 12px;">￥</text>{{item.current_price}}</view>
							<view class="youhaowubiaoti">{{item.name}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 巨划算列表页 -->
		<view class="zongBanner">
			
			<!-- 列表内容 -->
			<view class="re" style="padding-bottom:2px">
				  <view v-for="(item1,index1) in chinaList" :key="index1" class="juhuasuan-loadmore-con" @click.stop="goSmallStretchPvw(item1.id)">
					 <view class="juhuasuan-con border-bottom">
							 <view class="juhuasuan-con-img" >
								<image :src="item1.image?item1.image:item1.images[0].url_image" lazy-load="true"  mode="aspectFill"></image>
							 </view>
							 <view style="flex: 1;">
								<view class="juhuasuan-con-title">{{item1.name}}</view>
								<view class="juhuasuan-con-tap">
								  <view class="juhuasuan-con-zhekou">
									<image src="https://web.detion.com/static/images/youhui.png" lazy-load="true"  mode="aspectFill"></image>
									<view>{{parseInt(item1.current_price/item1.original_price*10*10)/10}}折</view>
								  </view>

								  <text v-if="n===0 && item1.cate_name" class="juhuasuan-con-biaoqian">
									  {{item1.cate_name}}
								  </text>
								</view>
								<view class="juhuasuan-con-price">
									<text>¥{{item1.current_price.split('.')[0]}}.</text>
									<text>{{item1.current_price.split('.')[1]}}</text>
									<text>¥{{item1.original_price}}</text>
								</view>
								
								<!-- 新加的关注，点击 -->
								<view class="flex align-center" style="font-size:13px;font-weight:400;color:rgba(102,102,102,1);">
									<van-icon name="eye-o" size="17px"/>
									<view class="youhaowu3click">
										{{item1.click}}
									</view>
									<van-icon name="star-o" size="15px"/>
									<view class="youhaowu3click">
										{{item1.like}}
									</view>
								</view>
							  </view>
					  </view>
				  </view>
				 
			  </view>
			  <view class="LuDingJi-no" v-if="chinaList.length==0">
			  	<view class="LuDingJi-icon1" style="margin-top: 20px;">
			  		<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			  	</view>
			  	<view class="LuDingJi-no-con">
			  		暂无数据
			  	</view>
			  </view>
			  <view  class="noMore1" v-if="showTitle&&chinaList.length>0">
			  		暂无更多内容
			  </view>
			  <!-- 聚划算加载更多 -->
			  <view style="height: 88upx;display: flex;  width: 100%;" v-if="loadingTwo">
				  <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			  </view>
		</view>
		
		<!-- 置顶和发布 -->
		<view class="gotoTop">
		        <view v-if="topShow" class="gotoTop-send"  @click="Issue">
					<van-icon name="records" size="20px"/>
					<view>
						发布
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
	var app = getApp().globalData
	export default {
		components: {
		},
		data() {
			return {
				showActive:false,
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
				pagelist:["最新上传","关注量","查看量"],
				pageIndex1:0,
				pageIndex2:0,
				pageIndex3:0,
				order_type1:1,
				order_type2:1,
				order_type3:1,
				youList:[],
				city:'',
				allow0:false,
				showTitle:false
				
			}
		},
		onPullDownRefresh() {
			this.page1 = 1
			this.getChina()
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
				this.loadingTwo = true
				this.page1++
				this.getChina()
			}
			
			
		},
		onLoad() {
			this.getBanner()
			this.getClassify()
			this.getChina()
			this.getYou()
		},
		onShareAppMessage(res) {
		    return {
		      title: '德申汇小申展',
		      imageUrl:app.shareImg,
		      path: '/pagesTwo/SmallStretchNew/SmallStretchNew'
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
			youhaowu(){
				uni.navigateTo({
					url:'../../pagesTwo/SmallStretchNewItem/SmallStretchNewItem'
				})
			},
			// 大家都在看
			everyLook(){
				// console.log(123)
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/SmallStretchNewEvery/SmallStretchNewEvery'
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
			// 跳转发布历史
			history(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesMy/IssueHistory/IssueHistory'
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
			// 跳转关注界面
			myVote(){
				if(uni.getStorageSync('userId')){
					uni.navigateTo({
						url:'/pagesTwo/SmallStretchNewVote/SmallStretchNewVote'
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
			bindPickerChange(e){
				
					this.city = e.detail.value[1].replace(/省|市|自治区|特别行政区|壮族|回族|维吾尔|城区/g, '')
					uni.showToast({
					    title: '切换城市为：' + this.city,
					    mask: "true",
						icon:'none'
					});
					this.$nextTick(()=>{
						this.getChina()
					})
			},
			getYou(){
				this.$api.high_quality_three({
				
				}).then(res => {
					this.youList = res.data.data
				})
			},
			// 聚划算切换关注等
			pageChange1(index){
				this.pageIndex2 = index
				if(index==0){
					this.order_type2 = 1
					uni.showToast({
					    title: '已为您切换至最新上传',
					    mask: "true",
						icon:'none'
					});
					
				}else if(index == 1){
					this.order_type2 = ''
					uni.showToast({
					    title: '已为您切换至关注量',
					    mask: "true",
						icon:'none'
					});
				}else{
					this.order_type2 = 2
					uni.showToast({
					    title: '已为您切换至查看量',
					    mask: "true",
						icon:'none'
					});
				}
				this.showActive = false
				this.getChina()
			},
			search(){
				uni.navigateTo({
					url:'../../pagesMy/Search/Search'
				})
			},
			// 发布
			Issue(){
				// console.log(123)
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
						
						  uni.navigateTo({
						  	url:'../../pagesMy/StretchIndexSend/StretchIndexSend'
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
			// 去详情
			goSmallStretchPvw(id){
				uni.navigateTo({
					url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+id
				})
			},
			// banner跳转
			bannerGo(item){
				// type 0  xiangqing 
				console.log(item)
				if(item.type==0){
					uni.navigateTo({
						url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+item.var
					})
				}else{
					uni.navigateTo({
						url:'../../pagesMy/view/view?url='+ item.href
					})
				}
			},
			// 首页聚划算数据
			getChina () {
			      this.$api.SmallStretchIndex({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        type: 0,
			        category_id: this.category_id1,
			        page: this.page1,
					order_type:this.order_type2,
					city:this.city
			      }).then(res => {
			        if (res.data.code === '200') {
						
						// 第一页的时候
						if(this.page1 === 1){
							this.chinaList = res.data.data
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
							this.chinaList = this.chinaList.concat(res.data.data)
							if(res.data.data.length>=20){
								this.allow0 = true
							}else{
								this.showTitle = true
								this.allow0 = false
							}	
						}
						// 加载进度条,加载完都得去掉
						this.loadingTwo = false
						
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
			
			      }).catch((res) => {
			        console.log(res)
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
				uni.pageScrollTo({
					scrollTop:0
				})
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
		    // 修改轮播图的 分页器样式用的
			changeSwiper(e) {
			    this.swiperCurrent = e.detail.current;
			},
			
	        // 获取banner
			getBanner () {
				  this.$api.SmallStretchBanner({
				  }).then(res => {
					  // console.log(res)
					this.bannerList = res.data.data
				  })
		    },
		    
		}
	}
</script>

<style>
	@import url("./SmallStretchNew.css");
	@import url("../../pages/index/index.css");
</style>
