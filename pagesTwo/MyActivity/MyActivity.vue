<template>
	<view class="wrap1" style="padding-top: 44px;">
		<!-- 头部选项卡 -->
		<view class="headTab flex justify-around align-center border-bottom-new2 tabtab" style="color: #ccc;">
			<view v-for="(item,index) in tabList" :key="index" class="headTabFor" :class="{tabBlue:index==n}" @click="tab(index)">
				{{item}}
			</view>
		</view>
		
		<view class="" v-if="hotList.length>0" style="background-color: white;">
			<view class="re" v-for="(item,index) in hotList" :key="index" style="margin-bottom: 8px;" @click="goDetail(item.id)">
				<view class="ab astatus" :style="{background:item.state?'#cc3055':'#ccc'}">
					{{item.state?'进行中':'已结束'}}
				</view>
				<view class="" style="width: 100%;height: 340upx;">
					<image :src="item.url_image" lazy-load="true" class="imga" mode="aspectFill"></image>
				</view>
				<view class="" style="padding: 8px 10px;">
					<view class="" style="font-size: 17px;line-height: 24px;color: #333;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;margin-bottom: 5px;">
						{{item.name}}
					</view>
					<view class="flex justify-between align-center">
						<view class="flex align-center" style="flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
							<van-icon name="location-o" color="#999"/>
							<view style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;font-size: 13px;line-height: 20px;color: #999;">{{item.address}}</view>
						</view>
						
						<view class="flex align-center" style="margin-left: 10px;">
							<van-icon name="clock-o" color="#999" style="margin-right: 3px;"/>
							<view style="font-size: 13px;line-height: 20px;color: #999;">{{item.start_date.split(' ')[0].split('-').join('.')}}-</view>
							<view style="font-size: 13px;line-height: 20px;color: #999;">{{item.finish_date.split(' ')[0].split('-').join('/')}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="LuDingJi-no" v-else>
			<view class="LuDingJi-icon1">
				<image src="https://web.detion.com/static/img/empty_concern.png" lazy-load="true" class="imga" mode="aspectFill"></image>
			</view>
			<view class="LuDingJi-no-con">
				暂无活动
			</view>
		</view>
		<view  class="noMore1" v-if="showTitle&&hotList.length>0">
				暂无更多内容
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
				tabList:['全部','进行中','已结束'],
				n:0,
				page:1,
				loading:false,
				hotList:[],
				allowloading:false,
				showTitle:false
			}
		},
		onLoad() {
			this.getActivity()
		},
		onPullDownRefresh(){
			this.page = 1
			this.getActivity()
			setTimeout(function () {
			        uni.stopPullDownRefresh();
					uni.showToast({
					    title: '刷新成功',
					    duration: 1000,
						icon:'none'
					});
			  }, 1000);
		},
		onReachBottom(){
			if(this.allowloading){
				this.allowloading = false
				this.loading = true
				this.page++
				this.getActivity()
				// setTimeout(() => {
				// 	this.page++
				// 	this.getActivity()
				// 	uni.showToast({
				// 		title: '加载成功',
				// 		duration: 1000,
				// 		icon:'none'
				// 	});
				// }, 1500)	
			}
		},
		methods: {
			goDetail(id){
				uni.navigateTo({
					url:'../../pagesTwo/ActivityDetail/ActivityDetail?id='+id
				})
			},
			getActivity () {
			  if (this.n === 0) {
			    this.getAll()
			  } else if (this.n === 1) {
			    this.getUnderway()
			  }else{
				 this.getFinish() 
			  }
			},
			tab(index){
				this.n = index
				this.page = 1 
				this.getActivity()
			},
			// 全部
			getAll(){
				this.$api.my_activity({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  page: this.page
				}).then(res => {
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.page===1){
							this.hotList = res.data.data
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}else{
							this.hotList = this.hotList.concat(res.data.data)
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}
						
						for (let j = 0; j < this.hotList.length; j++) {
						  if (new Date(this.hotList[j].finish_date.replace(/-/g, '/')).getTime() > this.time) { // 结束时间大于当前时间
						    this.hotList[j].state = true
						  } else {
						    this.hotList[j].state = false
						  }
						}
						
					}
				})
			},
			// 进行中
			getUnderway(){
				this.$api.my_activity_ing({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  page: this.page
				}).then(res => {
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.page===1){
							this.hotList = res.data.data
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}else{
							this.hotList = this.hotList.concat(res.data.data)
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}
						
						for (let j = 0; j < this.hotList.length; j++) {
						  if (new Date(this.hotList[j].finish_date.replace(/-/g, '/')).getTime() > this.time) { // 结束时间大于当前时间
						    this.hotList[j].state = true
						  } else {
						    this.hotList[j].state = false
						  }
						}
						
					}
				})
			},
			// 已结束
			getFinish(){
				this.$api.my_activity_end({
				  token: uni.getStorageSync("token"),
				  user_id: uni.getStorageSync("userId"),
				  page: this.page
				}).then(res => {
					// console.log(res)
					if(res.data.code=== '200'){
						if(this.page===1){
							this.hotList = res.data.data
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}else{
							this.hotList = this.hotList.concat(res.data.data)
							if(res.data.data.length>=10){
								this.allowloading= true
								this.loading =false
								this.showTitle = false
							}else{
								this.allowloading= false
								this.loading =false
								this.showTitle = true
							}
						}
						
						for (let j = 0; j < this.hotList.length; j++) {
						  if (new Date(this.hotList[j].finish_date.replace(/-/g, '/')).getTime() > this.time) { // 结束时间大于当前时间
						    this.hotList[j].state = true
						  } else {
						    this.hotList[j].state = false
						  }
						}
						
					}
				})
			},
		}
	}
</script>

<style>
	@import url("../../pagesMy/SmallStretch/SmallStretch.css");
	.astatus{
		width: 44px;
		height: 24px;
		font-size: 12px;
		line-height: 24px;
		text-align: center;
		color: #fff;
		position: absolute;
		right: 3%;
		top: 0;
	}
</style>
