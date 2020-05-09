<template>
	<view class="wrap1" style="overflow: hidden;background-color: white;padding: 88px 0 0;">
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
			 <view class=" re">
				
				<van-icon name="bars" size="22px" @click.stop="showActive = !showActive"/>
				<view class="Active1" v-show="showActive">
					<view class="Active1-class border-bottom-new" v-for="(item, index) in pagelist" :key="index" @click.stop="pageChange1(index)">
							{{item}}
					</view>
				</view>
			 </view>
		</view>
		<!-- 分类选择 -->
		<view class="classify">
				<scroll-view scroll-x="true" class="scroll-view_H">
					<view v-for="(item,index) in classifyList" :key="index" class="scroll-view-item_H classify-name" 
					@click="classifyChange1(index,item.id)" :class="n===index?'classifyActive':''">
						{{item.name}}
					</view>
				</scroll-view>
		</view>
		<!-- 选项卡下面的选项内容1 -->
		<view class="zongBanner">
			
			
			<!-- 瀑布流 -->
			<view class="twoRankedBox" id="boxonetwo">  
				  <view class="LuDingJi-no" v-if=" ListData.length === 0" style="overflow: hidden;">
				  	<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
				  		<image src="https://web.detion.com/static/img/empty_fans.png" lazy-load="true"  mode="aspectFill"></image>
				  	</view>
				  	<view class="LuDingJi-no-con">
				  		暂无内容
				  	</view>
				  </view>
			      
				  <view class="BoxLeft">
						<view class="item" v-for="(item, index) in ListData"  :key="index" v-show="index%2 == 0" @click="goSmallStretchPvw(item.id)">
							  
							  <image :src="item.image?item.image:item.images[0].url_image" lazy-load="true" style="width: 100%;height:335upx;dislay:block;margin-bottom:10px" ></image>
							  <view style="padding-left:10px;padding-bottom:10px">
								<view class="some-info1">{{item.name}}</view>
								<view class="some-info2">
								  <text>¥{{item.current_price.split('.')[0]}}.</text>
								  <text>{{item.current_price.split('.')[1]}}</text>
								  <text>¥{{item.original_price}}</text>
								</view>
								<view class="some-info3 flex align-center">
								  <view>{{item.like}}个关注</view>
								  <view></view>
								  <view>大家都在看</view>
								</view>
							  </view>
						</view>
				  </view> 
				   
				  <view class="BoxRight">
						<view class="item" v-for="(item, index1) in ListData"  :key="index1" v-show="index1%2 != 0" @click="goSmallStretchPvw(item.id)">
							  
							  <image  :src="item.image?item.image:item.images[0].url_image" lazy-load="true" style="width: 100%;height:335upx;block;margin-bottom:10px" ></image>
							  <view style="padding-left:10px;padding-bottom:10px">
								<view class="some-info1">{{item.name}}</view>
								<view class="some-info2">
								  <text>¥{{item.current_price.split('.')[0]}}.</text>
								  <text>{{item.current_price.split('.')[1]}}</text>
								  <text>¥{{item.original_price}}</text>
								</view>
								<view class="some-info3 flex align-center">
								  <view>{{item.like}}个关注</view>
								  <view></view>
								  <view>大家都在看</view>
								</view>
							  </view>
						</view>
				  </view>
				  
				  
				   
			</view>
			
			<view  class="noMore1" v-if="showTitle && ListData.length>0 ">
					暂无更多内容
			</view>
			
			<!-- 瀑布流加载更多 -->
			<view style="height: 88upx;display: flex;  width: 100%;" v-if="loadingOne">
			     <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
			</view>
		</view>
		
		
		<!-- 置顶和发布 -->
		<view class="gotoTop" >
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
				showTitle:false,
				allow0:false
				
			}
		},
		onPullDownRefresh() {
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
		// 上拉加载更多
		onReachBottom(){
			if(this.allow0){
				this.allow0 = false
				this.loadingOne = true
				this.page++
				this.getData()
			}
		},
		onShareAppMessage:function(res) {
			return {
			  title: '德申汇友好物',
			  imageUrl:app.shareImg,
			  path: '/pagesTwo/SmallStretchNewItem/SmallStretchNewItem'
			}
		},
		onLoad() {
			this.getClassify()
			this.getData()
		},
		methods: {
			pageChange1(index){
				this.pageIndex1 = index
				uni.pageScrollTo({
					scrollTop:0
				})
				if(index==0){
					this.order_type1 = 1
					uni.showToast({
					    title: '已为您切换至最新上传',
					    mask: "true",
						icon:'none'
					});
					
				}else if(index == 1){
					this.order_type1 = ''
					uni.showToast({
					    title: '已为您切换至关注量',
					    mask: "true",
						icon:'none'
					});
				}else{
					this.order_type1 = 2
					uni.showToast({
					    title: '已为您切换至查看量',
					    mask: "true",
						icon:'none'
					});
				}
				this.showActive = false
				this.getData()
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
			bannerGo(href){
				uni.navigateTo({
					url:'../view/view?url='+ href
				})
			},
			//首页友好物
			getData () {
			      this.$api.SmallStretchIndex({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        type: 1,
			        category_id: this.category_id,
			        page: this.page,
					order_type:this.order_type1
			      }).then(res => {
					  // console.log(res)
			        if (res.data.code === '200') {
						
						// 第一页的时候
						if(this.page === 1){
							this.ListData = res.data.data
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
							this.ListData = this.ListData.concat(res.data.data)
							if(res.data.data.length>=20){
								this.allow0 = true
							}else{
								this.showTitle = true
								this.allow0 = false
							}	
						}
						// 加载进度条,加载完都得去掉
						this.loadingOne = false
							
						
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
			classifyChange1(ind,id){
				uni.pageScrollTo({
					scrollTop:0
				})
				this.n = ind
				this.category_id = id
				this.page = 1
				this.getData()
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
		    
	       
			
		}
	}
</script>

<style>
	@import url("../../pagesTwo/SmallStretchNew/SmallStretchNew.css");
	@import url("../../pages/index/index.css");
</style>
