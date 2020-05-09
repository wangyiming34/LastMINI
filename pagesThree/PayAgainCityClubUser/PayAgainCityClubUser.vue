<template>
	<view class="wrap1" style="padding-top: 88px;background: #fafafa;">
	  <view class="" style="position: fixed;left: 0; top: 0;z-index: 100;width: 100%;">
	  			<view class="report_search flex align-center border-bottom" style="background-color: white;width: 100%;">
	  			  <view class="text flex align-center">
	  			    <img src="https://web.detion.com/static/img/search_icon1.png" alt="" class="icon">
	  			    <view style="flex: 1">
	  			      <input type="text" placeholder="请输入要搜索的姓名" v-model="search_key">
	  			    </view>
	  			  </view>
	  			  <view class="btn" @click="search">搜索</view>
	  			</view>
	  			<view class="pay_condition flex align-center justify-between" style="width: 100%;background: #f5f5f5;;">
	  			  <view class="flex align-center">
	  				 
	  				<picker @change="bindPickerChange2"  mode = 'selector' :range='timeList'> 
	  					<view class="type time flex align-center" style="margin-left: 10px">
	  					  <view class="text">{{time}}</view>
	  					  <view class="caret"></view>
	  					</view>
	  				</picker>
	  				
	  			  </view>
	  			  
	  			</view>
	  </view>
	  <view class="listCon scroll" ref="list" style="overflow: auto;height: calc(100% - 88px);top:88px" v-show="isFinish">
	    
	      <view class="new_user_list">
	        <view class="border-bottom flex justify-start lii" v-for="(item,index) in list" :key="index">
	          <view class="user flex align-center justify-center">
	            <!-- <img :src="item.avatar?item.avatar:'https://web.detion.com/static/img/user_icon.png'" alt=""> -->
				  <image :src="item.avatar?item.avatar:'https://web.detion.com/static/img/user_icon.png'" lazy-load="true" class="imga" mode="aspectFill"></image>
	          </view>
	          <view class="con" style="display: block">
	            <view class="flex align-center justify-between">
	              <view class="info flex align-center" @click="my_info(item)">
	                <view class="name">{{item.nickname}}</view>
	                <vip :no="item.no" :type="item.type" class="vip"></vip>
	              </view>
	              <view style="flex align-center justify-end">
	                <!-- <a class="tel flex align-center justify-end" :href="'tel:' + item.username">{{item.username}}</a> -->
					  <view class="tel flex align-center justify-end" @click="tel(item.username)">
							<view class="">
								{{item.username}}
							</view>
							<van-icon name="arrow" />
					  </view>
	              </view>
	            </view>
	            <view class="company flex align-center">
	              <view style="flex: 1;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 1;-webkit-box-orient: vertical;">推荐人：{{item.parentname}}</view>
	            </view>
	            <view class="detail">
	              <view>地区：{{item.address}}</view>
	              <view>服务到期时间：{{item.vip_ended_at}}</view>
	            </view>
	          </view>
	
	        </view>
	      </view>
	    
	  </view>
	  <view style="height: 88upx;display: flex;  width: 100%;" v-if="loading">
	       <van-loading size="24px" color="#1989fa" type="spinner" style="margin: auto;">加载中...</van-loading>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			  search_key: '',
			  time: '全部超期VIP',
			  time_index: 1,
			  timeList: ['全部超期VIP', '超期0-3个月', '超期3-6个月', '超期6个月以上'],
			  list: [],
			  time_popup: false,
			  isFinish: false,
			  page: 1,
			  name: '',
			  loading: false,// 分页加载
			  id:''
			}
		},
		onLoad (e) {
		  uni.showLoading({
		      title: '加载中',
		  	mask:"true"
		  });
			this.id = e.id
			this.name = e.name
			this.getData()
		},
		// 上拉加载更多
		onReachBottom(){
			if(this.list.length>9){
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.loading = true
				this.page++
				this.getData()
			}
		},
		onPullDownRefresh() {
			  uni.showLoading({
			      title: '加载中',
			  	mask:"true"
			  });
			this.page = 1
			this.getData()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 2000);
		
		},
		methods: {
			tel(tel){
					  uni.makePhoneCall({
					  	phoneNumber:tel
					  })
			},
			getData () {
			  if (this.id> 0) {
			    this.$api.club_renew_users_v2({
			      token: uni.getStorageSync("token"),
			      user_id: uni.getStorageSync("userId"),
			      club_id: this.id,
			      search: this.search_key,
			      time: this.time_index,
			      page: this.page
			    }).then(res => {
			      uni.hideLoading();
				  if (res.data.code === '200') {
				  	if (this.page === 1) {
				  		  this.list = res.data.data.list
				  		  // console.log(this.chinaList)
				  		  this.loading = false
				  		  this.isFinish = true
				  	} else {
				  	  if(res.data.data.list.length){
				  		  setTimeout(()=>{
				  			  this.list = this.list.concat(res.data.data.list)
				  			  this.loading = false
				  			  uni.showToast({
				  				title:'加载成功',
				  				icon:"none"
				  			  })
				  		  },1500)
				  	  }else{
				  		  this.loading = false
				  		  uni.showToast({
				  			title:'没有更多的数据了',
				  			icon:"none"	,								  	
				  		  })
				  	  }	
				  	   this.isFinish = true					  
				  	}
				    
				  }
			      
			    })
			  } else {
			    this.$api.club_freedom_renew({
			      search: this.search_key,
			      time: this.time_index,
			      page: this.page,
			      city_name: this.name
			    }).then(res => {
			      uni.hideLoading();
				  if (res.data.code === '200') {
				  	if (this.page === 1) {
				  		  this.list = res.data.data.list
				  		  // console.log(this.chinaList)
				  		  this.loading = false
				  		  this.isFinish = true
				  	} else {
				  	  if(res.data.data.list.length){
				  		  setTimeout(()=>{
				  			  this.list = this.list.concat(res.data.data.list)
				  			  this.loading = false
				  			  uni.showToast({
				  				title:'加载成功',
				  				icon:"none"
				  			  })
				  		  },1500)
				  	  }else{
				  		  this.loading = false
				  		  uni.showToast({
				  			title:'没有更多的数据了',
				  			icon:"none"	,								  	
				  		  })
				  	  }	
				  	   this.isFinish = true					  
				  	}
				    
				  }
			      // if (res.code === '200') {
			      //   if (this.page === 1) {
			      //     this.list = res.data.list
			      //     if (this.list.length === 0 || this.list.length < 10) {
			      //       this.allLoaded = true
			      //     } else {
			      //       this.allLoaded = false
			      //     }
			      //     this.isFinish = true
			      //   } else {
			      //     this.$refs.loadmore.onBottomLoaded()
			      //     this.list = this.list.concat(res.data.list)
			      //     if (res.data.length < 10) {
			      //       this.allLoaded = true
			      //     }
			      //     this.isFinish = true
			      //   }
			      // }
			    })
			  }
			},
			search () {
			  if (this.search_key.length) {
			    uni.showLoading({
			          title: '搜索中',
			      	mask:"true"
			      });
			    }
			    this.page = 1
			    this.getData()
			},
			// 点击选中时间范围
			bindPickerChange2(e){
				uni.showLoading({
				    title: '加载中',
					mask:"true"
				});
				this.time = this.timeList[e.detail.value]
				if (this.time === '全部超期VIP') {
				  this.time_index = 1
				} else if (this.time === '超期0-3个月') {
				  this.time_index = 2
				} else if (this.time === '超期3-6个月') {
				  this.time_index = 3
				} else if (this.time === '超期6个月以上') {
				  this.time_index = 4
				}
				this.page = 1
				this.isFinish = false
				this.list = []
				this.getData()
			},
			
			my_info (item) {
			  uni.navigateTo({
			  	url:'../../pagesMy/MyInfo/MyInfo?id='+item.user_id
			  })
			}
		}
	}
</script>

<style>
	 @import url("../Report/Report.css");
</style>
