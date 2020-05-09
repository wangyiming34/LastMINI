<template>
	<view class='IssueHistory'>
	     
	        <view v-for="item in list" :key="item.id" class="juhuasuan-loadmore-con" style="margin-bottom:8px;background:white" v-if="list.length>0">
	            <view @longpress="touch(item)">
	              <view class="juhuasuan-con" v-if="item.images" @click.stop="goSmallStretchPvw(item.id,item)">
	                  <view class="juhuasuan-con-img" style="width:75px;height:75px" >
							<image :src="item.image?item.image:item.images[0].url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
	                        <view style="
	                              width:100%;
	                              height:16px;
	                              background:rgba(232,84,30,1);
	                              border-radius:1px;
	                              position: absolute;
	                              bottom:0;
	                              left:0;
	                              line-height:16px;
	                              text-align:center;
	                              font-size:11px;
	                              font-weight:400;
	                              color:rgba(255,255,255,1);
	                              z-index：10
	                         "  v-if="item.is_sale_out===0">
	                            已上架
	                        </view>
	                        <view style="
	                              width:100%;
	                              height:16px;
	                              background:#cccccc;
	                              border-radius:1px;
	                              position: absolute;
	                              bottom:0;
	                              left:0;
	                              line-height:16px;
	                              text-align:center;
	                              font-size:11px;
	                              font-weight:400;
	                              color:rgba(255,255,255,1);
	                              z-index：100
	                         "  v-if="item.is_sale_out===1">
	                            已下架
	                        </view>
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
	            <view class="IssueHistory-btn-wrap">
	                        <view v-show="item.is_sale_out===1" @click.stop="putaway(item)">上架</view>
	                        <view v-show="item.is_sale_out===0" @click.stop="sold(item)">下架</view>
	                        <view @click.stop="edit(item.id)" v-if="item.is_sale_out===0">编辑</view>
	            </view>
	          </view>
			  
			  <view class="LuDingJi-no" v-else style="overflow: hidden;height: 100%;width: 100%;background-color: white;">
			  	<view class="LuDingJi-icon1" style="margin: 50px auto 30px;">
			  		<image src="https://web.detion.com/static/img/empty_info.png" lazy-load="true"  mode="aspectFill"></image>
			  	</view>
			  	<view class="LuDingJi-no-con">
			  		暂无发布历史
			  	</view>
			  </view>
			  
			  <view  class="noMore1" v-if="showTitle&&list.length>0">
			  		暂无更多内容
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
	export default {
		data() {
			return {
				topShow:true,
				list: [],
                showSend: true,
				page:1,
				loadingThree:false,
				load:false,
				showTitle:false
			}
		},
		onPageScroll(e) {
			if(e.scrollTop>200){
				this.topShow = false
			}else{
				this.topShow = true
			}
		},
		onReachBottom(){
			if(this.load){
				this.load = false
				this.loadingThree = true
				this.page++
				this.getList()
			}
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});
			
			 this.getList()
		},
		methods: {
			goSmallStretchPvw(id,item){
				console.log(item)
				if(item.is_sale_out == 1){
					uni.showToast({
					    title: '商品已下架，上架后可查看',
					    mask: "true",
						icon:'none'
					});
					
				}else{
					uni.navigateTo({
						url:'../../pagesMy/SmallStretchPvw/SmallStretchPvw?id='+id
					})
				}
				
			},
			// 重新编辑
			    edit (id) {
				  uni.navigateTo({
				  	url:'../../pagesMy/StretchIndexEdit/StretchIndexEdit?id='+id
				  })
			    },
			// 上架
			    putaway (item) {
			      item.is_sale_out = 0
			      this.$api.SmallStretchIsSaleOut({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: item.id,
			        type: 0
			      }).then(res => {
					  
					uni.showToast({
						title:'上架成功',
						icon:"none"
					})
			      })
			    },
			    // 下架
			    sold (item) {
			      item.is_sale_out = 1
			      this.$api.SmallStretchIsSaleOut({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: item.id,
			        type: 1
			      }).then(res => {
			        uni.showToast({
			        	title:'下架成功',
			        	icon:"none"
			        })
			      })
			    },
			getList () {
			      this.$api.SmallStretchMyCreate({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        page: this.page
			      }).then(res => {
			        if (res.data.code === '200') {
						uni.hideLoading();
						 if (this.page === 1) {
							  this.list = res.data.data
							  if(res.data.data.length == 0 || res.data.data.length < 20){
								  this.load = false
								  this.showTitle = true
							  }else{
								  this.load = true
							  }
						 } else {
								  this.list = this.list.concat(res.data.data)
								  this.loadingThree = false
							 if(res.data.data.length < 20){
								 this.load = false
								 this.loadingThree = false
								 this.showTitle = true
							 }else{
								 this.load = true
							 }
												
						 }
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
			    },
				// 发布
				Issue(){
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
						  	url:'../StretchIndexSend/StretchIndexSend'
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
		}
	}
</script>

<style>
	@import url("./IssueHistory.css");
</style>
