<template>
	<view class="wrap1" v-show="isFinish">
		<view class="flex list justify-between align-center re" v-for="(item,index) in list" :key="index" >
			<view class="img re" @click="info(item.user_id)">
				<image :src="item.avatar?item.avatar:'../../static/img/user_icon.png'" lazy-load="true"  mode="aspectFill" class="age"></image>
				<head-logo :type="item.type" :v_type="item.add_v_type"></head-logo>
			</view>
			
			<view class="flex justify-between align-center  new-b" style="flex: 1; margin-left: 20upx;">
				<view class="zonghe">
					<view class="nickname">
						<text>{{item.nickname }}</text><text v-if="item.job" style="margin-left: 10upx;">{{  item.job}}</text>
					</view>
					<view class="company" v-if="item.company">
						{{item.company}}
					</view>
				</view>
				<view class="yijing flex align-center" v-if="item.status==1" @click.prevent.stop="concern(item)">
					<van-icon name="exchange" />互相关注
				</view>
				<view  v-else-if="item.status==0">
					
				</view>
				<view class="yijing" v-else-if="item.status==2" @click.prevent.stop="concern(item)">
					已关注
				</view>
				<view class="concern" v-else @click.prevent.stop="concern(item)">
					<text style="margin-right: 3upx;font-size: 31upx; font-weight: 900;">+ </text><text> 关注 </text>
				</view>
			</view>
				
		</view>
		
		<view class="nomore" v-if="hasMore">
			暂无更多
		</view>
		<view style="height: 88upx;background-color: #C0C0C0; display: flex;  width: 100%;" v-if="loading">
					  <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
		</view>
		<view style="height: 100%;width: 100%; line-height: 1000upx; text-align: center; font-size: 32upx;" v-if="isDelete">
			<van-icon name="delete" size="40upx" style="margin-bottom: 80upx;" color="red"/>
				该条资讯可能被删除了,无法查看点赞列表
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				  id:'' ,//传过来的帖子id
				  list: [],
				  page: 1, // 当前页
				  hasMore: false, // 提示暂无更多
				  isFinish: false,
				  isDetail: false, // 可以查看
				  isDelete: false, // 被删除了
				  loading:false
			}
		},
		onReachBottom(){
			if(!this.hasMore){
				console.log(123)
				this.loading = true
				this.page++
				this.getData()
			}
			
		},
		methods: {
			// 点击关注,互相关注等
			concern (item) {
			  
			      if (item.status === 1 || item.status === 2) { // 如果是是互相关注，或者是已关注，点击即是取消关注，显示关注
							uni.showModal({
								title: '提示',
								content: '确定取消关注吗？',
								success: (res)=> {
									if (res.confirm) {
										this.follow(item)
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
			      
			      } else if (item.status === 3 || item.status === 4) { // 如果是被关注，点击关注显示互相关注
			        this.follow(item)
			      }
			      // }
			    },
				
			follow (item) {
				  this.$api.NewsFollow({
					token: uni.getStorageSync("token"),
					user_id: uni.getStorageSync("userId"),
					follow_id: item.user_id
				  }).then(res => {
					  console.log(res)
					item.status = res.data.data
					uni.showToast({
					    title: res.data.msg,
					    duration: 2000,
						icon:'none'
					});
				  })
				},
			// 跳到个人主页
			info(id){
				uni.navigateTo({
					url:'../../pagesMy/MyInfo/MyInfo?id='+id
				})
			},
			// 获取点赞列表数据
			getData () {
			      this.$api.NewsUpvotesUserList({
			        token: uni.getStorageSync("token"),
			        user_id: uni.getStorageSync("userId"),
			        id: this.id,
			        page: this.page
			      }).then(res => {
					  console.log(res)
			        if (res.data.code === '200') {
						  uni.hideLoading();
			          if (this.page === 1) {
						  this.loading = false
			              this.list = res.data.data
			            if (this.list.length === 0 || this.list.length < 20) {
			              this.hasMore = true
			              
			            } 
			            this.isFinish = true
			            this.isDetail = true
			          } else {
							setTimeout(()=>{
								  this.list = this.list.concat(res.data.data)
								  this.loading = false
								  uni.showToast({
									title:'加载成功',
									icon:"none"
								  })
							},1000)
			            
			            if (res.data.data.length < 20) {
							setTimeout(()=>{
								  this.hasMore = true
							},1000)
			                
			            }
			            this.isFinish = true
			            this.isDetail = true
			          }
			        } else if (res.data.code === '1073') {
			          this.isFinish = true
			          this.isDelete = true
			        }
					
			      })
			    },
			
		},
		onLoad(e) {
			uni.showLoading({
			    title: '加载中'
			});	
			this.id = e.id
			this.getData()		
		},
	}
</script>

<style>
	@import url("./PraiseList.css");
</style>
